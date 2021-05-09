<template>
  <div class="navbar">
    <p>
      您以 「<span class="username">{{ username }}</span
      >」 的身份登录
      <input v-on:click="onLogout" type="button" value="注销" class="btn" />
    </p>
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
.navbar .username {
  font-weight: bold;
}
</style>