<template>
  <span
    :class="['user-card', player_stat_info[user.stat]?.class]"
    :title="player_stat_info[user.stat]?.title"
  >
    {{ user.name }}
  </span>
</template>

<script>
import { player_stat_info } from "../utils";
export default {
  name: "UserCard",
  props: {
    user: Object,
  },
  data() {
    return {
      player_stat_info: player_stat_info,
    };
  },
  created() {
    console.log(this.user);
  },
};
</script>

<style>
.user-card {
  margin: 5px;
  font-weight: bold;
  font-family: system-ui;
  padding: 3px 5px;
  border-radius: 3px;
}

.player-ready {
  background: #8bc34a;
}

.player-listening {
  background: #03a9f4;
}

.player-acting {
  background: #03a9f4;
}

.player-submited {
  background: #ffc107;
}
</style>