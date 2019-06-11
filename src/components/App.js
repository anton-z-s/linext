import React from "react";
import { HashRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  withStyles,
  IconButton,
  SvgIcon,
  Link as MUILink,
  createMuiTheme,
  MuiThemeProvider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { Smartphone, ViewColumn, ExpandMore } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DevicesTable from "./DevicesTable";

const styles = theme => ({
  appBar: {
    position: "relative",
    marginBottom: theme.spacing.unit * 3
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  container: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  appName: { flexGrow: 1 },
  columnIconInText: { verticalAlign: "middle" },
  expansionPanelDetails: { flexDirection: "column" },
  expansionPanelExpanded: {
    margin: 0
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: "#167c80" },
    secondary: { main: "#008e9e" }
  },
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => "none"
  }
});

function App(props) {
  const { classes, apolloClient } = props;

  return (
    <HashRouter basename="/">
      <CssBaseline />
      <Route
        path="/"
        render={({ location, history }) => (
          <MuiThemeProvider theme={theme}>
            <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                <Smartphone className={classes.icon} />
                <Typography
                  className={classes.appName}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  Linext
                </Typography>
                <IconButton
                  href="https://github.com/anton-z-s/linext/"
                  target="_blank"
                  rel="noopener"
                  color="inherit"
                >
                  <SvgIcon>
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
                  </SvgIcon>
                </IconButton>
              </Toolbar>
            </AppBar>
            <main className={classes.container}>
              <Typography variant="h6" gutterBottom>
                This is a list of{" "}
                <MUILink
                  href="https://www.lineageos.org/"
                  target="_blank"
                  rel="noopener"
                >
                  {" "}
                  LineageOS
                </MUILink>{" "}
                devices, presented in a convenient way.
              </Typography>

              <ExpansionPanel
                classes={{ expanded: classes.expansionPanelExpanded }}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1">
                    How-to use & examples
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails
                  className={classes.expansionPanelDetails}
                >
                  <Typography variant="subtitle1" paragraph gutterBottom>
                    You can sort (hold Shift to multi-sort), filter devices (use
                    comma for multiple values), show/hide columns (
                    <ViewColumn className={classes.columnIconInText} />
                    ). All the info is straight out of the official wiki, always
                    up-to-date.
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Here are some examples of what you can get:
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <Link to="/?columns=vendor|name|cameras|screen|screen_res|battery_capacity|ram|current_branch|release&sorted=release_desc&filtered=W3siaWQiOiJtYWludGFpbmVkIiwidmFsdWUiOlsiWWVzIl19LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJ0eXBlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfSx7ImlkIjoidmVuZG9yIiwidmFsdWUiOltdfSx7ImlkIjoicmVsZWFzZSIsInZhbHVlIjpbIjIwMTgiXX0seyJpZCI6ImN1cnJlbnRfYnJhbmNoIiwidmFsdWUiOlsiMTYuMCJdfV0=">
                      LineageOS devices released in 2018, updated to v16.
                    </Link>
                    <br />
                    <Link to="/?columns=vendor|name|cameras|screen|screen_res|battery_capacity|ram|current_branch|release&sorted=release_desc&filtered=W3siaWQiOiJtYWludGFpbmVkIiwidmFsdWUiOlsiWWVzIl19LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJ0eXBlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfSx7ImlkIjoiY3VycmVudF9icmFuY2giLCJ2YWx1ZSI6W119LHsiaWQiOiJyZWxlYXNlIiwidmFsdWUiOltdfSx7ImlkIjoidmVuZG9yIiwidmFsdWUiOlsiR29vZ2xlIl19XQ==">
                      LineageOS devices released by Google.
                    </Link>
                    <br />
                    <Link to="/?columns=vendor|name|cameras|screen|screen_res|screen_tech|battery_capacity|ram|release|type&sorted=release_desc&filtered=W3siaWQiOiJ2ZW5kb3IiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjdXJyZW50X2JyYW5jaCIsInZhbHVlIjpbXX0seyJpZCI6ImJhdHRlcnlfdGVjaCIsInZhbHVlIjpbXX0seyJpZCI6ImFyY2hpdGVjdHVyZSIsInZhbHVlIjpbXX0seyJpZCI6Im1haW50YWluZWQiLCJ2YWx1ZSI6WyJZZXMiXX0seyJpZCI6InJlbGVhc2UiLCJ2YWx1ZSI6W119LHsiaWQiOiJ0eXBlIiwidmFsdWUiOlsidGFibGV0Il19XQ==">
                      Tablets with LineageOS support.
                    </Link>
                    <br />
                    <Link to="/?columns=vendor|name|cameras|screen|screen_res|screen_tech|ram|release&sorted=release_desc&filtered=W3siaWQiOiJtYWludGFpbmVkIiwidmFsdWUiOlsiWWVzIl19LHsiaWQiOiJ2ZW5kb3IiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjdXJyZW50X2JyYW5jaCIsInZhbHVlIjpbXX0seyJpZCI6InR5cGUiLCJ2YWx1ZSI6W119LHsiaWQiOiJyZWxlYXNlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfSx7ImlkIjoic2NyZWVuX3RlY2giLCJ2YWx1ZSI6ImFtb2xlZCJ9LHsiaWQiOiJyYW0iLCJ2YWx1ZSI6IjYsOCJ9XQ==">
                      LineageOS devices with 6 or 8 GB of RAM and AMOLED screen.
                    </Link>
                    <br />
                    <Link to="/?columns=vendor|name|cameras|screen|screen_res|soc|cpu|ram|release&sorted=release_desc&filtered=W3siaWQiOiJtYWludGFpbmVkIiwidmFsdWUiOlsiWWVzIl19LHsiaWQiOiJ2ZW5kb3IiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjdXJyZW50X2JyYW5jaCIsInZhbHVlIjpbXX0seyJpZCI6InR5cGUiLCJ2YWx1ZSI6W119LHsiaWQiOiJyZWxlYXNlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfSx7ImlkIjoic29jIiwidmFsdWUiOlsiUXVhbGNvbW0gU0RNODQ1IFNuYXBkcmFnb24gODQ1IiwiUXVhbGNvbW0gTVNNODk5OCBTbmFwZHJhZ29uIDgzNSJdfV0=">
                      LineageOS devices with Snapdragon 845 and 835.
                    </Link>
                    <br />
                    <Link to="/?columns=vendor|name|cameras|screen|screen_res|ram|maintained|release&sorted=release_desc&filtered=W3siaWQiOiJ2ZW5kb3IiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJzb2MiLCJ2YWx1ZSI6W119LHsiaWQiOiJjcHVfY29yZXMiLCJ2YWx1ZSI6W119LHsiaWQiOiJncHUiLCJ2YWx1ZSI6W119LHsiaWQiOiJjdXJyZW50X2JyYW5jaCIsInZhbHVlIjpbXX0seyJpZCI6InR5cGUiLCJ2YWx1ZSI6W119LHsiaWQiOiJyZWxlYXNlIiwidmFsdWUiOltdfSx7ImlkIjoiYmF0dGVyeV90ZWNoIiwidmFsdWUiOltdfSx7ImlkIjoiYXJjaGl0ZWN0dXJlIiwidmFsdWUiOltdfSx7ImlkIjoibWFpbnRhaW5lZCIsInZhbHVlIjpbIk5vIl19XQ==">
                      LineageOS devices that are no longer maintained.
                    </Link>
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <DevicesTable
                apolloClient={apolloClient}
                location={location}
                history={history}
              />
            </main>
          </MuiThemeProvider>
        )}
      />
    </HashRouter>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  apolloClient: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
