import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import UseToken from '../handleToken/UseToken';

const ProtectedRoute = ({ children }) => {
  const {getRoleFromToken, getUserPhoneFromToken} = UseToken();

  if(getRoleFromToken() && getUserPhoneFromToken()){
    return children;
  }
  return <Navigate to="/" />
 
};

export default ProtectedRoute;
