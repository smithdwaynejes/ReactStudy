import React from "react";
import ReactDOM from "react-dom";
import { Data, FrozenGrid as Grid, Plugins } from "slickgrid-es6";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/index";
import _ from "lodash";
import Dimensions from "react-dimensions";

import "./styles.less";

import "react-datepicker/dist/react-datepicker.css";

import { morphRate, rates } from "../../../libs/utils";
import "./styles.scss";

// import data from "../example-data";

const checkboxSelector = new Plugins.CheckboxSelectColumn({
  cssClass: "slick-cell-checkboxsel"
});

const columnFilters = {};
let healthValue = 0;

const options = {
  rowHeight: 32,
  editable: true,
  enableAddRow: !true,
  enableCellNavigation: true,
  // asyncEditorLoading: false,
  enableAsyncPostRender: true,
  autoEdit: false,
  // forceFitColumns: true,
  showHeaderRow: true,
  headerRowHeight: 32,
  explicitInitialization: true,
  frozenColumn: 1
};

const dv = new Data.DataView();
// data view
dv.setFilter(item => {
  let pass = true;

  for (let key in item) {
    pass = pass && item.health >= healthValue;

    if (
      key in columnFilters &&
      columnFilters[key].length &&
      !["health", "paymentDate"].includes(key)
    ) {
      pass =
        pass && String(item[key]).match(new RegExp(columnFilters[key], "ig"));
    } else if (
      key in columnFilters &&
      columnFilters[key].length &&
      key === "paymentDate"
    ) {
      if (columnFilters[key].length !== 13) {
        return pass;
      }
      console.log("item", typeof item.paymentDate);
      // console.log("date value", item[key]);
      let item_date = item.paymentDate;
      console.log("date", item_date);
      let inputDate = item.paymentDate.split("/");
      let checkDate = new Date(
        `${inputDate[0]}-${inputDate[1]}-${inputDate[2]}`
      );
      console.log("checkdate", checkDate);
      let filterDate = columnFilters[key].split(" ");
      console.log(filterDate);

      let fromDate = new Date(
        `${filterDate[0].substr(0, 2)}-${filterDate[0].substr(
          2,
          2
        )}-${filterDate[0].substr(4, 2)}`
      );

      let toDate = new Date(
        `${filterDate[1].substr(0, 2)}-${filterDate[1].substr(
          2,
          2
        )}-${filterDate[1].substr(4, 2)}`
      );

      pass = pass && checkDate > fromDate && checkDate < toDate;

      console.log(fromDate);
    }
  }
  return pass;
});

dv.getItemMetadata = index => {
  const row = dv.getItem(index);
  return row.type === "BUY" ? { cssClasses: "buy" } : { cssClasses: "" };
};
// end data view

// filter renderer is a react component
class Filter extends React.Component {
  handleChange = ({ target }) => {
    const value = target.value.trim();
    if (value.length) {
      this.props.columnFilters[this.props.columnId] = value;
    } else {
      delete this.props.columnFilters[this.props.columnId];
    }

    this.props.dv.refresh();
  };

  render() {
    return (
      <input
        defaultValue={this.props.columnFilters[this.props.columnId]}
        type="text"
        className="form-control"
        onChange={this.handleChange}
      />
    );
  }
}

// main!
class Home extends React.Component {

  rates = Object.keys(rates);

  historic = this.rates.reduce((acc, cur) => {
    acc[cur] = [rates[cur]];
    return acc;
  }, {});

  handleResize = () => {
    this.gridInstance.setColumns(this.props.slickColumns);
  };

  state = {
    editing: null,
    purchasing: false
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  

  componentDidMount() {
    this.props.onSetSlickDataColumns();
    this.props.onSetSlickData();
    
    // fake data
    console.log(this.props);
    console.log(this.props.slickColumns);
    dv.setItems(this.props.slickData);

    const grid = (this.gridInstance = new Grid(
      this.grid,
      dv,
      this.props.slickColumns,
      options
    ));
    this.props.slickColumns[7].formatter = this.props.slickColumns[7].formatter.bind(
      this.gridInstance
    );

    grid.setSelectionModel(
      new Plugins.RowSelectionModel({ selectActiveRow: false })
    );
    grid.registerPlugin(checkboxSelector);

    const changeFilter = _.debounce(value => {
      healthValue = value;
      dv.refresh();
    }, 500);

    grid.onHeaderRowCellRendered.subscribe((e, { node, column }) => {
      if (
        ["_checkbox_selector", "historic", "health"].indexOf(column.id) === -1
      ) {
        ReactDOM.render(
          <Filter
            columnId={column.id}
            columnFilters={columnFilters}
            dv={dv}
          />,
          node
        );
        node.classList.add("slick-editable");
      } else if (column.id === "health") {
        ReactDOM.render(
          <input
            className="range"
            defaultValue={healthValue}
            type="range"
            onChange={e => changeFilter(e.target.value)}
          />,
          node
        );
      } else if (column.id === "paymentDate") {
        let searchLens = (
          <div
            id="showserchimg_ct"
            class="cptr fontSize20 text-center"
            alt="search"
            onclick="cSearch.openSearch('ct')"
            data-original-title=""
            title=""
          >
            <input id="sdate" type="text"></input>
          </div>
        );

        ReactDOM.render(searchLens, node);
      } else {
        node.classList.add("slick-uneditable");
      }
      if (column.id === "_checkbox_selector") {
        node.innerHTML = '<i class="fa fa-filter" />';
      }
    });

    grid.onSort.subscribe(function(e, args) {
      // args.multiColumnSort indicates whether or not this is a multi-column sort.
      // If it is, args.sortCols will have an array of {sortCol:..., sortAsc:...} objects.
      // If not, the sort column and direction will be in args.sortCol & args.sortAsc.

      // We'll use a simple comparer function here.
      const comparer = function(a, b) {
        return a[args.sortCol.field] > b[args.sortCol.field] ? 1 : -1;
      };

      // Delegate the sorting to DataView.
      // This will fire the change events and update the grid.
      dv.sort(comparer, args.sortAsc);
    });

    dv.onRowCountChanged.subscribe(() => {
      grid.updateRowCount();
      grid.render();
    });

    grid.onBeforeEditCell.subscribe((e, { item }) => {
      this.setState({ editing: item });
    });

    grid.onBeforeCellEditorDestroy.subscribe(() =>
      this.setState({ editing: null })
    );

    grid.onCellChange.subscribe((e, { item }) => {
      dv.updateItem(item.id, item);
    });

    dv.onRowsChanged.subscribe((e, { rows }) => {
      grid.invalidateRows(rows);
      grid.render();
    });

    grid.init();

    window.addEventListener("resize", this.handleResize);

    //this.mutate();
  }

  // cellUpdate(id, item, column){
  //   const idx = dv.getIdxById(id);
  //   if (idx === undefined || id !== item.id) {
  //     throw "Invalid or non-matching id";
  //   }
  //   dv.getItems()[idx] = item;
  //
  //   const columnsToUpdate = Array.from(column)
  //   const colIndex = columnsToUpdate.map(this.instance.getColumnIndex);
  //   const range = this.instance.getRenderedRange()
  //
  //   for (let row = range.top; row <= range.bottom; row++) {
  //     for (let col = 0; col < columns.length; col++) {
  //       this.instance.updateCell(row, col);
  //
  //     }
  //   }
  // }

  mutate = () => {
    const currency = _.sample(this.rates);
    const price = morphRate(currency);

    this.historic[currency].push(price);
    this.historic[currency].length > 15 && this.historic[currency].shift();

    let hasUpdates = false;

    dv.getItems().forEach(item => {
      if (this.state.editing && item.id === this.state.editing.id) return;

      if (item.currency === currency) {
        item.direction = price > item.price ? "up" : "down";
        item.price = price;
        item.historic = this.historic[currency];

        if (!hasUpdates) {
          hasUpdates = true;
          dv.beginUpdate();
        }
        dv.updateItem(item.id, item);
      }
    });

    hasUpdates && dv.endUpdate();
    this._timer = setTimeout(this.mutate, _.random(100, 1000));
  };

  componentWillUnmount() {    
    console.log(this.props.slickData);
    console.log(this.props.slickColumns);
    console.log('----------');
    clearTimeout(this._timer);
    this.gridInstance.destroy();
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    console.log(this.props.slickData);
    console.log(this.props.slickColumns);
    return (
      <div style={{ height: this.props.containerHeight + "px" }}>
        <div
          id="myGrid"
          style={{ width: "100%", height: "313px" }}
          className="slickgrid-container"
          ref={grid => (this.grid = grid)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    slickColumns: state.slickColumns,
    slickData: state.slickData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetSlickDataColumns: () => {
      return dispatch(actionTypes.setSlickGridColumns());
    },
    onSetSlickData: () => {
      return dispatch(actionTypes.setSlickGridData());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dimensions()(Home));
