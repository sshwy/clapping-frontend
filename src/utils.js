/* eslint-disable no-fallthrough */
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

const MoveName = {};
for (const key in Move) {
  MoveName[Move[key]] = key;
}

const MoveTitle = {
  zh_CN: {
    [Move.CLAP]: '拍手',
    [Move.DEFEND]: '格挡',
    [Move.STRONG_DEFEND]: '双重格挡',
    [Move.SHOOT]: '射击',
    [Move.SLASH]: '击剑',
    [Move.LIGHTNING_STRIKE]: '雷罚',
    [Move.EARTHQUAKE]: '地裂',
    [Move.SWEEP_I]: '刃波 I',
    [Move.SWEEP_II]: '刃波 II',
    [Move.SWEEP_III]: '刃波 III',
    [Move.LIGHTNING_STORM]: '雷狱',
    [Move.THORNS_I]: '荆棘 I',
    [Move.THORNS_II]: '荆棘 II',
    [Move.THORNS_III]: '荆棘 III',
    [Move.LIGHTNING_ARRESTER]: '避雷'
  }
}

const MovePoints = {
  [Move.CLAP]: 0,
  [Move.DEFEND]: 0,
  [Move.STRONG_DEFEND]: 1,
  [Move.SHOOT]: 1,
  [Move.SLASH]: 2,
  [Move.LIGHTNING_STRIKE]: 3,
  [Move.EARTHQUAKE]: 4,
  [Move.SWEEP_I]: 1,
  [Move.SWEEP_II]: 2,
  [Move.SWEEP_III]: 3,
  [Move.LIGHTNING_STORM]: 4,
  [Move.THORNS_I]: 1,
  [Move.THORNS_II]: 2,
  [Move.THORNS_III]: 3,
  [Move.LIGHTNING_ARRESTER]: 1
};

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
    title: '已执行操作',
  },
  [PlayerStatus.ROOMED]: {
    class: 'player-roomed',
    title: '未准备',
  },
};

function suggestMovement (move_point) {
  var list = [];
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
  return list.map(i => ({
    id: i,
    name: MoveName[i],
    title: MoveTitle.zh_CN[i],
    move_points: MovePoints[i],
  }));
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
  MoveName,
  MoveTitle,
  suggestMovement,
  needTarget,
}