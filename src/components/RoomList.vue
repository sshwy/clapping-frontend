<template>
  <div class="roomer clear-fix">
    <div v-if="type === 'room_list'" class="room-list-container">
      <h3>房间列表</h3>
      <span class="btn" v-on:click="onUpdateRoomList">
        <span class="iconfont icon-refresh"></span>
        刷新
      </span>
      <div class="room-list clear-fix">
        <room-card
          v-for="room in roomList"
          :key="room.vid"
          :room="room"
          :onClick="() => onSelectRoom(room.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import socket from "../socket";
import RoomCard from "./RoomCard.vue";

export default {
  name: "User",
  components: {
    RoomCard,
  },
  data() {
    return {
      innerHTML: "",
      type: "empty",
      roomList: [],
      roomInfo: null,
      selfid: "",
    };
  },
  created() {
    socket.on("session", ({ userID }) => {
      this.selfid = userID; // save the ID of the user
    });
    socket.on("room info", (room) => {
      this.roomInfo = room;
      this.type = "room_info";
    });
    const onRoomList = (rooms) => {
      this.roomList = rooms.map((room) => ({
        ...room,
        vid: room.id + new Date().getTime(),
      }));
      this.type = "room_list";
    };
    socket.on("room list", onRoomList);
    socket.on("room list update", onRoomList);
    socket.on("game prepare", () => {
      console.log('clear room list');
      this.type = "empty";
    });
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
</style>