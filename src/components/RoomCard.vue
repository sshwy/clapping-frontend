<template>
  <div
    class="room-card card card-with-hover"
    title="加入房间"
    v-on:click="onClick"
  >
    <div class="room-card-title card-title">Room #{{ id }}</div>
    <div class="room-card-content card-content">
      Players ({{ totalPlayers }})
    </div>
  </div>
</template>

<script>
export default {
  props: {
    room: Object,
    onClick: Function,
  },
  components: {},
  data() {
    return {
      id: this.room.id,
      totalPlayers: this.room.players.length,
    };
  },
};
</script>

<style>
</style>