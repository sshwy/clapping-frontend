<template>
  <div class="document-page">
    <div v-html="content" class="typography" />
  </div>
</template>

<script>
import ruletext from "../docs/gamerule.zh.md";
export default {
  data() {
    return {
      content: ruletext,
    };
  },
};
</script>

<style lang="sass">
@mixin scrollbars($size, $foreground-color, $background-color: mix($foreground-color, white,  50%))
  // For Google Chrome
  &::-webkit-scrollbar
    width: $size
    height: $size

  &::-webkit-scrollbar-thumb
    border-radius: $size
    background: $foreground-color

  &::-webkit-scrollbar-track
    background: $background-color

  // For Internet Explorer
  &
    scrollbar-face-color: $foreground-color
    scrollbar-track-color: $background-color

.document-page
  max-height: calc(100vh - 80px)
  overflow-y: auto
  @include scrollbars(0px, transparent, transparent)
  &:hover
    @include scrollbars(5px, #929292, transparent)

.typography
  h1, h2, h3, h4, h5, h6
    margin: 1em 0
  ul
    padding-inline-start: 20px
    li
      list-style-type: disc
      padding: 0.1em 0
</style>