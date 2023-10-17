
import React from 'react'
import ShowChartIcon from '@mui/icons-material/ShowChart';
export default function Card(item) {
    console.log(item.item)
    return (
        <div className='card-item'>
            <p>{item.item.title}
                <div className='item-chart'>
                    <ShowChartIcon />
                    10%
                </div>
            </p>
            <p>{item.item.total}</p>
            <p>{item.item.label}</p>

        </div>
    )
}
