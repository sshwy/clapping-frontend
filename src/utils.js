/* eslint-disable no-fallthrough */
import store from './dataStore';
const Move = {
  CLAP: 0,
  DEFEND: 1,
  STRONG_DEFEND: 2,
  SHOOT: 3,
  SLASH: 4,
  LIGHTNING_STRIKE: 5,
  EARTHQUAKE: 6,
  SWEEP_I: 7,
  SWEEP_II: 8,
  SWEEP_III: 9,
  LIGHTNING_STORM: 10,
  THORNS_I: 11,
  THORNS_II: 12,
  THORNS_III: 13,
  LIGHTNING_ARRESTER: 14
};

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
  var list = [];
  if (move_point > 4) {
    for (const key in Move) {
      list.push(Move[key]);
    }
  }
  switch (move_point) {
    case 4:
      list.push(Move.EARTHQUAKE);
      list.push(Move.LIGHTNING_STORM);
    case 3:
      list.push(Move.SWEEP_III);
      list.push(Move.THORNS_III);
      list.push(Move.LIGHTNING_STRIKE);
    case 2:
      list.push(Move.SLASH);
      list.push(Move.SWEEP_II);
      list.push(Move.THORNS_II);
    case 1:
      list.push(Move.STRONG_DEFEND);
      list.push(Move.SHOOT);
      list.push(Move.SWEEP_I);
      list.push(Move.THORNS_I);
      list.push(Move.LIGHTNING_ARRESTER);
    case 0:
      list.push(Move.CLAP);
      list.push(Move.DEFEND);
  }
  const MoveData = store.get('games')[0].movement_group.movement_list;
  const result = list.map(i => MoveData[i]).sort((a, b) => a.point - b.point);
  return result;
}

function needTarget (move_id) {
  switch (move_id) {
    case Move.EARTHQUAKE:
    case Move.LIGHTNING_STRIKE:
    case Move.SLASH:
    case Move.SHOOT:
      return true;
  }
  return false;
}

export {
  player_stat_info,
  PlayerStatus,
  Move,
  suggestMovement,
  needTarget,
}