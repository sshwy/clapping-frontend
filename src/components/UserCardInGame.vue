<template>
  <div class="user-card-in-game">
    <span
      :class="['userstat', 'tag', selectable ? 'selectable' : stat_data?.class]"
      v-on:click="() => selectable && onClick()"
      >{{ selectable ? "选择" : stat_data?.title }}</span
    >
    <span class="username">{{ user.name }}</span>
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
  name: "UserCardInGame",
  props: {
    user: Object,
    selectable: Boolean,
    onClick: Function,
  },
  data() {
    return {
      stat_data: player_stat_info[this.user.stat],
      says: "",
    };
  },
  created() {
    socket.on("speak", (id, text) => {
      if (id === this.user.id) {
        this.says = text;
        this.$nextTick(function () {
          setTimeout(() => {
            this.says = "";
          }, 5000);
        });
      }
    });
  },
  updated() {
    this.stat_data = player_stat_info[this.user.stat];
  },
};
</script>

<style>
.user-card-in-game {
  margin: 15px 10px;
  font-size: 1.1em;
}
.user-card-in-game .username {
  font-weight: bold;
  margin-right: 5px;
  user-select: none;
}

.userstat.tag {
  user-select: none;
}
.userstat.player-acting {
  background-color: #03a9f4;
  color: white;
}

.userstat.player-submited {
  background-color: #ffc107;
  color: white;
}

.userstat.selectable {
  background-color: #8bc34a;
  color: white;
}

.userstat.player-watching {
  background-color: #f44336;
  color: white;
}

.userstat.selectable:hover {
  cursor: pointer;
}
</style>