<template>
  <div :class="['message', type]">
    <span v-if="icon" :class="[icon, 'message-icon']"></span>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    text: String,
    type: String,
  },
  data() {
    const class_name = {
      error: "iconfont icon-delete-filling",
      success: "iconfont icon-success-filling",
      info: "iconfont icon-prompt-filling",
    };
    return {
      icon: class_name[this.type],
    };
  },
};
</script>

<style>
#message-container {
  position: absolute;
  bottom: 0;
  left: 0;
  min-width: 200px;
}
.message {
  position: relative;
  display: block;
  border: 1px solid black;
  border-radius: 3px;
  padding: 6px 8px;
  margin: 10px;
  background-color: white;
  width: max-content;
  transition: all 0.5s ease;
  user-select: none;
}
.message-icon {
  font-size: 1.5em;
  vertical-align: -0.1em;
  font-weight: normal;
}

.message.error {
  background: #f44336;
  color: white;
  font-weight: 700;
  border: 1px solid #cecece;
  box-shadow: 0px 1px 3px #cecece;
}
.message.info {
  background: #03a9f4;
  color: white;
  font-weight: 700;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 1px 3px #dfdfdf;
}
.message.success {
  background: #94cf50;
  color: white;
  font-weight: 700;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 1px 3px #dfdfdf;
}

.message-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.message-list-leave-to {
  opacity: 0;
}

.message-list-leave-active {
  position: absolute;
}
</style>