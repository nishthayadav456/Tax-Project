import React, { useState } from 'react';
import Table from '../Table';
import { Link } from 'react-router-dom';

const SalesInvoice2 = () => {
    const [showAddPaymentIn, setShowAddPaymentIn] = useState(false);



    // Sample data array
    const rowData = [
        { date: '2022-01-01', referenceNo: '001', partyName: 'Company A', categoryName: 'Category 1', type: 'Income', total: 1000, status: 'Paid', balance: 0 },
        { date: '2022-01-02', referenceNo: '002', partyName: 'Company B', categoryName: 'Category 2', type: 'Expense', total: 500, status: 'Received', balance: 500 },
        // Add more sample data as needed
    ];

    // Column definitions
    const columnDefs = [
        { headerName: 'Date', field: 'date' },
        { headerName: 'Reference No', field: 'referenceNo' },
        { headerName: 'Party Name', field: 'partyName' },
        { headerName: 'Category Name', field: 'categoryName' },
        { headerName: 'Type', field: 'type' },
        { headerName: 'Total', field: 'total' },
        { headerName: 'Status', field: 'status' },
        { headerName: 'Balance', field: 'balance' },
        // { headerName: 'amount', field: 'amount' },
        { headerName: 'Print', field: 'print' },
    ];





    return (
        <>
            <div>
                <div className='m-4 py-3 flex justify-between items-start shadow'>
                    <div className=' mx-3'>
                        <div className='flex items-center my-2'>
                            <select className='text-2xl font-semibold outline-none duration-150 active:bg-gray-100'>
                                <option className='text-lg' value="This Month">This Month</option>
                                <option className='text-lg' value="Last Month">Last Month</option>
                                <option className='text-lg' value="This Quarter">This Quarter</option>
                                <option className='text-lg' value="This Year">This Year</option>
                                <option className='text-lg' value="Custom">Custom</option>
                            </select>

                            <div className='flex border items-center'>
                                <p className='bg-gray-400 text-white '>Between</p>
                                <input className='px-2' type="date" value="" />
                                <p className='px-2'>To</p>
                                <input className='px-2' type="date" value="" />
                            </div>
                            <select className='font-semibold border duration-150 active:bg-gray-100 mx-3 px-2'>
                                <option value="All Firms">All Firms</option>
                                <option value="My Company">My Company</option>
                            </select>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div className='p-3 bg-green-100 rounded-lg font-semibold w-32'>
                                <p className='text-lg'>Paid</p>
                                <p className='text-xl'>&#8377; 0.00</p>
                            </div>
                            <span className='text-xl font-bold'>+</span>
                            <div className='p-3 bg-blue-100 rounded-lg font-semibold w-32'>
                                <p className='text-lg'>Unpaid</p>
                                <p className='text-xl'>&#8377; 0.00</p>
                            </div>
                            <span className='text-xl font-bold'>+</span>
                            <div className='p-3 bg-orange-100 rounded-lg font-semibold w-32'>
                                <p className='text-lg'>Overdue</p>
                                <p className='text-xl'>&#8377; 0.00</p>
                            </div>
                            <span className='text-xl font-bold'>=</span>
                            <div className='p-3 bg-orange-200 rounded-lg font-semibold w-32'>
                                <p className='text-lg'>Total</p>
                                <p className='text-xl'>&#8377; 0.00</p>
                            </div>

                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='m-2 flex flex-col justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                <path fill="#4CAF50" d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z"></path><path fill="#FFF" d="M32 15H39V18H32zM32 25H39V28H32zM32 30H39V33H32zM32 20H39V23H32zM25 15H30V18H25zM25 25H30V28H25zM25 30H30V33H25zM25 20H30V23H25z"></path><path fill="#2E7D32" d="M27 42L6 38 6 10 27 6z"></path><path fill="#FFF" d="M19.129,31l-2.411-4.561c-0.092-0.171-0.186-0.483-0.284-0.938h-0.037c-0.046,0.215-0.154,0.541-0.324,0.979L13.652,31H9.895l4.462-7.001L10.274,17h3.837l2.001,4.196c0.156,0.331,0.296,0.725,0.42,1.179h0.04c0.078-0.271,0.224-0.68,0.439-1.22L19.237,17h3.515l-4.199,6.939l4.316,7.059h-3.74V31z"></path>
                            </svg>
                            <p className='text-sm'>Excel Report</p>
                        </div>
                        <div className='m-2 flex flex-col justify-center items-center'>
                            <svg className="w-4 h-4 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.4 18H19c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v5c0 .6.4 1 1 1h2.6m9.4-7V5c0-.6-.4-1-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4c0 .6-.4 1-1 1H8a1 1 0 0 1-1-1v-4Z" />
                            </svg>
                            <p className='text-sm'>Print</p>
                        </div>
                    </div>
                </div>
                <div className='m-4 border shadow p-2'>
                    <div className='flex justify-end my-2'>
                        <Link to="/add-sale" className='flex items-center justify-center rounded-lg bg-blue-500 text-white font-semibold text-sm px-3 py-2 cursor-pointer duration-150 hover:bg-blue-600' onClick={() => setShowAddPaymentIn(!showAddPaymentIn)}>
                            {/* <span className='text-blue-500 bg-white rounded-full text-lg p-0'>+</span> */}
                            <h2>+ Add Sale</h2>
                        </Link>
                    </div>
                    <Table rowData={rowData} columnDefs={columnDefs} />

                </div>
            </div>



        </>
    );
};
export default SalesInvoice2