import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Dish } from "../../../Models/Dish";
import { showToast } from "../../Toaster/toasterService";
import DishFormModal from "../../DishFormModal/DishFormModal";
import { ToastContainer } from "react-toastify";
import { Pen, Trash } from "react-bootstrap-icons";
import Table from "../../TestComponent/Table";
import interceptor from "../../../Interceptor/Interceptor";
import { useBackendUrl } from "../../../Contexts/BackendUrlContext";

interface ManageDishProps {
    data:Dish[]
    
}
 
const ManageDish: FC<ManageDishProps> = (props) => {


  const { backendUrl } = useBackendUrl();
    const [isModalOpen, setModalOpen] = useState(false);
   
   
    const handleOpenModal = () => {
      
        setModalOpen(true);
      };
  
      const handleCloseModal = () => {
        setModalOpen(false);
      };
  
      const handleDishSubmit = (dish: Dish) => {
    
        console.log("Submitted Dish:", dish);
        axios
          .post(`${backendUrl}/api/Dishs/add`, dish)
          .then((response) => {
           
            console.log("Response:", response);
            showToast('Dish Added Succefully!');
  
          })
          .catch((error) => {
            // Handle errors
            if (error.response) {
              if (error.response.status === 404) {
                console.log(error)
                console.error("enable to add dish.");
              } else {
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
            showToast(error.response)
          });
      };
  
  
      return (
        <div className="pt-5">
          <div className="pb-5 d-flex align-items-center justify-content-center mt-5">
            <input
              className="addDishs me-5"
              onClick={handleOpenModal}
              type="button"
              value="Add new Dish"
            />
            <input
              id="addnewCategory"
              className="addDishs"
              type="button"
              value="Add new Category"
            />
  
            <DishFormModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleDishSubmit}
            />
          </div>
          <div className="d-flex align-items-center justify-content-center mb-5">
    
        <ToastContainer />
  
              {/* <table className="white  text-center mb-xxl-5 ">
                <thead>
                  <tr>
                    <th className="white textShadow">Actions</th>
                    <th className="white textShadow">id</th>
                    <th className="white textShadow">Dish name</th>
                    <th className="white textShadow">Dish photo</th>
                    <th className="white textShadow">Dish category</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((dish: Dish) => (
                    <tr key={dish.dishId}>
                      <td>
                        <Pen color="white" className="me-3 clickable"></Pen>
                        <Trash color="red" className="clickable">
                          {" "}
                        </Trash>
                      </td>
                      <td>{dish.dishId}</td>
                      <td>{dish.dishName}</td>
                      <td>
                        <img
                          src={dish.dishPhoto}
                          alt="dishPhoto"
                          height={50}
                          width={50}
                        />
                      </td>
                      <td>{dish.dishCategory}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr> <th>Actions</th>
                    <th>id</th>
                    <th>Dish name</th>
                    <th>Dish photo</th>
                    <th>Dish category</th>
                    </tr>
                  </tfoot>
              </table> */}
              <Table data={props.data} itemsPerPage={7}></Table>
            
          </div>
        </div>
      );
}
 
export default ManageDish;