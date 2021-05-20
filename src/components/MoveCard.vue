<template>
  <div
    :class="[
      'card movement-card card-with-hover',
      'movement-' + move.id,
      disabled && 'movement-disabled',
    ]"
    v-on:click="onAvailableClick"
  >
    <div class="room-card-title card-title">
      <span class="movement-title">{{ move.title }}</span>
      <span class="movement-image-list"
        ><img
          v-for="(src, idx) in move.image_list"
          :key="idx"
          :src="getImageURL(src)"
          :alt="src"
          onerror="this.src='break.svg';"
      /></span>
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
  inject: ["addMessage"],
  props: {
    move: Object,
    helpkey: Number,
    onHelp: Function,
    onClick: Function,
    disabled: Boolean,
  },
  computed: {
    displayHelp() {
      return this.helpkey === this.move.id;
    },
  },
  methods: {
    onAvailableClick() {
      if (this.disabled) {
        this.addMessage("info", "你还没有足够的行动点哦");
      } else {
        this.onClick();
      }
    },
    getImageURL(path) {
      return process.env.VUE_APP_RSC_URL + path;
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
  min-width: 170px;
  width: calc(20% - 10px);
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
.movement-image-list {
  display: inline-block;
  margin-left: 5px;
}
.movement-image-list img {
  height: 1.1em;
  vertical-align: -0.15em;
  background-color: white;
  border-radius: 50%; /*3px;*/
}
.movement-image-list img + img {
  margin-left: 3px;
}
div.card.movement-card.movement-disabled,
div.card.movement-card.movement-disabled:hover {
  background-color: gray;
}
</style>