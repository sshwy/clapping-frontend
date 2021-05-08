<template>
  <p v-if="hasTarget" class="movement-log move-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    <span class="from">{{ from }}</span> 对
    <span class="to">{{ to }}</span> 发动了
    <span class="move">{{ move_title }}</span>
  </p>
  <p v-else-if="die" class="movement-log die-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    <span class="die">{{ die }}</span> 没了（大悲）
  </p>
  <p v-else class="movement-log">
    <span v-if="turn" class="turn">「第 {{ turn }} 回合」</span>
    <span class="from">{{ from }}</span> 发动了
    <span class="move">{{ move_title }}</span>
  </p>
</template>

<script>
import { MoveData } from "../utils";

export default {
  name: "MovementLog",
  props: {
    description: Object,
  },
  created() {
    console.log("created", this.description);
  },
  updated() {
    console.log("updated", this.description);
  },
  data() {
    return {
      hasTarget: Boolean(this.description.to),
      move_title: MoveData[this.description.move]?.title,
      from: this.description.from,
      to: this.description.to,
      turn: this.description.turn,
      die: this.description.die,
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
.movement-log .die {
  font-weight: bold;
}
.movement-log.die-log .turn {
  color: red;
  font-weight: bold;
}
</style>