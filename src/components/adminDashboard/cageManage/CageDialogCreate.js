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
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CageDialogCreate() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [height, setHeight] = useState('');
    const [inStock, setInStock] = useState('');
    const [createDate, setCreateDate] = useState(dayjs().format('YYYY/MM/DD'));    const [status, setStatus] = useState('');
    const [rating, setRating] = useState('');

    const [images, setImages] = useState(null);
  

    const [isWidthValid, setIsWidthValid] = useState(true);
    const [isLengthValid, setIsLengthValid] = useState(true);
    const [isHeightValid, setIsHeightValid] = useState(true);


    const formattedDate = dayjs().format('YYYY/MM/DD');

    const handleClose = () => {
        setOpen(false);

    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCreate = () => {
        // Your create logic
    };

    const validateWidth = (value) => {
        const isValid = value >= 30 && value <= 100;
        setIsWidthValid(isValid);
    };

    const validateLength = (value) => {
        const isValid = value >= 30 && value <= 100 && value > width;
        setIsLengthValid(isValid);
    };

    const validateHeight = (value) => {
        const isValid = value >= 30 && value <= 100 ;
        setIsHeightValid(isValid);
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
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Create New Cages
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  
                            {/* <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="Status"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Pending</MenuItem>
                                        <MenuItem value={20}>Booked</MenuItem>
                                        <MenuItem value={30}>Cancel</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box> */}
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    id="name"
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="price">Price</InputLabel>
                                <Input
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    id="price"
                                    // startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="description">Description</InputLabel>
                                <Input
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    id="description"
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="width">Width</InputLabel>
                <Input
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setWidth(value);
                        validateWidth(value);
                    }}
                    value={width}
                    id="width"
                    type='number'
                    required
                />
                {!isWidthValid && <div style={{ color: 'red' }}>Width must be between 30 and 100</div>}
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="length">Length</InputLabel>
                <Input
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setLength(value);
                        validateLength(value);
                    }}
                    value={length}
                    id="length"
                    type='number'
                    required
                />
                {!isLengthValid && <div style={{ color: 'red' }}>Length must be between 30 and 100 and greater than width</div>}
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="height">Height</InputLabel>
                <Input
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setHeight(value);
                        validateHeight(value);
                    }}
                    value={height}
                    id="height"
                    type='number'
                    required
                />
                {!isHeightValid && <div style={{ color: 'red' }}>Height must be between 30 and 100</div>}
            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="inStock">In Stock</InputLabel>
                                <Input
                                    onChange={(e) => setInStock(e.target.value)}
                                    value={inStock}
                                    id="inStock"
                                    type='number'
                                    required
                                />
                            </FormControl>
                            
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="createDate">Create Date</InputLabel>
                                <Input
                                     onChange={(date) => setCreateDate(date.format('YYYY/MM/DD'))}
                                    value={createDate}
                                    id="createDate"
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="status">Status</InputLabel>
                                <Input
                                    onChange={(e) => setStatus(e.target.value)}
                                    value={status}
                                    id="status"
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="rating">Rating</InputLabel>
                                <Input
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    id="rating"
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="images">Image</InputLabel>
                                <Input
                                    onChange={(e) => setImages(e.target.files[0])}
                                    type="file"
                                    accept="image/*"
                                />
                            </FormControl>
                     
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Create
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}
