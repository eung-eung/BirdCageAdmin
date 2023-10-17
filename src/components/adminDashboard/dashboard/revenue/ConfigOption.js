import React from 'react'

export const options = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },


    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: true
            },
            max: 600,
            ticks: {
                stepSize: 200
            }
        },

    }

}



export const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            data: [500, 200, 33, 44, 12, 312, 123, 100, 200, 50, 20, 40],
            backgroundColor: '#235A8F',
            borderRadius: 15,
            borderSkipped: false,
            max: 10000
        },
    ],
};