<template>
  <div></div>
</template>

<script>
import socket from "../socket";

export default {
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    "Microsoft YaHei", "WenQuanYi Micro Hei", "Microsoft YaHei UI", sans-serif;
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

input[type="text"] {
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  margin: 0 3px;
  font-size: 1em;
  padding: 0.2em 0.3em;
  border-radius: 2px;
  transition: 0.3s all ease;
}

input[type="text"]:hover {
  background: #efefef;
}
input::placeholder {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    "Microsoft YaHei", "WenQuanYi Micro Hei", "Microsoft YaHei UI", sans-serif;
  font-size: 90%;
}
input[disabled] {
  background-color: rgb(206, 206, 206);
}
input[type="radio"] {
  outline: none;
}
</style>