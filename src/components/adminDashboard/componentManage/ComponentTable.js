import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { del, get } from "../../../utils/httpClient";
import {
    Alert,
    AlertTitle,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import theme from "@material-tailwind/react/theme";
import DeleteComponentDialog from "./DeleteComponentDialog";
import CreateUpdateComponentDialog from "./CreateUpdateComponentDialog";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
export default function ComponentTable() {
    const getRowId = (row) => row.id;
    const [rows, setRows] = useState([]);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventRefresh, setEventRefresh] = useState(false);
    const [action, setAction] = useState("Create");
    const [openCreateUpdateDialog, setOpenCreateUpdateDialog] = useState(false);
    const handleRefresh = () => {
        console.log("a");
        setEventRefresh((prev) => !prev);
    };
    const handleDelete = (component) => {
        if (!component || !component.id) return;
        withReactContent(Swal)
            .fire({
                title: "Are you sure to delete this component?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    del(`/Components/${component.id}`).then((res) => {
                        withReactContent(Swal)
                            .fire({
                                title: "Delete component successfully!",
                                icon: "success",
                            })
                            .then(() => {
                                handleRefresh();
                            });
                    });
                }
            })
            .catch((err) => {
                withReactContent(Swal).fire({
                    title: "Delete component failed!",
                    icon: "error",
                });
            });
    };
    useEffect(() => {
        get("/Components")
            .then((res) => res.data.value)
            .then((res) => setRows(res));
    }, [eventRefresh]);
    const openDataDialog = (row) => {
        setSelectedRow(row);
        setDetailDialogOpen(true);
    };

    const closeDialogs = () => {
        setSelectedRow(null);
        setDetailDialogOpen(false);
        setDeleteDialogOpen(false);
        setOpenCreateUpdateDialog(false);
    };

    const openDeleteDialog = (row) => {
        setSelectedRow(row);
        setDeleteDialogOpen(true);
    };
    const openEditDialog = (row) => {
        setSelectedRow(row);
        setAction("Update");
        setOpenCreateUpdateDialog(true);
    };
    const columns = [
        { field: "id", headerName: "id", width: 300 },
        { field: "name", headerName: "name", width: 300 },
        { field: "type", headerName: "type", width: 100, renderCell: (params) => {
            const type = params.row.type;
            let classes = "";
                switch (type.toLowerCase()) {
                    case "base":
                        classes =
                            "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10";
                        break;
                    case "spoke":
                        classes =
                            "inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10";
                        break;
                    case "roof":
                        classes =
                            "inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10";
                        break;

                    default:
                        classes =
                            "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10";
                        break;
                }
                return <span className={classes}>{type}</span>;
        } },
        {
            field: "imagePath",
            headerName: "image",
            width: 300,
            renderCell: (params) => {
                return (
                    <>
                        <img
                            className="w-40 w-40 rounded-lg object-cover object-center"
                            src={params.row.imagePath}
                            alt="nature image"
                        />
                    </>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <div>
                    <div>
                        {/* <Button
                            variant="text"
                            onClick={() => openDataDialog(params.row)}
                        >
                            <VisibilityIcon />
                        </Button> */}

                        {params.row.isDeleted ? (
                            <span
                                style={{
                                    color: "#7D7C7C",
                                    fontStyle: "italic",
                                    display: "inline-block",
                                    width: "100%",
                                }}
                            >
                                Deleted
                            </span>
                        ) : (
                            <>
                                {/* <Button variant="text" onClick={() => openEditDialog(params.row)}>
                                    
                                    <ModeEditIcon />
                                </Button> */}
                                <Button
                                    variant="text"
                                    onClick={() => handleDelete(params.row)}
                                >
                                    <DeleteIcon
                                        style={{ color: "rgb(239, 98, 98)" }}
                                    />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div style={{ height: 500, marginLeft: "", marginTop: "20px" }}>
            <h1 class="pt-5 mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Components
            </h1>
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
                rowHeight={128}
                pageSizeOptions={[5, 10]}
            />

            {/* <DeleteComponentDialog open={deleteDialogOpen} component={selectedRow} eventRefresh={handleRefresh} handleClose={closeDialogs}/>
            <CreateUpdateComponentDialog open={openCreateUpdateDialog} action={action} component={selectedRow} eventRefresh={handleRefresh} handleClose={closeDialogs}/> */}
            {/* <Dialog
                open={detailDialogOpen}
                onClose={closeDialogs}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Component Detail"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            closeDialogs();
                            // handleCallback();
                        }}
                        color="primary"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog> */}
        </div>
    );
}
