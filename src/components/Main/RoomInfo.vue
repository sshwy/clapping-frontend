<template>
  <div class="room-info">
    <div class="user-card-container">
      <user-card
        v-for="u in room.players"
        :key="u.id"
        :user="u"
        :isleader="u.id === room.leader"
        :editable="isLeader && u.id !== room.leader"
      />
    </div>
    <div v-if="selfstat === 'roomed'">
      <input type="button" value="准备" class="btn" v-on:click="onReady" />
      <input type="button" value="退出" class="btn" v-on:click="onLeave" />
    </div>
    <div v-if="selfstat === 'ready'">
      <input
        type="button"
        value="取消"
        class="btn"
        v-on:click="onCancelReady"
      />
    </div>
  </div>
</template>

<script>
import socket from "../../socket";
import UserCard from "../UserCard";

export default {
  name: "RoomInfo",
  components: {
    UserCard,
  },
  props: {
    room: Object,
    selfid: String,
    selfstat: String,
  },
  methods: {
    onReady() {
      socket.emit("ready");
    },
    onCancelReady() {
      socket.emit("cancel ready");
    },
    onLeave() {
      socket.emit("quit room");
    },
  },
  computed: {
    isLeader() {
      return this.selfid === this.room.leader;
    },
  },
};
</script>

<style>
.room-info {
  height: inherit;
  overflow-y: scroll;
}
</style>