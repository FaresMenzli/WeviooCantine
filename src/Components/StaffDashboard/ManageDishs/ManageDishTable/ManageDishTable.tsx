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
import { styled, TablePagination, Tooltip,IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@mui/material';
import UpdateQuantityModal from '../../../UpdateQuantityModal/UpdateQuantityModal';
import { useBackendUrl } from '../../../../Contexts/BackendUrlContext';
import UpdateDishDialog from './UpdateDishDialog/UpdateDishDialog';
import {DeleteForeverOutlined, EditOutlined, Filter9PlusOutlined} from '@mui/icons-material';
import { pink } from '@mui/material/colors';



interface ManageDishTableProps {
    data:Dish[]

}

const ManageDishTable: React.FC<ManageDishTableProps> = ({ data  }) => {
  const [isEditDishDialogOpen, setEditDishDialogOpen] = React.useState(false);
  const [dishToUpdate, setDishToUpdate] = React.useState<Dish>();
  const [dishToDelete, setDishToDelete] = React.useState< number | undefined>(0);
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isQuantityModalOpen, setQuantityModalOpen] = React.useState(false);
  const [DishToUpdateQuantity, setDishToUpdateQuantity] = React.useState<Dish[] | undefined>();
  const [search, setSearch] = React.useState("");
  const { backendUrl } = useBackendUrl();
  const [openDialog, setOpenDialog] = React.useState(false);
  const deleteDialogOpen = () => {
    setOpenDialog(true);
  };

  const deleteDialogClose = () => {
    setOpenDialog(false);
  };
  const handleEditDishDialogOpen = (dishToUpdate:Dish) => {
    setDishToUpdate(dishToUpdate)
    setEditDishDialogOpen(true);
  };

  const handleEditDishDialogClose = () => {
    setEditDishDialogOpen(false);
  };

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
   const deleteDish =(dishToDelete: number | undefined) =>  {
    console.log(dishToDelete)
  }

  return (
     <Paper  sx={{ width: '100%'  }}> 
   <UpdateQuantityModal  isOpen={isQuantityModalOpen} onClose={handleCloseModal}  dish={DishToUpdateQuantity?DishToUpdateQuantity[0]:null}></UpdateQuantityModal>

    <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
        <input value={search}  onChange={(e) => setSearch(e.target.value)} className='ms-2' placeholder='search' type="text"/>
        <TableHead sx={{position:"sticky" ,  zIndex: isQuantityModalOpen ? 0 : 1}}>
          <TableRow>
            <StyledTableCell>Dish Name </StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
         

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
             <TableCell  className={`${(item as Dish).quantityAvailable >0 ? '':'text-light'}`}  align="center">
             
             <Tooltip title="Edit Dish">
  <IconButton onClick={()=>handleEditDishDialogOpen(item)}>
    <EditOutlined sx={{ color:`${(item as Dish).quantityAvailable >0 ? 'primary' : "#eceff1"}`}} />
  </IconButton>
</Tooltip>
<Tooltip title="Edit Dish Quantity">
  <IconButton onClick={()=>updateQuantity((item as Dish).dishId)}>
    <Filter9PlusOutlined sx={{ color:`${(item as Dish).quantityAvailable >0 ? 'primary' : "#eceff1"}`}} />
  </IconButton>
</Tooltip>
<Tooltip title="Delete Dish">
  <IconButton>
    <DeleteForeverOutlined onClick={() => {
                          setDishToDelete((item as Dish).dishId);
                          deleteDialogOpen();
                        }} sx={{ color:`${(item as Dish).quantityAvailable >0 ? pink[500] : "#eceff1"}`}} />
  </IconButton>
</Tooltip>
             </TableCell>

       



             
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
     />
       <Dialog
        open={openDialog}
        onClose={deleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are You Sure To delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className="text-center bg-danger rounded-3 text-light"
            id="alert-dialog-description"
          >
            <b>
              {dishToDelete != 0
                ? data.filter((dish) => dish.dishId == dishToDelete)[0]
                    .dishName
                : ""}{" "}
           
            </b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteDialogClose}>Cancel</Button>
          <Button
            className="text-danger"
            onClick={() => deleteDish(dishToDelete)}
            autoFocus
          >
            Delete any way
          </Button>
        </DialogActions>
      </Dialog>
     <UpdateDishDialog open={isEditDishDialogOpen} handleClose={handleEditDishDialogClose} dish={dishToUpdate}></UpdateDishDialog>
     
     
     </Paper> 
  );
};




export default ManageDishTable;
