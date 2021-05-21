<template>
  <global-css />
  <the-register-page />
  <transition name="delay-fade">
    <div v-show="this.$store.state.authorized">
      <the-navbar @switch="onRouterChange" />
      <div class="main-container">
        <keep-alive>
          <component :is="current_page" />
        </keep-alive>
      </div>
    </div>
  </transition>
  <teleport to="body">
    <div id="message-container">
      <transition-group name="message-list" tag="div">
        <message-box
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
import MessageBox from "./components/MessageBox";
import GlobalCss from "./components/GlobalCss";
import TheRegisterPage from "./components/TheRegisterPage";
import TheNavbar from "./components/TheNavbar";
import GamePage from "./components/GamePage";
import DocumentPage from "./components/DocumentPage";

export default {
  name: "App",
  components: {
    MessageBox,
    TheNavbar,
    GlobalCss,
    TheRegisterPage,
    GamePage,
    DocumentPage,
  },
  data() {
    return {
      messageList: [],
      current_page: "game-page",
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
    onRouterChange(component) {
      console.log(component);
      this.current_page = component;
    },
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

.main-container {
  padding: 0 20px;
  max-width: 1000px;
  margin: 80px auto 0;
  max-height: calc(100vh - 80px);
  overflow-y: hidden;
}
</style>
