<template>
  <div
    :class="[
      'user-list-item',
      player_stat_info[user.stat]?.class,
      editable && 'editable',
    ]"
    :title="player_stat_info[user.stat]?.title"
  >
    <span class="username">
      {{ user.name }}
    </span>
    <span v-if="isleader" class="leader-tag">房主</span>
    <span
      v-if="editable"
      class="btn remove-btn"
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
      socket.emit('kick player', id);
    },
  },
};
</script>

<style>
.user-list-item {
  margin: 5px;
  padding: 3px 5px;
}

.user-list-item .username {
  font-weight: bold;
}

.user-list-item .remove-btn {
  display: inline;
  border: none;
  margin: 5px;
  border-radius: 3px;
  padding: 2px 5px;
  transition: all 0.3s ease;
  font-size: 90%;
  background-color: #f44336;
  color: white;
}

span.leader-tag {
  background-color: #03a9f4;
  padding: 2px 5px;
  border-radius: 3px;
  margin: 5px;
  color: white;
  font-size: 90%;
}

.player-ready {
  background: #8bc34a;
}

.player-listening {
  background: #03a9f4;
}

.player-acting {
  background: #03a9f4;
}

.player-submited {
  background: #ffc107;
}
</style>