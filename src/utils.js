/* eslint-disable no-fallthrough */
import store from './store';

const PlayerStatus = {
  INITIALIZED: 0,
  ROOMED: 1,
  READY: 2,
  LISTENING: 3,
  ACTING: 4,
  SUBMITED: 5,
  DRAWING: 6,
  WATCHING: 7,
}

const player_stat_info = {
  [PlayerStatus.READY]: {
    class: 'player-ready',
    title: '已准备',
  },
  [PlayerStatus.LISTENING]: {
    class: 'player-listening',
    title: '',
  },
  [PlayerStatus.ACTING]: {
    class: 'player-acting',
    title: '执行中',
  },
  [PlayerStatus.SUBMITED]: {
    class: 'player-submited',
    title: '已执行',
  },
  [PlayerStatus.ROOMED]: {
    class: 'player-roomed',
    title: '未准备',
  },
  [PlayerStatus.WATCHING]: {
    class: 'player-watching',
    title: '大悲',
  },
};

function suggestMovementId (move_point) {
  let result = store.getters.all_movement
    .filter(e => e.point <= move_point)
    .sort((a, b) => a.point - b.point)
    .map(e => e.id);
  return result;
}

function needTarget (move_id) {
  return Boolean(store.getters.all_movement[move_id].need_target);
}
function needDeadTarget (move_id) {
  return Boolean(store.getters.all_movement[move_id].need_dead_target);
}

function debounce (f, delay_time = 2000) {
  var is_ok = true;
  return function (...args) {
    const machine = {
      ok () {
        return is_ok;
      },
      delay () {
        is_ok = false;
        setTimeout(() => {
          is_ok = true;
        }, delay_time);
      }
    };
    if (machine.ok()) {
      machine.delay();
      return f(...args);
    } else {
      console.log('delaying...');
    }
  }
}

function clearCache () {
  console.log("clear cache.");
  localStorage.removeItem("sessionID");
}

export {
  player_stat_info,
  PlayerStatus,
  suggestMovementId,
  needTarget,
  needDeadTarget,
  debounce,
  clearCache,
}