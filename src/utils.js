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

const MoveData = {
  [Move.CLAP]: { title: '拍手', point: 0, attack: 0, defend: 0, description: '' },
  [Move.DEFEND]: { title: '格挡', point: 0, attack: 0, defend: '*2', description: '' },
  [Move.STRONG_DEFEND]: { title: '双重格挡', point: 1, attack: 0, defend: 4, description: '' },
  [Move.SHOOT]: { title: '射击', point: 1, attack: 1, defend: 0, description: '' },
  [Move.SLASH]: { title: '击剑', point: 2, attack: 2, defend: 0, description: '' },
  [Move.LIGHTNING_STRIKE]: { title: '雷罚', point: 3, attack: 3, defend: 0, description: '' },
  [Move.EARTHQUAKE]: { title: '地裂', point: 4, attack: 4, defend: 0, description: '' },
  [Move.SWEEP_I]: { title: '刃波 I', point: 1, attack: '*1', defend: 0, description: '' },
  [Move.SWEEP_II]: { title: '刃波 II', point: 2, attack: '*2', defend: 0, description: '' },
  [Move.SWEEP_III]: { title: '刃波 III', point: 3, attack: '*3', defend: 0, description: '' },
  [Move.LIGHTNING_STORM]: { title: '雷狱', point: 4, attack: '*4', defend: 0, description: '' },
  [Move.THORNS_I]: { title: '荆棘 I', point: 1, attack: '0-1', defend: '*2', description: '' },
  [Move.THORNS_II]: { title: '荆棘 II', point: 2, attack: '0-2', defend: '*3', description: '' },
  [Move.THORNS_III]: { title: '荆棘 III', point: 3, attack: '0-3', defend: '4', description: '' },
  [Move.LIGHTNING_ARRESTER]: { title: '避雷', point: 1, attack: 0, defend: 0, description: '' },
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
    title: MoveData[i].title,
    move_points: MoveData[i].point,
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
  MoveData,
  suggestMovement,
  needTarget,
}