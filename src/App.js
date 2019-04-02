import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, CssBaseline } from "@material-ui/core";
import { Smartphone } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  }
});

function App(props) {
  const { classes } = props;

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
      <main>
        <Typography variant="h3" gutterBottom>
          ...
        </Typography>
      </main>
    </React.Fragment>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
