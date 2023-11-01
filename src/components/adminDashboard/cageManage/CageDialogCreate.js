import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ControlPoint from "@mui/icons-material/ControlPoint";
import dayjs from "dayjs";

import { Alert, AlertTitle, DialogContentText } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function CageDialogCreate() {
    const initialCageState = {
        name: "",
        length: "",
        width: "",
        height: "",
        inStock: "",
        description: "",
        price: "",
        createDate: dayjs().format("YYYY/MM/DD"),
        filenames: [],
    };

    const [newCage, setNewCage] = useState(initialCageState);

    const [isPriceValid, setIsPriceValid] = useState(true);
    const [isInStockValid, setIsInStockValid] = useState(true);
    const [isWidthValid, setIsWidthValid] = useState(true);
    const [isLengthValid, setIsLengthValid] = useState(true);
    const [isHeightValid, setIsHeightValid] = useState(true);
    const [open, setOpen] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setSuccessDialogOpen(false);
        setNewCage(initialCageState);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleMainImageChange = (e) => {
        const selectedFile = e.target.files[0];

        setNewCage((prevCage) => ({
            ...prevCage,
            filenames: [selectedFile, ...prevCage.filenames.slice(1)],
        }));
    };

    const handleExtraImagesChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setNewCage((prevCage) => ({
            ...prevCage,
            filenames: [
                prevCage.filenames[0],
                ...prevCage.filenames.slice(1),
                ...selectedFiles,
            ],
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "width") {
            const isValid = value >= 30 && value <= 100;
            setIsWidthValid(isValid);
        }

        if (name === "length") {
            const isValid =
                value >= 30 && value <= 100 && value > newCage.width;
            setIsLengthValid(isValid);
        }

        if (name === "height") {
            const isValid = value >= 30 && value <= 100;
            setIsHeightValid(isValid);
        }
        console.log(newCage[name] < 0);
        if (name === "price" && newCage[name] < 0) {
            
            setIsPriceValid(false);
        }

        setNewCage({ ...newCage, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Append fields from newCage to formData
        for (const key in newCage) {
            // console.log(key, newCage[key]);

            if (key === "inStock" && newCage[key] < 0) {
                setIsInStockValid(false);
                return;
            }
            formData.append(key, newCage[key]);
        }

        // Append the image files
        for (const file of newCage.filenames) {
            formData.append("filenames", file);
        }
        if(!isPriceValid || !isInStockValid || !isWidthValid || !isLengthValid || !isHeightValid) return;
        try {
            // Make a POST request to your API endpoint with formData
            const response = await fetch("http://localhost:5000/api/v1/cage", {
                method: "POST",
                body: formData,
            });

            if (response.status === 201) {
                console.log("Cage created successfully");
                setSuccessDialogOpen(true);
                setNewCage(initialCageState);
            } else {
                console.error("Error creating cage");
            }
        } catch (error) {
            console.error("Error creating cage", error);
        }
    };

    return (
        <>
            <Button id="create" onClick={handleClickOpen} variant="contained">
                <ControlPoint />
                New Cages
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                    <section class="text-gray-600 body-font relative">
                        <div>
                            <div class="flex flex-col text-center w-full mt-10 mb-10">
                                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                                    Create New Cages
                                </h1>
                            </div>
                            <div class="lg:w-2/3 md:w-2/3 mx-auto">
                                <div class="flex flex-wrap -m-12">
                                    <div class="p-2 w-full">
                                        <div class="col-span-full">
                                            <label
                                                for="name"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Name
                                            </label>
                                            <div class="mt-2">
                                                <input
                                                    value={newCage.name}
                                                    onChange={handleChange}
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    autocomplete="Name"
                                                    class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="col-span-full">
                                            <label
                                                for="description"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Description
                                            </label>
                                            <div class="mt-2">
                                                <textarea
                                                    value={newCage.description}
                                                    onChange={handleChange}
                                                    id="description"
                                                    name="description"
                                                    rows="3"
                                                    class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="col-span-full">
                                            <label
                                                for="price"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Price
                                            </label>
                                            <div class="mt-2">
                                                <input
                                                    value={newCage.price}
                                                    onChange={handleChange}
                                                    type="number"
                                                    id="price"
                                                    min={0}
                                                    name="price"
                                                    autocomplete="Price"
                                                    class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {!isPriceValid && (
                                                    <div
                                                        style={{ color: "red" }}
                                                    >
                                                        Price must be greater
                                                        than 1
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="sm:col-span-3">
                                            <label
                                                for="width"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Width
                                            </label>
                                            <div class="mt-2">
                                                <input
                                                    onChange={handleChange}
                                                    value={newCage.width}
                                                    id="width"
                                                    name="width"
                                                    type="number"
                                                    required
                                                    autocomplete="Width"
                                                    class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {!isWidthValid && (
                                                    <div
                                                        style={{ color: "red" }}
                                                    >
                                                        Width must be between 30
                                                        and 100
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="sm:col-span-3">
                                            <label
                                                for="length"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Length
                                            </label>
                                            <div class="mt-2">
                                                <input
                                                    onChange={handleChange}
                                                    value={newCage.length}
                                                    id="length"
                                                    name="length"
                                                    type="number"
                                                    required
                                                    autocomplete="Length"
                                                    class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {!isLengthValid && (
                                                    <div
                                                        style={{ color: "red" }}
                                                    >
                                                        Length must be between
                                                        30 and 100 and greater
                                                        than width
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="sm:col-span-3">
                                            <label
                                                for="height"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Height
                                            </label>
                                            <div class="mt-2">
                                                <input
                                                    onChange={handleChange}
                                                    value={newCage.height}
                                                    id="height"
                                                    name="height"
                                                    type="number"
                                                    required
                                                    autocomplete="Height"
                                                    class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {!isHeightValid && (
                                                    <div
                                                        style={{ color: "red" }}
                                                    >
                                                        Height must be between
                                                        30 and 100
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="sm:col-span-3">
                                            <label
                                                for="inStock"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                In Stock
                                            </label>
                                            <div class="mt-2">
                                                <input
                                                    onChange={handleChange}
                                                    value={newCage.inStock}
                                                    id="inStock"
                                                    name="inStock"
                                                    type="number"
                                                    min={1}
                                                    required
                                                    autocomplete="In Stock"
                                                    class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {!isInStockValid && (
                                                    <div
                                                        style={{ color: "red" }}
                                                    >
                                                        In stock must be greater
                                                        than 0
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="col-span-full">
                                            <label
                                                for="mainImage"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Main image
                                            </label>
                                            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                                                <div class="text-center">
                                                    <div class="mt-1 flex text-sm leading-6 text-gray-600">
                                                        <label
                                                            for="mainImage"
                                                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                            <span>
                                                                Upload a file
                                                            </span>
                                                            <input
                                                                id="mainImage"
                                                                type="file"
                                                                accept=".png, .jpg, .jpeg"
                                                                name="mainImage"
                                                                onChange={
                                                                    handleMainImageChange
                                                                }
                                                                class="sr-only"
                                                            />
                                                        </label>
                                                        <p class="pl-1">
                                                            or drag and drop
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {newCage.filenames[0] && (
                                                <div>
                                                    <h2 class="pl-1">
                                                        Selected Main Image:
                                                    </h2>
                                                    <div className="image-preview">
                                                        <div className="flex flex-wrap -m-4 text-center">
                                                            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                                                                <div className="border-2 border-gray-200 px-4 py-2 rounded-lg">
                                                                    <img
                                                                        src={URL.createObjectURL(
                                                                            newCage
                                                                                .filenames[0]
                                                                        )}
                                                                        alt="Main Image"
                                                                        className="rounded-lg w-full h-20 object-cover object-center mb-3"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="col-span-full">
                                            <label
                                                for="extraImages"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Extra images
                                            </label>
                                            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                                                <div class="text-center">
                                                    <div class="mt-1 flex text-sm leading-6 text-gray-600">
                                                        <label
                                                            for="extraImages"
                                                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                            <span>
                                                                Upload a file
                                                            </span>
                                                            <input
                                                                id="extraImages"
                                                                type="file"
                                                                accept=".png, .jpg, .jpeg"
                                                                name="extraImages"
                                                                multiple
                                                                onChange={
                                                                    handleExtraImagesChange
                                                                }
                                                                class="sr-only"
                                                            />
                                                        </label>
                                                        <p class="pl-1">
                                                            or drag and drop
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {newCage.filenames.length > 1 && (
                                                <div>
                                                    <h2 class="pl-1">
                                                        Selected Extra Images:
                                                    </h2>
                                                    <div className="image-preview">
                                                        <div className="flex flex-wrap -m-4 text-center">
                                                            {newCage.filenames
                                                                .slice(1)
                                                                .map(
                                                                    (
                                                                        image,
                                                                        index
                                                                    ) => (
                                                                        <div
                                                                            className="p-4 md:w-1/4 sm:w-1/2 w-full"
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <div className="border-2 border-gray-200 px-4 py-2 rounded-lg">
                                                                                <img
                                                                                    src={URL.createObjectURL(
                                                                                        image
                                                                                    )}
                                                                                    alt={`Image ${
                                                                                        index +
                                                                                        1
                                                                                    }`}
                                                                                    className="flex-shrink-0 rounded-lg w-full h-20 object-cover object-center mb-3"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div class="p-2 w-full">
                                        <div class="col-span-full">
                                            <label
                                                for="createDate"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Create date
                                            </label>
                                            <div class="mt-2">
                                                <input
                                                    onChange={handleChange}
                                                    value={newCage.createDate}
                                                    id="createDate"
                                                    name="createDate"
                                                    required
                                                    autocomplete="Create date"
                                                    class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-2 mb-10 mt-8 w-full">
                                        <button
                                            type="submit"
                                            class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </BootstrapDialog>
            <Dialog
                open={successDialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"You have created a new cage"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            <strong>Create successfully!</strong>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
