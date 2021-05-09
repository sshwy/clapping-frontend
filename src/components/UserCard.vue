<template>
  <div
    :class="['user-list-item', editable && 'editable']"
    :title="player_stat_info[user.stat]?.title"
  >
    <span class="username">
      {{ user.name }}
    </span>
    <span
      v-show="player_stat_info[user.stat]?.class === 'player-ready'"
      class="tag ready-tag"
      >已准备</span
    >
    <span v-if="isleader" class="tag leader-tag">房主</span>
    <span
      v-if="editable"
      class="tag btn remove-btn"
      v-on:click="() => onKick(user.id)"
      >踢了</span
    >
  </div>
</template>

<script>
import socket from "../socket";
import { player_stat_info } from "../utils";

export default {
  name: "UserCard",
  props: {
    user: Object,
    isleader: Boolean,
    editable: Boolean,
  },
  data() {
    return {
      player_stat_info: player_stat_info,
    };
  },
  created() {
    console.log(this.user);
  },
  methods: {
    onKick(id) {
      socket.emit("kick player", id);
    },
  },
};
</script>

<style>
.user-list-item {
  margin: 10px;
}

.user-list-item .username {
  font-weight: bold;
  margin-right: 5px;
}

.user-list-item .remove-btn {
  display: inline;
  border: none;
  background-color: #f44336;
  color: white;
}

.tag, .tag.btn {
  padding: 2px 5px;
  border-radius: 3px;
  margin: 5px 5px 5px 0;
  font-size: 90%;
}

.leader-tag {
  background-color: #03a9f4;
  color: white;
}
.ready-tag {
  background: #8bc34a;
  color: white;
}

</style>