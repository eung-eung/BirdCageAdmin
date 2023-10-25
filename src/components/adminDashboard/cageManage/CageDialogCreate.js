import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ControlPoint from '@mui/icons-material/ControlPoint';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import dayjs from 'dayjs';

import FormControl from '@mui/material/FormControl';
import { Alert, AlertTitle, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CageDialogCreate() {
    const [newCage, setNewCage] = useState({
        name: '',
        length: '',
        width: '',
        height: '',
        inStock: '',
        description: '',
        createDate: dayjs().format('YYYY/MM/DD'),
        price: '',
        status: 'Available',
        rating: '',
        imagePath: '',
        delFlg: false,
    });


    const [isWidthValid, setIsWidthValid] = useState(true);
    const [isLengthValid, setIsLengthValid] = useState(true);
    const [isHeightValid, setIsHeightValid] = useState(true);
    const [open, setOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');



    const handleClose = () => {
        setOpen(false);
        setNewCage({
            name: '',
            length: '',
            width: '',
            height: '',
            inStock: '',
            description: '',
            createDate: dayjs().format('YYYY/MM/DD'),
            price: '',
            status: 'Available',
            rating: '',
            imagePath: '',
            delFlg: false,
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/v1/cage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCage),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle success
                console.log('Cage created successfully', data);
                setShowSuccess(true);
                setSuccessMessage('Cage created successfully');
                // Clear the input values
                setNewCage({
                    name: '',
                    length: '',
                    width: '',
                    height: '',
                    inStock: '',
                    description: '',
                    createDate: dayjs().format('YYYY/MM/DD'),
                    price: '',
                    status: 'Available',
                    rating: '',
                    imagePath: '',
                    delFlg: false,
                });
            })
            .catch((error) => {
                console.error('Error creating cage', error);
            });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'width') {
            const isValid = value >= 30 && value <= 100;
            setIsWidthValid(isValid);
        }

        if (name === 'length') {
            const isValid = value >= 30 && value <= 100 && value > newCage.width;
            setIsLengthValid(isValid);
        }

        if (name === 'height') {
            const isValid = value >= 30 && value <= 100;
            setIsHeightValid(isValid);
        }

        setNewCage({
            ...newCage,
            [name]: value,
        });
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const imageData = event.target.result;
            setNewCage({
                ...newCage,
                imagePath: imageData,
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Button
                id='create'
                onClick={handleClickOpen}
                variant="contained"
            >
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
                        <div >
                            <div class="flex flex-col text-center w-full mb-12">
                                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Create New Cages</h1>
                            </div>
                            <div class="lg:w-2/3 md:w-2/3 mx-auto">
                                <div class="flex flex-wrap -m-2">
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                                            <input value={newCage.name}
                                                onChange={handleChange}
                                                id="name"
                                                type='text'
                                                name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="price" class="leading-7 text-sm text-gray-600">Price</label>
                                            <input value={newCage.price}
                                                onChange={handleChange}
                                                type='number'
                                                id="price"
                                                name="price" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="width" class="leading-7 text-sm text-gray-600">Width</label>
                                            <input onChange={handleChange}
                                                value={newCage.width}
                                                id="width"
                                                name="width"
                                                type='number'
                                                required
                                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            {!isWidthValid && <div style={{ color: 'red' }}>Width must be between 30 and 100</div>}
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="length" class="leading-7 text-sm text-gray-600">Length</label>
                                            <input onChange={handleChange}
                                                value={newCage.length}
                                                id="length"
                                                name="length"
                                                type='number'
                                                required
                                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            {!isLengthValid && <div style={{ color: 'red' }}>Length must be between 30 and 100 and greater than width</div>}

                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="height" class="leading-7 text-sm text-gray-600">Height</label>
                                            <input onChange={handleChange}
                                                value={newCage.height}
                                                id="height"
                                                name="height"
                                                type='number'
                                                required
                                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            {!isHeightValid && <div style={{ color: 'red' }}>Height must be between 30 and 100</div>}
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="inStock" class="leading-7 text-sm text-gray-600">In Stock</label>
                                            <input onChange={handleChange}
                                                value={newCage.inStock}
                                                id="inStock"
                                                name="inStock"
                                                type='number'
                                                required
                                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="inStock" class="leading-7 text-sm text-gray-600">delFlg</label>
                                            <RadioGroup
                                                aria-label="delete-flag"
                                                name="delFlg"
                                                value={newCage.delFlg.toString()}
                                                onChange={(e) => {
                                                    setNewCage({
                                                        ...newCage,
                                                        delFlg: e.target.value === 'true',
                                                    });
                                                }}
                                            >
                                                <FormControlLabel
                                                    value="true"
                                                    control={<Radio />}
                                                    label="Yes"
                                                />
                                                <FormControlLabel
                                                    value="false"
                                                    control={<Radio />}
                                                    label="No"
                                                />
                                            </RadioGroup>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="relative">
                                            <label for="description" class="leading-7 text-sm text-gray-600">Description</label>
                                            <textarea value={newCage.description}
                                                onChange={handleChange}
                                                id="description"
                                                name="description" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="relative">
                                            <label for="imagePath" class="leading-7 text-sm text-gray-600">ImagePath</label>
                                            <input type="text"
                                                name="imagePath"
                                                onChange={handleChange}
                                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            {newCage.imagePath && <img src={newCage.imagePath} alt="Selected Image" />}
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <button type='submit' class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create</button>
                                    </div>
                                    {showSuccess && (
                                        <Alert severity="success">
                                            <AlertTitle>{successMessage}</AlertTitle>
                                        </Alert>
                                    )}

                                </div>
                            </div>
                        </div>
                    </section>
                </form>

            </BootstrapDialog>
        </>
    );
}
