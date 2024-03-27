import {  useEffect } from "react";

import styles from "./Register.module.css"
import { useForm } from 'react-hook-form';
import { showToast } from "../Toaster/toasterService";
import { Flip, ToastContainer, Zoom } from "react-toastify";
import axios from "axios";
import { useBackendUrl } from "../../Contexts/BackendUrlContext";
interface ChildProps {
    updateParentState: (newValue: boolean) => void;
  }
  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
const LogOut: React.FC<ChildProps> = ({updateParentState}) => {
  const { backendUrl } = useBackendUrl();
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

    const handleButtonClick = () => {
      // Call the function passed from the parent to update its state
      updateParentState(false);
    };
    const onSubmit = (data: FormData) => {
      console.log(data);
      
      axios
      .post(`${backendUrl}/api/v1/auth/register`, data)
      .then((response) => {
        showToast("registered Succefully" , {type: "success",theme: "dark",
        transition: Zoom,})

       

      })
      .catch((error) => {
        // Handle errors
        console.log(error)
        if (error.response) {
         
          if (error.response.status === 409) {
            showToast(error.response.data ,{ type:'error',theme: "colored",
            })}
            
          else if (error.response.status === 404) {
          
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
    };
    
    useEffect(() => {
      if (errors.email)
      showToast("The E-mail should be example@Wevioo.com",{ type:'warning',theme: "dark",autoClose: 7000 ,transition:Flip})

    }, [errors.email])
    

    return(
        <>
        <div className='formBg'>
      <div className='logos'>
    <img className={styles.weviooLogoRegister} src={require('../../assets/logo_0.png')} alt="weviooLogo" />
   

    <img className={styles.cantineLogoRegister} src={require('../../assets/cantine.png')} alt="cantineLogo" /></div>
    Register to <b>Wevioo Cantine</b>
    <form className='mb-2' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input  className={`login ${errors.firstName ? styles.borderDanger : ''}`} placeholder="First Name"
          type="text"
          {...register('firstName', { required: 'First Name is required !!' })}
        />
        <br />
        {errors.firstName && <span className={styles.errorMessage}>{errors.firstName.message}</span>}
      </div>
      <div>
        <input  className={`login ${errors.lastName ? styles.borderDanger : ''}`}
          type="text" placeholder="Last Name"
          {...register('lastName', { required: 'Last Name is required !!' })}
        />
        <br />
        {errors.lastName && <span className={styles.errorMessage}>{errors.lastName.message}</span>}
      </div>
      <div>
        <input
        
        placeholder="E-mail"
        className={`login ${errors.email ? styles.borderDanger : ''}`}
          type="email"
          {...register('email', {
            required: 'Email is required !!',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@wevioo\.com$/i,
              message: 'Invalid email address',

              
            
            },
             /*  onBlur: () => (validateEmail) */
            
            
          
            

          })}
        />
        <br />
        {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
      </div>
      <div>
        <input
        placeholder="Password"
        className={`login ${errors.password ? styles.borderDanger : ''}`}
          type="password"
          {...register('password', { required: 'Password is required !!' })}
        />
        <br />
        {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
      </div>
      <button className='loginBtn' type="submit">Submit</button>
    </form>
      <b>if you already have an account, please <u className="clickable" onClick={handleButtonClick}>Log In</u></b>
      
      
    </div>
    <ToastContainer /></>
        
    )
}

export default LogOut;