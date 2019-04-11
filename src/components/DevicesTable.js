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

/**
 * Get object's value by key/array of keys
 * @param {Object|Array} nestedObj
 * @param {Array} pathArr
 */
const getNestedObject = (nestedObj, pathArr) =>
  nestedObj instanceof Array
    ? nestedObj.map(obj => pathArr.reduce((a, v) => a[v], obj)).join("; ")
    : pathArr.reduce((a, v) => a[v], nestedObj);

const COL_LIST = [
  "vendor",
  "name",
  "codename",
  ["cameras", "info"],
  "screen",
  "screen_res",
  "storage",
  ["battery", "capacity"],
  "cpu",
  "gpu",
  "ram",
  "wifi",
  ["bluetooth", "spec"],
  "width",
  "height",
  "depth",
  "release"
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
  state = { rows: null };

  componentDidMount() {
    const { client } = this.props;
    client
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

  displayDevices() {
    const { rows } = this.state;
    if (!rows) {
      return (
        <TableRow>
          {COL_LIST.map(() => (
            <TableCell align="right">loading</TableCell>
          ))}
        </TableRow>
      );
    }
    return rows.map(row => (
      <TableRow>
        {COL_LIST.map(col => (
          <TableCell>
            {String(
              col instanceof Array
                ? getNestedObject(row[col[0]], col.slice(1))
                : row[col]
            )}
          </TableCell>
        ))}
      </TableRow>
    ));
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {COL_LIST.map(col => (
                <TableCell align="right">{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{this.displayDevices()}</TableBody>
        </Table>
      </Paper>
    );
  }
}

DevicesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
};

export default withStyles(styles)(DevicesTable);
