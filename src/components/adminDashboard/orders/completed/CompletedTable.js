import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DetailOrder from '../detailOrder/DetailOrder';
import { get } from '../../../../utils/httpClient';



export default function CompletedTable({ data }) {
    const getRowId = (row) => row.id;
    const [rows, setRows] = useState([]);
    console.log(data)
    useEffect(() => {
        get("/Orders?$filter=status eq 3 & $expand=OrderDetails($expand=Cage), Customer($expand=Account)")
        .then(res => res.data.value)
        .then(res => setRows(res))
    }, []);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDetailClick = (row) => {
        setSelectedRow(row);
        setIsDialogOpen(true);
    };


    const columns = [
        { field: "id", headerName: "Order id", width: 150},
        { field: "phoneNumber", headerName: "Phone number", width: 150, valueGetter: (params) => params.row.customer?.account?.phoneNumber },
        { field: "fullname", headerName: "Customer name", width: 200 , valueGetter: (params) => {
            const {firstName, lastName} = params.row.customer
            return `${firstName} ${lastName}`
        }},
        { field: "shipFee", headerName: "Ship fee", width: 150 },
        { field: "total", headerName: "Total", width: 150 },
        { field: "orderDate", headerName: "Payment date", width: 200, valueGetter: (params) => new Date(params.row.orderDate).toLocaleString("en-EN") },
        {
            field: 'detail',
            headerName: 'Detail',
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <Button variant="text" onClick={() => handleDetailClick(params.row)}>
                            <div style={{ marginRight: '18px' }}><VisibilityIcon style={{ color: '#4D4C7D' }} /></div>

                        </Button>
                    </div>
                );
            },
        },
        // {
        //     field: 'updateStatus',
        //     headerName: 'Update status',
        //     width: 200,
        //     renderCell: (params) => {
        //         return (
        //             <div>
        //                 <Button variant="contained" style={{ marginRight: "10px", backgroundColor: '#4D4C7D', color: 'white' }}>
        //                     ...
        //                 </Button>
        //             </div>
        //         );
        //     },
        // },
    ];
    return (
        <div style={{ height: 400, marginLeft: "", marginTop: "20px" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
                pageSize={5}
                sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}

            />
            {/* detail order dialog */}
            <DetailOrder
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                order={selectedRow}
            />
        </div>
    );
}
