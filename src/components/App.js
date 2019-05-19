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
  Link
} from "@material-ui/core";
import { Smartphone, ViewColumn } from "@material-ui/icons";
import DevicesTable from "./DevicesTable";

const styles = theme => ({
  appBar: {
    position: "relative",
    backgroundColor: "#167C80",
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
  columnIconInText: { verticalAlign: "middle" }
});

function App(props) {
  const { classes, apolloClient } = props;

  return (
    <HashRouter basename="/">
      <CssBaseline />
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
          <Link
            href="https://www.lineageos.org/"
            target="_blank"
            rel="noopener"
          >
            {" "}
            LineageOS
          </Link>{" "}
          devices, presented in a convenient way.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          You can sort (hold Shift to multi-sort), filter devices, show/hide
          columns (
          <ViewColumn className={classes.columnIconInText} />
          ). All the info is straight out of official wiki, always up-to-date.
        </Typography>
        <DevicesTable apolloClient={apolloClient} />
      </main>
    </HashRouter>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  apolloClient: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
