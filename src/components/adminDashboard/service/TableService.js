import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Products_Cage } from '../../../data/Cages';

const columns = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'name', headerName: 'Name', width: 500},
    { field: 'price', headerName: 'Price', width: 100},
    { field: 'size', headerName: 'Size', width: 200},
    { field: 'description', headerName: 'Description', width: 500},
   
];



export default function TableService() {
//     const [img, setImg] = useState([]);

// // Format the image data once when the component mounts or when product.images changes
// useEffect(() => {
//     if (Products_Cage && Products_Cage.images) {
//       const regx = /:\[\d{3},\d{3}]/g;
//       const regxQuotes = /(\"{|\\|}")/g;
//       const regxCurlyBraces = /(\{)/g;
//       const regxCurlyBraces2 = /(\})/g;
  
//       const formattedImages = Products_Cage.images
//         .replace(regx, '')
//         .replace(regxQuotes, '[')
//         .replace(regxCurlyBraces2, ']')
//         .replace(regxCurlyBraces, '[');
  
//       setImg(JSON.parse(formattedImages));
//     }
    
//   }, [Products_Cage]);
    return (
        <div style={{ height: 400, marginLeft: "300px", marginTop: "30px" }}>
            <DataGrid
                rows={Products_Cage}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
