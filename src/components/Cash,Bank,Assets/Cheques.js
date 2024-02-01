import React, { useState } from 'react';
import Table from '../Table';
import { Link } from 'react-router-dom';

const Cheques = () => {
    const [showAdjustCash, setShowAdjustCash] = useState(false);



    // Sample data array
    const rowData = [
        { type: 'Income', name: "okk", date: '2022-01-01', amount: 1000 },
        // { date: '2022-01-02', referenceNo: '002', partyName: 'Company B', categoryName: 'Category 2', type: 'Expense', total: 500, status: 'Received', balance: 500 },
        // Add more sample data as needed
    ];

    // Column definitions
    const columnDefs = [
        { headerName: 'Type', field: 'type' },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Date', field: 'date' },
        { headerName: 'Amount', field: 'amount' },
    ];





    return (
        <>
            <div>
                <div className='m-4 py-3 text-center text-gray-400 shadow text-2xl font-bold '>

                    <h2 className=''>Cheques Details</h2>
                </div>
                <div className='m-4 border shadow p-2'>
                    <div className=' my-2 text-lg font-semibold'>
                    TRANSACTIONS
                    </div>
                    <Table rowData={rowData} columnDefs={columnDefs} />

                </div>
            </div>




        </>
    );
};
export default Cheques
