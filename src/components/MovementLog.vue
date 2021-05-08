<template>
  <p v-if="hasTarget" class="movement-log">
    <span v-if="turn">「第 {{ turn }} 回合」</span>
    <span class="from">{{ from }}</span> 对
    <span class="to">{{ to }}</span> 发动了
    <span class="move">{{ move_title }}</span>
  </p>
  <p v-else class="movement-log">
    <span v-if="turn">「第 {{ turn }} 回合」</span>
    <span class="from">{{ from }}</span> 发动了
    <span class="move">{{ move_title }}</span>
  </p>
</template>

<script>
import { MoveTitle } from "../utils";

export default {
  name: "MovementLog",
  props: {
    description: Object,
  },
  created () {
    console.log('created', this.description);
  },
  updated () {
    console.log('updated', this.description);
  },
  data() {
    return {
      hasTarget: Boolean(this.description.to),
      move_title: MoveTitle.zh_CN[this.description.move],
      from: this.description.from,
      to: this.description.to,
      turn: this.description.turn,
    };
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
</style>