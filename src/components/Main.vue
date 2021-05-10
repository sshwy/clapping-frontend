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
      <div>第 {{ turn }} 回合」你拥有 {{ point }} 行动点</div>
      <div v-if="remain_time">你还剩 {{ remain_time }} 秒</div>
    </div>
    <div v-if="ingame">
      <user-card-in-game
        v-for="u in room_info_ingame.players"
        :key="u.id"
        :user="u"
        :selectable="
          on_select_target && u.id !== room_status?.self?.id && u.stat !== dead
        "
        :onClick="() => onSelectMovement(selected_move, u.id)"
      />
    </div>

    <div v-if="type === 'terminate'" v-html="message"></div>
    <div v-if="type === 'submitted' && room_status?.self?.name">
      <movement-log
        :description="submitted_movement"
        :selfname="room_status.self.name"
        :gameid="game_id"
      />
    </div>
    <transition name="fade-top">
      <div v-if="type === 'req_move'" class="clear-fix moves">
        <move-card
          v-for="move in moveList"
          :key="move.id"
          :move="move"
          :onClick="() => onSelectMove(move.id)"
          :helpkey="movement_help_key"
          :onHelp="onMovementHelp"
        />
      </div>
    </transition>
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
      dead: PlayerStatus.WATCHING,
      movement_help_key: "",
      remain_time: 0,
      game_id: 0,
    };
  },
  created() {
    socket.on("room info", (room) => {
      const stat = room.players.find((e) => e.id == socket.userID).stat;
      this.type = "room_info";
      this.self_stat = stat === PlayerStatus.ROOMED ? "roomed" : "ready";
      this.ingame = false;
      this.game_id = room.game_id;
    });
    socket.on("room info ingame", (room) => {
      this.room_info_ingame = room;
      this.turn = room.turn;
      this.point = room.players.find((e) => e.id === socket.userID)?.point;
      this.ingame = true;
      this.game_id = room.game_id;
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
    socket.on("request movement", (status, timeout) => {
      clearInterval(this.req_movement_interval);
      this.room_status = status;
      this.turn = status.turn;
      this.point = status.self.movePoint;
      this.moveList = suggestMovement(status.self.movePoint);
      this.type = "req_move";

      this.remain_time = Math.floor((timeout - new Date().getTime()) / 1000);
      this.req_movement_interval = setInterval(() => {
        this.remain_time--;
        if (this.remain_time < 0) {
          clearInterval(this.req_movement_interval);
          this.remain_time = 0;
        }
      }, 1000);
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
      clearInterval(this.req_movement_interval);
      this.remain_time = 0;
      this.type = "finished";
      this.on_select_target = false;
      socket.emit("movement", { move, target });
    },
    onMovementHelp(key) {
      if (this.movement_help_key === key) {
        this.movement_help_key = "";
      } else {
        this.movement_help_key = key;
      }
    },
  },
};
</script>

<style>
.moves {
  overflow: hidden;
  transition: all 0.5s ease;
  max-height: 100vh;
}

.fade-top-enter-active,
.fade-top-leave-active {
  transition: all 0.5s ease;
}

.fade-top-enter-from,
.fade-top-leave-to {
  overflow: hidden;
  opacity: 0;
  /* transform: translateY(-50px); */
  max-height: 0;
}
</style>