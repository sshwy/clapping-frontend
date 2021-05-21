<template>
  <div :class="['message', type]">
    <span v-if="icon" :class="[icon, 'message-icon']"></span>
    {{ text }}
  </div>
</template>

<script>
const class_name = {
  error: "iconfont icon-delete-filling",
  success: "iconfont icon-success-filling",
  info: "iconfont icon-prompt-filling",
};
export default {
  props: {
    /**
     * 消息的内容
     * @type {string}
     */
    text: String,
    /**
     * 消息的类型
     * @type {'info' | 'success' | 'error'}
     */
    type: {
      type: String,
      default: "info",
      validator: (value) => {
        return Object.keys(class_name).includes(value);
      },
    },
  },
  data() {
    return {
      icon: class_name[this.type],
    };
  },
};
</script>

<style lang="sass">
#message-container
  position: absolute
  bottom: 0
  left: 0
  min-width: 200px

.message-list-enter-from
  opacity: 0
  transform: translateY(30px)

.message-list-leave-to
  opacity: 0

.message-list-leave-active
  position: absolute

.message
  position: relative
  display: block
  border: 1px solid black
  border-radius: 3px
  padding: 6px 8px
  margin: 10px
  background-color: white
  width: max-content
  transition: all 0.5s ease
  user-select: none

  &.error, &.info, &.success
    color: white
    font-weight: 700

  &.error
    background: #f44336
    border: 1px solid #cecece
    box-shadow: 0px 1px 3px #cecece

  &.info
    background: #03a9f4
    border: 1px solid #dfdfdf
    box-shadow: 0px 1px 3px #dfdfdf

  &.success
    background: #94cf50
    border: 1px solid #dfdfdf
    box-shadow: 0px 1px 3px #dfdfdf

  .message-icon
    font-size: 1.5em
    vertical-align: -0.1em
    font-weight: normal
</style>