import { createStore } from 'vuex'
import socket from '../socket';
import actions from './Actions';
import getters from './Getters';

/**
 * @type {import('../../global').AppStore}
 */
const store = createStore({
  state () {
    return {
      socket: socket,
      userID: '',
      username: '',
      authorized: true, // for reconection
      messages: [],
      backend_version: '',
      scene_type: 'unauthorized',
      games: [],
      data: {},
      // version: '',
    }
  },
  mutations: {
    setstate (state, payload) {
      // console.log('setstate', payload);
      for (const key in payload) {
        if (key in state) {
          state[key] = payload[key];
        } else {
          throw new Error(`Invalid setstate (unknown key ${key})`);
        }
      }
    },
  },
  actions: actions,
  getters: getters,
})

export default store;