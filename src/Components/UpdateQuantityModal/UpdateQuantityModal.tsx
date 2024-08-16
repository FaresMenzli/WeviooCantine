import { FC, useEffect, useState } from "react";
import { StyledModal } from "../DishFormModal/DishFormModal.styled";
import { Dish } from "../../Models/Dish";
import NumberInput from "./NumberInput/NumberInput";
import { showToast } from "../Toaster/toasterService";
import axios from "axios";
import { useBackendUrl } from "../../Contexts/BackendUrlContext";
import interceptor from "../../Interceptor/Interceptor";

interface UpdateQuantityModalProps {
    isOpen: boolean;
    onClose: () => void;
    dish: Dish | null;
}
 
const UpdateQuantityModal: FC<UpdateQuantityModalProps> = ({ isOpen, onClose, dish }) => {

    useEffect(() => {
        setQuantity(dish? dish.quantityAvailable:0)
    }, [dish])
    
    const [quantity, setQuantity] = useState<number>(0)  ;
    const { backendUrl } = useBackendUrl();
    
     const updateQuantity = ()=> {
       interceptor.put(`${backendUrl}/api/Dishs/updateDishQuantity/${dish?.dishId}`,quantity,{
        headers: {
            'Content-Type': 'application/json'
        }}).then(()=>window.location.reload())
       .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
          console.log(error.response)
          } else{
            console.error(
              "Server error:",
              error.response.status,
              error.response.data
            );
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }); 
        console.log(quantity)
     
    }

    return (<StyledModal className={"mt-5 h-75"}  isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}>
    
    <div className="modal-content align-items-center">
       
        <h3 className="text-center ">{dish?.dishName}</h3>
        <img height={200}  width={200} src={dish?.dishPhoto} alt={dish?.dishName} />
<div className="d-flex mt-2">
    <div>Actual quantity : </div>
    <div className="ms-2">{dish?.quantityAvailable}</div>
</div>

      <NumberInput value={quantity} onChange={setQuantity}></NumberInput>

        <input type="button"className="mt-3 btn btn-success " value="update" onClick={()=>updateQuantity()} />
    </div>
    </StyledModal>
 );
}
 
export default UpdateQuantityModal;