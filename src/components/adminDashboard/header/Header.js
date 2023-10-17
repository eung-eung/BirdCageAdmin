import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import logo from "../../../images/bird-cage.png"
import "./Header.css"
export default function Header() {
    return (
        <div className='header-container'>
            <img className='image-logo' src={logo} />
            <div className='notification-box'>
                <Badge badgeContent={4} color='error'>
                    <NotificationsIcon color='action' />
                </Badge>
            </div>
        </div>
    )
}
