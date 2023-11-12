import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import ProcessingTable from './processing/ProcessingTable'
import { Button } from '@mui/material'
import "./Orders.css"
import DeliveringTable from './delivering/DeliveringTable'
import CompletedTable from './completed/CompletedTable'
import CanceledTable from './canceled/CanceledTable'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
export default function Orders() {
    document.title = "Orders Management"
    const [processingOrder, setProcessingOrder] = useState([]);
    const [deliveringOrder, setDeliveringOrder] = useState([]);
    const [completedOrder, setCompletedOrder] = useState([]);
    const [canceledOrder, setCanceledOrder] = useState([]);
    const [eventRefresh, setEventRefresh] = useState(false)
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {

    }, [eventRefresh]);
    const handleRefresh = () => {
        console.log("a")
        setEventRefresh(prev => !prev)

    }

    console.log(canceledOrder)
    return (

        <div style={{ marginTop: "80px", marginLeft: "20%" }} className="service-container">
            <Box >
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab sx={{ width: "25%" }} label="Pending" value="1" />
                            <Tab sx={{ width: "25%" }} label="Delivering" value="2" />
                            <Tab sx={{ width: "25%" }} label="Completed" value="3" />
                            <Tab sx={{ width: "25%" }} label="Canceled" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><ProcessingTable /></TabPanel>
                    <TabPanel value="2"><DeliveringTable /></TabPanel>
                    <TabPanel value="3"><CompletedTable /></TabPanel>
                    <TabPanel value="4"><CanceledTable /></TabPanel>
                </TabContext>
            </Box>
            {/* <div className="service-title">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Processing orders
                </h1>
            </div>
            <div className="service-content">
                <ProcessingTable handleCallback={handleRefresh} data={processingOrder} />
            </div>
            <div className="service-title">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Delivering orders
                </h1>
            </div>
            <div className="service-content">
                <DeliveringTable handleCallback={handleRefresh} data={deliveringOrder} />
            </div>
            <div className="service-title">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Completed orders
                </h1>{" "}
            </div>
            <div className="service-content">
                <CompletedTable data={completedOrder} />
            </div>
            <div className="service-title">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Canceled orders
                </h1>
            </div>
            <div className="service-content" style={{ marginBottom: "100px" }}>
                <CanceledTable data={canceledOrder} />
            </div> */}
        </div>
    )
}
