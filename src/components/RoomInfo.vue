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
        :isleader="u.id === room.leader"
        :editable="selfid === room.leader && u.id !== room.leader"
      />
    </div>
  </div>
</template>

<script>
import UserCard from "./UserCard.vue";

export default {
  components: { UserCard },
  name: "RoomInfo",
  props: {
    room: Object,
    selfid: String,
  },
};
</script>

<style>
</style>