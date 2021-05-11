<template>
  <div :class="['grid-col', `grid-col-w-${width}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: Number,
  }
}
</script>

<style lang="sass">
.grid-layout
  .grid-col
    float: left
    height: stretch
  @for $i from 1 through 24
    .grid-col.grid-col-w-#{$i}
      width: 100% * $i / 24

</style>