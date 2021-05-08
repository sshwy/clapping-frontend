<template>
  <div class="scene">
    <div v-show="type === 'draw'">
      <movement-log
        v-for="item of draw_sentences"
        :key="item.id"
        :description="item"
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
    };
  },
  created() {
    socket.on("draw", (data) => {
      this.type = "draw";
      this.draw_data = data;
      const appendLog = data.status.playerList.map((e, idx, arr) => {
        const mv = data.movement_map[e.id];
        const target = mv.target
          ? arr.filter((e) => e.id === mv.target)[0].name
          : "";
        return {
          id: e.name + mv.move.toString() + target + data.status.turn.toString(),
          from: e.name,
          move: mv.move,
          to: target,
          turn: data.status.turn,
        };
      });
      // this.draw_sentences.push(...appendLog);
      const newArray = [...appendLog,  ...this.draw_sentences];
      this.draw_sentences = newArray;
      console.log(this.draw_sentences);

      socket.emit("finish draw");
    });
  },
};
</script>

<style>
</style>