import * as actionsTypes from '../actions/actions';





const inititalState = {
    slickColumns: [],
    slickData: [],
    options: {}
}

const reducer = (state = inititalState, actions) => {
    switch(actions.type) {
        case actionsTypes.SET_SLICK_GRID_COLUMNS: {
            return {
              ...state,
              slickColumns: [...actions.payload]
            };
        }
        case actionsTypes.SET_SLICK_GRID_DATA: {

            return {
              ...state,
              slickData: [...actions.payload]
            };
        }
        case actionsTypes.SET_SLICK_GRID_OPTIONS : {
          return {
            ...state,
            slickOptions: {...actions.payload}
          }
        }
        default: {
            return state;
        }
    }
}

export default reducer;