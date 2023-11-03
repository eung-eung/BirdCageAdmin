import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'; // Import the necessary components
import DialogViewDetail from './DialogViewDetail';
import { DialogActions, DialogContentText } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import UseToken from '../../handleToken/UseToken';





export default function TableCage({ eventRefresh }) {
  const getRowId = (row) => row._id;
  const { getToken } = UseToken();
  const [dataDialogOpen, setCagesDialogOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cages, setCages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //Get all cages
  async function fetchCages() {
    try {
      const response = await fetch('http://localhost:5000/api/v1/cage/getAllWithDeletedItem', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the data
        setCages(data.data.cages);
        setLoading(false);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchCages();
  }, [eventRefresh]);

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
          setCages((prevCages) =>
            prevCages.map((c) =>
              c._id === cage._id ? { ...c, delFlg: true } : c
            )
          );
          console.log('Delete successfully!');
          setDeleteDialogOpen(false);
          console.log('Delete successfully!')
          setDeleteDialogOpen(false)
        }
      })
      .catch((err) => {
        console.error('Error deleting cage', err);
      });
  };




  const columns = [
    {
      field: 'imagePath', headerName: 'Image', width: 150, renderCell: (params) => (
        <div>
          <img src={params.row.imagePath}
            alt="Cage_image"
            style={{ height: "70px", objectFit: "contain" }} />
        </div>

      ),
    },
    { field: 'name', headerName: 'Name', width: 800 },
    { field: 'price', headerName: 'Price', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button variant="text" onClick={() => openDataDialog(params.row)}><VisibilityIcon /></Button>
          <Button variant="text" ><Link to={`/update/${params.row._id}`}><ModeEditIcon /></Link></Button>
          {params.row.delFlg ? (
            <span style={{ color: '#7D7C7C', fontStyle: 'italic' }}>Deleted</span>
          ) : (
            <Button variant="text" onClick={() => openDeleteDialog(params.row)}><DeleteIcon /></Button>
          )}
        </div>

      ),
    },

  ];


  return (
    <div style={{ height: "75vh", marginLeft: "300px", marginTop: "50px", marginBottom: "100px" }}>
      <DataGrid
        rows={cages}
        columns={columns}
        getRowId={getRowId}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        rowHeight={100}
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
