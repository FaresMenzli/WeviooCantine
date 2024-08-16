import { FC, useEffect, useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField
} from '@mui/material';
import { User } from "../../../../Models/User";
import interceptor from "../../../../Interceptor/Interceptor";
import { useBackendUrl } from "../../../../Contexts/BackendUrlContext";
import { showToast } from "../../../Toaster/toasterService";

interface UpdateUserDialogProps {
    open: boolean;
    handleClose: () => void;
    user: User |undefined;
}
 
const UpdateUserDialog : FC<UpdateUserDialogProps> = ({ open, handleClose, user }) => {
    const [userFirstName, setUserFirstName] = useState<string>('');
    const [userLastName, setUserLastName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userRole, setUserRole] = useState<string>('');
  const { backendUrl } = useBackendUrl();


  useEffect(() => {
    if (user){
   setUserFirstName(user!.userFirstName)
    setUserLastName(user!.userLastName)
    setUserEmail(user!.userEmail)
    setUserRole(user!.userRole)}
  }, [user])
  

    const handleSubmit = () => {
        const newUser = {
            userFirstName,
            userLastName,
            userEmail,
            userRole,
        };

        interceptor
        .put(`${backendUrl}/api/user/updateUser/${user!.userId}`, newUser, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(() => {
         
          showToast(
            `user updated succefully`
          );
       
        
        })
    }
    return (   <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please fill in the form to update the user details.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                label="First Name"
                type="text"
                fullWidth
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
            />
            <TextField
                margin="dense"
                label="Last Name"
                type="text"
                fullWidth
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
            />
            <TextField
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
            />
            <TextField
            disabled
                margin="dense"
                label="Role"
                type="text"
                fullWidth
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Update
            </Button>
        </DialogActions>
    </Dialog> );
}
 
export default UpdateUserDialog ;