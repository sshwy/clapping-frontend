<template>
  <v-button @click="debouncedOnClick"><slot></slot></v-button>
</template>

<script>
import { debounce } from "../utils";
import VButton from "./VButton";

export default {
  components: {
    VButton,
  },
  props: {
    onClick: Function,
  },
  data() {
    return {
      clickable: true,
    };
  },
  computed: {
    debouncedOnClick() {
      return debounce(this.onClick, 1000);
    },
  },
};
</script>

<style>
</style>