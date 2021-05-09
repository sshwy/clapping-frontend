<template>
  <div
    class="card movement-card card-with-hover"
    :style="{
      backgroundColor: move.background_color,
    }"
  >
    <div class="room-card-title card-title">
      {{ move.title }}
    </div>
    <div class="room-card-content card-content">
      需要 {{ move.point }} 行动点
    </div>
  </div>
</template>

<script>
export default {
  name: "MoveCard",
  props: {
    move: Object,
  },
};
</script>

<style>
.movement-card:hover {
  cursor: pointer;
}
.movement-card {
  width: 130px;
}
</style>