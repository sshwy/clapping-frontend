<template>
  <div class="navbar clear-fix">
    <div class="logo-container">
      <img src="/logo.png" alt="Clapping" class="logo" />
    </div>
    <div class="usertitle">
      您以 「<span class="username">{{ $store.state.username }}</span
      >」 的身份登录

      <vbtn v-on:click="onLogout">
        <span class="iconfont icon-sign-out"></span> 注销
      </vbtn>
      <span class="btn"></span>
    </div>
  </div>
</template>

<script>
import socket from "../socket";
import Button from "./Button";

export default {
  components: {
    vbtn: Button,
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
  z-index: 20;
}
.usertitle {
  line-height: 60px;
  float: left;
}
.logo {
  height: 60px;
}
.logo-container {
  float: left;
  margin-right: 10px;
  user-select: none;
}
</style>