<template>
  <div :class="['grid-layout clear-fix', ...classList]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    class: undefined,
  },
  data () {
    return {
      classList: this.class || [],
    }
  }
}
</script>

<style>
.grid-layout {
  height: inherit;
}
</style>