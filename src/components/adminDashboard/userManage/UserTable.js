import React, { useEffect, useState } from "react";
import { get, put } from "../../../utils/httpClient";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Swal from "sweetalert2";

export default function UserTable({ role }) {
    const [rows, setRows] = useState([]);
    const getRowId = (row) => row.id;
    const handleBanUser = (id) => {
        withReactContent(Swal)
            .fire({
                title: "Are you sure to banned this customer?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    put("/Accounts/lock-account?key=" + id)
                        .then((res) => res)
                        .then(() => {
                            Swal.fire({
                                title: "Deleted!",
                                icon: "success",
                            });
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
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "fullname",
            headerName: "Customer name",
            width: 200,
            valueGetter: (params) => {
                // console.log(params.row)
                const customer = params.row.customers[0];
                if (customer) {
                    const { firstName, lastName } = customer;
                    return `${firstName} ${lastName}`;
                }
            },
        },
        { field: "phoneNumber", headerName: "Phone", width: 200 },
        {
            field: "address",
            headerName: "Address",
            width: 200,
            valueGetter: (params) => {
                // console.log(params.row)
                const customer = params.row.customers[0];
                if (customer) {
                    return customer.address;
                }
            },
        },
        {
            field: "points",
            headerName: "Points",
            width: 200,
            valueGetter: (params) => {
                // console.log(params.row)
                const customer = params.row.customers[0];
                if (customer) {
                    return customer.point;
                }
            },
        },
        {
            field: "Status",
            headerName: "Status",
            width: 200,
            valueGetter: (params) => {
                // console.log(params.row)
                const status = params.row.status;
            },
            renderCell: (params) => {
                const status = params.row.status;
                let classes = "";
                let strStatus = "";
                switch (status) {
                    case 1:
                        classes =
                            "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10";
                        strStatus = "Active";
                        break;
                    case 0:
                        classes =
                            "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10";
                        strStatus = "Banned";
                        break;
                    default:
                        classes =
                            "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10";
                        break;
                }
                return <span className={classes}>{strStatus}</span>;
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const status = params.row.status;
                let classes = "";
                let strStatus = "";
                // console.log(status);
                switch (status) {
                    case 1:
                        return (
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        handleBanUser(params.row.id);
                                    }}
                                    style={{
                                        marginRight: "10px",
                                        backgroundColor: "rgb(239, 98, 98)",
                                        color: "white",
                                    }}
                                >
                                 <PersonOffIcon/>   
                                </Button>
                            </div>
                        );
                    case 0:
                        return ``;
                    default:
                        return ``;
                }
            },
        },
    ];
    useEffect(() => {
        get("/Accounts")
            .then((res) => res.data)
            .then((res) => {
                return res?.filter((item) => item.roles.includes(role));
            })
            .then((res) => {
                console.log(res);
                setRows(res);
            });
    }, []);
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
