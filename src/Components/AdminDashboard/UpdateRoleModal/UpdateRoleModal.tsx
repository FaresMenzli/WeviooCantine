import { FC, useEffect, useState } from "react";
import { useBackendUrl } from "../../../Contexts/BackendUrlContext";
import interceptor from "../../../Interceptor/Interceptor";
import { StyledModal } from "../../DishFormModal/DishFormModal.styled";
import { User } from "../../../Models/User";
import { showToast } from "../../Toaster/toasterService";
import { Bounce, Flip, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";
import "./UpdateRole.css";
interface UpdateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  fetchUsers : () => void ;
}

const UpdateRoleModal: React.FC<UpdateRoleModalProps> = ({
  isOpen,
  onClose,
  user,
  fetchUsers
}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | undefined>();
  const [roles, setRoles] = useState([]);
  const { backendUrl } = useBackendUrl();
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };
  useEffect(() => {
    interceptor
      .get(`${backendUrl}/api/user/roles`)
      .then((r) => setRoles(r.data));
  }, []);
  useEffect(() => {
    setSelectedRole(user?.userRole);
  }, [user]);

  const UpdateRole = () => {
    setBtnLoading(true);
    if (user?.userRole == selectedRole) {
      showToast(
        `The role of ${user?.userFirstName} is already ${selectedRole}`,
        {
          position: "top-right",
          type: "warning",
          theme: "dark",
          transition: Bounce,
        }
      );
      setBtnLoading(false);
    } else {
      interceptor
        .put(`${backendUrl}/api/user/${user?.userId}/role/${selectedRole}`)
        .then(() => {
          fetchUsers();
          showToast(
            `The role of ${user?.userFirstName} is changed to ${selectedRole}`
          );
       
        
        })
        .then(()=> { 
          setBtnLoading(false);
        onClose();} )
    }
  };

  return (
    <StyledModal
      className={"mt-5"}
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      {/* <ToastContainer /> */}
      <div className="d-flex flex-column mt-5">
        <h2 className="text-center mb-5">
          {" "}
          {user?.userFirstName} {user?.userLastName}
        </h2>
        <div className="d-flex justify-content-evenly  mb-4">
          <div>Actual Role</div>
          <div>{user?.userRole}</div>
        </div>
        <div className="d-flex justify-content-around ">
          <span>Change Role To</span>
          <select
            className="text-center"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            {roles.map((role) => (
              <option value={role}>{role}</option>
            ))}
          </select>
        </div>
        {btnLoading ? (
          <button className="btn btn-info mt-5" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        ) : (
          <input
            className="btn btn-info mt-5"
            type="button"
            value={"Update Role"}
            onClick={() => UpdateRole()}
          ></input>
        )}
      </div>
    </StyledModal>
  );
};

export default UpdateRoleModal;
