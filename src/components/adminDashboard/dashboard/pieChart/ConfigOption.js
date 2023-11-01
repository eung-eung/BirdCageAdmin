
export const options = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right',
        },

    }
}
export const data = {
    labels: [
        'Artium',
        'Wego',
        'Henry'
    ],
    datasets: [{

        data: [300, 50, 100],
        backgroundColor: [
            '#003C75',
            '#235A8F4D',
            '#235A8F'
        ],
        hoverOffset: 4
    }]
};