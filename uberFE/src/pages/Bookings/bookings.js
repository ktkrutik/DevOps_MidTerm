import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
// import TweetList from "./TweetList";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
//import axios from 'axios';

const THome = () => {
  // const [tweets, setTweets] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true); 
  
  useEffect(() => {
    const fetchData = async () => {
	  const res = await fetch("http://54.161.133.200:5000/booking-results");
	  // const res = await fetch("http://0.0.0.0:5000/booking-results");
      const { results } = await res.json();
      console.log(results);
      setRows([...results]);
	  setLoading(false);
    };
 
    fetchData();
  }, []);

  const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

  const columns = [
  { id: 'userName', label: 'Name', minWidth: 170 },
  { id: 'sourceCity', label: 'Source City', minWidth: 100 },
  { id: 'destinationCity', label: 'Destination City', minWidth: 100 },
  { id: 'dateTime', label: 'Date', minWidth: 100 },
];

const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root} >
      <TableContainer className={classes.container} style={{marginTop:"70px"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );

  // return (
  //   <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
	//   {loading ? (
	//     <ActivityIndicator
	// 	  style={[styles.centering]}
	// 	  color="#ff8179"
	// 	  size="large"
	//     />
	//   ) : (
	//     <TweetList tweets={tweets} />
	//   )}
  //   </ScrollView>
  // );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    marginTop: '60px'
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: "100vh"
  }
});

export default THome;
