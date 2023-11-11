import React, { useEffect } from 'react'
import Header from '../../components/adminDashboard/header/Header'
import NavBar from '../../components/adminDashboard/navbar/NavBar'
import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../login/Login'
import LoginForm from '../../components/login/LoginForm'
import Dashboard from '../../components/adminDashboard/dashboard/Dashboard'

export default function AdminDashboard() {

    return (
        <>
            {/* <Header />
            <NavBar />
            <Routes>
                <Route path='/chat' element={<Dashboard />} />
            </Routes> */}
        </>
    )
}
