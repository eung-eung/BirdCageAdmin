import React from 'react'
import "./Service.css"
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material"
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import TableService from './TableService';
import ServiceDialogCreate from './ServiceDialogCreate';
export default function Service() {
    return (
        <div style={{ marginTop: "80px" }} className='service-container'>
            <div className='service-title'>
                <h3 style={{ textAlign: "left" }}>Service Management</h3>
            </div>
            <div className='service-content'>
                <div className='service-action'>

                    <Box style={{ flex: "1", textAlign: "left" }} sx={{ '& > :not(style)': { m: 1 }, '.MuiOutlinedInput-notchedOutline': { border: 0 } }} >
                        <TextField
                            id="input-with-icon-textfield" className='search-input'

                            InputProps={{
                                disableUnderline: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </Box>

                    <div className='service-action-btn'>
                        {/* <Button
                            id='create'
                            variant="contained">
                            <ControlPointIcon /> New Service
                        </Button> */}
                        <ServiceDialogCreate />
                        <div>
                            {/* <Button id='select-all' variant="outlined">Select all</Button> */}
                            <Button id='delete' variant="outlined" color="error">
                                Delete
                            </Button>
                        </div>
                    </div>

                </div>

                <TableService />

                <div>

                </div>

            </div>
        </div>
    )
}
