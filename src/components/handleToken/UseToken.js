import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';


export default function UseToken() {
    const [cookies, setCookie, removeCookie] = useCookies(['admin']);
    console.log(cookies.admin)

    const getToken = () => {
        try {
            const adminToken = cookies.admin
            if (adminToken) {
                if (jwtDecode(adminToken).id) return adminToken
            }
            return null
        } catch (error) {
            console.log(error);
            removeCookie("admin")
        }

    }

    const setToken = (token) => {
        setCookie("admin", token)
    }
    const removeToken = () => {
        removeCookie("admin")
        // navigate('/login')
    }
    return {
        setToken,
        getToken,
        removeToken

    }
}
