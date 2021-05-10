<template>
  <div></div>
</template>

<script>
import socket from "../socket";
import store from "../dataStore";

export default {
  name: "GlobalCss",
  data() {
    return {
      styleEl: document.createElement("style"),
      styleStr: "",
    };
  },
  created() {
    document.getElementById("app").appendChild(this.styleEl);

    this.styleEl.innerHTML = this.styleStr;

    socket.on("session", ({ games }) => {
      store.set("games", games);
      // console.log(games[0]);
      this.styleStr = this.styleStr + this.renderGameCSS(games[0]);
      this.styleEl.innerHTML = this.styleStr;
    });
  },
  updated() {
    this.styleEl.innerHTML = this.styleStr;
  },
  methods: {
    renderGameCSS(game) {
      const result = game.movement_group.movement_list.reduce((str, data) => {
        return (
          str +
          `.card.movement-card.movement-${data.id} {\n` +
          `  background-color: ${data.background_color};\n}\n` +
          `.card.movement-card.movement-${data.id}:hover {\n` +
          `  background-color: ${data.background_color_hover};\n}\n`
        );
      }, "");
      return result;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  overflow-y: hidden;
  margin: 0;
}

li {
  list-style: none;
}
ul {
  padding-inline-start: 0;
}
</style>