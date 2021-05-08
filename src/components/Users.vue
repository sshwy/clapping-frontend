<template>
  <div class="users">
    <div v-if="type === 'room_list'">
      <h3>
        房间列表
        <input
          type="button"
          class="btn"
          value="刷新状态"
          v-on:click="onUpdateRoomList"
        />
      </h3>
      <room-card
        v-for="room in roomList"
        :key="room.vid"
        :room="room"
        :onClick="() => onSelectRoom(room.id)"
      />
    </div>
    <div v-if="type === 'room_info'">
      <room-info :room="roomInfo" />
    </div>
  </div>
</template>

<script>
import socket from "../socket";
import RoomCard from "./RoomCard.vue";
import RoomInfo from "./RoomInfo.vue";

export default {
  name: "User",
  components: {
    RoomCard,
    RoomInfo,
  },
  data() {
    return {
      innerHTML: "",
      type: "empty",
      roomList: [],
      roomInfo: null,
    };
  },
  created() {
    socket.on("room info", (room) => {
      this.roomInfo = room;
      this.type = "room_info";
    });
    socket.on("room info ingame", (room) => {
      this.roomInfo = room;
      this.type = "room_info";
    });
    socket.on("room list", (rooms) => {
      this.roomList = rooms.map(room => ({
        ...room,
        vid: room.id + (new Date()).getTime(),
      }));
      this.type = "room_list";
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
</style>