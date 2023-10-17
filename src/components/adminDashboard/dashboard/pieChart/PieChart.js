import React from 'react'
import { data, options } from './ConfigOption'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
export default function PieChart() {
    ChartJS.register(ArcElement, Tooltip, Legend);

    return (
        <>
            <Pie
                data={data}
                options={options}
            />
        </>

    )
}
