import 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';

const barOptions = {
    maintainAspectRatio: false,
};

export default function Chart({ foodTypeData, counts, labelText}) {
    console.log(counts);
    console.log(labelText);
    const data = {
        labels: ['Canned Food', 'Fresh Produce', 'Packaged Meals', 'Fruits & Vegetables', 'Bakery Items', 'Beverages', 'Baby Food'],
        datasets: [
            {
                label: labelText,
                data: foodTypeData,
                backgroundColor: [
                    'pink',
                    '#17a2b8',
                    '#ffc107',
                    'rgb(87, 185, 96)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'red'
                ],
                borderColor: [
                    'pink',
                    '#17a2b8',
                    '#ffc107',
                    'rgb(87, 185, 96)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'red'
                ],
                borderWidth: 1,

            },
        ],
    };

    const data1 = {
        labels: ['Donors', 'Recipients', 'Volunteers'],
        datasets: [
            {
                label: 'Number of users',
                data: counts,
                backgroundColor: [
                    'pink',
                    '#17a2b8',
                    '#ffc107',
                ],
                borderColor: [
                    'pink',
                    '#17a2b8',
                    '#ffc107',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div className="row justify-content-center gap-5">
                <div className="col col-5">
                    <Bar data={data} options={barOptions} />
                </div>
                <div className="col col-5">
                    <Pie data={data1} />
                </div>
            </div>
        </>
    )
}