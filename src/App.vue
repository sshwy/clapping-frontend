<template>
  <transition name="fade">
    <div
      v-if="!sessioned"
      class="full-page"
      :style="{
        display: 'table',
        position: 'absolute',
      }"
    >
      <div class="user-register">
        <form onsubmit="return false">
          <input v-model="username" type="text" placeholder="取个名字吧 ^_^" />
          <input
            v-on:click="onUsernameSelection"
            class="btn username-input"
            type="submit"
            value="提交"
          />
        </form>
      </div>
    </div>
  </transition>
  <transition name="delay-fade">
    <div v-show="sessioned" class="main-container">
      <div class="navbar">
        <p>
          您以 「<span class="username">{{ username }}</span
          >」 的身份登录
          <input v-on:click="onLogout" type="button" value="注销" class="btn" />
        </p>
      </div>
      <hr />
      <Users />
      <hr />
      <Main />
      <hr />
      <Scene />
    </div>
  </transition>
  <teleport to="#app">
    <div id="message-container">
      <transition-group name="message-list" tag="div">
        <message
          v-for="msg in messageList"
          :key="msg.id"
          :text="msg.text"
          :type="msg.type"
        />
      </transition-group>
    </div>
  </teleport>
</template>

<script>
import socket from "./socket";
import Users from "./components/Users.vue";
import Main from "./components/Main.vue";
import Scene from "./components/Scene.vue";
import Message from "./components/Message.vue";

export default {
  name: "App",
  components: {
    Users,
    Main,
    Scene,
    Message,
  },
  data() {
    return {
      username: "",
      sessioned: true,
      messageList: [],
    };
  },
  created() {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      socket.auth = { sessionID };
      console.log("reconnect");
      socket.connect();
    } else {
      this.sessioned = false;
    }

    socket.on("session", ({ sessionID, userID, username }) => {
      socket.auth = { sessionID }; // attach the session ID to the next reconnection attempts
      localStorage.setItem("sessionID", sessionID); // store it in the localStorage
      socket.userID = userID; // save the ID of the user
      this.sessioned = true;
      this.username = username;
    });
    socket.on("connect_error", (err) => {
      console.error(`[connect] ` + err.message);
      if (err.message === "invalid username") {
        // clear cache and reload
        this.onClearCache();
        location.reload();
      } else if (err.message === "xhr poll error") {
        location.reload();
      }
    });
    socket.on("server_error", (err) => {
      console.error(`[server] ` + err.message);
    });
    socket.on("finish logout", () => {
      this.onClearCache();
      location.reload();
    });
    socket.on('display message', (type, text, delay = 3000) => {
      this.addMessage(type, text, delay);
    });
    socket.on("room list update", () => {
      this.addMessage('success', '成功刷新房间列表');
    });
  },
  methods: {
    onClearCache() {
      console.log("clear cache.");
      localStorage.removeItem("sessionID");
    },
    onUsernameSelection() {
      socket.auth = { username: this.username };
      socket.connect();
    },
    onLogout() {
      socket.emit("logout");
    },
    addMessage (type, text, delay = 3000) {
      const id = new Date().getTime();
      this.messageList.unshift({
        id: id,
        text: text,
        type: type,
        delay: delay
      });
      this.$nextTick(function () {
        setTimeout(() => {
          this.messageList = this.messageList.filter(msg => msg.id !== id);
        }, delay);
      });
    },
  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.delay-fade-enter-active {
  animation: delay-fade-appear 2s;
}

@keyframes delay-fade-appear {
  from {
    opacity: 0;
  }
  25% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.navbar .username {
  font-weight: bold;
}

.user-select-card {
  float: left;
  border: 1px solid black;
  padding: 2px 5px;
  border-radius: 3px;
  margin: 2px;
}

.user-select-card:hover {
  cursor: pointer;
}

.card {
  border: 1px solid black;
  position: relative;
  border-radius: 0.3em;
  float: left;
  margin: 5px;
  user-select: none;
}

.card.card-with-hover {
  transition: all 0.3s ease;
}
.card.card-with-hover:hover {
  cursor: pointer;
  background-color: #cfcfcf;
}
.card-title {
  padding: 0.8em;
  font-weight: bold;
}
.card-content {
  padding: 0 0.8em 0.8em;
}

.main::after,
.users::after {
  content: "";
  display: block;
  clear: both;
}

.btn {
  margin: 0 3px;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  padding: 2px 6px;
  font-size: 1em;
  transition: all 0.3s ease;
}

.btn:hover {
  cursor: pointer;
  background-color: #cfcfcf;
}

input[type="text"] {
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  margin: 0 3px;
  font-size: 1em;
  padding: 0.2em 0.3em;
}
.full-page {
  width: 100vw;
  height: 100vh;
}
.user-register {
  display: table-cell;
  vertical-align: middle;
  padding: 0 7em;
  font-size: 1.5em;
}
.main-container {
  padding: 10px;
}
</style>
