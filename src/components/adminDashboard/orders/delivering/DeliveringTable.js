import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DetailOrder from '../detailOrder/DetailOrder';



export default function DeliveryTable({data}) {
    const getRowId = (row) => row._id;
    const [rows, setRows] = useState([]);
    useEffect(() => {
        setRows(data);
    },[data]);
    
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDetailClick = (row) => {
        setSelectedRow(row);
        setIsDialogOpen(true);
    };


    const columns = [
        { field: 'phoneNumber', headerName: 'Phone number', width: 200 },
        { field: 'shipFee', headerName: 'Ship fee', width: 130 },
        { field: 'total', headerName: 'Total', width: 130 },
        { field: 'paymentDate', headerName: 'Payment date', width: 150 },
        { field: 'deliveryDate', headerName: 'Delivey date', width: 150 },
        {
            field: 'detail',
            headerName: 'Detail',
            width: 130,
            renderCell: (params) => {
                return (
                    <div>
                        <Button variant="text" onClick={() => handleDetailClick(params.row)}>
                            <div style={{ marginRight: '18px' }}><VisibilityIcon style={{color: "#79AC78" }}/></div>

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
                checkboxSelection
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
