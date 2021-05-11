<template>
  <span class="btn" :onClick="debouncedOnClick"><slot></slot></span>
</template>

<script>
import { debounce } from '../utils';
export default {
  props: {
    onClick: Function,
  },
  data() {
    return {
      clickable: true,
    };
  },
  computed: {
    debouncedOnClick () {
      return debounce(this.onClick, 1000);
    }
  }
};
</script>

<style>
</style>