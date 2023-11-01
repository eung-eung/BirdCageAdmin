import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CameraIcon from '@mui/icons-material/Camera';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import "./NavBar.css"
import avatar from "../../../images/profile.jpg"
import LogoutIcon from '@mui/icons-material/Logout';
import UseToken from '../../handleToken/UseToken';
import { jwtDecode } from 'jwt-decode';
import Logout from '../../logout/Logout';

export default function NavBar() {
    const phoneNum = sessionStorage.getItem('phoneNum');
    const role = sessionStorage.getItem('role');


    return (
        <div className='nav-links'>
            <div className='user-container'>
                <img className="avatar" src={avatar} />
                <div className='user-detail'>
                    <p>{phoneNum}</p>
                    <p>{role}</p>
                </div>
            </div>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'} to="/dashboard">
                <DashboardIcon className='nav-icon' /> Dashboard
            </NavLink>
            {role && role !== 'staff' ? (
                <NavLink
                    className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'}
                    to="/user"
                >
                    <AccountCircleIcon className='nav-icon' /> Users
                </NavLink>
            ) : null}
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'} to="/custom">
                <CameraIcon className='nav-icon' /> Custom Cages Management
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'} to="/cage">
                <SubscriptionsIcon className='nav-icon' /> Cages Management
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'} to="/orders">
                <ListAltIcon className='nav-icon' /> Orders
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'} to="/feedback">
                <AssignmentIcon className='nav-icon' /> Feedbacks
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'} to="/logout">
                <LogoutIcon className='nav-icon' /> Logout
            </NavLink>
        </div>
    )
}

