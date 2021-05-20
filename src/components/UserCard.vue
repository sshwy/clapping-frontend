<template>
  <div
    :class="['user-list-item', editable && 'editable']"
    :title="player_stat_info[user.stat]?.title"
  >
    <span class="username">
      {{ user.name }}
    </span>
    <span v-if="isleader" class="tag leader-tag">房主</span>
    <span
      v-if="editable"
      class="tag btn remove-btn"
      v-on:click="() => onKick(user.id)"
      >踢了</span
    >
    <span v-show="isReady" class="tag ready-tag">已准备</span>
    <span
      v-if="editable && !isReady"
      class="tag btn hurry-btn"
      v-on:click="() => onHurry(user.id)"
      >催他准备</span
    >
    <span v-if="editable && !isReady && hurry_times" class="hurry-times"
      >✕{{ hurry_times }}</span
    >
    <transition name="shake">
      <span v-if="says" class="say">
        <span class="iconfont icon-comment"></span>
        {{ says }}
      </span>
    </transition>
  </div>
</template>

<script>
import socket from "../socket";
import { player_stat_info } from "../utils";

export default {
  name: "UserCard",
  props: {
    user: Object,
    isleader: Boolean,
    editable: Boolean,
  },
  data() {
    return {
      player_stat_info: player_stat_info,
      says: "",
      hurry_times: 0,
    };
  },
  computed: {
    isReady() {
      return this.player_stat_info[this.user.stat]?.class === "player-ready";
    },
  },
  created() {
    socket.on("speak", (id, text) => {
      if (id === this.user.id) {
        this.says = text;
        this.$nextTick(function () {
          setTimeout(() => {
            this.says = "";
          }, 2000);
        });
      }
    });
  },
  methods: {
    onKick(id) {
      socket.emit("kick player", id);
    },
    onHurry(id) {
      clearTimeout(this.hurry_timeout);
      socket.emit("hurry player", id);
      this.hurry_times++;
      this.hurry_timeout = setTimeout(() => {
        this.hurry_times = 0;
      }, 5000);
    },
  },
};
</script>

<style>
.shake-enter-active {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.user-list-item {
  margin: 10px;
}

.user-list-item .username {
  font-weight: bold;
  margin-right: 5px;
}

.user-list-item .remove-btn {
  display: inline;
  border: none;
  background-color: #f44336;
  color: white;
}
.user-list-item .hurry-btn {
  display: inline;
  border: none;
  background-color: #ffa726;
  color: white;
}

.tag,
.tag.btn {
  padding: 2px 5px;
  border-radius: 3px;
  margin: 5px 5px 5px 0;
  font-size: 90%;
}

.tag.btn {
  cursor: pointer;
  transition: background 0.3s ease;
}

.tag.btn:hover {
  background-color: #cfcfcf;
}

.leader-tag {
  background-color: #03a9f4;
  color: white;
}
.ready-tag {
  background: #8bc34a;
  color: white;
}
span.say {
  margin-left: 10px;
  display: inline-block;
}
</style>