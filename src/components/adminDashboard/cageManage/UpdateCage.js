import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, Input, Radio, Select, TextField, TextareaAutosize } from '@mui/material';
import dayjs from 'dayjs';


export default function UpdateCage() {
    const navigate = useNavigate();
    const [cage, setCage] = useState({
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
    const [error, setError] = useState(null);

    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/v1/cage/${id}`)
            .then((response) => {
                const dataCage = response.data.data.component;
                console.log(dataCage);
                setCage(dataCage);
            })
            .catch((error) => {
                console.error(error);
                setError('Unable to fetch Cage data.');
            });
    }, [id]);

    const handleImageChange = (e) => {
        const selectedImages = e.target.files;
        const imagePaths = [];

        for (let i = 0; i < selectedImages.length; i++) {
            const imagePath = URL.createObjectURL(selectedImages[i]);
            imagePaths.push(imagePath);
        }

        setCage((prevCage) => ({
            ...prevCage,
            imagePath: imagePaths, // Assuming imagePath is an array to store multiple image paths
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // const newValue = name === 'delFlg' ? e.target.value === 'true' : value;
        if (name === 'width') {
            const isValid = value >= 30 && value <= 100;
            setIsWidthValid(isValid);
        }

        if (name === 'length') {
            const isValid = value >= 30 && value <= 100 && value > cage.width;
            setIsLengthValid(isValid);
        }

        if (name === 'height') {
            const isValid = value >= 30 && value <= 100;
            setIsHeightValid(isValid);
        }
        setCage((prevCage) => ({
            ...prevCage,
            [name]: value
        }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedcage = {
            ...cage,
        };

        axios
            .patch(`http://localhost:5000/api/v1/cage/${id}`, updatedcage)
            .then(() => {
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
                setError('Unable to update the cage.');
            });
    };

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleCageClick = () => {
        navigate('/cage');
    };
    return (
        <div style={{ marginLeft: "150px" }}>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <section class="text-gray-600 body-font relative">
                    <div class="container px-5 py-24 mx-auto">
                        <div class="flex flex-col text-center w-full mb-12">
                            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Update Cage</h1>
                        </div>
                        <div class="lg:w-1/2 md:w-2/3 mx-auto">
                            <div class="flex flex-wrap -m-2">
                                <div class="p-2 w-full">
                                    <div class="col-span-full">
                                        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                        <div class="mt-2">
                                            <input type="text"
                                                name="name"
                                                value={cage.name}
                                                onChange={handleChange}
                                                autocomplete="Name" class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div class="p-2 w-full">
                                    <div class="col-span-full">
                                        <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                        <div class="mt-2">
                                            <textarea type="text"
                                                name="description"
                                                value={cage.description}
                                                onChange={handleChange} rows="3" class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-2 w-full">
                                    <div class="col-span-full">
                                        <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                        <div class="mt-2">
                                            <input type="number"
                                                name="price"
                                                value={cage.price}
                                                onChange={handleChange} autocomplete="Price" class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div class="p-2 w-1/2">
                                    <div class="sm:col-span-3">
                                        <label for="width" class="block text-sm font-medium leading-6 text-gray-900">Width</label>
                                        <div class="mt-2">
                                            <input type="number"
                                                name="width"
                                                value={cage.width}
                                                onChange={handleChange}
                                                required autocomplete="Width" class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            {!isWidthValid && <div style={{ color: 'red' }}>Width must be between 30 and 100</div>}
                                        </div>
                                    </div>
                                </div>
                                <div class="p-2 w-1/2">

                                    <div class="sm:col-span-3">
                                        <label for="length" class="block text-sm font-medium leading-6 text-gray-900">Length</label>
                                        <div class="mt-2">
                                            <input type="number"
                                                name="length"
                                                value={cage.length}
                                                onChange={handleChange}
                                                required autocomplete="Length" class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            {!isLengthValid && <div style={{ color: 'red' }}>Length must be between 30 and 100 and greater than width</div>}
                                        </div>
                                    </div>
                                </div>
                                <div class="p-2 w-1/2">
                                    <div class="sm:col-span-3">
                                        <label for="height" class="block text-sm font-medium leading-6 text-gray-900">Height</label>
                                        <div class="mt-2">
                                            <input type="number"
                                                name="height"
                                                value={cage.height}
                                                onChange={handleChange}
                                                required autocomplete="Height" class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            {!isHeightValid && <div style={{ color: 'red' }}>Height must be between 30 and 100</div>}
                                        </div>
                                    </div>
                                </div>
                                <div class="p-2 w-1/2">
                                    <div class="sm:col-span-3">
                                        <label for="inStock" class="block text-sm font-medium leading-6 text-gray-900">In Stock</label>
                                        <div class="mt-2">
                                            <input type="number"
                                                name="inStock"
                                                value={cage.inStock}
                                                onChange={handleChange}
                                                required autocomplete="In Stock" class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="p-2 w-1/2">
                                    <div class="relative flex items-center">
                                        <label for="delFlg" class="leading-7 text-sm text-gray-600 mr-2">delFlg:</label>

                                        <FormControlLabel
                                            control={<Radio />}
                                            name="delFlg"
                                            value="false"
                                            checked={cage.delFlg === false}
                                            onChange={handleChange}
                                            class="mr-2"
                                            label="No"
                                        />
                                        
                                        <FormControlLabel
                                            control={<Radio />}
                                            name="delFlg"
                                            value="true"
                                            checked={cage.delFlg === true}
                                            onChange={handleChange}
                                            label="Yes"
                                        />
                                        
                                    </div>
                                </div> */}


                                <div class="p-2 w-full">
                                    {/* <div class="relative">
                                        <label for="imagePath" class="leading-7 text-sm text-gray-600">Image Path</label>
                                        <input type="text"
                                            name="imagePath"
                                            value={cage.imagePath}
                                            onChange={handleChange}
                                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div> */}
                                    <div class="sm:col-span-3">
                                        <label for="imagePath" class="block text-sm font-medium leading-6 text-gray-900">Image Path</label>
                                        <div class="mt-2">
                                            <input
                                                type="file"
                                                name="imagePath"
                                                accept="image/*" // Optional: specify accepted file types (images in this case)
                                                onChange={handleImageChange}
                                                required

                                                autoComplete="Image Path"
                                                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />

                                        </div>
                                    </div>
                                    <div className="p-4 md:w-2/3 sm:w-1/2 w-full" >
                                        <img src={cage.imagePath} alt="Image Preview" />
                                    </div>

                                </div>
                                <div class="p-2 w-full">
                                    <button type='submit' class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Update</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </form>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">SUCCESS</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Alert severity="success">
                            <AlertTitle>Updated successfully!</AlertTitle>
                            The cage has been successfully updated.
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                    <Button onClick={handleCageClick} color="primary" autoFocus>
                        Cage
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
