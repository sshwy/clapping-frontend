<template>
  <div class="main">
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
    <div v-if="type === 'terminate'" v-html="message"></div>
    <div v-if="type === 'req_move' || type === 'req_target'">
      「第 {{ room_status.turn }} 回合」你拥有 {{ room_status.self.movePoint }} 行动点
    </div>
    <div v-if="type === 'req_move'">
      <move-card
        v-for="move in moveList"
        v-bind:key="move.id"
        v-on:click="() => onSelectMove(move.id)"
        :move="move"
      />
    </div>
    <div v-if="type === 'req_target'">
      <div
        v-for="u in targetList"
        class="user-select-card"
        v-bind:key="u.id"
        v-on:click="() => onSelectMovement(selected_move, u.id)"
      >
        {{ u.name }}
      </div>
    </div>
    <div v-if="type === 'submitted'">
      <movement-log :description="submitted_movement" />
    </div>
  </div>
</template>

<script>
import socket from "../socket";
import { PlayerStatus, suggestMovement, needTarget } from "../utils";
import MoveCard from './MoveCard.vue';
import MovementLog from "./MovementLog.vue";

export default {
  name: "Main",
  components: {
    MoveCard,
    MovementLog,
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
    };
  },
  created() {
    socket.on("room info", (room) => {
      const stat = room.players.find((e) => e.id == socket.userID).stat;
      this.type = "room_info";
      this.self_stat = stat === PlayerStatus.ROOMED ? "roomed" : "ready";
    });
    socket.on("room list", () => {
      this.type = "empty";
    });
    socket.on("died", () => {
      this.type = "terminate";
      this.message = "You Died.";
    });
    socket.on("win", () => {
      this.type = "terminate";
      this.message = "You Win.";
    });
    socket.on("request movement", (status) => {
      this.room_status = status;
      this.moveList = suggestMovement(status.self.movePoint);
      this.type = "req_move";
    });
    socket.on('submitted movement', data => {
      this.submitted_movement = data;
      this.type = 'submitted';
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
        this.targetList = this.room_status.playerList.filter(
          (u) => u.id !== this.room_status.self.id
        );
        this.type = "req_target";
      } else {
        this.onSelectMovement(move, "");
      }
    },
    onSelectMovement(move, target) {
      this.type = "empty";
      socket.emit("movement", { move, target });
    },
  },
};
</script>

<style>
</style>