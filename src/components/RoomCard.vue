<template>
  <div
    class="room-card card card-with-hover"
    title="加入房间"
    @click="debouncedClick"
  >
    <div class="room-card-title card-title">Room #{{ id }}</div>
    <div class="room-card-content card-content">
      Players ({{ totalPlayers }})
    </div>
  </div>
</template>

<script>
import { debounce } from "../utils";
export default {
  props: {
    room: Object,
    onClick: Function,
  },
  data() {
    return {
      id: this.room.id,
      totalPlayers: this.room.players.length,
      debouncedClick: debounce(this.onClick),
    };
  },
};
</script>

<style>
</style>