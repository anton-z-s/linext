import React from "react";
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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];

function DevicesTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>vendor</TableCell>
            <TableCell>name</TableCell>
            <TableCell align="right">codename</TableCell>
            <TableCell align="right">battery capacity</TableCell>
            <TableCell align="right">cameras</TableCell>
            <TableCell align="right">screen</TableCell>
            <TableCell align="right">screen_res</TableCell>
            <TableCell align="right">storage</TableCell>
            <TableCell align="right">cpu</TableCell>
            <TableCell align="right">gpu</TableCell>
            <TableCell align="right">ram</TableCell>
            <TableCell align="right">wifi</TableCell>
            <TableCell align="right">bluetooth spec</TableCell>
            <TableCell align="right">width</TableCell>
            <TableCell align="right">height</TableCell>
            <TableCell align="right">depth</TableCell>
            <TableCell align="right">release</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

DevicesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DevicesTable);
