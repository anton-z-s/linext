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
import { safeLoad, FAILSAFE_SCHEMA } from "js-yaml";
import ReactTable from "react-table";
import GET_DEVICES from "../queries/devicesWiki";

import "react-table/react-table.css";

/**
 * Get object's value by key/array of keys
 * @param {Object|Array} wholeObj
 * @param {Array} fullPath
 */
const getNestedObject = (wholeObj, fullPath) => {
  const nestedObj = wholeObj[fullPath[0]];
  const nestedPath = fullPath.slice(1);
  if (nestedObj instanceof Array) {
    if (nestedPath.length === 0) {
      return nestedObj.map(obj => Object.values(obj)).join("; ");
    }
    return nestedObj
      .map(obj =>
        nestedPath.reduce(
          (a, v) => (a[v] !== undefined ? a[v] : Object.values(a)[0][v]),
          obj
        )
      )
      .join("; ");
  }

  return nestedPath.reduce((a, v) => a[v], nestedObj);
};

const columns = [
  {
    Header: "Codename",
    accessor: "codename"
  },
  {
    Header: "Vendor",
    accessor: "vendor"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    id: "cameras",
    Header: "Сameras",
    accessor: v => getNestedObject(v, ["cameras", "info"])
  },
  {
    Header: "Screen size",
    accessor: "screen"
  },
  {
    Header: "Screen resolution",
    accessor: "screen_res"
  },
  {
    Header: "Storage",
    accessor: "storage"
  },
  {
    id: "battery",
    Header: "Battery",
    accessor: v => getNestedObject(v, ["battery", "capacity"])
  },
  {
    Header: "CPU",
    accessor: "cpu"
  },
  {
    Header: "GPU",
    accessor: "gpu"
  },
  {
    Header: "Bluetooth",
    accessor: "bluetooth.spec"
  },
  {
    Header: "RAM",
    accessor: "ram"
  },
  {
    Header: "Wi-Fi",
    accessor: "wifi"
  },
  {
    Header: "Width",
    accessor: "width"
  },
  {
    Header: "Height",
    accessor: "height"
  },
  {
    Header: "Depth",
    accessor: "depth"
  },
  {
    id: "release",
    Header: "Release date",
    accessor: v => getNestedObject(v, ["release"])
  }
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
    data: []
  };

  componentDidMount() {
    const { apolloClient } = this.props;
    apolloClient
      .query({
        query: GET_DEVICES
      })
      .then(result =>
        this.setState({
          data: result.data.repository.object.entries.map(
            entry => safeLoad(entry.object.text, { schema: FAILSAFE_SCHEMA }) // FAILSAFE_SCHEMA will ensure that strings that look like dates won't be converted
          )
        })
      );
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <Paper className={classes.root}>
        <ReactTable data={data} columns={columns} />
      </Paper>
    );
  }
}

DevicesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  apolloClient: PropTypes.object.isRequired
};

export default withStyles(styles)(DevicesTable);
