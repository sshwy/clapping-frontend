<template>
  <div v-if="type !== 'empty'" class="talk">
    <form onsubmit="return false">
      <span class="iconfont icon-comment talk-label"></span>
      <input
        type="text"
        v-model="text"
        ref="talk_input"
        placeholder="来 bb 几句？"
        title="按下回车以发送消息"
        v-on:focus="onFocus"
        v-on:blur="onBlur"
        :disabled="disable"
        :style="{
          lineHeight: '1.5em',
          width: inputWidth * 1.02 + 3.5 + 'em',
          fontFamily:
            'monospace, Microsoft YaHei, WenQuanYi Micro Hei, Microsoft YaHei UI, sans-serif',
        }"
      />
      <input type="submit" value="" style="display: none" v-on:click="onTalk" />
      <span :class="['word-counter', text.length > 50 && 'exceed']">
        {{ text.length }} / 50
      </span>
      <span
        class="iconfont icon-add-circle addexp-btn"
        title="添加到快捷词组"
        v-on:click="onAddExpression"
      ></span>
    </form>
  </div>
  <transition name="fade-scale">
    <div v-if="display_exp" class="expression-list-container">
      <ul
        class="exp-list"
        :style="{
          width: inputWidth * 1.02 + 5.3 + 'em',
          minWidth: 'max-content',
        }"
      >
        <li
          v-for="s in expressionList"
          :key="s"
          class="exp-item"
          v-on:click="
            () => {
              if (disable) return;
              text = s;
              onTalk();
            }
          "
        >
          <span class="text">{{ s }}</span>
          <span
            class="iconfont icon-close delete-exp-btn"
            title="删除快捷词组"
            v-on:click.stop="() => onRemoveExp(s)"
          ></span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import socket from "../socket";

export default {
  name: "Talk",
  props: {
    addMessage: Function,
  },
  data() {
    const expressionList = (localStorage.getItem("quick-exp") || "")
      .split("<spliter>")
      .filter((e) => e);
    return {
      text: "",
      type: "empty",
      disable: false,
      expressionList: expressionList,
      minInputWidth: expressionList.reduce((a, b) => Math.max(a, b.length), 20),
      display_exp: false,
    };
  },
  created() {
    socket.on("room list", () => {
      this.type = "empty";
    });
    socket.on("room info", () => {
      this.type = "display";
    });
    socket.on("room info ingame", () => {
      this.type = "display";
    });
  },
  methods: {
    focusInput() {
      this.$refs.talk_input.focus();
    },
    onFocus() {
      clearTimeout(this.blur_timeout);
      this.display_exp = true;
      console.log("focus");
    },
    onBlur() {
      this.$nextTick(function () {
        this.blur_timeout = setTimeout(() => {
          console.log("blur");
          this.display_exp = false;
        }, 300);
      });
    },
    onTalk() {
      if (this.text.length > 50) {
        this.addMessage("error", "别看今天拉清单，小心将来闹得欢");
      } else {
        socket.emit("talk", this.text);
        this.text = "";
        this.disable = true;
        this.$nextTick(function () {
          setTimeout(() => {
            this.disable = false;
          }, 2000);
        });
      }
    },
    onAddExpression() {
      try {
        const parsedText = this.text.trim();
        if (!parsedText) {
          throw new Error("这个快捷词组是空的");
        }
        if (this.expressionList.find((e) => e === parsedText)) {
          throw new Error("这个快捷词组已经有啦");
        }
        this.expressionList.push(parsedText);
        localStorage.setItem(
          "quick-exp",
          this.expressionList.join("<spliter>")
        );
      } catch (e) {
        this.addMessage("info", e.message);
      }
      this.focusInput();
      this.minInputWidth = this.expressionList.reduce(
        (a, b) => Math.max(a, b.length),
        20
      );
    },
    onRemoveExp(s) {
      this.expressionList = this.expressionList.filter((e) => e !== s);
      localStorage.setItem("quick-exp", this.expressionList.join("<spliter>"));
      this.addMessage("success", "删除成功");
      this.focusInput();
      this.minInputWidth = this.expressionList.reduce(
        (a, b) => Math.max(a, b.length),
        20
      );
    },
  },
  computed: {
    inputWidth() {
      return Math.max(this.minInputWidth, this.text.length);
    },
  },
};
</script>

<style>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-50%) scaleY(0);
}

.talk {
  display: inline-block;
  position: relative;
}
.talk-label {
  font-size: 1.7em;
  vertical-align: -0.3em;
}
input::placeholder {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    "Microsoft YaHei", "WenQuanYi Micro Hei", "Microsoft YaHei UI", sans-serif;
  font-size: 90%;
}
input[disabled] {
  background-color: rgb(206, 206, 206);
}
.word-counter {
  user-select: none;
  position: absolute;
  top: 8px;
  right: 5px;
}
.word-counter.exceed {
  color: red;
}
.addexp-btn {
  position: absolute;
  top: 6px;
  right: -30px;
  font-size: 1.7em;
  transition: all 0.3s ease;
}
.addexp-btn:hover {
  cursor: pointer;
  color: #bdbdbd;
}
.exp-item {
  position: relative;
  display: block;
  list-style-type: none;
  padding: 7px;
  transition: all 0.2s ease;
}
.exp-item:hover {
  cursor: pointer;
  background-color: #e0e0e0;
  border-radius: 3px;
}
.exp-list {
  padding-inline-start: 0;
  margin-left: 1.7em;
  user-select: none;
}
.delete-exp-btn {
  position: absolute;
  top: 9px;
  right: 9px;
  transition: all 0.3s ease;
  font-weight: bold;
}
.delete-exp-btn:hover {
  cursor: pointer;
  color: #bdbdbd;
}
</style>