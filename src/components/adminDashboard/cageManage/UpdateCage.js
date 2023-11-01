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
        filename: null,
        filenames: []
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
                setCage({
                    ...cage,
                    name: dataCage.name,
                    length: dataCage.length,
                    width: dataCage.width,
                    height: dataCage.height,
                    inStock: dataCage.inStock,
                    description: dataCage.description,
                    createDate: dataCage.createDate,
                    price: dataCage.price,
                    filename: dataCage.imagePath,
                    filenames: dataCage.image[0].imagePath,
                });
                console.log(dataCage.image[0].imagePath);
            })
            .catch((error) => {
                console.error(error);
                setError('Unable to fetch Cage data.');
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

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
        if (type === 'file') {
            // Handle file input separately
            if (name === 'filename') {
                setCage({ ...cage, filename: files[0] });
            } else if (name === 'filenames') {
                setCage({ ...cage, filenames: [...files] });
            }
        } else {
            // Handle other input fields
            setCage({ ...cage, [name]: value });
        }
        
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit button clicked");
        const formData = new FormData();

        formData.append('name', cage.name);
        formData.append('length', cage.length);
        formData.append('width', cage.width);
        formData.append('height', cage.height);
        formData.append('inStock', cage.inStock);
        formData.append('description', cage.description);
        formData.append('createDate', cage.createDate);
        formData.append('price', cage.price);
        formData.append('filename', cage.filename);
        if (Array.isArray(cage.filenames) && cage.filenames.length > 0) {
            for (let i = 0; i < cage.filenames.length; i++) {
                formData.append('filenames', cage.filenames[i]);
            }
        }

        axios
            .patch(`http://localhost:5000/api/v1/cage/${id}`, formData)
            .then(() => {
                setOpen(true);
                console.log('Data updated successfully');

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
                                    <div class="p-2 w-full">
                                        <div class="col-span-full">
                                            <label for="filename" class="block text-sm font-medium leading-6 text-gray-900">Main image</label>
                                            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                                                <div class="text-center">
                                                    <div class="mt-1 flex text-sm leading-6 text-gray-600">
                                                        <label for="filename" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                            <span>Upload a file</span>
                                                            <input id="filename"
                                                                type="file"
                                                                name="filename"
                                                                accept="image/*"
                                                                onChange={handleChange}
                                                                class="sr-only" />
                                                        </label>
                                                        <p class="pl-1">or drag and drop</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* {newCage.filenames[0] && ( */}
                                            <div>
                                                <h2 class="pl-1">Selected Main Image:</h2>
                                                <div className="image-preview">
                                                    <div className="flex flex-wrap -m-4 text-center">
                                                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                                                            <div className="border-2 border-gray-200 px-4 py-2 rounded-lg">
                                                                <img
                                                                    src={cage.filename}
                                                                    alt="Main Image"
                                                                    className="rounded-lg w-full h-20 object-cover object-center mb-3"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* )} */}
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="col-span-full">
                                            <label for="filenames" class="block text-sm font-medium leading-6 text-gray-900">Extra images</label>
                                            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                                                <div class="text-center">
                                                    <div class="mt-1 flex text-sm leading-6 text-gray-600">
                                                        <label for="filenames" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                            <span>Upload a file</span>
                                                            <input id="filenames"
                                                                type="file"
                                                                name="filenames"
                                                                accept="image/*"
                                                                multiple
                                                                onChange={handleChange}
                                                                class="sr-only" />
                                                        </label>
                                                        <p class="pl-1">or drag and drop</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {cage.filenames.length > 0 && (
                                            <div>
                                                <h2 class="pl-1">Selected Extra Images:</h2>
                                                <div className="image-preview">
                                                    <div className="flex flex-wrap -m-4 text-center">
                                                    {cage.filenames.map((image, index) => (
                                                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full"
                                                        key={index}
                                                        >
                                                            <div className="border-2 border-gray-200 px-4 py-2 rounded-lg">
                                                                <img
                                                                    src={image}
                                                                    alt={`Image ${index + 1}`}
                                                                    className="flex-shrink-0 rounded-lg w-full h-20 object-cover object-center mb-3"
                                                                />
                                                            </div>
                                                        </div>
                                                        ))} 
                                                    </div>
                                                </div>
                                            </div>
                                             )} 
                                        </div>
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
