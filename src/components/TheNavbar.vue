<template>
  <div class="navbar clear-fix">
    <div class="logo-container">
      <img src="/logo.png" alt="Clapping" class="logo" />
    </div>
    <div class="usertitle">
      您以 「<span class="username">{{ $store.state.username }}</span
      >」 的身份登录

      <v-button @click="onLogout">
        <span class="iconfont icon-sign-out"></span> 注销
      </v-button>
    </div>
    <ul
      class="menu clear-fix"
      :style="{
        float: 'right',
        lineHeight: '59px',
      }"
    >
      <v-button
        v-for="item in menu"
        :key="item.component"
        :styled="false"
        @click="this.$emit('switch', item.component)"
        tag="li"
        class="menu-item"
      >
        <span class="menu-item-title">{{ item.title }}</span>
      </v-button>
    </ul>
  </div>
</template>

<script>
import socket from "../socket";
import VButton from "./VButton";

export default {
  components: {
    VButton,
  },
  emits: ["switch"],
  data() {
    return {
      menu: [
        {
          title: "游戏",
          component: "game-page",
        },
        {
          title: "帮助",
          component: "document-page",
        },
      ],
    };
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
.menu .menu-item {
  float: left;
  padding: 0 10px;
  transition: 0.3s background ease;
  cursor: pointer;
}
.menu .menu-item:hover {
  background-color: #cfcfcf;
}
</style>