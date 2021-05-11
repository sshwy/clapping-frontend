<template>
  <div
    :style="{
      height: 'calc(100vh - 80px)',
    }"
  >
    <grid-layout>
      <grid-row :height="2">
        <div v-if="type === 'room_info'" class="room-title">
          <h3>房间 #{{ room.id }}</h3>
        </div>
        <div v-if="type !== 'empty' && type !== 'room_info'">
          <span
            >「第 <span class="turn-number">{{ turn }}</span> 回合」你拥有
            {{ point }} 行动点</span
          >
          <span v-if="remain_time">，你还剩 {{ remain_time }} 秒</span>
        </div>
      </grid-row>
      <grid-row :height="10">
        <grid-col :width="8">
          <room-info
            v-if="type === 'room_info'"
            :room="room"
            :selfid="selfid"
            :selfstat="selfstat"
          />
          <div v-if="ingame">
            <user-card-in-game
              v-for="u in room_info_ingame.players"
              :key="u.id"
              :user="u"
              :selectable="
                on_select_target &&
                u.id !== room_status?.self?.id &&
                u.stat !== dead
              "
              :onClick="() => onSelectMovement(selected_move, u.id)"
            />
          </div>
        </grid-col>
        <grid-col :width="16">
          <game-info
            v-if="type === 'room_info'"
            :room="room"
            :selfid="selfid"
          />
          <scene v-show="ingame" />
        </grid-col>
      </grid-row>
      <grid-row :height="11">
        <talk />
        <div v-if="type === 'terminate'" v-html="message"></div>
        <div
          :style="{
            position: 'relative',
          }"
        >
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
        <div v-if="type === 'submitted' && room_status?.self?.name">
          <movement-log
            :description="submitted_movement"
            :selfname="room_status.self.name"
            :gameid="game_id"
          />
        </div>
      </grid-row>
    </grid-layout>
  </div>
</template>

<script>
import Grid from "../Grid";
import socket from "../../socket";
import GameInfo from "./GameInfo";
import RoomInfo from "./RoomInfo";
import MoveCard from "../MoveCard";
import MovementLog from "../MovementLog";
import UserCardInGame from "../UserCardInGame";
import Scene from "../Scene";
import Talk from "../Talk.vue";
import { PlayerStatus, suggestMovement, needTarget } from "../../utils";

export default {
  components: {
    GridLayout: Grid.Layout,
    GridCol: Grid.Column,
    GridRow: Grid.Row,
    GameInfo,
    RoomInfo,
    MoveCard,
    MovementLog,
    UserCardInGame,
    Scene,
    Talk,
  },
  data() {
    return {
      type: "empty",
      selfid: "",
      room: {},
      selfstat: "",
      ingame: false,
      game_id: 0,
      message: "",
      room_status: {},
      moveList: [],
      selected_move: "",
      targetList: [],
      submitted_movement: {},
      room_info_ingame: {},
      on_select_target: false,
      turn: 0,
      point: 0,
      dead: PlayerStatus.WATCHING,
      movement_help_key: -1,
      remain_time: 0,
    };
  },
  created() {
    socket.on("session", ({ userID }) => {
      this.selfid = userID; // save the ID of the user
    });
    socket.on("room info", (room) => {
      this.room = room;
      const stat = room.players.find((e) => e.id == socket.userID).stat;
      this.selfstat = stat === PlayerStatus.ROOMED ? "roomed" : "ready";
      this.type = "room_info";
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
    const onRoomList = () => {
      this.type = "empty";
    };
    socket.on("room list", onRoomList);
    socket.on("room list update", onRoomList);
    socket.on("game prepare", () => {
      console.log("clear room list");
      this.type = "gaming";
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
        this.movement_help_key = -1;
      } else {
        this.movement_help_key = key;
      }
    },
  },
};
</script>

<style>
.room-title h3 {
  margin: 0;
  padding-bottom: 1em;
}
.moves {
  overflow: hidden;
  transition: all 0.5s ease;
}

.fade-top-enter-active,
.fade-top-leave-active {
  transition: all 0.5s ease;
}

.fade-top-enter-from,
.fade-top-leave-to {
  overflow: hidden;
  position: absolute;
  opacity: 0;
}
</style>