import React, { useState } from 'react';
import Table from '../Table';
import { Link } from 'react-router-dom';

const CashInHand = () => {
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
                <div className='m-4 py-3 flex shadow text-2xl font-bold '>

                    <h2>CASH IN HAND</h2>
                    <p className='ml-3 text-emerald-500'>Rs. 500</p>
                </div>
                <div className='m-4 border shadow p-2'>
                    <div className='flex justify-end my-2'>
                        <div to="/debit-note" className='flex items-center justify-center rounded-lg bg-blue-500 text-white font-bold text-sm px-2 py-1 cursor-pointer duration-150 hover:bg-blue-600' onClick={() => setShowAdjustCash(!showAdjustCash)}>
                            {/* <span className='text-blue-500 bg-white rounded-full text-lg p-0'>+</span> */}
                            <h2>Addjust cash</h2>
                        </div>
                    </div>
                    <Table rowData={rowData} columnDefs={columnDefs} />

                </div>
            </div>






            {showAdjustCash ? (
                <>
                    <div
                        className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto">
                            {/*content*/}
                            <div className="p-3 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                                    <div className='flex'>
                                        <h3 className="text-xl font-semibold mx-2">
                                            Cash In Hand
                                        </h3>
                                    </div>
                                    <button
                                        className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowAdjustCash(false)}
                                    >
                                        <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>


                                <div>

                                    <div className="input-container px-3">
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Adjustment</label>
                                        <select name="" id="" class="input_field w-full">
                                            <option value="Add Cash">Add Cash</option>
                                            <option value="Reduce Cash">Reduce Cash</option>
                                        </select>

                                    </div>
                                    <div className="input-container px-3">
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Enter Amount</label>
                                        <input class="input_field w-full" type="number" name="input-name" title="Input title" placeholder="" />
                                    </div>
                                    <div className="input-container px-3">
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Enter Adjustment Date</label>
                                        <input class="input_field w-full" type="date" name="input-name" title="Input title" placeholder="" />
                                    </div>
                                    <div className="input-container px-3">
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Description</label>
                                        <input class="input_field w-full" type="text" name="input-name" title="Input title" placeholder="" />
                                    </div>


                                </div>


                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowAdjustCash(false)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}



        </>
    );
};
export default CashInHand