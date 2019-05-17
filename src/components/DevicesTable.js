import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  Popover,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText
} from "@material-ui/core";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import { safeLoad, FAILSAFE_SCHEMA } from "js-yaml";
import ReactTable, { ReactTableDefaults } from "react-table";
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
      return nestedObj
        .map(obj => `${Object.keys(obj)[0]}: ${Object.values(obj)[0]}`)
        .join("\u000A");
    }
    return nestedObj
      .map(obj =>
        nestedPath.reduce(
          (a, v) =>
            a[v] !== undefined
              ? a[v]
              : `${Object.keys(a)[0]}: ${Object.values(a)[0][v]}`,
          obj
        )
      )
      .join("\u000A");
  }

  return nestedPath.reduce((a, v) => a[v], nestedObj);
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
});

class DevicesTable extends Component {
  state = {
    data: [],
    anchorCol: null,
    // Header must be unique
    columns: [
      {
        Header: "Codename",
        accessor: "codename",
        show: false
      },
      {
        Header: "Vendor",
        accessor: "vendor",
        show: true
      },
      {
        Header: "Name",
        accessor: "name",
        show: true
      },
      {
        id: "cameras",
        Header: "Сameras",
        accessor: v => getNestedObject(v, ["cameras", "info"]),
        show: true
      },
      {
        Header: "Screen size",
        accessor: "screen",
        show: true
      },
      {
        Header: "Screen resolution",
        accessor: "screen_res",
        show: true
      },
      {
        Header: "Storage",
        accessor: "storage",
        show: false
      },
      {
        id: "battery",
        Header: "Battery",
        accessor: v => getNestedObject(v, ["battery", "capacity"]),
        show: false
      },
      {
        Header: "CPU",
        accessor: "cpu",
        show: false
      },
      {
        Header: "GPU",
        accessor: "gpu",
        show: false
      },
      {
        Header: "Bluetooth",
        accessor: "bluetooth.spec",
        show: false
      },
      {
        Header: "RAM",
        accessor: "ram",
        show: true
      },
      {
        Header: "Wi-Fi",
        accessor: "wifi",
        show: false
      },
      {
        Header: "Width",
        accessor: "width",
        show: false
      },
      {
        Header: "Height",
        accessor: "height",
        show: false
      },
      {
        Header: "Depth",
        accessor: "depth",
        show: false
      },
      {
        id: "maintainers",
        Header: "Maintained",
        accessor: v =>
          Array.isArray(v.maintainers) && v.maintainers.length ? "Yes" : "No",
        show: false
      },
      {
        id: "release",
        Header: "Release date",
        accessor: v => getNestedObject(v, ["release"]),
        show: true
      }
    ]
  };

  componentDidMount() {
    const { apolloClient } = this.props;
    apolloClient
      .query({
        query: GET_DEVICES
      })
      .then(result =>
        this.setState({
          data: result.data.repository.object.entries.map(entry =>
            safeLoad(entry.object.text, { schema: FAILSAFE_SCHEMA })
          )
        })
      ); // FAILSAFE_SCHEMA will ensure that strings that look like date won't be converted
  }

  handleColumnToggleClick = event => {
    this.setState({
      anchorCol: event.currentTarget
    });
  };

  handleColumnToggleClose = () => {
    this.setState({
      anchorCol: null
    });
  };

  handleCToggle = event => {
    const { columns } = this.state;
    columns[columns.findIndex(x => x.Header === event.target.value)].show =
      event.target.checked;
    this.setState({ columns });
    //  TODO consider keeping in state only data that actually change ("show" property)
  };

  render() {
    const { classes } = this.props;
    const { data, anchorCol, columns } = this.state;
    const isColumnToggle = Boolean(anchorCol);

    return (
      <Paper className={classes.root}>
        <Tooltip title="Toggle columns">
          <IconButton onClick={this.handleColumnToggleClick}>
            <ViewColumnIcon />
          </IconButton>
        </Tooltip>
        <Popover
          id="simple-popper"
          open={isColumnToggle}
          anchorEl={anchorCol}
          onClose={this.handleColumnToggleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <FormControl className={classes.formControl}>
            <FormLabel>Select visible columns</FormLabel>
            <FormGroup>
              {columns.map(element => (
                <FormControlLabel
                  control={<Checkbox onChange={this.handleCToggle} />}
                  checked={element.show}
                  label={element.Header}
                  value={element.Header}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Popover>
        <ReactTable
          data={data}
          columns={columns}
          column={{
            ...ReactTableDefaults.column,
            style: { whiteSpace: "normal" }
          }}
          noDataText="Loading data..."
          showPagination={false}
          defaultPageSize={-1}
          minRows={5}
          defaultSorted={[
            {
              id: "release",
              desc: true
            }
          ]}
          filterable
          defaultFiltered={[
            {
              // default filter value
              id: "maintainers",
              value: "Yes"
            }
          ]}
        />
      </Paper>
    );
  }
}

DevicesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  apolloClient: PropTypes.object.isRequired
};

export default withStyles(styles)(DevicesTable);
