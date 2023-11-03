
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CageCustom } from "../../../data/CageCustom";
import { Button } from "@mui/material";
import io from "socket.io-client";
import UseToken from "../../handleToken/UseToken";
const socket = io.connect("http://localhost:5000");

export default function TableCustom() {
    const [rows, setRows] = useState([]);
    const { getToken } = UseToken();
    const initalPrice = 500;
    const initDescription = "Done"
    const [eventRefresh, setEventRefresh] = useState(true)
    useEffect(() => {
        setRows([])
        fetch("http://localhost:5000/api/v1/cage/customCages/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken(),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                const components = result.data.component;
                const cages = [];
                components.forEach((c) => {
                    const cage = {};
                    c.forEach((cageEl) => {
                        console.log(cageEl);
                        // cage.id = cageEl._id;
                        cageEl.cage.forEach((cageData) => {
                            console.log(cageData.userId);
                            cage.id = cageData._id;
                            cage.name = cageData.userId;
                            cage.length = cageData.length;
                            cage.width = cageData.width;
                            cage.height = cageData.height;
                            cage.createDate = cageData.createDate;
                            cage.status = cageData.status;
                            cage.description = cageData.description;
                        });
                        cageEl.component.forEach((component) => {
                            const componentData = {};
                            fetch(
                                "http://localhost:5000/api/v1/component/" +
                                component._id
                            )
                                .then((res) => res.json())
                                .then((result) => {
                                    // console.log(result.data.component)
                                    const componentDataFromApi =
                                        result.data.component;

                                    componentData.id = componentDataFromApi._id;
                                    const componentFullName =
                                        componentDataFromApi.name;
                                    componentData.name = componentFullName;

                                    const spaceIndex =
                                        componentFullName.indexOf(" ");
                                    const componentType =
                                        componentFullName.substring(
                                            0,
                                            spaceIndex
                                        );
                                    cage[componentType.toLowerCase()] =
                                        componentData;
                                });
                        });
                        cages.push(cage);
                    });
                });

                setRows(cages);
            });
    }, [eventRefresh]);
    const handleCallback = () => {
        setEventRefresh(prev => !prev)
    }
    const [status, setStatus] = useState("");
    useEffect(() => {
        socket.on("receive_request_custom_cage", (d) => {
            console.log(d);
            setStatus(d);
        });
    }, [socket]);
    console.log("getToken: ", getToken());
    const changeOrderStatus = (id, data) => {
        fetch("http://localhost:5000/api/v1/cage/customCages/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken(),
            },
            body: JSON.stringify(data),
        });
    };
    const handleAccept = (row) => {
        // const updatedRows = rows.map((r) => (r.id === row.id ? { ...r, status: 'Accepted' } : r));
        // setRows(updatedRows);
        const currentRowId = row.target.value;
        changeOrderStatus(currentRowId, { status: "CUS", price: initalPrice, description: initDescription });
        setEventRefresh(prev => !prev)
    };

    const handleDecline = (id) => {

        changeOrderStatus(id, { status: "Reject", price: initalPrice, description: initDescription });

    };

    const columns = [

        { field: "name", headerName: "User id", width: 100 },
        { field: "length", headerName: "Length", width: 100 },
        { field: "width", headerName: "Width", width: 100 },
        { field: "height", headerName: "Height", width: 100 },
        { field: "createDate", headerName: "Create Date", width: 150 },
        {
            field: "door",
            headerName: "Door",
            width: 200,
            renderCell: (params) => {
                const doorName = params.value?.name;
                return <div>{doorName}</div>;
            },
        },
        {
            field: "spoke",
            headerName: "Spoke",
            width: 200,
            renderCell: (params) => {
                const spokeName = params.value?.name;
                return <div>{spokeName}</div>;
            },
        },
        {
            field: "base",
            headerName: "Base",
            width: 200,
            renderCell: (params) => {
                const baseName = params.value?.name;
                return <div>{baseName}</div>;
            },
        },
        {
            field: "roof",
            headerName: "Roof",
            width: 200,
            renderCell: (params) => {
                const roofName = params.value?.name;
                return <div>{roofName}</div>;
            },
        },
        {
            field: "status",
            headerName: "Status",
            width: 200,
        },
        {
            field: "description",
            headerName: "Description",
            width: 200,
            renderCell: (params) => {
                return <div>{params.value}</div>;
            },
            editable: true, // Allow editing
            editCellProps: {
                inputProps: {
                    maxLength: 1000, // Optional: Define maximum length for the textarea
                },
            },
        },

        {
            field: "action",
            headerName: "Action",
            width: 250,
            renderCell: (params) => {
                console.log(params)
                return (
                    <div>
                        <Button
                            variant="contained"
                            style={{ marginRight: "10px" }}
                            onClick={handleAccept}
                            value={params.row.id}
                        >
                            Accept
                        </Button>
                        <Button onClick={() => {
                            handleDecline(params.row.id)
                            handleCallback()
                        }} value={params.row.id} variant="outlined">
                            Decline
                        </Button>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                }}
                // onEditCellChangeCommitted={(params) => {
                //     if (params.field === "description") {
                //         const updatedRows = rows.map((row) =>
                //             row.id === params.id
                //                 ? { ...row, description: params.props.value }
                //                 : row
                //         );
                //         setRows(updatedRows);
                //     }
                // }}
                pageSize={5}

            />
        </div>
    );
}
