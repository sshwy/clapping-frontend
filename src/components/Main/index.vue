<template>
  <transition name="delay-fade">
    <div
      v-show="this.$store.getters.is_gaming || this.$store.getters.is_room_info"
      :style="{
        height: 'calc(100vh - 80px)',
      }"
    >
      <grid-layout>
        <grid-row :height="0.06">
          <div v-if="this.$store.getters.is_room_info" class="room-title">
            <h3>房间 #{{ room.id }}</h3>
          </div>
          <div v-if="this.$store.getters.is_gaming">
            <span
              >「第 <span class="turn-number">{{ turn }}</span> 回合」你拥有
              {{ point }} 行动点</span
            >
            <span v-if="remain_time">，你还剩 {{ remain_time }} 秒</span>
          </div>
        </grid-row>
        <grid-row :height="0.45">
          <grid-col :width="16">
            <game-info v-if="this.$store.getters.is_room_info" :room="room" />
            <log-board v-show="this.$store.getters.is_gaming" />
          </grid-col>
          <grid-col :width="8">
            <div v-if="this.$store.getters.is_gaming">
              <user-card-in-game
                v-for="u in room_info_ingame.players"
                :key="u.id"
                :user="u"
                :selectable="
                  on_select_target &&
                  u.id !== room_status?.self?.id &&
                  ((type === 'req_target' && u.stat !== dead) ||
                    (type === 'req_dead_target' && u.stat === dead))
                "
                :onClick="() => onSelectMovement(selected_move, u.id)"
              />
            </div>
            <room-info
              v-if="this.$store.getters.is_room_info"
              :room="room"
              :selfid="this.$store.state.userID"
              :selfstat="selfstat"
            />
          </grid-col>
        </grid-row>
        <grid-row
          :height="0.45"
          :style="{
            position: 'relative',
          }"
        >
          <talk />
          <div v-if="type === 'terminate'" v-html="message"></div>
          <div v-if="type === 'submitted' && room_status?.self?.name">
            <movement-log :description="submitted_movement" />
          </div>
          <div
            :style="{
              height: 'calc(100% - 37px)',
              marginTop: '5px',
            }"
          >
            <transition name="fade-top">
              <div v-if="type === 'req_move'" class="clear-fix moves">
                <move-card
                  v-for="move in move_list"
                  :key="move.id"
                  :disabled="!available_move_id_list.includes(move.id)"
                  :move="move"
                  :onClick="() => onSelectMove(move.id)"
                  :helpkey="movement_help_key"
                  :onHelp="onMovementHelp"
                />
              </div>
            </transition>
          </div>
        </grid-row>
      </grid-layout>
    </div>
  </transition>
</template>

<script>
import Grid from "../Grid";
import socket from "../../socket";
import GameInfo from "./GameInfo";
import RoomInfo from "./RoomInfo";
import MoveCard from "../MoveCard";
import MovementLog from "../MovementLog";
import UserCardInGame from "../UserCardInGame";
import LogBoard from "../LogBoard";
import Talk from "../Talk.vue";
import {
  PlayerStatus,
  suggestMovementId,
  needTarget,
  needDeadTarget,
} from "../../utils";

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
    LogBoard,
    Talk,
  },
  data() {
    return {
      type: "empty",
      room: {},
      selfstat: "",
      message: "",
      room_status: {},
      available_move_id_list: [],
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
  computed: {
    move_list() {
      return [...this.$store.getters.all_movement].sort(
        (a, b) => a.point - b.point
      );
    },
  },
  created() {
    socket.on("room_info", (room) => {
      this.room = room;
      const stat = room.players.find((e) => e.id == socket.userID).stat;
      this.selfstat = stat === PlayerStatus.ROOMED ? "roomed" : "ready";
      // this.type = "room_info";
    });
    socket.on("room_info_ingame", (room) => {
      this.room_info_ingame = room;
      this.turn = room.turn;
      this.point = room.players.find((e) => e.id === socket.userID)?.point;
    });
    const onRoomList = () => {
      this.type = "empty";
    };
    socket.on("room_list", onRoomList);
    socket.on("room_list_update", onRoomList);
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
      this.available_move_id_list = suggestMovementId(status.self.movePoint);

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
      } else if (needDeadTarget(move)) {
        console.log("selectTarget");
        this.selected_move = move;
        this.on_select_target = true;
        this.type = "req_dead_target";
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
  provide() {
    return {
      getPlayerList: () => this.room_info_ingame.players || [],
    };
  },
};
</script>

<style>
.room-title h3 {
  margin: 0;
  padding-bottom: 1em;
}
.moves {
  overflow-y: auto;
  height: 100%;
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