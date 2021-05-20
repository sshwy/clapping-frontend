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
        <vbtn v-on:click="onUpdateRoomList">
          <span class="iconfont icon-refresh"></span>
          刷新
        </vbtn>
        <div class="room-list clear-fix">
          <room-card
            v-for="room in roomList"
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
import Button from "./Button";

export default {
  name: "User",
  components: {
    RoomCard,
    vbtn: Button,
  },
  data() {
    return {
      innerHTML: "",
      roomList: [],
      roomInfo: null,
    };
  },
  created() {
    socket.on("room_info", (room) => {
      this.roomInfo = room;
    });
    const onRoomList = (rooms) => {
      this.roomList = rooms.map((room) => ({
        ...room,
        vid: room.id + new Date().getTime(),
      }));
    };
    socket.on("room_list", onRoomList);
    socket.on("room_list_update", onRoomList);
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