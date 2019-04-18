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

// prettier-ignore
const COL_LIST = [
  { id: "codename", numeric: false, path: "codename", label: "codename" },
  { id: "vendor", numeric: false, path: "vendor", label: "vendor" },
  { id: "name", numeric: false, path: "name", label: "name" },
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

/**
 * Get object's value by key/array of keys
 * @param {Object|Array} nestedObj
 * @param {Array} pathArr
 */
const getNestedObject = (nestedObj, pathArr) => {
  if (nestedObj instanceof Array) {
    return nestedObj
      .map(obj =>
        pathArr.reduce(
          (a, v) => (a[v] !== undefined ? a[v] : a[Object.keys(a)[0]][v]),
          obj
        )
      )
      .join("; ");
  }
  const res = pathArr.reduce((a, v) => a[v], nestedObj);
  return res !== undefined ? res : "—";
};

const obect2Array = rows => {
  // TODO speed up by switching to associated array http://jsben.ch/Y9jDP http://jsben.ch/W7Yi3
  return rows.map(row =>
    COL_LIST.map(({ path }) => {
      if (path instanceof Array) {
        return getNestedObject(row[path[0]], path.slice(1));
      }
      return row[path] !== undefined ? row[path] : "—";
    })
  );
};

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
          rows: obect2Array(
            result.data.repository.object.entries.map(entry =>
              safeLoad(entry.object.text)
            )
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

  getSorted = (arr, orderByNum, order) => {
    return arr.sort((a, b) => {
      const orderDirection = order === "asc" ? 1 : -1;
      return (
        orderDirection * String(a[orderByNum]).localeCompare(b[orderByNum])
      );
    });
  };

  displayDevices() {
    const { rows, orderBy, order } = this.state;
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

    return this.getSorted(
      rows,
      COL_LIST.findIndex(c => c.id === orderBy),
      order
    ).map(row => (
      <TableRow key={row[0]}>
        {row.map((cell, index) => (
          <TableCell key={COL_LIST[index].id}>{String(cell)}</TableCell>
        ))}
      </TableRow>
    ));
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
