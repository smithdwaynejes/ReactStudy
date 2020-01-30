import * as actions from './actions';
import { Editors, Plugins } from "slickgrid-es6";


import {
  amountFormatter,
  countryFormatter,
  dateFormatter,
  healthFormatter,
  historicSyncFormatter,
  makeArray,
  pipFormatter,
  rates,
  totalFormatter
} from "../../libs/utils";

const checkboxSelector = new Plugins.CheckboxSelectColumn({
  cssClass: "slick-cell-checkboxsel"
});

// column definitions
const sortable = true;
const columns = [
  checkboxSelector.getColumnDefinition(),
  {
    id: "type",
    name: "Side",
    sortable,
    field: "type",
    maxWidth: 120,
    resizeable: true
  },
  {
    id: "counterparty",
    name: "Counterparty",
    field: "counterparty",
    minWidth: 200,
    maxWidth: 200,
    cssClass: "slick-editable",
    editor: Editors.Text,
    sortable,
    resizeable: true
  },
  {
    id: "currency",
    name: "GBP-nnn",
    field: "currency",
    minWidth: 90,
    maxWidth: 90,
    sortable,
    formatter: countryFormatter,
    resizeable: true
  },
  {
    id: "price",
    name: "Price",
    field: "price",
    headerCssClass: "amount",
    cssClass: "amount",
    formatter: pipFormatter,
    minWidth: 100,
    maxWidth: 100,
    resizeable: true
  },
  {
    id: "historic",
    name: "Historic",
    field: "historic",
    rerenderOnResize: true,
    //asyncPostRender: historicFormatter,
    formatter: historicSyncFormatter,
    // formatter: (a,b, value) => JSON.stringify(value),
    // formatter: historicFormatter,
    cssClass: "full-size",
    minWidth: 128,
    maxWidth: 128,
    resizeable: true
  },
  {
    id: "amount",
    name: "Amount",
    field: "amount",
    headerCssClass: "amount",
    cssClass: "amount slick-editable",
    formatter: amountFormatter,
    editor: Editors.Text,
    minWidth: 100,
    maxWidth: 100,
    resizeable: true
  },
  {
    id: "total",
    name: "Total",
    fieldName: "total",
    headerCssClass: "amount",
    cssClass: "amount",
    formatter: totalFormatter,
    sortable: false,
    resizeable: true,
    minWidth: 100,
    maxWidth: 128
  },
  {
    id: "paymentDate",
    sortable: true,
    resizeable: true,
    name: "Execution",
    field: "paymentDate",
    minWidth: 100,
    maxWidth: 100,
    cssClass: "slick-editable amount",
    headerCssClass: "amount",
    //todo: fix date picker as it goes off-screen
    editor: Editors.Date,
    options: {
      date: {
        dateFormat: "d/m/Y", // see https://chmln.github.io/flatpickr/#options,
        parseDate: input => {
          const split = input.split("/");
          return new Date(`${split[0]}-${split[1]}-${split[2]}`);
        }
      }
    }
  },
  {
    id: "health",
    name: "Health",
    field: "health",
    cssClass: "is-hidden-mobile",
    headerCssClass: "is-hidden-mobile",
    formatter: healthFormatter,
    sortable: true,
    resizeable: true
  }
];
export const setSlickGridColumnsStart = (data) => {
    return {
        type:actions.SET_SLICK_GRID_COLUMNS,
        payload: data
    }
}
export const setSlickGridData = () => {
    return {
        type: actions.SET_SLICK_GRID_DATA
    }
}

export const setSlickGridColumns = () => {
    return (dispatch) => {
        dispatch(setSlickGridColumnsStart(columns));
    }
}

