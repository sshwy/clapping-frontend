import { io } from "socket.io-client";
import { socketActionKeys } from '../store/Actions';
import store from '../store';

const URL = process.env.VUE_APP_SOCKET_URL;

console.log('url', URL);

const socket = io(URL, { autoConnect: false });

if (process.env.NODE_ENV === 'development') {
  socket.onAny((event, ...args) => {
    console.log('[event]', event, args);
  });
}

socket.on("session", ({ sessionID, userID, username }) => {
  socket.auth = { sessionID }; // attach the session ID to the next reconnection attempts
  socket.userID = userID; // save the ID of the user
  socket.username = username;
});

socketActionKeys.forEach(action_name => {
  console.log(`register socket action [${action_name}]`);
  socket.on(action_name, (payload) => {
    store.dispatch('socket_' + action_name, payload);
  });
});

export default socket;
