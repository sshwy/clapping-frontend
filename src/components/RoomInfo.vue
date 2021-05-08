<template>
  <div class="room-info">
    <div>
      <h3>房间 #{{ room.id }}</h3>
    </div>
    <div>
      <span
        v-for="u in room.players"
        v-bind:key="u.id"
        :class="['user-card', player_stat_class[u.stat]]"
        :title="u.id"
      >
        {{ u.name }}
      </span>
    </div>
  </div>
</template>

<script>
import { player_stat_class } from "../utils";

export default {
  name: "RoomInfo",
  props: {
    room: Object,
  },
  data() {
    return {
      player_stat_class: player_stat_class,
    };
  },
};
</script>

<style>
</style>