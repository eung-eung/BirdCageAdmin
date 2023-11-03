// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { CageCustom } from '../../../data/CageCustom';
// import VisibilityIcon from '@mui/icons-material/Visibility';

// import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
// import io from "socket.io-client"
// const socket = io.connect('http://localhost:5000')

// export default function TableCustom() {
//   const [rows, setRows] = useState(CageCustom);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const handleDetailClick = (row) => {
//     setSelectedRow(row);
//     setIsDialogOpen(true);
//   };
//   const [status, setStatus] = useState("")
//   useEffect(() => {
//     socket.on("receive_request_custom_cage", (d) => {
//       console.log(d);
//       setStatus(d)
//     })
//   },
//     [socket])
//   console.log("re-render");
//   const handleAccept = (row) => {
//     // const updatedRows = rows.map((r) => (r.id === row.id ? { ...r, status: 'Accepted' } : r));
//     // setRows(updatedRows);
//   };

//   const handleDecline = (row) => {
//     // const updatedRows = rows.map((r) => (r.id === row.id ? { ...r, status: 'Declined' } : r));
//     // setRows(updatedRows);
//   };

//   const columns = [
//     { field: 'id', headerName: 'Id', width: 100 },
//     // { field: 'name', headerName: 'Name', width: 100 },
//     // { field: 'length', headerName: 'Length', width: 100 },
//     // { field: 'width', headerName: 'Width', width: 100 },
//     // { field: 'height', headerName: 'Height', width: 100 },
//     // { field: 'createDate', headerName: 'Create Date', width: 150 },
//     {
//       field: 'door',
//       headerName: 'Door',
//       width: 200,
//       renderCell: (params) => {
//         const doorName = params.value.name;
//         return <div>{doorName}</div>;
//       },
//     },
//     {
//       field: 'spoke',
//       headerName: 'Spoke',
//       width: 200,
//       renderCell: (params) => {
//         const spokeName = params.value.name;
//         return <div>{spokeName}</div>;
//       },
//     },
//     {
//       field: 'base',
//       headerName: 'Base',
//       width: 200,
//       renderCell: (params) => {
//         const baseName = params.value.name;
//         return <div>{baseName}</div>;
//       },
//     },
//     {
//       field: 'roof',
//       headerName: 'Roof',
//       width: 200,
//       renderCell: (params) => {
//         const roofName = params.value.name;
//         return <div>{roofName}</div>;
//       },
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       width: 200,
//     },
//     {
//       field: 'description',
//       headerName: 'Description',
//       width: 200,
//       renderCell: (params) => {
//         return <div>{params.value}</div>;
//       },
//       editable: true,
//       editCellProps: {
//         inputProps: {
//           maxLength: 1000, // Optional: Define maximum length for the textarea
//         },
//       },
//     },
//     {
//       field: 'detail',
//       headerName: 'Detail',
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <div>
//             <Button
//               variant="text"
//               onClick={() => handleDetailClick(params.row)}
//             >
//               <div style={{ marginRight: '18px' }}><VisibilityIcon style={{ color: '#4F709C' }} /></div>

//             </Button>
//           </div>
//         );
//       },
//     },
//     {
//       field: 'action',
//       headerName: 'Action',
//       width: 250,
//       renderCell: (params) => {
//         return (
//           <div>
//             <Button variant="contained" style={{ marginRight: "10px" }}>
//               Accept
//             </Button>
//             <Button variant="outlined">
//               Decline
//             </Button>
//           </div>
//         );
//       },
//     },
//   ];
//   return (
//     <div >
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         onEditCellChangeCommitted={(params) => {
//           if (params.field === 'description') {
//             const updatedRows = rows.map((row) =>
//               row.id === params.id ? { ...row, description: params.props.value } : row
//             );
//             setRows(updatedRows);
//           }
//         }}
//         pageSize={5}
//         checkboxSelection
//       />
//       <Dialog
//         open={isDialogOpen}
//         onClose={() => setIsDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           <h3 className="text-base font-semibold leading-7 text-gray-900">Cage Detail</h3>
//         </DialogTitle>
//         <DialogContent>
//           {selectedRow && (
//             <div className="mt-6 border-t border-gray-100">
//               <dl className="divide-y divide-gray-100">
//                 <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                   <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
//                   <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedRow.name}</dd>
//                 </div>
//                 <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                   <dt className="text-sm font-medium leading-6 text-gray-900">Length </dt>
//                   <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedRow.length}</dd>
//                 </div>
//                 <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                   <dt className="text-sm font-medium leading-6 text-gray-900">width </dt>
//                   <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedRow.width}</dd>
//                 </div>
//                 <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                   <dt className="text-sm font-medium leading-6 text-gray-900">height</dt>
//                   <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedRow.height}</dd>
//                 </div>
//                 <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                   <dt className="text-sm font-medium leading-6 text-gray-900">createDate</dt>
//                   <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedRow.createDate}</dd>
//                 </div>
//               </dl>
//               <Button style={{ marginTop: '10px', marginBottom: '10px' }} variant="contained" color="primary" onClick={() => setIsDialogOpen(false)}>
//                 Close
//               </Button>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//       {/* <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//       <DialogTitle>
//       <h3 className="text-base font-semibold leading-7 text-gray-900">Order Detail</h3>
//       </DialogTitle>
//       {selectedRow ? (
//       <DialogContent>
     
//           <div>
//       <div className="px-4 sm:px-0">
//       </div>
//       <div className="mt-6 border-t border-gray-100">
//         <dl className="divide-y divide-gray-100">
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">length </dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedRow.length}</dd>
//           </div>
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">width </dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedRow.width}</dd>
//           </div>
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">height</dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedRow.height}</dd>
//           </div>
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">createDate</dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedRow.createDate}</dd>
//           </div>
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">door</dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedRow.door}</dd>
//           </div>
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">spoke</dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//               <p>{selectedRow.spoke}</p>
//             </dd>
//           </div>
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">base</dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//             {selectedRow.base}
//             </dd>
//           </div>
//           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//             <dt className="text-sm font-medium leading-6 text-gray-900">roof</dt>
//             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//             {selectedRow.roof}
//             </dd>
//           </div>
//         </dl>
//       </div>
//     </div>
//         <Button style={{marginTop: '10px', marginBottom: '10px'}} variant="contained" color="primary" onClick={() => setIsDialogOpen(false)}>
//           Close
//         </Button>
//       </DialogContent>
//        ) : (
//         // Handle the case when selectedRow is null (optional)
//         <p>No row selected</p>
//       )}
//     </Dialog> */}
//     </div>
//   );
// }
