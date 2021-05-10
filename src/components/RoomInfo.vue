<template>
  <div class="room-info">
    <div class="room-title">
      <h3>房间 #{{ room.id }}</h3>
    </div>
    <div v-if="isLeader" class="game-config">
      <form>
        <ul class="game-list">
          <li
            class="game-list-item"
            v-for="game in gameMetaList"
            :key="game.id"
          >
            <input
              type="radio"
              name="game"
              :value="game.id"
              :id="'game-' + game.id"
              v-model="game_picked"
            />
            <label :for="'game-' + game.id"
              ><span class="game-title">{{ game.name }}</span></label
            >
          </li>
        </ul>
      </form>
    </div>
    <div v-else class="game-config">
      <span class="game-title">{{ currentGameTitle }}</span>
    </div>
    <div>
      <user-card
        v-for="u in room.players"
        :key="u.id"
        :user="u"
        :isleader="u.id === room.leader"
        :editable="isLeader && u.id !== room.leader"
      />
    </div>
  </div>
</template>

<script>
import UserCard from "./UserCard.vue";
import store from "../dataStore";
import socket from "../socket";

export default {
  components: { UserCard },
  name: "RoomInfo",
  props: {
    room: Object,
    selfid: String,
  },
  data() {
    return {
      game_picked: this.room.game_id || 0,
    };
  },
  computed: {
    isLeader() {
      return this.selfid === this.room.leader;
    },
    gameMetaList() {
      return store.get("games").map((e, idx) => ({
        id: idx,
        name: e.name,
      }));
    },
    currentGameTitle() {
      return this.gameMetaList[this.game_picked].name;
    },
  },
  updated() {
    if (!this.isLeader) {
      this.game_picked = this.room.game_id;
    }
  },
  watch: {
    game_picked: function (newVal) {
      if (this.isLeader) {
        socket.emit("choose game", newVal);
      }
    },
  },
};
</script>

<style>
.game-list .game-title {
  padding: 5px;
  transition: all 0.3s ease;
  border-radius: 3px;
}
.game-list .game-title:hover {
  background-color: #cfcfcf;
  cursor: pointer;
}
.game-list {
  line-height: 2em;
}
.game-list-item {
  user-select: none;
}
</style>