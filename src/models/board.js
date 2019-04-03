export const board = {
  state: {
    name: 'This is a board name',
    author: 'Board author'
  },
  reducers: {
    setName(state, payload) {
      return Object.assign({}, state, {
        ...state,
        name: payload.name
      });
    }
  },
  effects: {}
};
