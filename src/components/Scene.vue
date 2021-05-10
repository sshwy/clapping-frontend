<template>
  <div class="scene">
    <div v-show="type === 'draw'">
      <transition-group name="movement-log-list" tag="div">
        <movement-log
          v-for="item of draw_sentences"
          :key="item.id"
          :description="item"
          :selfname="selfname"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import socket from "../socket";
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
    };
  },
  created() {
    socket.on("draw", (data) => {
      this.draw_data = data;
      this.draw_sentences.unshift(...data.logs);
      this.selfname = socket.username;

      this.type = "draw";

      this.$nextTick(function () {
        if (data.event_name === "watcher draw") {
          socket.emit("watcher finish draw");
        } else {
          socket.emit("finish draw");
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
  },
};
</script>

<style>
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