import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CageCustom } from "../../../data/CageCustom";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Fade,
    Modal,
    Typography,
} from "@mui/material";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import io from "socket.io-client";
import UseToken from "../../handleToken/UseToken";
// const socket = io.connect("http://localhost:5000");
import { get, patch } from "../../../utils/httpClient";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function TableCustom() {
    const [rows, setRows] = useState([]);
    const { getToken } = UseToken();
    const [eventRefresh, setEventRefresh] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [priceError, setPriceError] = useState("");
    const [isRejected, setIsRejected] = useState(false);
    const [descriptionError, setDescriptionError] = useState("");

    const handlePriceBlur = () => {
        const parsedPrice = parseFloat(price);
        if (parsedPrice < 0) {
            setPriceError("Price should be greater than or equal to 0");
        } else {
            setPriceError("");
        }
    };

    useEffect(() => {
        setRows([]);
        get(
            `/Cages?$filter=contains(status, '_')&$expand=CageComponents($expand=component), Images`
        )
            .then((res) => res.data.value)
            .then((result) => {
                const cages = result;
                cages.forEach((cage) => {
                    cage.status = cage.status.split("_")[0];
                    cage.cageComponents.forEach((cageComponent) => {
                        cage[cageComponent.component.type.toLowerCase()] =
                            cageComponent.component;
                    });
                });
                // const components = result.data.component;
                // const cages = [];
                // components.forEach((c) => {
                //     const = {};
                //     c.forEach((cageEl) => {
                //         console.log(cageEl);
                //         // cage.id = cageEl._id;
                //         cageEl.cage.forEach((cageData) => {
                //             console.log(cageData.userId);
                //             cage.id = cageData._id;
                //             cage.name = cageData.userId;
                //             cage.length = cageData.length;
                //             cage.width = cageData.width;
                //             cage.height = cageData.height;
                //             cage.createDate = cageData.createDate;
                //             cage.status = cageData.status;
                //             cage.description = cageData.description;
                //         });
                //         cageEl.component.forEach((component) => {
                //             const componentData = {};
                //             fetch(
                //                 "http://localhost:5000/api/v1/component/" +
                //                 component._id
                //             )
                //                 .then((res) => res.json())
                //                 .then((result) => {
                //                     // console.log(result.data.component)
                //                     const componentDataFromApi =
                //                         result.data.component;

                //                     componentData.id = componentDataFromApi._id;
                //                     const componentFullName =
                //                         componentDataFromApi.name;
                //                     componentData.name = componentFullName;

                //                     const spaceIndex =
                //                         componentFullName.indexOf(" ");
                //                     const componentType =
                //                         componentFullName.substring(
                //                             0,
                //                             spaceIndex
                //                         );
                //                     cage[componentType.toLowerCase()] =
                //                         componentData;
                //                 });
                //         });
                //         cages.push(cage);
                //     });
                // });

                setRows(cages);
            });
    }, [eventRefresh]);

    const handleDescriptionBlur = () => {
        if (description.length <= 5) {
            setDescriptionError(
                "Description should be greater than 5 characters"
            );
        }
    };
    const changeOrderStatus = (id, data) => {
        console.log(id, data);
        const requestData = {
            cageId: id,
            status: data.status,
            price: data.price,
            description: data.description,
        };
        patch("/Cages/status", requestData)
            .then(() => {
                setEventRefresh((prev) => !prev);
                // socket.emit('accept_custom', { status: "CUS" })
            })
            .catch((err) => null);
    };

    const handleAccept = () => {
        if (selectedRowId) {
            const currentRowId = selectedRowId;
            const currentRow = rows.find((row) => row.id === currentRowId);
            if (currentRow) {
                if (priceError.length !== 0 && descriptionError !== 0) {
                    return;
                }
                const parsedPrice = parseInt(price);
                if (parsedPrice >= 0) {
                    console.log({ status: "cus", price, description });
                    changeOrderStatus(currentRow.id, {
                        status: "cus",
                        price,
                        description,
                    });
                    setEventRefresh((prev) => !prev);
                    setIsOpen(false);
                    setPriceError("");
                } else {
                    setPriceError("Price should be greater than or equal to 0");
                }
            }
        }
    };

    const handleDialogOpen = (price, params) => {
        setPrice(price);
        setDescription("");
        setIsRejected(true);
        setSelectedRowId(params.row.id); // Set the selected row ID
        setIsOpen(true); // Open the dialog
        setPriceError("");
        setDescriptionError("");
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
            renderCell: (params) => {
                const status = params.value;
                let classes = "";
                switch (status.toLowerCase()) {
                    case "cus":
                        classes =
                            "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10";
                        break;
                    case "pending":
                        classes =
                            "inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10";
                        break;
                    case "reject":
                        classes =
                            "inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10";
                        break;
                    default:
                        classes =
                            "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10";
                        break;
                }
                return <span className={classes}>{status}</span>;
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 250,
            renderCell: (params) => {
                const status = params.row.status;
                return (
                    <div>
                        {status.includes("PENDING") && (
                            <>
                                <Button
                                    variant="contained"
                                    style={{ marginRight: "10px" }}
                                    onClick={() => handleDialogOpen(1, params)}
                                    value={params.row.id}
                                >
                                    Accept
                                </Button>
                                <Button
                                    onClick={() => handleDialogOpen(0, params)}
                                    value={params.row.id}
                                    variant="outlined"
                                >
                                    Decline
                                </Button>
                            </>
                        )}
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
                pageSize={5}
            />

            {/* Dialog accept */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                        More detail
                    </h3>
                </DialogTitle>
                <DialogContent>
                    <div className="isolate-0 bg-white px-4 py-4 sm:py-4 lg:px-4">
                        <div
                            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                            aria-hidden="true"
                        >
                            <div
                                className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                                style={{
                                    clipPath:
                                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                                }}
                            />
                        </div>

                        <form className="mx-auto mt-0 max-w-2xl sm:mt-2">
                            <div className="grid grid-cols-6 sm:grid-cols-6 gap-x-12 gap-y-6">
                                {!isRejected && (
                                    <>
                                        <div className="sm:col-span-8">
                                            <label
                                                htmlFor="price"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Price
                                            </label>
                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <span className="text-gray-500 sm:text-sm">
                                                        $
                                                    </span>
                                                </div>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    min={1}
                                                    value={price}
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                    onBlur={handlePriceBlur}
                                                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {priceError.length !== 0 && (
                                                <Typography
                                                    variant="body2"
                                                    color="error"
                                                    className="pt-2"
                                                >
                                                    {priceError}
                                                </Typography>
                                            )}
                                            {/* <label
                                                htmlFor="price"
                                                className="block text-sm font-semibold leading-6 text-gray-900"
                                            >
                                                Price
                                            </label>

                                            <div className="mt-2.5">
                                                <input
                                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    min={0}
                                                    
                                                    value={price}
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                    onBlur={handlePriceBlur}
                                                />
                                                {priceError && (
                                                    <Typography
                                                        variant="body2"
                                                        color="error"
                                                    >
                                                        {priceError}
                                                    </Typography>
                                                )}
                                                
                                            </div> */}
                                        </div>
                                    </>
                                )}
                                <div className="sm:col-span-8">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Description
                                    </label>
                                    <div className="mt-2.5">
                                        <textarea
                                            name="description"
                                            id="description"
                                            rows={4}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            onBlur={handleDescriptionBlur}
                                        />
                                    </div>
                                    {descriptionError.length !== 0 && (
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            className="pt-2"
                                        >
                                            {descriptionError}
                                        </Typography>
                                    )}
                                </div>
                            </div>
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleAccept({ description, price });
                                    }}
                                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Accept
                                </button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
