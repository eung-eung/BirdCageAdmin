import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const phoneNum = sessionStorage.getItem('phoneNum');
  const role = sessionStorage.getItem('role');

  if(sessionStorage.getItem('phoneNum') && sessionStorage.getItem('role')){
    return children;
  }
  return <Navigate to="/" />
 
};

export default ProtectedRoute;
