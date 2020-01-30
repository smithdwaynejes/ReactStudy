import React from "react";
import ReactDataGrid from "react-data-grid";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/index";
import { ProgressBar } from "react-bootstrap";
const ProgressBarFormatter = ({ value }) => {
  return <ProgressBar now={value} label={`${value}%`} />;
};

const columns = [
  { key: "id", name: "ID", editable: true },
  { key: "title", name: "Title", editable: true },
  { key: "complete", name: "Complete", editable: true, formatter: ProgressBarFormatter }
];

class CellFormatting extends React.Component {
  constructor(props) {
    super(props);
    console.log("[SimpleGrid] ...");
  }

  componentDidMount() {
    console.log("[SimpleGrid] didmount ...");
  }

  componentDidUpdate() {
    console.log("[SimpleGrid] didupdate...");
  }

  componentWillMount() {
    console.log("[SimpleGrid] willMount ...");
  }

  componentWillUpdate() {
    console.log("[SimpleGrid] willUpdate ...");
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
  render() {
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={i => this.props.rows[i]}
        rowsCount={this.props.rows.length}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    rows: state.data,
    totalRows: state.data_limit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateRows: () => {
      dispatch(actionTypes.createData());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CellFormatting);
