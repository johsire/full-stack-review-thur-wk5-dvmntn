
const initalState = {
  user: {}
};

const  UPDATE_USER_DATA = 'UPDATE_USER_DATA';

export function updateUserData() {
  return {
    type: UPDATE_USER_DATA,
    payload: user
  }
}

export default function reducer(state = initalState, action) {
  switch (action.type) {
    case UPDATE_USER_DATA:
    return Object.assign({}, state, { user: action.payload });

    default:
      return state;
  }
}
