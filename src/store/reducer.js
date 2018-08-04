const initialState = {
  activePark: null,
  visibleParks: [],
  isPanelVisibleOnMobile: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case 'TOGGLE_SIDE_PANEL':
      return {
        ...state,
        isPanelVisibleOnMobile: !state.isPanelVisibleOnMobile,
      }
    default:
      return state;
  }
};

export default reducer;