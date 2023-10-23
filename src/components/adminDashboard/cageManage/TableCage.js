import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Products_Cage } from '../../../data/Cages';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'; // Import the necessary components






export default function TableCage() {
    const getRowId = (row) => row._id;
    const [descriptionDialogOpen, setDescriptionDialogOpen] = useState(false);
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const openDescriptionDialog = (row) => {
        setSelectedRow(row);
        setDescriptionDialogOpen(true);
      };
    
      const openImageDialog = (row) => {
        setSelectedRow(row);
        setImageDialogOpen(true);
      };
    
      const closeDialogs = () => {
        setSelectedRow(null);
        setDescriptionDialogOpen(false);
        setImageDialogOpen(false);
      };
    

  const columns = [
    { field: '_id', headerName: 'Id', width: 100 },
    { field: 'name', headerName: 'Name', width: 700},
    { field: 'price', headerName: 'Price', width: 100},
    {
        field: 'imagePath',
        headerName: 'Image',
        width: 150,
        renderCell: (params) => (
          <Button variant="text" onClick={() => openImageDialog(params.row)}>View</Button>
        ),
      },
    { field: 'width', headerName: 'Width', width: 100},
    { field: 'length', headerName: 'Length', width: 100},
    { field: 'height', headerName: 'Height', width: 100},
    { field: 'inStock', headerName: 'In Stock', width: 100},
    { field: 'createDate', headerName: 'Create Date', width: 100},
    { field: 'status', headerName: 'Status', width: 100},
    { field: 'rating', headerName: 'Rating', width: 100},
    {
        field: 'description',
        headerName: 'Description',
        width: 150,
        renderCell: (params) => (
            <Button variant="text" onClick={() => openDescriptionDialog(params.row)}>View</Button>
        ),
      },
   
];
    return (
        <div style={{ height: 400, marginLeft: "300px", marginTop: "30px" }}>
            <DataGrid
                rows={Products_Cage}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
            {/* Description Dialog */}
      <Dialog open={descriptionDialogOpen} onClose={closeDialogs}>
        <DialogTitle>{selectedRow && selectedRow.name}</DialogTitle>
        <DialogContent>
          <Typography>{selectedRow && selectedRow.description}</Typography>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onClose={closeDialogs}>
        <DialogTitle>{selectedRow && selectedRow.name}</DialogTitle>
        <DialogContent>
        <img
      src={selectedRow && selectedRow.imagePath}
      alt="Product Image"
      style={{ width: '100%', height: '300px', objectFit: 'contain' }}
    />
          <Typography>{selectedRow && selectedRow.imagePath}</Typography>
        </DialogContent>
      </Dialog>
        </div>
    );
}
