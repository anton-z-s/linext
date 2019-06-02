import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Tooltip,
  IconButton,
  Popover,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Link as MUILink
} from "@material-ui/core";
import { ViewColumn } from "@material-ui/icons";
import { safeLoad, FAILSAFE_SCHEMA } from "js-yaml";
import ReactTable, { ReactTableDefaults } from "react-table";
import { Link } from "react-router-dom";
import GET_DEVICES from "../queries/devicesWiki";

import "react-table/react-table.css";

// TODO form default URL on first load, so there is no inconsistency between this and initial state
const DEFAULT_URL =
  "?columns=vendor|name|cameras|screen|screen_res|ram|release&sorted=release_desc&filtered=W3siaWQiOiJtYWludGFpbmVkIiwidmFsdWUiOiJZZXMifV0=";

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

const arrayObj2String = (wholeObj, path, key1, key2) => {
  if (wholeObj != null) {
    const nestedObj = wholeObj[path];
    return nestedObj != null
      ? nestedObj.map(obj => `${obj[key1]}: ${obj[key2]}`).join("\u000A")
      : "";
  }
  return "";
};

const getStateFromURL = (oldColumns, find) => {
  const res = {};
  const query = new URLSearchParams(find);

  if (query.get("columns")) {
    const newVisibleColumns = query.get("columns").split("|");
    res.columns = oldColumns.map(col => {
      return { ...col, show: newVisibleColumns.includes(col.id) };
    });
  }

  if (query.get("sorted")) {
    res.sorted = query
      .get("sorted")
      .split("|")
      .map(sort => {
        return {
          id: sort.endsWith("_desc") ? sort.slice(0, -5) : sort,
          desc: sort.endsWith("_desc")
        };
      });
  }

  if (query.get("filtered")) {
    res.filtered = JSON.parse(
      decodeURIComponent(escape(atob(query.get("filtered"))))
    );
  }

  return res;
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
    loading: true,
    sorted: [
      {
        id: "release",
        desc: true
      }
    ],
    filtered: [
      {
        // default filter value
        id: "maintained",
        value: "Yes"
      }
    ],
    // id must be provided
    columns: [
      {
        id: "codename",
        Header: "Codename",
        accessor: "codename",
        show: false
      },
      {
        id: "vendor",
        Header: "Vendor",
        accessor: "vendor",
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => {
              return onChange(event.target.value);
            }}
            style={{ width: "100%" }}
            value={filter ? filter.value : ""}
          >
            <option value="">Show All</option>
            {this.getFilterOptions("vendor")}
          </select>
        ),
        show: true
      },
      {
        id: "name",
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
        id: "screen",
        Header: "Screen size",
        accessor: "screen",
        show: true
      },
      {
        id: "screen_res",
        Header: "Screen resolution",
        accessor: "screen_res",
        show: true
      },
      {
        id: "screen_ppi",
        Header: "Screen ppi",
        accessor: "screen_ppi",
        show: false
      },
      {
        id: "screen_tech",
        Header: "Screen technology",
        accessor: "screen_tech",
        show: false
      },
      {
        id: "storage",
        Header: "Storage",
        accessor: "storage",
        show: false
      },
      {
        id: "sdcard",
        Header: "SD Card",
        accessor: "sdcard",
        show: false
      },
      {
        id: "battery_capacity",
        Header: "Battery capacity",
        accessor: v => getNestedObject(v, ["battery", "capacity"]),
        style: { whiteSpace: "pre-wrap" },
        show: false
      },
      {
        id: "battery_removable",
        Header: "Battery removable",
        accessor: v => getNestedObject(v, ["battery", "removable"]),
        style: { whiteSpace: "pre-wrap" },
        show: false
      },
      {
        id: "battery_tech",
        Header: "Battery tech",
        accessor: v => getNestedObject(v, ["battery", "tech"]),
        style: { whiteSpace: "pre-wrap" },
        show: false
      },
      {
        id: "architecture",
        Header: "Architecture",
        accessor: v => getNestedObject(v, ["architecture", "cpu"]),
        show: false
      },
      {
        id: "soc",
        Header: "System on a chip",
        accessor: "soc",
        show: false
      },
      {
        id: "cpu",
        Header: "CPU",
        accessor: "cpu",
        show: false
      },
      {
        id: "cpu_cores",
        Header: "CPU cores",
        accessor: "cpu_cores",
        show: false
      },
      {
        id: "cpu_freq",
        Header: "CPU frequency",
        accessor: "cpu_freq",
        show: false
      },
      {
        id: "gpu",
        Header: "GPU",
        accessor: "gpu",
        show: false
      },
      {
        id: "bluetooth_spec",
        Header: "Bluetooth",
        accessor: "bluetooth.spec",
        show: false
      },
      {
        id: "ram",
        Header: "RAM",
        accessor: "ram",
        show: true
      },
      {
        id: "wifi",
        Header: "Wi-Fi",
        accessor: "wifi",
        show: false
      },
      {
        id: "network",
        Header: "Network tech",
        accessor: v => getNestedObject(v, ["network", "tech"]),
        show: false
      },
      {
        id: "network_bands",
        Header: "Network bands",
        accessor: v => arrayObj2String(v, "network", "tech", "bands"),
        style: { whiteSpace: "pre-wrap" },
        show: false
      },
      {
        id: "width",
        Header: "Width",
        accessor: "width",
        show: false
      },
      {
        id: "height",
        Header: "Height",
        accessor: "height",
        show: false
      },
      {
        id: "depth",
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
        id: "current_branch",
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
        id: "type",
        Header: "Device type",
        accessor: "type",
        show: false
      },
      {
        id: "wiki",
        Header: "Wiki",
        filterable: false,
        accessor: v => (
          <MUILink
            href={`https://wiki.lineageos.org/devices/${v.codename}`}
            target="_blank"
            rel="noopener"
          >
            Open wiki
          </MUILink>
        ),
        show: false
      }
    ]
  };

  componentDidMount() {
    const { columns } = this.state;
    const { apolloClient, location, history } = this.props;
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
            const stateFromURL = getStateFromURL(columns, location.search);
            this.setState({ loading: false, ...stateFromURL });
          }
        )
      ); // FAILSAFE_SCHEMA will ensure that strings that look like date won't be converted

    history.listen(locationHist => {
      const stateFromURL = getStateFromURL(columns, locationHist.search);
      this.setState({ ...stateFromURL });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { columns, sorted, filtered, loading } = this.state;
    const { location, history } = this.props;

    if (!loading) {
      // if state changed due to user actions
      if (
        columns !== prevState.columns ||
        sorted !== prevState.sorted ||
        filtered !== prevState.filtered
      ) {
        // Convert react-table state to URL format
        const urlShow = columns
          .filter(col => col.show)
          .map(col => col.id)
          .join("|");

        const urlSort = sorted
          .map(col => (col.desc ? `${col.id}_desc` : col.id))
          .join("|");

        const urlFilter = btoa(
          unescape(encodeURIComponent(JSON.stringify(filtered)))
        );

        const newQuery = `?columns=${urlShow}&sorted=${urlSort}&filtered=${urlFilter}`;
        if (newQuery !== location.search) {
          history.push({
            pathname: "/",
            search: newQuery,
            state: { fired_by_table: true }
          });
        }
      }
    }
  }

  getFilterOptions(column) {
    const { data } = this.state;
    const uniqueValues = [...new Set(data.map(d => d[column]))].sort();
    return uniqueValues.map(value => <option value={value}>{value}</option>);
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

  // Show/hide columns
  handleCToggle = event => {
    const { columns } = this.state;
    columns[columns.findIndex(x => x.id === event.target.value)].show =
      event.target.checked;
    this.setState({ columns: columns.slice() }); // without making a shallow copy change doesn't get registered, as react doesn't handle nested updates
    // TODO reconsider when react-table v7 is out, avoid nested state https://stackoverflow.com/a/51136076
    // use immutability-helper
    // related https://github.com/tannerlinsley/react-table/issues/294#issuecomment-311457211

    //  TODO consider keeping in state only data that actually change ("show" property)
  };

  render() {
    const { classes } = this.props;
    const { data, anchorCol, columns, loading, sorted, filtered } = this.state;
    const isColumnToggle = Boolean(anchorCol);

    return (
      <Paper className={classes.root}>
        <Tooltip title="Toggle columns">
          <IconButton onClick={this.handleColumnToggleClick}>
            <ViewColumn />
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
                  value={element.id}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Popover>
        <Button component={Link} to={`/${DEFAULT_URL}`}>
          Reset
        </Button>
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
          pageSize={data.length}
          minRows={5}
          sorted={sorted}
          filterable
          filtered={filtered}
          defaultFilterMethod={(filter, row) => {
            const id = filter.pivotId || filter.id;
            return row[id] != null
              ? String(row[id])
                  .toLowerCase()
                  .includes(filter.value.toLowerCase())
              : false;
          }}
          onSortedChange={newSorted => {
            this.setState({ sorted: newSorted });
          }}
          onFilteredChange={newFiltered => {
            this.setState({ filtered: newFiltered });
          }}
        />
      </Paper>
    );
  }
}

DevicesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  apolloClient: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withStyles(styles)(DevicesTable);
