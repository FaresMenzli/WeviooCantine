import React, { useEffect } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './../../Contexts/AuthContext'; 

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[]; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const user = localStorage.getItem("userRole"); 
  const navigate = useNavigate();
useEffect(() => {
 console.log(user)
 console.log(roles)
}, [])


  if (!user) {
    // User not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user)) {
    // User doesn't have required role, redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

 
  return <React.Fragment>{children}</React.Fragment>;
};

export default PrivateRoute;