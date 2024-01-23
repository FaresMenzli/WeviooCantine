import React, { FC } from 'react';
import { LoginWrapper } from './Login.styled';

interface LoginProps {}

const Login: FC<LoginProps> = () => (
 
       <div className='bg center'>
    <div className='formBg'>
      <div className='logos'>
    <img className='weviooLogo' src={require('../../assets/logo_0.png')} alt="weviooLogo" />
   

    <img className='cantineLogo' src={require('../../assets/cantine.png')} alt="cantineLogo" /></div>
    Login to <b>Wevioo Cantine</b>
      <form >
        <input className='login' type="text" name="login"  placeholder='E-mail'/>
        <input className='login'type="text" name="password" id="" placeholder='password' />
        <input className='loginBtn' type="button" value="Login" name="" id=""  />
      </form>
      
    </div>
    </div>
 
);

export default Login;
