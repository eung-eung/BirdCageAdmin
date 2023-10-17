import React from 'react'
import Header from '../header/Header'
import NavBar from '../navbar/NavBar'
import Card from './Card'
import "./Card.css"
import Revenue from './revenue/Revenue'
import StudioStatus from './studioStatus/StudioStatus'
import PieChart from './pieChart/PieChart'
const array = [
    {
        title: "Total users",
        total: '460',
        label: 'Users'
    },
    {
        title: "Web View",
        total: '3342',
        label: 'Viewers'
    },
    {
        title: "User applied",
        total: '77',
        label: 'Applicants'
    },
    {
        title: "Resigned Employees",
        total: '17',
        label: 'Employee'
    }
]
export default function Dashboard() {
    return (
        <div className='dashboard-container'>
            <div className='card-container'>
                {array.map(item => <Card item={item} />)}
            </div>
            <div className='chart-bar'>
                <h3 style={{ textAlign: "left", marginBottom: "20px" }}>Revenue</h3>
                <Revenue />
            </div>
            <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
                <div className='studio-status'>
                    <StudioStatus />
                </div>
                <div className='chart-pie'>
                    <h3>Top 3 Studio Revenue</h3>
                    <h4 style={{ color: "#0B1354" }}>450</h4>
                    <div style={{ height: "250px", marginTop: "30px" }}>
                        <PieChart />
                    </div>
                </div>

            </div>

        </div>
    )
}
