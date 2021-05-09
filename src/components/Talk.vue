<template>
  <div v-if="type !== 'empty'" class="talk">
    <form onsubmit="return false">
      <span class="iconfont icon-comment talk-label"></span>
      <input
        type="text"
        v-model="text"
        placeholder="来 bb 几句？"
        :disabled="disable"
        :style="{
          lineHeight: '1.5em',
          width: inputWidth,
        }"
      />
      <input type="submit" value="" style="display: none" v-on:click="onTalk" />
    </form>
  </div>
</template>

<script>
import socket from "../socket";

export default {
  name: "Talk",
  props: {
    addMessage: Function,
  },
  data() {
    return {
      text: "",
      type: "empty",
      disable: false,
    };
  },
  created() {
    socket.on("room list", () => {
      this.type = "empty";
    });
    socket.on("room info", () => {
      this.type = "display";
    });
    socket.on("room info ingame", () => {
      this.type = "display";
    });
  },
  methods: {
    onTalk() {
      if (this.text.length > 50) {
        this.addMessage("error", "别看今天拉清单，小心将来闹得欢");
      } else {
        socket.emit("talk", this.text);
        this.text = "";
        this.disable = true;
        this.$nextTick(function () {
          setTimeout(() => {
            this.disable = false;
          }, 2000);
        });
      }
    },
  },
  computed: {
    inputWidth() {
      return `${Math.max(this.text.length * 1.02 + 0.5, 20)}em`;
    },
  },
};
</script>

<style>
.talk-label {
  font-size: 1.7em;
  vertical-align: -0.3em;
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
</style>