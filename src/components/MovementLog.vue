<template>
  <p v-if="type === 'msg'" class="movement-log text-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    {{ text }}
  </p>
  <p v-else-if="type === 'win'" class="movement-log win-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    <span class="win">{{ die }}</span> 吃鸡（狂喜）
  </p>
  <p v-else-if="type === 'die'" class="movement-log die-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    <span class="die">{{ die }}</span> 没了（大悲）
  </p>
  <p v-else-if="type === 'move' && hasTarget" class="movement-log move-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    <span class="from">{{ from }}</span> 对
    <span class="to">{{ to }}</span> 发动了
    <span class="move">{{ move_title }}</span>
  </p>
  <p v-else class="movement-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    <span class="from">{{ from }}</span> 发动了
    <span class="move">{{ move_title }}</span>
  </p>
</template>

<script>
import store from '../dataStore';

export default {
  name: "MovementLog",
  props: {
    description: Object,
    selfname: String,
  },
  data() {
    const checkSelf = (origin, self) => (origin === self ? "你" : origin);
    return {
      hasTarget: Boolean(this.description.to),
      move_title: '',
      from: checkSelf(this.description.from, this.selfname),
      to: this.description.to,
      turn: this.description.turn,
      die: checkSelf(this.description.die, this.selfname),
      win: checkSelf(this.description.win, this.selfname),
      type: this.description.type,
      text: this.description.text,
    };
  },
  created () {
    this.move_title = store.get('games')[0].movement_group.movement_list[this.description.move]?.title;
  },
  updated () {
    this.move_title = store.get('games')[0].movement_group.movement_list[this.description.move]?.title;
  },
};
</script>

<style>
.movement-log .from {
  font-weight: bold;
}
.movement-log .to {
  font-weight: bold;
}
.movement-log .move {
  font-weight: bold;
}
.movement-log .die {
  font-weight: bold;
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