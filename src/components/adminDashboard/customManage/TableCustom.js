import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CageCustom } from '../../../data/CageCustom';
import { Button } from '@mui/material';
import io from "socket.io-client"
const socket = io.connect('http://localhost:5000')

export default function TableCustom() {
  const [rows, setRows] = useState(CageCustom);
  const [status, setStatus] = useState("")
  useEffect(() => {
    socket.on("receive_request_custom_cage", (d) => {
      console.log(d);
      setStatus(d)
    })
  },
    [socket])
  console.log("re-render");
  const handleAccept = (row) => {
    // const updatedRows = rows.map((r) => (r.id === row.id ? { ...r, status: 'Accepted' } : r));
    // setRows(updatedRows);
  };

  const handleDecline = (row) => {
    // const updatedRows = rows.map((r) => (r.id === row.id ? { ...r, status: 'Declined' } : r));
    // setRows(updatedRows);
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'length', headerName: 'Length', width: 100 },
    { field: 'width', headerName: 'Width', width: 100 },
    { field: 'height', headerName: 'Height', width: 100 },
    { field: 'createDate', headerName: 'Create Date', width: 150 },
    {
      field: 'door',
      headerName: 'Door',
      width: 200,
      renderCell: (params) => {
        const doorName = params.value.name;
        return <div>{doorName}</div>;
      },
    },
    {
      field: 'spoke',
      headerName: 'Spoke',
      width: 200,
      renderCell: (params) => {
        const spokeName = params.value.name;
        return <div>{spokeName}</div>;
      },
    },
    {
      field: 'base',
      headerName: 'Base',
      width: 200,
      renderCell: (params) => {
        const baseName = params.value.name;
        return <div>{baseName}</div>;
      },
    },
    {
      field: 'roof',
      headerName: 'Roof',
      width: 200,
      renderCell: (params) => {
        const roofName = params.value.name;
        return <div>{roofName}</div>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
      renderCell: (params) => {
        return <div>{params.value}</div>;
      },
      editable: true, // Allow editing
      editCellProps: {
        inputProps: {
          maxLength: 1000, // Optional: Define maximum length for the textarea
        },
      },
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      renderCell: (params) => {
        return (
          <div>
            <Button variant="contained" style={{ marginRight: "10px" }}>
              Accept
            </Button>
            <Button variant="outlined">
              Decline
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div >
      <DataGrid
        rows={rows}
        columns={columns}
        onEditCellChangeCommitted={(params) => {
          if (params.field === 'description') {
            const updatedRows = rows.map((row) =>
              row.id === params.id ? { ...row, description: params.props.value } : row
            );
            setRows(updatedRows);
          }
        }}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
}
