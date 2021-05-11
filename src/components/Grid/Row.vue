<template>
  <div
    :class="[
      'grid-row',
      isGridHeight && `grid-row-h-${height}`,
      'clear-fix',
    ]"
    :style="{
      height: getHeight,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    height: Number,
  },
  computed: {
    isGridHeight() {
      return this.height >= 1;
    },
    getHeight () {
      if(this.height >= 1) return undefined;
      return `${this.height * 100}%`;
    },
  },
};
</script>

<style lang="sass">
.grid-layout
  @for $i from 1 through 24
    .grid-row.grid-row-h-#{$i}
      height: 100% * $i / 24
</style>