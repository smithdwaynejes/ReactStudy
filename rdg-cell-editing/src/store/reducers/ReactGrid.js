import * as actionTypes from "../actions/actions";

let defaultData = [
  { id: 0, title: "Task 1", complete: 20 },
  { id: 1, title: "Task 2", complete: 40 },
  { id: 2, title: "Task 3", complete: 60 }
];

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const initialState = {
  data: defaultData,
  data_limit: 3
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DATA_LIMIT: {
      return {
        ...state,
        data_limit: action.numberOfRows
      };
    }
    case actionTypes.CREATE_DATA: {
      let arrayLength = parseInt(state.data_limit);
      let inputData = [];

      if (arrayLength > 3) {
        for (let item = 0; item < arrayLength; ++item) {
          inputData.push({
            id: item,
            title: "Task " + item,
            complete: randomIntFromInterval(10,99)
          });
        }
      } else {
        inputData = [...defaultData];
      }


      return {
        ...state,
        data: inputData
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
