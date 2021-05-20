<template>
  <vbtn v-on:click="debouncedOnClick"><slot></slot></vbtn>
</template>

<script>
import { debounce } from "../utils";
import Button from "./Button";

export default {
  components: {
    vbtn: Button,
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