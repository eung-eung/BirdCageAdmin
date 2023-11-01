import React from 'react'
import Header from '../header/Header'
import ProcessingTable from './processing/ProcessingTable'
import { Button } from '@mui/material'
import "./Orders.css"
import DeliveringTable from './delivering/DeliveringTable'
import CompletedTable from './completed/CompletedTable'
import CanceledTable from './canceled/CanceledTable'

export default function Orders() {
    return (
        <div style={{ marginTop: "80px" }} className='service-container'>
            <div className='service-title'>
                <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Processing orders</h1>
            </div>
            <div className='service-content'>
                <ProcessingTable />
             
            </div>
            <div className='service-title'>
            <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Delivering orders</h1>
            </div>
            <div className='service-content'>
                <DeliveringTable/>
            </div>
            <div className='service-title'>
            <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Completed orders</h1>            </div>
            <div className='service-content'>
                <CompletedTable/>
            </div>
            <div className='service-title'>
            <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Canceled orders</h1>
            </div>
            <div className='service-content' style={{marginBottom: '100px'}}>
                <CanceledTable />
            </div>
        </div>
    )
}
