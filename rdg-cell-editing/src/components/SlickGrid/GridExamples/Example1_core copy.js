import { Grid, Data, Plugins, Formatters } from "slickgrid-es6";
import './styles.scss';

import data from "../example-data";

let columns = [];

let CheckboxSelectColumn = Plugins.CheckboxSelectColumn;
let RowSelectionModel = Plugins.RowSelectionModel;

var checkboxSelector = new CheckboxSelectColumn({
  cssClass: "slick-cell-checkboxsel"
});
function formatter(row, cell, value, columnDef, dataContext) {
  return value;
}

function waitingFormatter(value) {
  return "wait...";
}

function renderSparkline(cellNode, row, dataContext, colDef) {

  console.log(cellNode);
  var vals = [
    dataContext["graph_data"].n1,
    dataContext["graph_data"].n2,
    dataContext["graph_data"].n2
  ];

  
cellNode.innerHtml = '';
  // cellNode
  //   .empty()
  //   .sparkline(vals, { width: "100%" });
}

columns.push(checkboxSelector.getColumnDefinition());

const newcolumns = [
  {
    id: "title",
    name: "Title",
    field: "title",
    maxWidth: 100,
    minWidth: 80,
    formatter: formatter
  },
  { id: "duration", name: "Duration", field: "duration", resizable: false },
  {
    id: "%",
    name: "% Complete",
    field: "percentComplete",
    width: 80,
    formatter: Formatters.PercentCompleteBar
  },
  { id: "start", name: "Start", field: "start" },
  { id: "finish", name: "Finish", field: "finish" },
  {
    id: "effort-driven",
    name: "Effort Driven",
    field: "effortDriven",
    cssClass: "cell-effort-driven",
    formatter: Formatters.Checkmark
  },
  {
    id: "chart",
    name: "Chart",
    sortable: false,
    width: 60,
    formatter: waitingFormatter,
    rerenderOnResize: true,
    asyncPostRender: renderSparkline
  }
];

columns = [columns, ...newcolumns];

console.log(columns);

const options = {
  enableCellNavigation: true,
  forceFitColumns: true,
  frozenColumn: 1,
  frozenRow: 1,
  enableColumnReorder: false,
  editable: true,
  enableAddRow: false,
  asyncEditorLoading: false,
  enableAsyncPostRender: true,
  inlineFilter: true
};

for ( let i = 0; i < data.length; ++i) {
  
  let graphObj = {
    "n1": Math.round(Math.random() * 10) ,
    "n2": Math.round(Math.random() * 10) ,
     "n3": Math.round(Math.random() * 10) 
  };

  data[i] = {...data[i], graph_data:graphObj}
}
const dataView = new Data.DataView();
dataView.setItems([ ...data ]); // some data


export default () => {
  let grid =  new Grid("#myGrid", dataView, columns, options);
  grid.setSelectionModel(
    new RowSelectionModel({ selectActiveRow: false })
  );

  grid.registerPlugin(checkboxSelector);

  return grid;
};

