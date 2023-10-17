import React from 'react'
import NavBar from '../navbar/NavBar'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'

export default function WithNav() {
    return (
        <div>
            <Header />
            <NavBar />
            <Outlet />
        </div>
    )
}
