<template>
  <p v-if="type === 'msg'" class="movement-log text-log">
    <turn-span :turn="turn" />
    <span v-if="emitter" class="username text-author">{{ emitter }}</span>
    {{ text }}
  </p>
  <p v-else-if="type === 'win'" class="movement-log win-log">
    <turn-span :turn="turn" />
    <span class="username win">{{ win }}</span> 吃鸡（狂喜）
  </p>
  <p v-else-if="type === 'die'" class="movement-log die-log">
    <turn-span :turn="turn" />
    <span class="username die">{{ die }}</span> 被
    <span class="kiler-list">
      <span v-for="u in killby" :key="u" class="killer">{{ u }}</span>
    </span>
    雷谱了（大悲）
  </p>
  <p
    v-else-if="move && type === 'move' && hasTarget"
    class="movement-log move-log"
  >
    <turn-span :turn="turn" />
    <span class="username from">{{ emitter }}</span> 对
    <span class="username to">{{ reciver }}</span> 发动了
    <span class="move"
      ><span class="move-title">{{ move?.title }}</span>
      <span class="movement-image-list"
        ><img
          v-for="(src, idx) in move.image_list"
          :key="idx"
          :src="getImageURL(src)"
          :alt="src"
          onerror="this.src='/favicon.png';"
      /></span>
    </span>
  </p>
  <p v-else-if="move" class="movement-log">
    <turn-span :turn="turn" />
    <span class="username from">{{ emitter }}</span> 发动了
    <span class="move"
      ><span class="move-title">{{ move?.title }}</span>
      <span class="movement-image-list"
        ><img
          v-for="(src, idx) in move.image_list"
          :key="idx"
          :src="getImageURL(src)"
          :alt="src"
          onerror="this.src='/favicon.png';"
      /></span>
    </span>
  </p>
</template>

<script>
import TurnSpan from "./TurnSpan";

export default {
  name: "MovementLog",
  inject: ["getPlayerList"],
  components: {
    TurnSpan,
  },
  props: {
    description: Object,
  },
  data() {
    return {
      hasTarget: Boolean(this.description.to),
      turn: this.description.turn,
      type: this.description.type,
      text: this.description.text,
    };
  },
  methods: {
    userTitle(id) {
      return id === this.$store.state.userID
        ? "你"
        : this.getPlayerList().find((e) => e.id === id)?.name || id;
    },
    getImageURL(path) {
      return process.env.VUE_APP_RSC_URL + path;
    },
  },
  computed: {
    emitter() {
      return this.userTitle(this.description.from);
    },
    reciver() {
      return this.userTitle(this.description.to);
    },
    die() {
      return this.userTitle(this.description.die);
    },
    killby() {
      return this.description.by.map(this.userTitle);
    },
    win() {
      return this.userTitle(this.description.win);
    },
    move() {
      return this.$store.getters.all_movement[this.description.move];
    },
  },
};
</script>

<style>
.movement-log {
  margin: 0.4em;
  font-size: 90%;
}
.movement-log .username {
  font-weight: bold;
}
.movement-log .killer {
  font-weight: bold;
  color: #f44336;
  margin-right: 5px;
}
.killer + .killer::before {
  display: inline;
  content: ", ";
  color: black;
}
.movement-log.die-log .turn {
  color: #f44336;
  font-weight: bold;
}
.movement-log.win-log .turn {
  color: #8bc34a;
  font-weight: bold;
}
</style>