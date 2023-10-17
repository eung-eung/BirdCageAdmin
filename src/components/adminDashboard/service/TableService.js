import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'id', width: 100 },
    {
        field: 'Date',
        headerName: 'Date',
        width: 200
    },
    { field: 'Time', headerName: 'Time', width: 400 },
    { field: 'Status', headerName: 'Status', width: 200 },
    {
        field: 'Price',
        headerName: 'Price',
        type: 'number',
        width: 200,
    },
];

const rows = [
    { id: 1, Date: "18/10/2023", Time: 35, Status: "booked", Price: 1000 },
    { id: 2, Date: "18/10/2023", Time: 35, Status: "on going", Price: 1000 },
    { id: 3, Date: "18/10/2023", Time: 35, Status: "on going", Price: 1000 },
    { id: 4, Date: "18/10/2023", Time: 35, Status: "on going", Price: 1000 },
    { id: 5, Date: "18/10/2023", Time: 35, Status: "on going", Price: 1000 },
    { id: 6, Date: "18/10/2023", Time: 35, Status: "on going", Price: 1000 },
];

export default function TableService() {
    return (
        <div style={{ height: 400, marginLeft: "300px", marginTop: "30px" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
