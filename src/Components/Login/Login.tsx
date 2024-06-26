import React, {  FC, FormEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import LogOut from '../Register/Register';
import { User } from '../../Models/User';

import axios from 'axios';
import { useAuth } from '../../Contexts/AuthContext';
 import  { useNavigate } from 'react-router-dom'; 
import { showToast } from '../Toaster/toasterService';
import { Bounce, Flip, ToastContainer } from 'react-toastify';
import styles from '../Register/Register.module.css';

import { useBackendUrl } from '../../Contexts/BackendUrlContext';
import { Alert, Typography } from '@mui/material';



interface LoginProps  {

}

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [register, setRegister] = useState<boolean>(false)
  const [login, setLogin] = useState( new User ())
  const { setToken,setUser } = useAuth();
  const updateParentState = (childValue:boolean) => {
    setRegister(childValue);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
      
    }));
    setEmail(e.target.value);
  };
  const { backendUrl } = useBackendUrl();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const validateEmail = () => {
    const re = /^[A-Za-z0-9._%+-]+@wevioo\.com$/i;
    if (!re.test(email)) {
      setEmailError('Invalid email address');
      showToast("The E-mail should be example@Wevioo.com",{ type:'warning',theme: "dark",autoClose: false ,transition:Flip})
    } else {
      setEmailError('');
    }
  };
   
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    axios
      .post(`${backendUrl}/api/v1/auth/authenticate`, login)
      .then((response) => {
        console.log(login.userEmail)
        const token = response.data.token;
        setToken(token);
        navigate('/home');
      })
      .then((res)=> axios.post(`${backendUrl}/api/user/getUser` ,login).then(res=>{ console.log(res.data); setUser(res.data) ;}))
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            showToast('Invalid credentials' ,{ type:'error',theme: "colored",
            transition: Bounce,})
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
  
  };

   const handlePassword = () => {
     setPasswordEmpty(!login.userPassword) 
  }

  function ToForgottenPassword() {
    navigate('/forgot-password');
  }

  return(
 <>
       <div className='bg center'>

{!register?
    (<> <div className='formBg' >
       
      <div className='logos'>
    <img className='weviooLogo' src={require('../../assets/logo_0.png')} alt="weviooLogo" />
   

    <img className='cantineLogo' src={require('../../assets/cantine.png')} alt="cantineLogo" /></div>
    Login to <b>Wevioo Cantine</b>
      <form className='mb-2' onSubmit={handleSubmit}>
        <input className={`${emailError? ' border border-danger' :''} login`} type="text" name="userEmail"  placeholder='E-mail' onChange={handleInputChange} onBlur={validateEmail}/><br></br> {emailError &&  <Alert className='mx-5' severity="error">{emailError}</Alert>}
        {/* <span className={styles.errorMessage}>{emailError}</span> */}
        <input className={`${passwordEmpty? ' border border-danger' :''} login`} type="text" name="userPassword" id="" placeholder='password' onChange={handleInputChange} onBlur={handlePassword}/><br></br> {passwordEmpty &&<Alert className='mx-5' severity="error">the Password is obligatoire</Alert>}
        {/* <span className={styles.errorMessage}>the Password is obligatoire</span> */}
        <input className={`${emailError || !login.userPassword? 'notLogin' :'loginBtn'}`} disabled={emailError|| !login.userPassword?true:false} type="submit" value="Login" name="" id=""/>
      </form>
      <div className='d-flex flex-column'>
      <b className=''>password forgotten ? <u onClick={ToForgottenPassword} className='clickable'>Click Hier</u></b>
      <b>Don't have an account yet?  <u className='clickable' onClick={()=>setRegister(true)}>Sign Up</u></b>
      </div>
    </div>
    <ToastContainer />
    </>
       )
    :
 
    
   (<LogOut updateParentState={updateParentState}></LogOut>)
  }
  </div>
  </>
)};

export default Login;
