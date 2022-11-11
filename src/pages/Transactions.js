import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import Nofound from "./Nofound";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#dd4a48",
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const Transactions = () => {
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    api
      .transactions()
      .then((response) => {
        if (!response.error) {
          setTransactions(response.data);
        }
      })
      .catch(() => {});
      // eslint-disable-next-line
  }, []);

  return (
    <>
      {transactions && transactions.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell align="right">Order Id</StyledTableCell>
                  <StyledTableCell align="right">Type</StyledTableCell>
                  <StyledTableCell align="right">
                    Transaction Id
                  </StyledTableCell>
                  <StyledTableCell align="right">Message</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions &&
                  transactions.map((transaction, index) => {
                    const { amount, order_id, type, txn_id, message } =
                      transaction;
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {amount}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {order_id}
                        </StyledTableCell>
                        <StyledTableCell align="right">{type}</StyledTableCell>
                        <StyledTableCell align="right">
                          {txn_id}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {message}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <Nofound />
        </>
      )}
    </>
  );
};

export default Transactions;
