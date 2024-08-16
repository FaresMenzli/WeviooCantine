import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dish } from '../../../../Models/Dish';
import { styled, TablePagination } from '@mui/material';
import { Trash,Pencil } from 'react-bootstrap-icons';
import UpdateQuantityModal from '../../../UpdateQuantityModal/UpdateQuantityModal';
import axios from 'axios';
import { useBackendUrl } from '../../../../Contexts/BackendUrlContext';



interface ManageDishTableProps {
    data:Dish[]

}

const ManageDishTable: React.FC<ManageDishTableProps> = ({ data  }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isQuantityModalOpen, setQuantityModalOpen] = React.useState(false);
  const [DishToUpdateQuantity, setDishToUpdateQuantity] = React.useState<Dish[] | undefined>();
  const [search, setSearch] = React.useState("");
  const { backendUrl } = useBackendUrl();


  const handleCloseModal = () => {
    setQuantityModalOpen(false);
  };
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    function updateQuantity(dishId: number | undefined) {
      setQuantityModalOpen(true)
      setDishToUpdateQuantity((data as Dish[]).filter(x=>x.dishId==dishId))
    
    }
   
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        
      },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));
  return (
     <Paper  sx={{ width: '100%'  }}> 
   <UpdateQuantityModal isOpen={isQuantityModalOpen} onClose={handleCloseModal}  dish={DishToUpdateQuantity?DishToUpdateQuantity[0]:null}></UpdateQuantityModal>

    <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
        <input value={search}  onChange={(e) => setSearch(e.target.value)} className='ms-2' placeholder='search' type="text"/>
        <TableHead sx={{position:"sticky"}}>
          <TableRow>
            <StyledTableCell>Dish Name </StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>

            <StyledTableCell align="center">Update quantity</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data
          .filter((dish: Dish) => {
            return search.toLowerCase() === ""
              ? dish
              : dish.dishName.toLocaleLowerCase().includes(search);
          }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
            <StyledTableRow
            className={`${(item as Dish).quantityAvailable >0 ? '':'text-bg-danger'}`}
              key={(item as Dish).dishId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell   className={`${(item as Dish).quantityAvailable >0 ? '':'text-light'}`} component="th" scope="row">
                {(item as Dish).dishName}
              </TableCell>
              <TableCell  className={`${(item as Dish).quantityAvailable >0 ? '':'text-light'}`}  align="center">{(item as Dish).dishPrice}</TableCell>
              <TableCell  className={`${(item as Dish).quantityAvailable >0 ? '':'text-light'}`}  align="center">{(item as Dish).dishCategory}</TableCell>
             
             <TableCell  className={`${(item as Dish).quantityAvailable >0 ? '':'text-light'}`}  align="center">{(item as Dish).quantityAvailable}</TableCell>
              <TableCell  className={`${(item as Dish).quantityAvailable >0 ? '':'text-light'}`}  align="center"> <Pencil className='clickable' onClick={()=>updateQuantity((item as Dish).dishId)}></Pencil></TableCell>
              <TableCell  className={`${(item as Dish).quantityAvailable >0 ? '':'text-light'}`}  align="center"> <Trash className='clickable' onClick={()=>updateQuantity((item as Dish).dishId)}></Trash></TableCell>



             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
       <TablePagination
       rowsPerPageOptions={[10, 25, 100]}
       component="div"
       count={data.length}
       rowsPerPage={rowsPerPage}
       page={page}
       onPageChange={handleChangePage}
       onRowsPerPageChange={handleChangeRowsPerPage}
     /></Paper> 
  );
};




export default ManageDishTable;
