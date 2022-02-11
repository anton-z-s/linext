import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Input,
  Link as MUILink,
  ListItemText,
  MenuItem,
  Paper,
  Popover,
  Select,
  TextField,
  Tooltip
} from "@material-ui/core";
import { ViewColumn } from "@material-ui/icons";
import { FAILSAFE_SCHEMA, safeLoad } from "js-yaml";
import ReactTable, { ReactTableDefaults } from "react-table";
import { Link } from "react-router-dom";
import GET_DEVICES from "../queries/devicesWiki";

import "react-table/react-table.css";

// TODO form default URL on first load, so there is no inconsistency between this and initial state
const DEFAULT_URL =
  "?columns=vendor|name|cameras|screen|screen_res|ram|release&sorted=release_desc&filtered=W3siaWQiOiJtYWludGFpbmVkIiwidmFsdWUiOlsiWWVzIl19LHsiaWQiOiJ2ZW5kb3IiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjdXJyZW50X2JyYW5jaCIsInZhbHVlIjpbXX0seyJpZCI6InR5cGUiLCJ2YWx1ZSI6W119LHsiaWQiOiJyZWxlYXNlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfV0=";

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
    minWidth: 700,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  formControlLabel: {
    fontSize: "1rem"
  },
  filterSelect: {
    width: "100%"
  },
  filterSelectItemText: {
    padding: 0
  },
  filterSelectItem: {
    paddingLeft: "12px"
  },
  filterSelectItemReset: {
    paddingLeft: "48px !important"
  },
  customFilter: {
    width: "100%"
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
      // next ones are necessary for selectable filters
      {
        id: "maintained",
        value: ["Yes"]
      },
      {
        id: "vendor",
        value: []
      },
      {
        id: "cpu",
        value: []
      },
      {
        id: "soc",
        value: []
      },
      {
        id: "cpu_cores",
        value: []
      },
      {
        id: "gpu",
        value: []
      },
      {
        id: "current_branch",
        value: []
      },
      {
        id: "type",
        value: []
      },
      {
        id: "release",
        value: []
      },
      {
        id: "battery_tech",
        value: []
      },
      {
        id: "architecture",
        value: []
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
        Filter: this.getFilterSelector("vendor"),
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
        accessor: v => getNestedObject(v, ["screen", "size"]),
        show: true
      },
      {
        id: "screen_res",
        Header: "Screen resolution",
        accessor: v => getNestedObject(v, ["screen", "resolution"]),
        show: true
      },
      {
        id: "screen_ppi",
        Header: "Screen ppi",
        accessor: v => getNestedObject(v, ["screen", "density"]),
        show: false
      },
      {
        id: "screen_tech",
        Header: "Screen technology",
        accessor: v => getNestedObject(v, ["screen", "technology"]),
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
        Filter: this.getFilterSelector("battery_tech", null, [
          "None",
          "Li-Po",
          "Li-Ion"
        ]),
        style: { whiteSpace: "pre-wrap" },
        show: false
      },
      {
        id: "architecture",
        Header: "Architecture",
        accessor: v => getNestedObject(v, ["architecture", "cpu"]),
        Filter: this.getFilterSelector("architecture", v =>
          getNestedObject(v, ["architecture", "cpu"])
        ),
        filterMethod: (filter, row) => {
          const id = filter.pivotId || filter.id;
          if (filter.value.length === 0) return true;
          if (Array.isArray(filter.value)) {
            return row[id] != null
              ? filter.value.some(val => row[id] === val)
              : false;
          }
          return row[id] != null ? row[id] === filter.value : false;
        },
        show: false
      },
      {
        id: "soc",
        Header: "System on a chip",
        accessor: "soc",
        Filter: this.getFilterSelector("soc"),
        show: false
      },
      {
        id: "cpu",
        Header: "CPU",
        accessor: "cpu",
        Filter: this.getFilterSelector("cpu"),
        show: false
      },
      {
        id: "cpu_cores",
        Header: "CPU cores",
        accessor: "cpu_cores",
        Filter: this.getFilterSelector("cpu_cores"),
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
        Filter: this.getFilterSelector("gpu"),
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
        accessor: v => getNestedObject(v, ["width"]),
        show: false
      },
      {
        id: "height",
        Header: "Height",
        accessor: v => getNestedObject(v, ["height"]),
        show: false
      },
      {
        id: "depth",
        Header: "Depth",
        accessor: v => getNestedObject(v, ["depth"]),
        show: false
      },
      {
        id: "maintained",
        Header: "Maintained",
        accessor: v => (v.maintainers.length ? "Yes" : "No"),
        Filter: this.getFilterSelector("maintained", null, ["Yes", "No"]),
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
        Filter: this.getFilterSelector("current_branch"),
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
        Filter: this.getFilterSelector(
          "release",
          v => getNewestNestedDate(v, ["release"]).split("-")[0]
        ),
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
        Filter: this.getFilterSelector("type"),
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

  // Values for selectable filters
  uniqueValues = [];

  // Whether value for selectable filters should be gray-out
  uniqueValuesDisabled = [];

  componentDidMount() {
    const { columns, filtered } = this.state;
    const { apolloClient, location, history } = this.props;
    const stateFromURL = getStateFromURL(columns, location.search);
    apolloClient
      .query({
        query: GET_DEVICES
      })
      .then(result =>
        this.setState(
          {
            data: result.data.repository.object.entries.map(entry =>
              safeLoad(entry.object.text, {
                schema: FAILSAFE_SCHEMA,
                json: true
              })
            ),
            loading: false,
            ...stateFromURL
          },
          () => {
            this.grayoutSelectableFilterOptions(filtered, columns);
            this.forceUpdate(); // TODO bad practice, find better way
          }
        )
      ); // FAILSAFE_SCHEMA will ensure that strings that what looks like date won't be converted

    // Listen to URL change
    history.listen(locationHist => {
      this.setState(
        { ...getStateFromURL(columns, locationHist.search) },
        () => {
          this.grayoutSelectableFilterOptions(
            this.state.filtered,
            this.state.columns
          ); // Have to use this.state instead of deconstructed var to get new value
          this.forceUpdate(); // TODO bad practice, find better way
        }
      );
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

  getFilterOptions(
    colId,
    selectedOptions,
    accessor = v => v[colId],
    uniqueValues = [...new Set(this.state.data.map(accessor))].sort()
  ) {
    const { classes } = this.props;

    if (!this.uniqueValues[colId] || this.uniqueValues[colId].length === 0) {
      this.uniqueValues[colId] = uniqueValues;
      this.uniqueValuesDisabled[colId] = Array(uniqueValues.length).fill(false);
    }

    return uniqueValues.map((value, i) => (
      <MenuItem
        disabled={this.uniqueValuesDisabled[colId][i]}
        className={classes.filterSelectItem}
        key={value}
        value={value}
      >
        <Checkbox checked={selectedOptions.includes(value)} />
        <ListItemText
          className={classes.filterSelectItemText}
          primary={value}
        />
      </MenuItem>
    ));
  }

  getFilterSelector(colId, accessor, uniqueValues) {
    return ({ onChange }) => {
      const selectedOptions = this.state.filtered.find(f => f.id === colId)
        .value;
      const { classes } = this.props;

      return (
        <Select
          className={classes.filterSelect}
          multiple
          value={selectedOptions}
          onChange={event => {
            selectedOptions.length = 0;
            // not using setState() as there is need to monitor changes and for performance reasons
            if (!event.target.value.includes("Reset"))
              selectedOptions.push(...event.target.value);
            return onChange(selectedOptions);
          }}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(", ")}
        >
          {" "}
          <MenuItem
            className={classes.filterSelectItem}
            key="Reset"
            value="Reset"
          >
            <ListItemText
              className={classes.filterSelectItemReset}
              primary="Reset"
            />
          </MenuItem>
          {this.getFilterOptions(
            colId,
            selectedOptions,
            accessor,
            uniqueValues
          )}
        </Select>
      );
    };
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
    const { columns, filtered } = this.state;
    columns[columns.findIndex(x => x.id === event.target.value)].show =
      event.target.checked;
    this.setState({ columns: columns.slice() }, () => {
      this.grayoutSelectableFilterOptions(filtered, columns);
      this.forceUpdate(); // TODO bad practice, find better way
    }); // without making a shallow copy change doesn't get registered, as react doesn't handle nested updates
    // TODO reconsider when react-table v7 is out, avoid nested state https://stackoverflow.com/a/51136076
    // use immutability-helper
    // related https://github.com/tannerlinsley/react-table/issues/294#issuecomment-311457211

    //  TODO consider keeping in state only data that actually change ("show" property)
  };

  // Gray-out values in selectable filters that will show 0 rows
  grayoutSelectableFilterOptions = (
    newFiltered,
    columns = this.state.columns
  ) => {
    // get visible columns selectable filters
    const visibleSelectableColumns = columns.filter(
      col => col.show === true && col.Filter
    );

    visibleSelectableColumns.forEach(col => {
      const currentFilter = newFiltered.find(f => f.id === col.id);
      const otherFilters = newFiltered.filter(
        f => f.value.length !== 0 && f.id !== col.id
      );
      const oldFilterVal = currentFilter.value.slice();
      currentFilter.value = [];

      // filter the data with every filter except the one that's being tested
      const filteredData = this.reactTable
        .getResolvedState()
        .resolvedData.filter(row => {
          const filterRes = otherFilters.map(f => {
            const fCol = columns.find(c => c.id === f.id);
            const filteredMethod = fCol.filterMethod
              ? fCol.filterMethod
              : this.reactTable.props.defaultFilterMethod;
            return filteredMethod(f, row);
          });
          return filterRes.every(Boolean);
        });

      // test every value of current filter for the amount of rows it will show, if 0 then gray-out
      this.uniqueValues[col.id].forEach((val, i) => {
        currentFilter.value = val;
        const count = filteredData.filter(row => {
          const filteredMethod = col.filterMethod
            ? col.filterMethod
            : this.reactTable.props.defaultFilterMethod;
          return filteredMethod(currentFilter, row);
        }).length;
        this.uniqueValuesDisabled[col.id][i] = count === 0;
      });

      currentFilter.value = oldFilterVal;
    });
  };

  customFilter = ({ filter, onChange, column }) => {
    const { classes } = this.props;
    return (
      <TextField
        key={column.Header}
        className={classes.customFilter}
        onChange={event => {
          const cursor = event.target.selectionStart;
          const element = event.target;
          window.requestAnimationFrame(() => {
            element.selectionStart = cursor;
            element.selectionEnd = cursor;
          });
          onChange(event.target.value);
        }}
        value={filter ? filter.value : ""}
      />
    );
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
              {columns.map(column => (
                <FormControlLabel
                  classes={{ label: classes.formControlLabel }}
                  control={<Checkbox onChange={this.handleCToggle} />}
                  checked={column.show}
                  label={column.Header}
                  value={column.id}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Popover>
        <Button component={Link} to={`/${DEFAULT_URL}`}>
          Reset
        </Button>
        <ReactTable
          ref={r => {
            this.reactTable = r;
          }}
          data={data}
          columns={columns}
          className={classes.table}
          column={{
            ...ReactTableDefaults.column,
            style: { whiteSpace: "normal" },
            Filter: this.customFilter
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

            if (filter.value.length === 0) return true;
            // if drop-down filter
            if (Array.isArray(filter.value)) {
              return row[id] != null
                ? filter.value.some(val =>
                    String(row[id])
                      .toLowerCase()
                      .includes(val.toLowerCase())
                  )
                : false;
            }

            // if text filter has comma ("A, B" = "A" or "B")
            const splitValue = filter.value.split(",");
            return row[id] != null
              ? splitValue.some(val =>
                  val.trim() === ""
                    ? false
                    : String(row[id])
                        .toLowerCase()
                        .includes(val.trim().toLowerCase())
                )
              : false;
          }}
          onSortedChange={newSorted => {
            this.setState({ sorted: newSorted });
          }}
          onFilteredChange={newFiltered => {
            this.grayoutSelectableFilterOptions(newFiltered);
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
