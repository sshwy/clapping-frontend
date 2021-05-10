<template>
  <div
    :class="['card movement-card card-with-hover', 'movement-' + move.id]"
    v-on:click="onClick"
  >
    <div class="room-card-title card-title">
      {{ move.title }}
    </div>
    <div class="room-card-content card-content">
      需要 {{ move.point }} 行动点
    </div>
    <span
      :class="[
        'iconfont icon-help movement-card-help',
        displayHelp && 'movement-card-help-displaying',
      ]"
      v-on:click.stop="() => onHelp(move.id)"
    ></span>
  </div>
  <div v-if="displayHelp" class="clear-sep"></div>
  <div v-if="displayHelp" class="help-container card">
    <div class="card-content">
      <p>
        <span>伤害值 {{ move.attack }}</span>
        &nbsp;&nbsp;
        <span style="margin-right: 5px">防御值 {{ move.defend }}</span>
        <span v-for="tag in move.tags" :key="tag" class="tag help-tag">{{
          tag
        }}</span>
      </p>
      <p>
        {{ move.description }}
      </p>
    </div>
  </div>
  <div v-if="displayHelp" class="clear-sep"></div>
</template>

<script>
export default {
  name: "MoveCard",
  props: {
    move: Object,
    helpkey: String,
    onHelp: Function,
    onClick: Function,
  },
  computed: {
    displayHelp() {
      return this.helpkey === this.move.id;
    },
  },
};
</script>

<style>
.tag.help-tag {
  background-color: #9e9e9e;
  color: white;
}
.clear-sep {
  clear: both;
}
.movement-card:hover {
  cursor: pointer;
}
.movement-card {
  width: 130px;
}
span.iconfont.icon-help-filling {
  position: absolute;
  top: 7px;
  right: 7px;
}
.movement-card .movement-card-help {
  position: absolute;
  top: 7px;
  right: 7px;
  transition: all 0.3s ease;
  font-size: 1.2em;
}
.movement-card .movement-card-help:hover,
.movement-card-help-displaying {
  font-weight: bold;
  color: white;
}
.help-container {
  float: left;
  max-width: 400px;
}
.help-container.card-content {
  margin: 0.8em;
  max-width: 400px;
  line-height: 1.5em;
}
</style>