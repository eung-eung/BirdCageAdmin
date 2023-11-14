import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CameraIcon from "@mui/icons-material/Camera";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import "./NavBar.css";
import avatar from "../../../images/profile.jpg";
import LogoutIcon from "@mui/icons-material/Logout";
import UseToken from "../../handleToken/UseToken";
import { jwtDecode } from "jwt-decode";
import Logout from "../../logout/Logout";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
export default function NavBar() {
    const { getRoleFromToken, getUserPhoneFromToken } = UseToken();
    const phoneNum = getUserPhoneFromToken();
    const role = getRoleFromToken();

    return (
        <div className="nav-links">
            <div className="user-container">
                <img className="avatar" src={avatar} />
                <div className="user-detail">
                    <p>{phoneNum}</p>
                    <p>{role}</p>
                </div>
            </div>
            {role && role === "Manager" && (
                <>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        to="/dashboard"
                    >
                        <DashboardIcon className="nav-icon" /> Dashboard
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        to="/accounts"
                    >
                        <PeopleRoundedIcon className="nav-icon" /> Accounts
                    </NavLink>
                </>
            )}
            {/* {role && role !== 'staff' ? (
                <NavLink
                    className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'}
                    to="/user"
                >
                    <AccountCircleIcon className='nav-icon' /> Users
                </NavLink>
            ) : null} */}
            {role && role === "Staff" && (
                <>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        to="/custom"
                    >
                        <CameraIcon className="nav-icon" /> Custom Cages
                        Management
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        to="/cage"
                    >
                        <SubscriptionsIcon className="nav-icon" /> Cages
                        Management
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        to="/orders"
                    >
                        <ListAltIcon className="nav-icon" /> Orders
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        to="/components"
                    >
                        <LayersRoundedIcon className="nav-icon" /> Components
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        to="/vouchers"
                    >
                        <LoyaltyIcon className="nav-icon" /> Voucher
                    </NavLink>
                </>
            )}

            <NavLink
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
                to="/logout"
            >
                <LogoutIcon className="nav-icon" /> Logout
            </NavLink>
        </div>
    );
}
