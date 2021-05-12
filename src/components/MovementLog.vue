<template>
  <p v-if="type === 'msg'" class="movement-log text-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    {{ text }}
  </p>
  <p v-else-if="type === 'win'" class="movement-log win-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    <span class="username win">{{ win }}</span> 吃鸡（狂喜）
  </p>
  <p v-else-if="type === 'die'" class="movement-log die-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
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
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    <span class="username from">{{ emitter }}</span> 对
    <span class="username to">{{ reciver }}</span> 发动了
    <span class="move"
      ><span class="move-title">{{ move?.title }}</span>
      <span class="movement-image-list"
        ><img
          v-for="(src, idx) in move.image_list"
          :key="idx"
          :src="src"
          :alt="src"
      /></span>
    </span>
  </p>
  <p v-else-if="move" class="movement-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    <span class="username from">{{ emitter }}</span> 发动了
    <span class="move"
      ><span class="move-title">{{ move?.title }}</span>
      <span class="movement-image-list"
        ><img
          v-for="(src, idx) in move.image_list"
          :key="idx"
          :src="src"
          :alt="src"
      /></span>
    </span>
  </p>
</template>

<script>
import store from "../dataStore";

const checkSelf = (origin, self) => (origin === self ? "你" : origin);

export default {
  name: "MovementLog",
  props: {
    description: Object,
    selfname: String,
    gameid: Number,
  },
  data() {
    return {
      hasTarget: Boolean(this.description.to),
      turn: this.description.turn,
      type: this.description.type,
      text: this.description.text,
    };
  },
  computed: {
    emitter() {
      return checkSelf(this.description.from, this.selfname);
    },
    reciver() {
      return checkSelf(this.description.to, this.selfname);
    },
    die() {
      return checkSelf(this.description.die, this.selfname);
    },
    killby() {
      return this.description.by.map((e) => checkSelf(e, this.selfname));
    },
    win() {
      return checkSelf(this.description.win, this.selfname);
    },
    move() {
      return store.get("games")[this.gameid].movement_group.movement_list[
        this.description.move
      ];
    },
  },
  created() {
    console.log(this.move, this.gameid, this.description);
  },
  updated() {
    console.log(this.gameid);
  },
};
</script>

<style>
.movement-log {
  margin: 0.5em;
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