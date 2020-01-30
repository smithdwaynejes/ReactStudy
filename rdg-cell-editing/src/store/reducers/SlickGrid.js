import * as actionsTypes from '../actions/actions';
import Faker from "faker";
import _ from "lodash";

import {
  dateFormatter,
  makeArray,
  rates,
} from "../../libs/utils";


const mock_slick_data = makeArray(300, id => {
  const currency = _.sample(["USD", "AUD", "CAD", "EUR", "JPY", "CHF"]);
  const data = {
    id,
    avatar: Faker.image.avatar(),
    type: _.sample(["BUY", "SELL"]),
    counterparty: Faker.company.companyName(),
    health: _.random(0, 100),
    currency,
    amount: Faker.finance.amount(),
    price: rates[currency],
    paymentDate: dateFormatter(null, null, Faker.date.future())
  };

  data.historic = [data.price];
  return data;
});

const inititalState = {
    slickColumns: [],
    slickData: []
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
              slickData: [...mock_slick_data]
            };
        }
        default: {
            return state;
        }
    }
}

export default reducer;