<template>
  <div class="room-info">
    <div>
      <h3>房间 #{{ room.id }}</h3>
    </div>
    <div>
      <user-card
        v-for="u in room.players"
        :key="u.id"
        :user="u"
      />
    </div>
  </div>
</template>

<script>
import UserCard from './UserCard.vue';

export default {
  components: { UserCard },
  name: "RoomInfo",
  props: {
    room: Object,
  },
};
</script>

<style>
</style>