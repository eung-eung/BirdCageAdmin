import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

export default function CreateUpdateComponentDialog({
    open,
    handleClose,
    component,
    eventRefresh,
    action,
}) {
    return (
        <Dialog
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                id="alert-dialog-title"
                className="flex justify-center items-center"
            >
                {action === "Create"
                    ? "Create new component"
                    : "Update component"}
            </DialogTitle>
            <DialogContent>
                <div className="lg:w-2/3 md:w-2/3 mx-auto">
                    <div class="flex flex-wrap-m-12">
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
                                        id="name"
                                        type="text"
                                        name="name"
                                        autocomplete="Name"
                                        class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap-m-12">
                        <div class="p-2 w-full">
                            <div class="col-span-5"></div>

                            <div class="col-span-full flex justify-between">
                                <div style={{ width: "55%" }}>
                                   
                                        <label
                                            for="price"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Price
                                        </label>
                                        <input
                                            id="price"
                                            type="number"
                                            name="price"
                                            autocomplete="Price"
                                            class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                
                                </div>
                                <div class="mt-2" style={{width: "40%" }}>
                               
                                    <Select
                                        style={{ width: "40%", }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Age"
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleClose();
                        // handleDelete(component);
                    }}
                    autoFocus
                >
                    {action}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
