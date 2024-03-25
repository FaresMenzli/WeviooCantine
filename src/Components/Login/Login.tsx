import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { LoginWrapper } from './Login.styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import LogOut from '../Register/Register';
import { User } from '../../Models/User';
import { log } from 'console';
import axios from 'axios';
import { useAuth } from '../../Contexts/AuthContext';
 import  { useNavigate } from 'react-router-dom'; 
import { showToast } from '../Toaster/toasterService';
import { Bounce, Flip, ToastContainer } from 'react-toastify';
import styles from '../Register/Register.module.css';
import interceptor from '../../Interceptor/Interceptor';
import {setConnectedUser} from "../../redux/connectedUser"
import { useBackendUrl } from '../../Contexts/BackendUrlContext';



interface LoginProps  {

}

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState('');
 /* const [user, setUser] = useState(new User()) */
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
        <input className='login' type="text" name="userEmail"  placeholder='E-mail' onChange={handleInputChange} onBlur={validateEmail}/><br></br> {emailError && <span className={styles.errorMessage}>{emailError}</span>}
        <input className='login'type="text" name="userPassword" id="" placeholder='password' onChange={handleInputChange} />
        <input className={`${emailError? 'notLogin' :'loginBtn'}`} disabled={emailError?true:false} type="submit" value="Login" name="" id=""/>
      </form>
      <b>Don't have an account yet?  <u className='clickable' onClick={()=>setRegister(true)}>Sign Up</u></b>
     
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
