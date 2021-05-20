<template>
  <global-css />
  <register-page />
  <transition name="delay-fade">
    <div v-show="this.$store.state.authorized">
      <navbar />
      <div class="main-container">
        <room-list />
        <Main />
      </div>
    </div>
  </transition>
  <teleport to="body">
    <div id="message-container">
      <transition-group name="message-list" tag="div">
        <message
          v-for="msg in this.$store.state.messages"
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
import RegisterPage from "./components/RegisterPage";
import RoomList from "./components/RoomList";
import Main from "./components/Main";
import Message from "./components/Message";
import Navbar from "./components/Navbar";
import GlobalCss from "./components/GlobalCss";

export default {
  name: "App",
  components: {
    RoomList,
    Message,
    Navbar,
    GlobalCss,
    RegisterPage,
    Main,
  },
  data() {
    return {
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
      this.$store.commit("setstate", {
        authorized: false,
      });
    }
  },
  methods: {
    addMessage(type, text, delay = 3000) {
      this.$store.dispatch("message", {
        type,
        text,
        delay,
      });
    },
  },
  provide() {
    return {
      addMessage: this.addMessage,
    };
  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
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

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    "Microsoft YaHei", "WenQuanYi Micro Hei", "Microsoft YaHei UI", sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}

.username-submit-btn:hover {
  cursor: pointer;
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
  margin: 5px 7px 5px 3px;
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
  margin: 0.7em 0.6em;
  font-weight: bold;
  font-size: 1.1em;
}
.card-content {
  margin: 0.7em;
}

.clear-fix::after {
  content: "";
  display: block;
  clear: both;
}

.btn {
  margin: 0 3px;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  padding: 4px 6px 2px;
  font-size: 1em;
  transition: all 0.3s ease;
  user-select: none;
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
.main-container {
  padding: 0 20px;
  max-width: 1000px;
  margin: 80px auto 0;
  max-height: calc(100vh - 80px);
  overflow-y: hidden;
}
</style>
