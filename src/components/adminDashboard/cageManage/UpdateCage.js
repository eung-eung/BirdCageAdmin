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


    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'delFlg' ? e.target.value === 'true' : value;
        setCage((prevCage) => ({
            ...prevCage,
            [name]: newValue
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
                                    <div class="relative">
                                        <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={cage.name}
                                            onChange={handleChange}
                                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div class="p-2 w-full">
                                    <div class="relative">
                                        <label for="price" class="leading-7 text-sm text-gray-600">Price</label>
                                        <input type="number"
                                            name="price"
                                            value={cage.price}
                                            onChange={handleChange}
                                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div class="p-2 w-1/2">
                                    <div class="relative">
                                        <label for="length" class="leading-7 text-sm text-gray-600">Length</label>
                                        <input type="number"
                                            name="length"
                                            value={cage.length}
                                            onChange={handleChange}
                                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>


                                <div class="p-2 w-1/2">
                                    <div class="relative">
                                        <label for="width" class="leading-7 text-sm text-gray-600">Width</label>
                                        <input type="number"
                                            name="width"
                                            value={cage.width}
                                            onChange={handleChange}
                                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div class="p-2 w-1/2">
                                    <div class="relative">
                                        <label for="height" class="leading-7 text-sm text-gray-600">Height</label>
                                        <input type="number"
                                            name="height"
                                            value={cage.height}
                                            onChange={handleChange}
                                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div class="p-2 w-1/2">
                                    <div class="relative">
                                        <label for="inStock" class="leading-7 text-sm text-gray-600">In Stock</label>
                                        <input type="number"
                                            name="inStock"
                                            value={cage.inStock}
                                            onChange={handleChange}
                                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div class="p-2 w-1/2">
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
                                </div>
                                <div class="p-2 w-full">
                                    <div class="relative">
                                        <label for="description" class="leading-7 text-sm text-gray-600">Description</label>
                                        <textarea type="text"
                                            name="description"
                                            value={cage.description}
                                            onChange={handleChange} class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                    </div>
                                </div>

                                <div class="p-2 w-full">
                                    <div class="relative">
                                        <label for="imagePath" class="leading-7 text-sm text-gray-600">Image Path</label>
                                        <input type="text"
                                            name="imagePath"
                                            value={cage.imagePath}
                                            onChange={handleChange}
                                            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                    <img src={cage.imagePath} alt="Image Preview" />
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
