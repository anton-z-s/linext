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
  FormHelperText,
  Link
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

  if (Array.isArray(nestedObj)) {
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

  if (typeof nestedObj === "object") {
    return nestedObj ? nestedPath.reduce((a, v) => a[v], nestedObj) : "";
  }

  return nestedObj;
};

/**
 * Like getNestedObject but returns only newest date, if there are many. Useful for sorting
 */
const getNewestNestedDate = (wholeObj, fullPath) => {
  const nestedObj = wholeObj[fullPath[0]];

  if (Array.isArray(nestedObj)) {
    const dates = nestedObj.map(obj => Object.values(obj)[0]);
    return dates.reduce((a, b) => (a > b ? a : b));
  }

  return nestedObj;
};

const array2String = (wholeObj, fullPath) =>
  Array.isArray(wholeObj[fullPath]) ? wholeObj[fullPath].join(", ") : "";

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
    loading: true,
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
        id: "models",
        Header: "Models",
        accessor: v => array2String(v, ["models"]),
        show: false
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
        Header: "Screen ppi",
        accessor: "screen_ppi",
        show: false
      },
      {
        Header: "Screen technology",
        accessor: "screen_tech",
        show: false
      },
      {
        Header: "Storage",
        accessor: "storage",
        show: false
      },
      {
        Header: "SD Card",
        accessor: "sdcard",
        show: false
      },
      {
        id: "battery",
        Header: "Battery",
        accessor: v => getNestedObject(v, ["battery", "capacity"]),
        show: false
      },
      {
        id: "architecture",
        Header: "Architecture",
        accessor: v => getNestedObject(v, ["architecture", "cpu"]),
        show: false
      },
      {
        Header: "System on a chip",
        accessor: "soc",
        show: false
      },
      {
        Header: "CPU",
        accessor: "cpu",
        show: false
      },
      {
        Header: "CPU cores",
        accessor: "cpu_cores",
        show: false
      },
      {
        Header: "CPU frequency",
        accessor: "cpu_freq",
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
        id: "network",
        Header: "Network",
        accessor: v => getNestedObject(v, ["network", "tech"]),
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
        id: "maintained",
        Header: "Maintained",
        accessor: v =>
          Array.isArray(v.maintainers) && v.maintainers.length ? "Yes" : "No",
        show: false
      },
      {
        id: "maintainers",
        Header: "Maintainers",
        accessor: v => array2String(v, ["maintainers"]),
        show: false
      },
      {
        Header: "Current version",
        accessor: "current_branch",
        show: false
      },
      {
        id: "versions",
        Header: "Available versions",
        accessor: v => array2String(v, ["versions"]),
        show: false
      },
      {
        id: "release",
        Header: "Release date",
        accessor: v => getNewestNestedDate(v, ["release"]),
        show: true
      },
      {
        id: "peripherals",
        Header: "Peripherals",
        accessor: v => array2String(v, ["peripherals"]),
        show: false
      },
      {
        Header: "Device type",
        accessor: "type",
        show: false
      },
      {
        id: "wiki",
        Header: "Wiki",
        filterable: false,
        accessor: v => (
          <Link
            href={`https://wiki.lineageos.org/devices/${v.codename}`}
            target="_blank"
            rel="noopener"
          >
            Open wiki
          </Link>
        ),
        show: false
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
        this.setState(
          {
            data: result.data.repository.object.entries.map(entry =>
              safeLoad(entry.object.text, { schema: FAILSAFE_SCHEMA })
            )
          },
          () => {
            this.setState({ loading: false });
          }
        )
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
    this.setState({ columns: columns.slice() }); // without making a shallow copy change doesn't get registered, as react doesn't handle nested updates
    // TODO reconsider when react-table v7 is out, avoid nested state https://stackoverflow.com/a/51136076
    // use immutability-helper
    // related https://github.com/tannerlinsley/react-table/issues/294#issuecomment-311457211

    //  TODO consider keeping in state only data that actually change ("show" property)
  };

  render() {
    const { classes } = this.props;
    const { data, anchorCol, columns, loading } = this.state;
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
          noDataText={loading ? "" : "No devices found..."}
          loading={loading}
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
              id: "maintained",
              value: "Yes"
            }
          ]}
          defaultFilterMethod={(filter, row) => {
            const id = filter.pivotId || filter.id;
            return row[id] !== null
              ? String(row[id])
                  .toLowerCase()
                  .includes(filter.value.toLowerCase())
              : true;
          }}
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
