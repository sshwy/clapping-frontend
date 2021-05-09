<template>
  <div class="scene">
    <div v-show="type === 'draw'">
      <movement-log
        v-for="item of draw_sentences"
        :key="item.id"
        :description="item"
        :selfname="selfname"
      />
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
      // console.log(this.draw_sentences);

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
      this.draw_sentences = room.battle_log;
      this.type = "draw";
    });
  },
};
</script>

<style>
</style>