<template>
  <div v-if="displayHelp" class="clear-sep"></div>
  <div :class="['card movement-card card-with-hover', 'movement-' + move.id]">
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
// import { MoveData } from "../utils";

export default {
  name: "MoveCard",
  props: {
    move: Object,
    helpkey: String,
    onHelp: Function,
  },
  data() {
    return {
      displayHelp: this.helpkey === this.move.id,
    };
  },
  updated() {
    this.displayHelp = this.helpkey === this.move.id;
  },
  // created() {
  // this generates movement card css style
  // let tot = "";
  // for (const key in MoveData) {
  //   const move = MoveData[key];
  //   tot += `.card.movement-card.movement-${move.id} {\n background-color: ${move.background_color};\n}\n`;
  //   tot += `.card.movement-card.movement-${move.id}:hover {\n background-color: ${move.background_color_hover};\n}\n`;
  // }
  // console.log(tot);
  // },
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

.card.movement-card.movement-0 {
  background-color: #8bc34a;
}
.card.movement-card.movement-0:hover {
  background-color: #689f38;
}
.card.movement-card.movement-1 {
  background-color: #8bc34a;
}
.card.movement-card.movement-1:hover {
  background-color: #689f38;
}
.card.movement-card.movement-2 {
  background-color: #00bcd4;
}
.card.movement-card.movement-2:hover {
  background-color: #0097a7;
}
.card.movement-card.movement-3 {
  background-color: #00bcd4;
}
.card.movement-card.movement-3:hover {
  background-color: #0097a7;
}
.card.movement-card.movement-4 {
  background-color: #ffc107;
}
.card.movement-card.movement-4:hover {
  background-color: #ff6f00;
}
.card.movement-card.movement-5 {
  background-color: #ff5722;
}
.card.movement-card.movement-5:hover {
  background-color: #bf360c;
}
.card.movement-card.movement-6 {
  background-color: #ab47bc;
}
.card.movement-card.movement-6:hover {
  background-color: #6a1b9a;
}
.card.movement-card.movement-7 {
  background-color: #00bcd4;
}
.card.movement-card.movement-7:hover {
  background-color: #0097a7;
}
.card.movement-card.movement-8 {
  background-color: #ffc107;
}
.card.movement-card.movement-8:hover {
  background-color: #ff6f00;
}
.card.movement-card.movement-9 {
  background-color: #ff5722;
}
.card.movement-card.movement-9:hover {
  background-color: #bf360c;
}
.card.movement-card.movement-10 {
  background-color: #ab47bc;
}
.card.movement-card.movement-10:hover {
  background-color: #6a1b9a;
}
.card.movement-card.movement-11 {
  background-color: #00bcd4;
}
.card.movement-card.movement-11:hover {
  background-color: #0097a7;
}
.card.movement-card.movement-12 {
  background-color: #ffc107;
}
.card.movement-card.movement-12:hover {
  background-color: #ff6f00;
}
.card.movement-card.movement-13 {
  background-color: #ff5722;
}
.card.movement-card.movement-13:hover {
  background-color: #bf360c;
}
.card.movement-card.movement-14 {
  background-color: #00bcd4;
}
.card.movement-card.movement-14:hover {
  background-color: #0097a7;
}
</style>