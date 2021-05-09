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
  [Move.CLAP]: {
    id: 0, tags: ['老八秘制小汉堡'],
    title: '拍手', point: 0, attack: 0, defend: 0,
    description: '增加一点行动力。',
    background_color: '#8bc34a', background_color_hover: '#689f38'
  },
  [Move.DEFEND]: {
    id: 1, tags: ['防守'],
    title: '格挡', point: 0, attack: 0, defend: '*2',
    description: '若伤害值大于等于 2 则无法格挡。',
    background_color: '#8bc34a', background_color_hover: '#689f38'
  },
  [Move.STRONG_DEFEND]: {
    id: 2, tags: ['防守'],
    title: '双重格挡', point: 1, attack: 0, defend: 4,
    description: '若伤害值大于 4 则无法格挡。',
    background_color: '#00bcd4', background_color_hover: '#0097a7'
  },
  [Move.SHOOT]: {
    id: 3, tags: ['单体攻击'],
    title: '射击', point: 1, attack: 1, defend: 0,
    description: '造成 1 点伤害。',
    background_color: '#00bcd4', background_color_hover: '#0097a7'
  },
  [Move.SLASH]: {
    id: 4, tags: ['单体攻击', '破防'],
    title: '击剑', point: 2, attack: 2, defend: 0,
    description: '造成 2 点伤害。',
    background_color: '#ffc107', background_color_hover: '#ff6f00'
  },
  [Move.LIGHTNING_STRIKE]: {
    id: 5, tags: ['单体攻击', '破防', '雷电'],
    title: '雷罚', point: 3, attack: 3, defend: 0,
    description: '造成 3 点伤害，可用「避雷」闪避。',
    background_color: '#ff5722', background_color_hover: '#bf360c'
  },
  [Move.EARTHQUAKE]: {
    id: 6, tags: ['单体攻击', '破防'],
    title: '地裂', point: 4, attack: 4, defend: 0,
    description: '造成 4 点伤害。',
    background_color: '#ab47bc', background_color_hover: '#6a1b9a'
  },
  [Move.SWEEP_I]: {
    id: 7, tags: ['AOE'],
    title: '刃波 I', point: 1, attack: '*1', defend: 0,
    description: '对除你之外的全体玩家造成接近 1 点的伤害。',
    background_color: '#00bcd4', background_color_hover: '#0097a7'
  },
  [Move.SWEEP_II]: {
    id: 8, tags: ['AOE', '抵防'],
    title: '刃波 II', point: 2, attack: '*2', defend: 0,
    description: '对除你之外的全体玩家造成接近 2 点的伤害。',
    background_color: '#ffc107', background_color_hover: '#ff6f00'
  },
  [Move.SWEEP_III]: {
    id: 9, tags: ['AOE', '破防'],
    title: '刃波 III', point: 3, attack: '*3', defend: 0,
    description: '对除你之外的全体玩家造成接近 3 点的伤害。',
    background_color: '#ff5722', background_color_hover: '#bf360c'
  },
  [Move.LIGHTNING_STORM]: {
    id: 10, tags: ['AOE', '破防', '雷电'],
    title: '雷狱', point: 4, attack: '*4', defend: 0,
    description: '对除你之外的全体玩家造成接近 4 点的伤害，可用「避雷」闪避',
    background_color: '#ab47bc', background_color_hover: '#6a1b9a'
  },
  [Move.THORNS_I]: {
    id: 11, tags: ['防守', '反甲'],
    title: '荆棘 I', point: 1, attack: '0-1', defend: '*2',
    description: '如果受到的伤害在 0~1 之间，那么造成的伤害等于受到的伤害。否则如果受到超过 1 的伤害，那么将无法反弹，只能起到格挡的作用。',
    background_color: '#00bcd4', background_color_hover: '#0097a7'
  },
  [Move.THORNS_II]: {
    id: 12, tags: ['防守', '反甲'],
    title: '荆棘 II', point: 2, attack: '0-2', defend: '*3',
    description: '如果受到的伤害在 0~2 之间，那么造成的伤害等于受到的伤害。否则如果受到超过 2 的伤害，那么将无法反弹，只能起到格挡的作用。',
    background_color: '#ffc107', background_color_hover: '#ff6f00'
  },
  [Move.THORNS_III]: {
    id: 13, tags: ['防守', '反甲'],
    title: '荆棘 III', point: 3, attack: '0-3', defend: '4',
    description: '如果受到的伤害在 0~3 之间，那么造成的伤害等于受到的伤害。否则如果受到超过 3 的伤害，那么将无法反弹，只能起到格挡的作用。',
    background_color: '#ff5722', background_color_hover: '#bf360c'
  },
  [Move.LIGHTNING_ARRESTER]: {
    id: 14, tags: ['防守', '特殊'],
    title: '避雷', point: 1, attack: 0, defend: 0,
    description: '雷罚和雷狱对你无效。',
    background_color: '#00bcd4', background_color_hover: '#0097a7'
  },
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
  return list.map(i => MoveData[i]).sort((a, b) => a.point - b.point);
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