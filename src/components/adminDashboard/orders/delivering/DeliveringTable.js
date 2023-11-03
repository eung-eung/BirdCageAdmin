import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DetailOrder from '../detailOrder/DetailOrder';
import { handleUpdateOrderStatus } from '../utils/orderStatusUtil';



export default function DeliveryTable({ data, handleCallback }) {
    const getRowId = (row) => row._id;
    const [rows, setRows] = useState([]);
    console.log(data)
    useEffect(() => {
        setRows(data);
    }, [data]);

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
                            <div style={{ marginRight: '18px' }}><VisibilityIcon style={{ color: "#79AC78" }} /></div>

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
                        <Button
                            variant="contained"
                            style={{ marginRight: "10px", backgroundColor: "#79AC78", color: "white" }}
                            onClick={() => {
                                handleUpdateOrderStatus("Completed", params.row._id)
                                handleCallback()
                            }}
                        >
                            Complete
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
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}

            />

            {/* Detail Order Dialog */}
            <DetailOrder
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                order={selectedRow}
            />
        </div>
    );
}
