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
    <div v-show="selfstat === 'roomed'">
      <debounced-button :onClick="onReady">准备</debounced-button>
      <debounced-button :onClick="onLeave">退出</debounced-button>
    </div>
    <div v-show="selfstat === 'ready'">
      <debounced-button :onClick="onCancelReady">取消</debounced-button>
    </div>
  </div>
</template>

<script>
import DebouncedButton from "../DebouncedButton";
import socket from "../../socket";
import UserCard from "../UserCard";

export default {
  name: "RoomInfo",
  components: {
    UserCard,
    DebouncedButton,
  },
  props: {
    room: Object,
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
      return this.$store.state.userID === this.room.leader;
    },
  },
};
</script>

<style>
.room-info {
  height: inherit;
  overflow-y: auto;
}
</style>