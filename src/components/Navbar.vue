<template>
  <div class="navbar">
    <div class="usertitle">
      您以 「<span class="username">{{ username }}</span
      >」 的身份登录
      <span v-on:click="onLogout" class="btn"><span class="iconfont icon-sign-out"></span> 注销</span>
    </div>
  </div>
</template>

<script>
import socket from "../socket";

export default {
  name: "Navbar",
  props: {
    username: String,
  },
  methods: {
    onLogout() {
      socket.emit("logout");
    },
  },
};
</script>

<style>
.navbar .usertitle .username {
  font-weight: bold;
}
.navbar {
  position: fixed;
  background: white;
  width: 100vw;
  height: 60px;
  border-bottom: 1px solid black;
  top: 0;
  padding-left: 20px;
}
.usertitle {
  line-height: 60px;
}
</style>