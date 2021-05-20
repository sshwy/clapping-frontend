<template>
  <div></div>
</template>

<script>
import socket from "../socket";

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
      this.styleStr = this.styleStr + this.renderGameCSS(games[4]);
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
  margin-block-start: 0;
  margin-block-end: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

img[src$="break.svg"] {
  display: none;
}
</style>