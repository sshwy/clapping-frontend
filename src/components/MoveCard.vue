<template>
  <div class="card movement-card card-with-hover">
    <div class="room-card-title card-title">
      {{ move.title }}
    </div>
    <div class="room-card-content card-content">
      需要 {{ move.move_points }} 行动点
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
.movement-card {
  border: 1px solid black;
  padding: 2px 5px;
  border-radius: 3px;
  margin: 2px;
  float: left;
}

.movement-card:hover {
  cursor: pointer;
}
</style>