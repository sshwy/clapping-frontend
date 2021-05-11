<template>
  <transition name="fade">
    <div
      v-if="!sessioned"
      class="full-page"
      :style="{
        display: 'table',
        position: 'absolute',
      }"
    >
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
  data () {
    return {
      username: "",
    }
  },
  methods: {
    onUsernameSelection() {
      socket.auth = { username: this.username };
      socket.connect();
    },
  }
}
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
  top: 60px;
}

</style>