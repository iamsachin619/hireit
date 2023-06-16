import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import apiHost from '../../env';
import { ModalManager } from '@mui/material';
import moment from 'moment'


export default function UserRentalsPage() {
  const [err ,setErr] = useState(null)
  const [orders, setOrders] = useState([])
  useEffect(() => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'user/usermyOrders',{
      credentials:'include',
      method: 'POST',
      headers: myHeaders
    })
      .then(res => {
        console.log({res})
        if(res.status == 200){
          return res
        }
      })
      .then(res => res.json())
      .then(res => {
        setOrders(res)
      })
      .catch(error => {setErr('Error fetching orders')})
  }, [])
  

  return (
    <div>
      <Toolbar/>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Book name</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Issue Date</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Days to Rent</TableCell>
            <TableCell align="right">Return Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.book.title}A</TableCell>
              <TableCell align="right">{moment(row.createdDate).format('L')}</TableCell>
              <TableCell align="right">{row.approvedBy != ''? moment(row.approvalDate).format('L'):'-'}</TableCell>
              <TableCell align="right">{row.approvedBy!=''? moment(row.dueDate).format('L'):'-'}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.noOfDaysToRent}</TableCell>
              <TableCell align="right">{row.returnDate? moment(row.returnDate).format('L'): '-' }</TableCell>
              <TableCell align="right">{row.Status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
