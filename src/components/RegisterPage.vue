<template>
  <transition name="fade">
    <div
      v-if="!sessioned"
      class="full-page"
      :style="{
        position: 'absolute',
      }"
    >
      <div class="logo-title">
        <img src="/logo-title.png" alt="" />
      </div>
      <div class="user-register">
        <form onsubmit="return false">
          <input v-model="username" type="text" placeholder="取个名字吧 ^_^" />
          <input
            type="submit"
            value=""
            :style="{ display: 'none' }"
            v-on:click="onUsernameSelection"
          />
          <span
            class="iconfont icon-arrow-right-circle username-submit-btn"
            :style="{
              fontSize: '1.8em',
              verticalAlign: '-0.2em',
            }"
            v-on:click="onUsernameSelection"
          ></span>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import socket from "../socket";

export default {
  props: {
    sessioned: Boolean,
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    onUsernameSelection() {
      socket.auth = { username: this.username };
      socket.connect();
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: absolute;
}
.user-register {
  width: 430px;
  font-size: 1.5em;
  margin: 0 auto;
  padding-left: 20px;
}
.full-page {
  width: 100vw;
  height: 100vh;
}
.logo-title {
  margin: 0 auto;
  width: 450px;
  height: 400px;
}
.logo-title img {
  height: inherit;
  margin: 0 auto;
}
</style>