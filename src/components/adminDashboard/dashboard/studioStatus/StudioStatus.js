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
    createData('Artium', "https://sohanews.sohacdn.com/thumb_w/660/160588918557773824/2022/2/11/photo1644549764864-1644549765115430465189.jpg", "vintage", 2027, "100%"),
    createData('Wego', "https://sohanews.sohacdn.com/thumb_w/660/160588918557773824/2022/2/11/photo1644549764864-1644549765115430465189.jpg", "modern", 2027, "95%"),
    createData('Táo 9', "https://sohanews.sohacdn.com/thumb_w/660/160588918557773824/2022/2/11/photo1644549764864-1644549765115430465189.jpg", "minimalist", 2027, "65%"),
];


export default function StudioStatus() {

    return (
        <>
            <h3 style={{ textAlign: "left", padding: "5px 10px" }}>Studio Status</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "#696969" }}>Studio Name</TableCell>
                            <TableCell style={{ color: "#696969" }} align="center">Style</TableCell>
                            <TableCell style={{ color: "#696969" }} align="center">Exp</TableCell>
                            <TableCell style={{ color: "#696969" }} align="center">Disipline</TableCell>
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
                                            marginRight: "20px"
                                        }}
                                        src={row.image} />
                                    {
                                        row.name
                                    }

                                </TableCell>
                                <TableCell align="center">{row.style}</TableCell>
                                <TableCell align="center">{row.exp}</TableCell>
                                <TableCell align="center">{row.disipline}</TableCell>
                                <TableCell align="center">OK</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}
