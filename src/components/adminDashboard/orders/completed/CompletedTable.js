import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DetailOrder from '../detailOrder/DetailOrder';



export default function CompletedTable({ data }) {
    const getRowId = (row) => row._id;
    const [rows, setRows] = useState([]);
    console.log(data)
    useEffect(() => {
        setRows(data);
    }, [data]);
    // const [rows, setRows] = useState([
    //     {
    //         "_id": 1,
    //         "phoneNumber": '0123456789',
    //         "total": '100',
    //         "paymentDate": '2023/10/30',
    //         "deliveryDate": '2023/11/5',
    //         "description": 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    //         "address": '123 Main Street, City, Country',
    //         "shipFee": '50'
    //     },
    //     {
    //         "_id": 2,
    //         "phoneNumber": '9876543210',
    //         "total": '75',
    //         "paymentDate": '2023/10/31',
    //         "deliveryDate": '2023/11/5',
    //         "description": 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    //         "address": '456 Elm Street, Town, Country',
    //         "shipFee": '30'
    //     },
    //     {
    //         "_id": 3,
    //         "phoneNumber": '5555555555',
    //         "total": '120',
    //         "paymentDate": '2023/11/01',
    //         "deliveryDate": '2023/11/5',
    //         "description": 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    //         "address": '789 Oak Street, Village, Country',
    //         "shipFee": '60'
    //     },
    //     {
    //         "_id": 4,
    //         "phoneNumber": '3333333333',
    //         "total": '90',
    //         "paymentDate": '2023/11/02',
    //         "deliveryDate": '2023/11/5',
    //         "description": 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    //         "address": '101 Pine Street, Hamlet, Country',
    //         "shipFee": '45'
    //     },
    //     {
    //         "_id": 5,
    //         "phoneNumber": '7777777777',
    //         "total": '150',
    //         "paymentDate": '2023/11/03',
    //         "deliveryDate": '2023/11/5',
    //         "description": 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    //         "address": '202 Cedar Street, Suburb, Country',
    //         "shipFee": '75'
    //     },
    //     {
    //         "_id": 6,
    //         "phoneNumber": '4444444444',
    //         "total": '85',
    //         "paymentDate": '2023/11/04',
    //         "deliveryDate": '2023/11/5',
    //         "description": 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    //         "address": '303 Maple Street, City, Country',
    //         "shipFee": '40'
    //     }
    // ]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDetailClick = (row) => {
        setSelectedRow(row);
        setIsDialogOpen(true);
    };


    const columns = [
        { field: 'phoneNumber', headerName: 'Phone number', width: 250 },
        { field: 'shipFee', headerName: 'Ship fee', width: 150 },
        { field: 'total', headerName: 'Total', width: 150 },
        { field: 'paymentDate', headerName: 'Payment date', width: 200 },
        { field: 'deliveryDate', headerName: 'Delivey date', width: 200 },
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
        {
            field: 'updateStatus',
            headerName: 'Update status',
            width: 200,
            renderCell: (params) => {
                return (
                    <div>
                        <Button variant="contained" style={{ marginRight: "10px", backgroundColor: '#4D4C7D', color: 'white' }}>
                            ...
                        </Button>
                    </div>
                );
            },
        },
    ];
    return (
        <div style={{ height: 400, marginLeft: "300px", marginTop: "100px" }}>
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
                checkboxSelection
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
