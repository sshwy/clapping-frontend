/** @type {import("../../global").AppGetters} */
const getters = {
  is_unauthorized: (state) => {
    return state.scene_type === 'unauthorized';
  },
  is_room_list: (state) => {
    return state.scene_type === 'room_list';
  },
  is_room_info: state => {
    return state.scene_type === 'room_info';
  },
  is_gaming: state => {
    return state.scene_type === 'gaming';
  },
  all_movement: state => {
    return state.games[state.data.game_id].movement_group.movement_list;
  },
};

export default getters;