<template>
  <div :class="['grid-row', height !== undefined && `grid-row-h-${height}`, 'clear-fix']"> 
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    height: Number,
  },
};
</script>

<style lang="sass">
.grid-layout
  @for $i from 1 through 24
    .grid-row.grid-row-h-#{$i}
      height: 100% * $i / 24
</style>