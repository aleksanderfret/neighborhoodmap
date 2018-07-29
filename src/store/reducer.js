const initialState = {
  activePark: null,
  visibleParks: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_ACTIVE_PARK':
      return {
        ...state,
        activePark: action.activePark,
      }
    case 'SET_VISIBLE_PARKS':
      return {
        ...state,
        visibleParks: action.visibleParks,
    }
    default:
      return state;
  }
}

export default reducer;