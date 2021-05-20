<template>
  <wrapper :inheritedprops="this.$props">
    <slot></slot>
  </wrapper>
</template>

<script>
import wrapper from "./wrapper";

export default {
  components: {
    wrapper,
  },
  props: {
    tag: {
      type: String,
      default: "span",
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    hoverchange: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
.vbtn {
  user-select: none;
  transition: color 0.3s ease, background 0.3s ease;
  cursor: pointer;
}

.vbtn.vbtn-ghost.vbtn-withhover:hover {
  color: #bdbdbd;
}

.vbtn.vbtn-bordered {
  margin: 0 3px;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  padding: 4px 6px 2px;
  font-size: 1em;
}

.vbtn.vbtn-bordered.vbtn-withhover:hover {
  background-color: #cfcfcf;
}
</style>