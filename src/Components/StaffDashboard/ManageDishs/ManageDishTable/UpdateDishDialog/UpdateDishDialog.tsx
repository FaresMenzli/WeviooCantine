import { FC, useEffect, useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField,
    Select,
    SelectChangeEvent,
MenuItem,
InputLabel,
FormControl} from '@mui/material';
import { useBackendUrl } from "../../../../../Contexts/BackendUrlContext";
import { Dish } from "../../../../../Models/Dish";
import interceptor from "../../../../../Interceptor/Interceptor";
import { showToast } from "../../../../Toaster/toasterService";
import axios from "axios";


interface UpdateDishDialogProps {
    open: boolean;
    handleClose: () => void;
    dish: Dish |undefined;
}
 
const UpdateDishDialog : FC<UpdateDishDialogProps> = ({ open, handleClose, dish }) => {
    const [dishName, setDishName] = useState<string>('');
    const [dishOrigin, setDishOrigin] = useState<string>('');
    const [dishPhoto, setDishPhoto] = useState<string>('');
    const [dishCategory, setDishCategory] = useState<string>('');
    const [dishPrice, setDishPrice] = useState<number>(0);
  const { backendUrl } = useBackendUrl();
  const [Categories, setCategories] = useState([])
  const [selectedCategorie, setSelectedCategorie] = useState<string | undefined>();
  const handleChange = (event: SelectChangeEvent) => {
    setDishCategory(event.target.value );
  };
useEffect(() => {
    axios
    .get(`${backendUrl}/api/Dishs/categories`)
    .then((r) => setCategories(r.data));
}, []);


  useEffect(() => {

    
    if (dish){
        setDishName(dish!.dishName)
        setDishOrigin(dish!.dishOrigin)
        setDishPhoto(dish!.dishPhoto)
        setDishPrice(dish!.dishPrice)
        setDishCategory(dish!.dishCategory)


}
  }, [dish])
  

    const handleSubmit = () => {
        const newDish = {
            dishName,
            dishOrigin,
            dishPhoto,
            dishCategory,
            dishPrice
        };

        interceptor
        .put(`${backendUrl}/api/Dishs/updateDish/${dish!.dishId}`, newDish, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(() => {
         
          showToast(
            `dish updated succefully`
          );
       
        
        })
      
    }
    return (   <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Dish</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please fill in the form to update the dish details.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                label="Dish Name"
                type="text"
                fullWidth
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
            />
             <FormControl className="mt-1" fullWidth>
   <InputLabel id="demo-simple-select-label">Category</InputLabel>
<Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={dishCategory}
    label="Category"
    onChange={handleChange}
  >
    {Categories.map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
    
  </Select>
  </FormControl>

            <TextField
                margin="dense"
                label="Origin"
                type="text"
                fullWidth
                value={dishOrigin}
                onChange={(e) => setDishOrigin(e.target.value)}
            />
            <TextField
            
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                value={dishPrice}
                onChange={(e) => setDishPrice(Number(e.target.value))}
            />
             <TextField
            
            margin="dense"
            label="Photo"
            type="text"
            fullWidth
            value={dishPhoto}
            onChange={(e) => setDishPhoto(e.target.value)}
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
 
export default UpdateDishDialog ;