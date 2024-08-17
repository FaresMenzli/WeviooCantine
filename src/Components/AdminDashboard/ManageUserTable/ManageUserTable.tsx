import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {PersonRemoveOutlined, ManageAccountsOutlined, SupervisedUserCircleOutlined} from '@mui/icons-material';
import {
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  TablePagination,
} from "@mui/material";
import { User } from "../../../Models/User";
import UpdateRoleModal from "../UpdateRoleModal/UpdateRoleModal";
import { useBackendUrl } from "../../../Contexts/BackendUrlContext";
import UpdateUserDialog from "./UpdateUserDialog/UpdateUserDialog ";
import { pink } from "@mui/material/colors";

interface ManageUserTableProps {
  data: User[];
}

const ManageUserTable: React.FC<ManageUserTableProps> = ({ data }) => {
  const [isEditUserDialogOpen, setEditUserDialogOpen] = React.useState(false);
  const [userToUpdate, setUserToUpdate] = React.useState<User>();


  const handleEditUserDialogOpen = (userToUpdate:User) => {
    setUserToUpdate(userToUpdate)
      setEditUserDialogOpen(true);
  };

  const handleEditUserDialogClose = () => {
      setEditUserDialogOpen(false);
  };

  const [page, setPage] = React.useState(0);
  const [isUpdateRoleModalOpen, setUpdateRoleModalOpen] = React.useState(false);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isQuantityModalOpen, setQuantityModalOpen] = React.useState(false);
  const [userToUpdateRole, setUserToUpdateRole] = React.useState<
    User[] | undefined
  >();
  const { backendUrl } = useBackendUrl();
  const [userToDelete, setUserToDelete] = React.useState(0);

  const [search, setSearch] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleCloseModal = () => {
    setUpdateRoleModalOpen(false);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function UpdateRole(id: number): void {
    setUserToUpdateRole(data.filter((user: User) => user.userId === id));
    setUpdateRoleModalOpen(true);
  }

  const deleteUser = (id: number) => {
    console.log("userdeleted");
    /*   axios.delete(`${backendUrl}/deleteUserById/${id}`);
        window.location.reload(); */
  };

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <Paper sx={{ width: "100%" }}>
      <UpdateRoleModal
        isOpen={isUpdateRoleModalOpen}
        onClose={handleCloseModal}
        user={userToUpdateRole ? userToUpdateRole[0] : undefined}
      ></UpdateRoleModal>
      <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            type="text"
          />
          <TableHead sx={{ position: "sticky",zIndex:isUpdateRoleModalOpen ?0:1 }}>
            <TableRow>
             
              <StyledTableCell align="center">User </StyledTableCell>
              <StyledTableCell align="center">User Email </StyledTableCell>
              <StyledTableCell align="center">Actual Role </StyledTableCell>
              <StyledTableCell align="center">Actions </StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((user: User) => {
                return search.toLowerCase() === ""
                  ? user
                  : user.userFirstName.toLocaleLowerCase().includes(search);
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <StyledTableRow
                  key={(item as User).userId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                

                  <TableCell component="th" scope="row">
                    {(item as User).userFirstName} <b>{(item as User).userLastName}</b>
                  </TableCell>
                  <TableCell align="center">
                    {(item as User).userEmail}
                  </TableCell>
                  <TableCell align="center">
                    {(item as User).userRole}
                  </TableCell>
                  {/* <TableCell align="center">
                    <input
                      onClick={() => UpdateRole((item as User).userId)}
                      type="button"
                      value={"update Role"}
                    ></input>
                  </TableCell> */}
                  <TableCell align="center">
                  <Tooltip title="Edit user details">
  <IconButton onClick={()=>handleEditUserDialogOpen(item)}>
    <ManageAccountsOutlined  />
  </IconButton>
  </Tooltip>
  <Tooltip title="update Role">
  <IconButton onClick={() => UpdateRole((item as User).userId)}>
    <SupervisedUserCircleOutlined  />
  </IconButton>
  </Tooltip>
             
             
  <Tooltip title="Delete User">
  <IconButton  onClick={() => {
                          setUserToDelete((item as User).userId);
                          handleClickOpen();
                        }}>
    <PersonRemoveOutlined sx={{ color: pink[500] }} />
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
        onClose={handleClose}
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
              {userToDelete != 0
                ? data.filter((user) => user.userId == userToDelete)[0]
                    .userFirstName
                : ""}{" "}
              {userToDelete != 0
                ? data.filter((user) => user.userId == userToDelete)[0]
                    .userLastName
                : ""}
            </b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            className="text-danger"
            onClick={() => deleteUser(userToDelete)}
            autoFocus
          >
            Delete any way
          </Button>
        </DialogActions>
      </Dialog>
      <UpdateUserDialog open={isEditUserDialogOpen} handleClose={handleEditUserDialogClose} user={userToUpdate} />

    </Paper>
  );
};

export default ManageUserTable;
