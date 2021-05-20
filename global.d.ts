import { Socket } from "socket.io-client";
import { Action, Getter, Mutation, Store } from "vuex";

interface AppState {
  socket: Socket;
  authorized: boolean;
  userID: string;
  username: string;
  // version: string; // 前端版本号
  backend_version: string; // 后端版本
  games: Game[]; // 游戏数组
  scene_type: "unauthorized" | "room_list" | "room_info" | "gaming"; // 场景
  data: GamingData | RoomListData | {}; // 不同的 scene_type 对应不同的 data
  messages: Message[]; // 左下角提示信息列表
}

interface Message {
  id: string;
  text: string;
  type: "info" | "success" | "error";
}

interface GamingData {
  game_id: number;
}

interface RoomListData {
  room_list: any[];
}

type SocketMutations = {
  [key: string]: Mutation<AppState>;
};

type AppActions = {
  [key: string]: Action<AppState, AppState>;
};

type AppGetters = {
  [key: string]: Getter<AppState, AppState>;
};

type AppStore = Store<AppState>;
type Game = any;
