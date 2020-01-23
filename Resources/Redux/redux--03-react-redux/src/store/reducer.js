import * as actionTypes from './actions';

const initialState = {
  counter: 0,
  results:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    case actionTypes.CHANGE: {
      switch (action.do) {
        case actionTypes.ADD:
          return {
            ...state,
            counter: state.counter + action.value
          };
        case actionTypes.SUB:
          return {
            ...state,
            counter: state.counter - action.value
          };
        default:
          return state;
      }
    }
    case actionTypes.STO_RESULTS:
      return {
        ...state,
        results: state.results.concat({ id: new Date(), value: state.counter })
      };
    case actionTypes.DEL_RESULTS: {
      // let id = 3;
      // let newArray = [...state.results];
      // newArray.splice(id,1);
      const updateArray = state.results.filter(item => item.id !== action.id);
      return {
        ...state,
        results: updateArray
      };
    }
    default:
      return state;
  }
};

export default reducer;
