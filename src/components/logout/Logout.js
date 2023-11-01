import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {

    sessionStorage.removeItem('phoneNum'); 
    sessionStorage.removeItem('role'); 

    navigate('/');
  },[]);

  return null;
}
