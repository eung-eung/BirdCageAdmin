import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'; // Import the necessary components
import DialogViewDetail from './DialogViewDetail';
import { DialogActions, DialogContentText } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';





export default function TableCage() {
  const getRowId = (row) => row._id;
  const [dataDialogOpen, setCagesDialogOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cages, setCages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //Get all cages
  const fetchCage = () => {
    const apiUrl = 'http://localhost:5000/api/v1/cage';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        setCages(responseData.data.cages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  // Fetch cage data when the component mounts
  useEffect(() => {
    fetchCage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  //handle dialog


  const openDataDialog = (row) => {
    setSelectedRow(row);
    setCagesDialogOpen(true);
  };

  const closeDialogs = () => {
    setSelectedRow(null);
    setCagesDialogOpen(false);
  };

  const openDeleteDialog = (row) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  //handle delete
  const handleDelete = (cage) => {
    const apiUrl = `http://localhost:5000/api/v1/cage/${cage._id}`;

    fetch(apiUrl, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedCages = cages.filter((c) => c._id !== cage._id);
          setCages(updatedCages);
          setDeleteDialogOpen(false)
        }
      })
      .catch((err) => {
        console.error('Error deleting cage', err);
      });
  };




  const columns = [
    { field: 'name', headerName: 'Name', width: 750 },
    { field: 'price', headerName: 'Price', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <div>
          <Button variant="text" onClick={() => openDataDialog(params.row)}><VisibilityIcon /></Button>
          <Button variant="text" ><Link to={`/update/${params.row._id}`}><ModeEditIcon /></Link></Button>
          <Button variant="text" onClick={() => openDeleteDialog(params.row)}><DeleteIcon /></Button>
        </div>
      ),
    },

  ];


  return (
    <div style={{ height: 400, marginLeft: "300px", marginTop: "30px" }}>
      <DataGrid
        rows={cages}
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

      {/* Detail Dialog */}
      <DialogViewDetail
        open={dataDialogOpen}
        onClose={closeDialogs}
        selectedData={selectedRow}
      />

      {/* Confirm delete dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedRow)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}
