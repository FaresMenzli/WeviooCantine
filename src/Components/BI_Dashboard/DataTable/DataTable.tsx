import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserStats } from '../../../Models/UserStats'; 
import { TopDishData } from '../../../Models/TopDishData';


interface DataTableProps {
  data: UserStats[] | TopDishData[];
  DataType:string;
}

const DataTable: React.FC<DataTableProps> = ({ data ,DataType }) => {
  return (
    <TableContainer component={Paper}>
      {DataType=="userStats"? (
        <Table sx={{ minWidth:'100%'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Orders Number</TableCell>
            <TableCell align="right">Orders Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((stats) => (
            <TableRow
              key={(stats as UserStats).user.userFirstName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {(stats as UserStats).user.userFirstName} {(stats as UserStats).user.userLastName}
              </TableCell>
              <TableCell align="right">{(stats as UserStats).ordersNB}</TableCell>
              <TableCell align="right">{(stats as UserStats).ordersCoast}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>):DataType=="dishStats"?(  
           <Table sx={{ minWidth:'100%'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dish</TableCell>
            <TableCell align="right">Ordered </TableCell>
            <TableCell align="right">Orders Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((stats) => (
            <TableRow
              key={(stats as TopDishData).dishId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {(stats as TopDishData).dishName} 
              </TableCell>
              <TableCell align="right">{(stats as TopDishData).totalQuantitySoldAllDays}</TableCell>
              <TableCell align="right">{(stats as TopDishData).totalAmountAllDays}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>): (<>Fares</>)}
      
    </TableContainer>
  );
};




export default DataTable;
