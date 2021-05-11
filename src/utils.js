/* eslint-disable no-fallthrough */
import store from './dataStore';

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

function suggestMovement (move_point) {
  const MoveData = store.get('games')[0].movement_group.movement_list;
  let result = MoveData
    .filter(e => e.point <= move_point)
    .sort((a, b) => a.point - b.point);
  return result;
}

function needTarget (move_id) {
  const MoveData = store.get('games')[0].movement_group.movement_list;
  return Boolean(MoveData[move_id].need_target);
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

export {
  player_stat_info,
  PlayerStatus,
  suggestMovement,
  needTarget,
  debounce,
}