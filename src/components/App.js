import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  withStyles
} from "@material-ui/core";
import { Smartphone } from "@material-ui/icons";
import DevicesTable from "./DevicesTable";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  container: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

function App(props) {
  const { classes, apolloClient } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Smartphone className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Linext
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.container}>
        <Typography variant="h3" gutterBottom>
          ...
        </Typography>
        <DevicesTable apolloClient={apolloClient} />
      </main>
    </React.Fragment>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  apolloClient: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
