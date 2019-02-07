import React, { Fragment, Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({});

const id = (function*() {
  let id = 0;
  while (true) {
    id += 1;
    yield id;
  }
})();

const rowData = (name, calories, fat, carbs, protein) => ({
  id: id.next().value,
  name,
  calories,
  fat,
  carbs,
  protein
});

const rows = new Array(50)
  .fill(null)
  .reduce(
    result =>
      result.concat([
        rowData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        rowData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        rowData('Eclair', 262, 16.0, 24, 6.0),
        rowData('Cupcake', 305, 3.7, 67, 4.3),
        rowData('Gingerbread', 356, 16.0, 49, 3.9)
      ]),
    []
  );

export default withStyles(styles)(
  class FullScreenDialogs extends Component {
    state = { open: false };

    onOpen = () => {
      this.setState({ open: true });
    };

    onClose = () => {
      this.setState({ open: false });
    };

    render() {
      const { classes } = this.props;

      return (
        <Fragment>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.onOpen}
          >
            Export Data
          </Button>
          <Dialog open={this.state.open} onClose={this.onClose}>
            <DialogTitle>Desserts</DialogTitle>
            <DialogContent>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat (g)</TableCell>
                    <TableCell align="right">Carbs (g)</TableCell>
                    <TableCell align="right">Protein (g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        {row.calories}
                      </TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">
                        {row.protein}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onClose} color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={this.onClose}
                color="primary"
              >
                Export
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );
    }
  }
);
