<template>
  <div class="roomer clear-fix">
    <transition name="fade">
      <div v-if="this.$store.getters.is_room_list" class="room-list-container">
        <h3
          :style="{
            marginBottom: '1em',
          }"
        >
          房间列表
        </h3>
        <v-button @click="onUpdateRoomList">
          <span class="iconfont icon-refresh"></span>
          刷新
        </v-button>
        <div class="room-list clear-fix">
          <room-card
            v-for="room in this.$store.state.data.room_list || []"
            :key="room.vid"
            :room="room"
            :onClick="() => onSelectRoom(room.id)"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import socket from "../socket";
import RoomCard from "./RoomCard.vue";
import VButton from "./VButton";

export default {
  name: "User",
  components: {
    RoomCard,
    VButton,
  },
  methods: {
    onSelectRoom(id) {
      console.log("on select room", id);
      socket.emit("select room", id);
    },
    onUpdateRoomList() {
      socket.emit("room list update");
    },
  },
};
</script>

<style>
.room-list {
  margin-top: 1em;
}
.roomer {
  position: relative;
}
</style>