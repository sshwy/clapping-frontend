<template>
  <div class="scene-wrapper">
      <div class="scene-title">对战日志</div>
    <div class="scene">
      <div v-show="type === 'draw'">
        <transition-group name="movement-log-list" tag="div">
          <movement-log
            v-for="item of draw_sentences"
            :key="item.id"
            :description="item"
            :selfname="selfname"
            :gameid="game_id"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import socket from "../socket";
import store from "../dataStore";
import MovementLog from "./MovementLog.vue";

export default {
  name: "Scene",
  components: {
    MovementLog,
  },
  data() {
    return {
      type: "empty",
      draw_data: null,
      draw_sentences: [],
      selfname: "",
      game_id: 0,
    };
  },
  created() {
    if (!store.get("scene_socket")) {
      store.set("scene_socket", true);
      console.log("scene socket");
      socket.on("draw", (data) => {
        this.game_id = data.game_id;
        this.draw_data = data;
        this.draw_sentences.unshift(...data.logs);
        this.selfname = socket.username;

        this.type = "draw";

        this.$nextTick(function () {
          if (data.event_name === "watcher draw") {
            socket.emit("watcher finish draw");
          } else {
            socket.emit("finish draw", this.selfname);
          }
        });
      });
      socket.on("game prepare", () => {
        this.draw_sentences = [];
        this.type = "empty";
      });
      socket.on("room info ingame", (room) => {
        this.selfname = socket.username;
        this.draw_sentences = room.battle_log;
        this.type = "draw";
      });
    }
  },
};
</script>

<style>
.scene {
  overflow-y: auto;
  height: inherit;
  padding: 5px;
  box-shadow: 0px 1px 2px 0px #b1b1b1;
  margin-bottom: 3px;
}
.scene-wrapper {
  position: relative;
  height: inherit;
}
.scene-title {
  position: absolute;
  top: 8px;
  right: 20px;
  color: #b1b1b1;
  transition: all 0.3s ease;
}
.scene-title:hover {
  cursor: default;
  color: black;
}
.movement-log-list-item {
  display: inline-block;
  margin-right: 10px;
}
.movement-log-list-enter-active,
.movement-log-list-leave-active {
  transition: all 1s ease;
}
.movement-log-list-enter-from,
.movement-log-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.movement-log-list-move {
  transition: transform 0.8s ease;
}
</style>