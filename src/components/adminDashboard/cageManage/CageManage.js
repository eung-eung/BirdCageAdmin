import React from 'react'
import "./CageManage.css"
import { Button } from "@mui/material"
import CageDialogCreate from './CageDialogCreate';
import TableCage from './TableCage';
export default function CageManage() {
    return (
        <div style={{ marginTop: "80px" }} className='service-container'>
            <div className='service-title'>
                <h2 style={{ textAlign: "left", fontWeight: 'bold' }}>Cages Management</h2>
            </div>
            <div className='service-content'>
                <div className='service-action'>
                    <div className='service-action-btn'>
                        <CageDialogCreate />
                        <div>
                            <Button id='delete' variant="outlined" color="error">
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
                <TableCage />
                <div>
                </div>
            </div>
        </div>
    )
}
