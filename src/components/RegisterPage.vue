<template>
  <transition name="fade">
    <div
      v-if="!this.$store.state.authorized"
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
      <div class="home-footer">
        <div>
          <span>F: </span>
          <span class="version" title="Version of Front-end">{{
            version
          }}</span>
        </div>
        <div v-if="this.$store.state.backend_version">
          <span>B: </span>
          <span class="version" title="Version of Back-end">{{
            this.$store.state.backend_version
          }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import socket from "../socket";

export default {
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
  computed: {
    version() {
      return process.env.VUE_APP_GIT_DESCRIPTION.toString();
    },
  },
  created() {
    fetch(process.env.VUE_APP_SOCKET_URL + "/info.json")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        this.$store.commit("setstate", {
          backend_version: data.version.raw,
        });
      });
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
.home-footer {
  position: fixed;
  bottom: 0;
  padding: 0 10px 10px 10px;
}
.home-footer span {
  color: #9f9f9f;
  transition: 0.3s all ease;
  cursor: default;
}
.version::before {
  content: "v";
  display: inline;
}
.version:hover {
  color: black;
}
</style>