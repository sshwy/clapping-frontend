<template>
  <div class="main clear-fix">
    <div v-if="type === 'room_info' && self_stat === 'roomed'">
      <input type="button" value="准备" class="btn" v-on:click="onReady" />
      <input type="button" value="退出" class="btn" v-on:click="onLeave" />
    </div>
    <div v-if="type === 'room_info' && self_stat === 'ready'">
      <input
        type="button"
        value="取消"
        class="btn"
        v-on:click="onCancelReady"
      />
    </div>

    <div v-if="type !== 'empty' && type !== 'room_info'">
      「第 {{ turn }} 回合」你拥有 {{ point }} 行动点
    </div>
    <div v-if="ingame">
      <user-card-in-game
        v-for="u in room_info_ingame.players"
        :key="u.id"
        :user="u"
        :selectable="on_select_target && u.id !== room_status?.self?.id"
        :onClick="() => onSelectMovement(selected_move, u.id)"
      />
    </div>

    <div v-if="type === 'terminate'" v-html="message"></div>
    <div v-if="type === 'req_move'">
      <move-card
        v-for="move in moveList"
        :key="move.id"
        :move="move"
        v-on:click="() => onSelectMove(move.id)"
      />
    </div>
    <div v-if="type === 'submitted' && room_status?.self?.name">
      <movement-log
        :description="submitted_movement"
        :selfname="room_status.self.name"
      />
    </div>
  </div>
</template>

<script>
import socket from "../socket";
import { PlayerStatus, suggestMovement, needTarget } from "../utils";
import MoveCard from "./MoveCard.vue";
import MovementLog from "./MovementLog.vue";
import UserCardInGame from "./UserCardInGame.vue";

export default {
  name: "Main",
  components: {
    MoveCard,
    MovementLog,
    UserCardInGame,
  },
  data() {
    return {
      type: "empty",
      self_stat: "",
      message: "",
      room_status: {},
      moveList: [],
      selected_move: "",
      targetList: [],
      submitted_movement: {},
      room_info_ingame: {},
      ingame: false,
      on_select_target: false,
      turn: 0,
      point: 0,
    };
  },
  created() {
    socket.on("room info", (room) => {
      const stat = room.players.find((e) => e.id == socket.userID).stat;
      this.type = "room_info";
      this.self_stat = stat === PlayerStatus.ROOMED ? "roomed" : "ready";
      this.ingame = false;
    });
    socket.on("room info ingame", (room) => {
      this.room_info_ingame = room;
      this.turn = room.turn;
      this.point = room.players.find(e => e.id === socket.userID)?.point;
      this.ingame = true;
    });
    socket.on("room list", () => {
      this.type = "empty";
      this.ingame = false;
    });
    socket.on("died", () => {
      this.type = "terminate";
      this.message = "你咋这么菜啊～";
    });
    socket.on("win", () => {
      this.type = "terminate";
      this.message = "牛逼！";
    });
    socket.on("request movement", (status) => {
      this.room_status = status;
      this.turn = status.turn;
      this.point = status.self.movePoint;
      this.moveList = suggestMovement(status.self.movePoint);
      this.type = "req_move";
    });
    socket.on("submitted movement", (data) => {
      this.submitted_movement = data;
      this.type = "submitted";
    });
  },
  methods: {
    onReady() {
      socket.emit("ready");
    },
    onCancelReady() {
      socket.emit("cancel ready");
    },
    onLeave() {
      socket.emit("quit room");
    },
    onSelectMove(move) {
      if (needTarget(move)) {
        console.log("selectTarget");
        this.selected_move = move;
        this.on_select_target = true;
        this.type = "req_target";
      } else {
        this.onSelectMovement(move, "");
      }
    },
    onSelectMovement(move, target) {
      this.type = "finished";
      this.on_select_target = false;
      socket.emit("movement", { move, target });
    },
  },
};
</script>

<style>
</style>