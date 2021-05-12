<template>
  <span v-if="turn" :class="['turn', `turn-period-${turn % 3}`]"
    >「第 {{ turn }} 回合」</span
  >
</template>

<script>
export default {
  props: {
    turn: Number,
  },
};
</script>

<style>
.turn.turn-period-0 {
  color: #009688;
}
.turn.turn-period-1 {
  color: #9c27b0;
}
.turn.turn-period-2 {
  color: #ff9800;
}
</style>