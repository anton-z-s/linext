import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import { safeLoad } from "js-yaml";
import GET_DEVICES from "../queries/devicesWiki";
import SortingTableHead from "./SortingTableHead";

/**
 * Get object's value by key/array of keys
 * @param {Object|Array} nestedObj
 * @param {Array} pathArr
 */
const getNestedObject = (nestedObj, pathArr) =>
  nestedObj instanceof Array
    ? nestedObj.map(obj => pathArr.reduce((a, v) => a[v], obj)).join("; ")
    : pathArr.reduce((a, v) => a[v], nestedObj);

// prettier-ignore
const COL_LIST = [
  { id: "vendor", numeric: false, path: "vendor", label: "vendor" },
  { id: "name", numeric: false, path: "name", label: "name" },
  { id: "codename", numeric: false, path: "codename", label: "codename" },
  { id: "cameras", numeric: false, path: ["cameras", "info"], label: "cameras"  },
  { id: "screen", numeric: false, path: "screen", label: "screen" },
  { id: "screen_res", numeric: false, path: "screen_res", label: "screen_res" },
  { id: "storage", numeric: false, path: "storage", label: "storage" },
  { id: "battery", numeric: false, path: ["battery", "capacity"], label: "battery" },
  { id: "cpu", numeric: false, path: "cpu", label: "cpu" },
  { id: "gpu", numeric: false, path: "gpu", label: "gpu" },
  { id: "ram", numeric: false, path: "ram", label: "ram" },
  { id: "wifi", numeric: false, path: "wifi", label: "wifi" },
  { id: "bluetooth", numeric: false, path: ["bluetooth", "spec"], label: "bluetooth" },
  { id: "width", numeric: false, path: "width", label: "width" },
  { id: "height", numeric: false, path: "height", label: "height" },
  { id: "depth", numeric: false, path: "depth", label: "depth" },
  { id: "release", numeric: false, path: "release", label: "release" }
];

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class DevicesTable extends Component {
  state = {
    order: "asc",
    orderBy: "vendor",
    rows: null
  };

  componentDidMount() {
    const { apolloClient } = this.props;
    apolloClient
      .query({
        query: GET_DEVICES
      })
      .then(result =>
        this.setState({
          rows: result.data.repository.object.entries.map(entry =>
            safeLoad(entry.object.text)
          )
        })
      );
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  getSorting = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy);
  };

  displayDevices() {
    const { rows } = this.state;
    if (!rows) {
      return (
        <TableRow>
          {COL_LIST.map(({ id }) => (
            <TableCell key={id} align="right">
              loading
            </TableCell>
          ))}
        </TableRow>
      );
    }

    return this.stableSort(rows, this.getSorting(this.order, this.orderBy)).map(
      row => (
        <TableRow key={row.codename}>
          {COL_LIST.map(({ id, path }) => (
            <TableCell key={id}>
              {String(
                path instanceof Array
                  ? getNestedObject(row[path[0]], path.slice(1))
                  : row[path]
              )}
            </TableCell>
          ))}
        </TableRow>
      )
    );
  }

  render() {
    const { classes } = this.props;
    const { order, orderBy } = this.state;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <SortingTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
            cols={COL_LIST}
          />
          <TableBody>{this.displayDevices()}</TableBody>
        </Table>
      </Paper>
    );
  }
}

DevicesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  apolloClient: PropTypes.object.isRequired
};

export default withStyles(styles)(DevicesTable);
