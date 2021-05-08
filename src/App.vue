<template>
  <div v-show="sessioned" class="main-container">
    <div class="havbar">
      <p>
        您以 <span>{{ username }}</span> 的身份登录
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
  <div
    v-if="!sessioned"
    class="full-page"
    :style="{
      display: 'table',
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
</template>

<script>
import socket from "./socket";
import Users from "./components/Users.vue";
import Main from "./components/Main.vue";
import Scene from "./components/Scene.vue";

export default {
  name: "App",
  components: {
    Users,
    Main,
    Scene,
  },
  data() {
    return {
      username: "",
      sessioned: false,
    };
  },
  created() {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      socket.auth = { sessionID };
      console.log("reconnect");
      socket.connect();
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
      }
    });
    socket.on("server_error", (err) => {
      console.error(`[server] ` + err.message);
    });
    socket.on('finish logout', () => {
      this.onClearCache();
      location.reload();
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
      socket.emit('logout');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

span.user-card {
  margin: 5px;
  font-weight: bold;
  font-family: system-ui;
  padding: 3px;
  border-radius: 3px;
}

.player-ready {
  background: #8bc34a;
}

.player-listening {
  background: #03a9f4;
}

.player-acting {
  background: #03a9f4;
}

.player-submited {
  background: #ffc107;
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
}
.card-content {
  padding: 0 0.8em 0.8em;
}

.card::before {
  display: block;
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
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
