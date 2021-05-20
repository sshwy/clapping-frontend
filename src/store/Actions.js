import { clearCache } from "../utils";

/** @type {import("../../global").AppActions} */
const socketActions = {
  session (context, payload) {
    console.log('socket_session', payload);
    context.commit('setstate', {
      userID: payload.userID,
      username: payload.username,
      games: payload.games,
      authorized: true,
    });
    localStorage.setItem("sessionID", payload.sessionID); // store it in the localStorage
    context.dispatch("message", {
      type: 'success',
      text: "登录成功",
      delay: 2000,
    });
  },
  display_message (context, payload) {
    console.log('display_message', payload);
    context.dispatch("message", payload);
  },
  finish_logout () {
    clearCache();
    location.reload();
  },
  connect_error (context, payload) {
    console.error(`[connect] ` + payload.message);
    if (payload.message === "invalid username") {
      context.dispatch("message", {
        type: 'info',
        text: "你输入的用户名不太对劲哦",
        delay: 2000,
      });
      clearCache();
      location.reload();
    } else if (payload.message === "xhr poll error") {
      context.dispatch("message", {
        type: 'error',
        text: "似乎连不上服务器了……请刷新重试",
        delay: 2000,
      });
      clearCache();
    }
  },
  room_list_update (context) {
    context.dispatch('message', {
      type: 'success',
      text: "成功刷新房间列表",
      delay: 3000,
    });
  },
  room_info_ingame (context, payload) {
    console.log('room_info_ingame', payload.game_id);
    context.commit('setstate', {
      data: {
        game_id: payload.game_id,
      },
    });
  },
  room_info (context, payload) {
    console.log('room_info', payload.game_id);
    context.commit('setstate', {
      data: {
        game_id: payload.game_id,
      },
    });
  },
  scene_type (context, payload) {
    // console.log('scene_type', payload);
    context.commit('setstate', {
      scene_type: payload,
    });
  },
};

function keyPrefixize (origin, prefix) {
  const result = {};
  for (const key in origin) {
    result[prefix + key] = origin[key];
  }
  return result;
}

const socketActionKeys = Object.keys(socketActions);

export {
  socketActions,
  socketActionKeys,
};

/** @type {import("../../global").AppActions} */
const actions = {
  ...keyPrefixize(socketActions, 'socket_'),
  message (context, payload) {
    const { text, type, delay } = payload;
    const id = new Date().getTime();
    context.commit('setstate', {
      messages: [
        {
          id: id,
          text: text,
          type: type,
        },
        ...context.state.messages
      ].slice(0, 10),
    });
    setTimeout(() => {
      context.commit('setstate', {
        messages: context.state.messages.filter((msg) => msg.id !== id),
      });
    }, delay || 3000);
  },
}

export default actions;