import React, { useEffect, useState } from "react";
import { del, get } from "../../../utils/httpClient";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import DeleteIcon from '@mui/icons-material/Delete';
export default function VoucherTable() {
    const [rows, setRows] = useState([]);
    const [refreshEvent, setRefreshEvent] = useState(false);
    useEffect(() => {
        get("/Vouchers")
            .then((res) => res.data.value)
            .then((res) => setRows(res));
    }, [refreshEvent]);
    const handleDeleteVoucher = (id) => {
        withReactContent(Swal)
        .fire({
            title: "Are you sure to delete this voucher?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        })
        .then((result) => {
            if (result.isConfirmed) {
                del("/Vouchers/" + id)
                    .then((res) => res)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            icon: "success",
                        });
                    }).then(() => {
                        setRefreshEvent(prev => !prev);
                    });
            }
        })
        .catch((err) => {
            Swal.fire({
                title: "Error!",
                icon: "error",
            });
        });
    };
    const columns = [
        { field: "id", headerName: "ID", width: 300 },
        {field : "title", headerName : "Title", width : 200},
        { field: "effectiveDate", headerName: "Effective date", width: 170, valueGetter : (params) => new Date(params.row.effectiveDate).toLocaleString("en-EN")},
        { field: "expirationDate", headerName: "Expiration date", width: 180, valueGetter : (params) => new Date(params.row.expirationDate).toLocaleString("en-EN") },
        { field: "conditionPoint", headerName: "condition point", width: 150 },
        { field: "discount", headerName: "discount", width: 70, valueGetter : (params) => params.row.discount * 100 + "%" },
        {field : "actions", headerName : "Actions", width : 200, renderCell : (params) => {
            return (
                <div>
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleDeleteVoucher(params.row.id);
                        }}
                        style={{
                            marginRight: "10px",
                            backgroundColor: "rgb(239, 98, 98)",
                            color: "white",
                        }}
                    >
                        <DeleteIcon/>
                    </Button>
                </div>
            );
        }}
    ];
    const getRowId = (row) => row.id;
    
    return (
        <div style={{ height: 500 }}>
            <DataGrid
                rows={rows}
                sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                }}
                columns={columns}
                getRowId={getRowId}
                pageSize={5}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}
