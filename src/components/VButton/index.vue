<template>
  <wrapper :inheritedprops="this.$props">
    <slot></slot>
  </wrapper>
</template>

<script>
import wrapper from "./wrapper";

/**
 * 自定义按扭
 * @displayName VButton
 */
export default {
  components: {
    wrapper,
  },
  props: {
    /**
     * 指定按扭的 HTML 原生标签，默认为 span
     * @values div, span, li
     */
    tag: {
      type: String,
      default: "span",
      validator: (value) => {
        return ["div", "span", "li"].includes(value);
      },
    },
    /**
     * 指定按扭是否应用相关样式。默认为 true
     */
    styled: {
      type: Boolean,
      default: true,
    },
    /**
     * 指定按扭是否有边框（应用对应的样式），默认为 true
     * 若 styled 属性为 false 则此属性无作用
     */
    bordered: {
      type: Boolean,
      default: true,
    },
    /**
     * 指定按扭是否会因鼠标悬停而改变样式，默认为 true
     * 若 styled 属性为 false 则此属性无作用
     */
    hoverchange: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="sass">
.vbtn
  user-select: none
  transition: color 0.3s ease, background 0.3s ease
  cursor: pointer

  &.vbtn-ghost.vbtn-withhover:hover
    color: #bdbdbd

  &.vbtn-bordered
    margin: 0 3px
    background-color: white
    border: 1px solid black
    border-radius: 3px
    padding: 4px 6px 2px
    font-size: 1em

  &.vbtn-bordered.vbtn-withhover:hover
    background-color: #cfcfcf
</style>