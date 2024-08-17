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
import ManageDishTable from "./ManageDishTable/ManageDishTable";

interface ManageDishProps {
  data: Dish[];
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
        showToast("Dish Added Succefully!");
      })
      .catch((error) => {
        // Handle errors
        if (error.response) {
          if (error.response.status === 404) {
            console.log(error);
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
        showToast(error.response);
      });
  };

  return (
    <div className="pt-1 " style={{maxHeight:"100vh"}}>
      <div className="pb-1 d-flex align-items-center justify-content-center mt-5">
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
        <div
          className="   d-flex flex-column justify-content-center align-items-center w-100 py-2 px-3"
        
        >
          <div className=" rounded-3 w-75 bg-light p-2 ">
        
          <ManageDishTable data={props.data}></ManageDishTable>

          </div>
     
       

       
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageDish;
