<template>
  <div class="log-board-wrapper">
    <div class="log-board-title">对战日志</div>
    <div class="log-board">
      <div>
        <transition-group name="movement-log-list" tag="div">
          <movement-log
            v-for="item of draw_sentences"
            :key="item.id"
            :description="item"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import socket from "../socket";
import MovementLog from "./MovementLog";

export default {
  name: "Scene",
  components: {
    MovementLog,
  },
  data() {
    return {
      draw_data: null,
      draw_sentences: [],
    };
  },
  created() {
    socket.on("draw", (data) => {
      this.draw_data = data;
      this.draw_sentences.unshift(...data.log);

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
    });
    socket.on("room_info_ingame", (room) => {
      this.draw_sentences = room.battle_log;
    });
  },
};
</script>

<style>
.log-board {
  overflow-y: auto;
  height: inherit;
  padding: 5px;
  box-shadow: 0px 1px 2px 0px #b1b1b1;
  margin-bottom: 3px;
}
.log-board-wrapper {
  position: relative;
  height: inherit;
}
.log-board-title {
  position: absolute;
  top: 8px;
  right: 20px;
  color: #b1b1b1;
  transition: all 0.3s ease;
}
.log-board-title:hover {
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