import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import ProcessingTable from './processing/ProcessingTable'
import { Button } from '@mui/material'
import "./Orders.css"
import DeliveringTable from './delivering/DeliveringTable'
import CompletedTable from './completed/CompletedTable'
import CanceledTable from './canceled/CanceledTable'

export default function Orders() {
    document.title = "Orders Management"
    const [processingOrder, setProcessingOrder] = useState([]);
    const [deliveringOrder, setDeliveringOrder] = useState([]);
    const [completedOrder, setCompletedOrder] = useState([]);
    const [canceledOrder, setCanceledOrder] = useState([]);
    const [eventRefresh, setEventRefresh] = useState(false)
    useEffect(() => {
        fetch("http://localhost:5000/api/v1/order", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((result) => {
                const data = result.orderByStatus;
                for (const [key, value] of Object.entries(data)) {
                    for (let i = 0; i < value.length; i++) {
                        console.log(`${value[i]._id + "    " + value[i]?.customer[0]?.account[0]?.phoneNumber}`)
                        value[i].phoneNumber = value[i]?.customer[0]?.account[0]?.phoneNumber;
                    }
                    switch (key) {
                        case "Processing":
                            setProcessingOrder(value);
                            break;
                        case "Delivering":
                            setDeliveringOrder(value);
                            break;
                        case "Completed":
                            setCompletedOrder(value);
                            break;
                        case "Canceled":
                            setCanceledOrder(value);
                            break;
                        default:
                            break;
                    }
                }
            });
    }, [eventRefresh]);
    const handleRefresh = () => {
        console.log("a")
        setEventRefresh(prev => !prev)

    }

    console.log(canceledOrder)
    return (
        <div style={{ marginTop: "80px" }} className="service-container">
            <div className="service-title">
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
            </div>
        </div>
    )
}
