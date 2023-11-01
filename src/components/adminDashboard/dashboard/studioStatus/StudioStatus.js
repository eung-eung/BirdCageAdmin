import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    name,
    image,
    style,
    exp,
    disipline
) {
    return { name, image, style, exp, disipline };
}

const rows = [
    createData('Artium', "https://m.media-amazon.com/images/I/71lpWgS-yML._AC_SY450_.jpg", "900$", "2023/10/30", 999),
    createData('Wego', "https://m.media-amazon.com/images/I/81gYKAMky+L._AC_SY879_.jpg", "700$", "2023/10/29", 573),
    createData('Henry V', "https://m.media-amazon.com/images/I/81xnKwvU0-L._AC_SX679_.jpg", "1040$", "2023/10/20", 302),
];


export default function StudioStatus() {

    return (
        <>
            <h3 style={{ textAlign: "left", padding: "5px 10px" }}>Top 3 Cages Best Seller</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "#696969" }}>Cage Name</TableCell>
                            <TableCell style={{ color: "#696969" }} align="center">Revenue</TableCell>
                            <TableCell style={{ color: "#696969" }} align="center">Create Date</TableCell>
                            <TableCell style={{ color: "#696969" }} align="center">In Stock</TableCell>
                            <TableCell style={{ color: "#696969" }} align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                style={{ textAlign: "center" }}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell align="left" style={{ display: "flex", alignItems: "center" }}>
                                    <img
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                            marginRight: "20px",
                                            objectFit: "contain"
                                        }}
                                        src={row.image} />
                                    {
                                        row.name
                                    }

                                </TableCell>
                                <TableCell align="center">{row.style}</TableCell>
                                <TableCell align="center">{row.exp}</TableCell>
                                <TableCell align="center">{row.disipline}</TableCell>
                                <TableCell align="center">Available</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}
