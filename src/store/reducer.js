const initialState = {
  activePark: null,
  parks: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_ACTIVE_PARK':
      return {
        ...state,
        activePark: action.activePark,
      }
    default:
      return state;
  }
}

export default reducer;