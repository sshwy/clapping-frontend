import { io } from "socket.io-client";

const URL = process.env.VUE_APP_SOCKET_URL;

console.log('url', URL);

const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log('[event]', event, args);
});

export default socket;
