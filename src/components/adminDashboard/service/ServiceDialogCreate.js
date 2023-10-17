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

export default function ServiceDialogCreate() {
    const [start, setStart] = useState(dayjs('2022-04-17T15:30'));
    const [end, setEnd] = useState(dayjs('2022-04-17T15:30'));
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [price, setPrice] = useState('');
    const today = dayjs();
    const todayStartOfTheDay = today.startOf('day');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleNumber = (e) => {
        const removeSpecialChar = /[e\+\-]/g;
        const number = /[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
        const removeZero = /^0|[\.]/;

        if (number.test(e.target.value)) {
            setPrice(e.target.value.replace(removeSpecialChar, '').replace(removeZero, ''));
            return;
        }

        setPrice('');
    };

    return (
        <>
            <Button
                id='create'
                onClick={handleClickOpen}
                variant="contained"
            >
                <ControlPoint />
                New Service
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Create New Service
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                            <DateTimePicker
                                label="Start"
                                defaultValue={todayStartOfTheDay}
                                onChange={(newValue) => setStart(newValue)}
                            />
                            <DateTimePicker
                                label="End"
                                value={end}
                                onChange={(newValue) => setEnd(newValue)}
                            />
                            <Box sx={{ minWidth: 120 }}>
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
                            </Box>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                                <Input
                                    onChange={handleNumber}
                                    value={price}
                                    id="standard-adornment-amount"
                                    startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                                />
                            </FormControl>
                        </DemoContainer>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}
