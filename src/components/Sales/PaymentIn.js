import React, { useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
import Table from '../Table';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { type } from '@testing-library/user-event/dist/type';
const PaymentIn = () => {
    const [gridApi, setGridApi] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [showAddPaymentIn, setShowAddPaymentIn] = useState(false);
    const [addPaymentType, setAddPaymentType] = useState([{ paymentType: '', referenceNo: '', amount: '' }]);
    const [showAddBankAcModal, setShowAddBankAcModal] = useState(false);
    const [showAccountFields, setShowAccountFields] = useState(false);
    const [showUpiFields, setShowUpiFields] = useState(false);

    const handleCheckboxChange = (checkboxType) => {
        if (checkboxType === 'account') {
            setShowAccountFields(!showAccountFields);
        } else if (checkboxType === 'upi') {
            setShowUpiFields(!showUpiFields);
        }
    };
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


    const addPaymentFunc = () => {
        if (addPaymentType.length < 4) {
            setAddPaymentType([...addPaymentType, { paymentType: '', referenceNo: '', amount: '' }]);
        }
    };
    const removePaymentFunc = (index) => {
        const newPayment = [...addPaymentType];
        newPayment.splice(index, 1);
        setAddPaymentType(newPayment);
    };

    const handlePaymentTypeChange = (index, key, newValue) => {
        const newPayment = [...addPaymentType];
        newPayment[index][key] = newValue;
        setAddPaymentType(newPayment);
        console.log(newPayment)
    };




    return (
        <>
            <div>
                <div className='m-6 flex justify-between'>
                    <div className='flex items-center '>
                        <select className='text-2xl font-semibold outline-none duration-150 active:bg-gray-100 mx-3'>
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
                <div className='p-6'>
                    <div className='flex justify-end my-2'>
                        <div className='flex items-center justify-center rounded-lg bg-blue-500 text-white font-bold text-sm px-2 py-1 cursor-pointer duration-150 hover:bg-blue-600' onClick={() => setShowAddPaymentIn(!showAddPaymentIn)}>
                            {/* <span className='text-blue-500 bg-white rounded-full text-lg p-0'>+</span> */}
                            <h2>+ Add Payment-In</h2>
                        </div>
                    </div>
                    <Table rowData={rowData} columnDefs={columnDefs} />

                </div>
            </div>

            {showAddPaymentIn ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto">
                            {/*content*/}
                            <div className="p-3 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                                    <div className='flex'>
                                        <h3 className="text-xl font-semibold mx-2">
                                            Payment-In
                                        </h3>

                                    </div>
                                    <button
                                        className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowAddPaymentIn(false)}
                                    >
                                        <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className='flex justify-between w-full'>
                                    <div>
                                        <div className='input_container '>
                                            <label className='input_label'>Party</label>
                                            <select className='input_field ' style={{ width: "150px" }} >
                                                <option value="">none</option>
                                                <option value="party1">party1</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='input_container'>
                                            <label className='input_label'>Receipt No</label>
                                            <input type="number" className='input_field' />
                                        </div>
                                        <div className='input_container'>
                                            <label className='input_label'>Date</label>
                                            <input type="date" className='input_field' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between '>
                                    <div className='mr-24 border rounded-lg p-4'>
                                        {addPaymentType.map((field, index) => (
                                            <div className='flex justify-center items-center' key={index}>
                                                <div className="input_container mx-2 ">
                                                    <label className="input_label">Payment Type</label>
                                                    <select className="input_field w-full" type="text" name="input-name" placeholder="Payment Type" value={field.paymentType} onChange={(e) => handlePaymentTypeChange(index, 'paymentType', e.target.value)} >
                                                        <option value=""></option>
                                                        <option value="Cash">Cash</option>
                                                        <option value="Cheque">Cheque</option>
                                                    </select>
                                                </div>
                                                {field.paymentType === 'Cheque' &&
                                                    <div className="input_container mx-2 ">
                                                        <label className="input_label">Reference No</label>
                                                        <input className="input_field w-full" type="text" name="input-name" placeholder="Amount" value={field.referenceNo} onChange={(e) => handlePaymentTypeChange(index, 'referenceNo', e.target.value)} />
                                                    </div>
                                                }
                                                <div className="input_container mx-2 ">
                                                    <label className="input_label">Amount</label>
                                                    <input className="input_field w-full" type="text" name="input-name" placeholder="Amount" value={field.amount} onChange={(e) => handlePaymentTypeChange(index, 'amount', e.target.value)} />
                                                </div>
                                                <button className='text-white bg-red-600 px-2 py-1 rounded' onClick={() => removePaymentFunc(index)}>Remove</button>

                                            </div>
                                        ))}
                                        <button className='text-white bg-green-600 px-2 py-1 rounded m-2' onClick={addPaymentFunc}>Add Field</button>
                                    </div>


                                    <div>
                                        <div className="input_container mx-2 ">
                                            <label className="input_label">Received</label>
                                            <input className="input_field w-full" type="number" placeholder="Amount" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative p-6 flex">
                                    <button
                                        className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowAddBankAcModal(!showAddBankAcModal)}
                                    >
                                        Edit Unit
                                    </button>
                                </div>
                                <div className='flex my-3'>
                                    <div className="input_container mx-2 ">
                                        <label className="input_label">Description</label>
                                        <textarea className="input_field w-full" type="text" placeholder="description" />
                                    </div>
                                    <div className="input_container mx-2 ">
                                        <label className="input_label">Add Image</label>
                                        <input className="input_field w-full" type="file" placeholder="Add Image" />
                                    </div>
                                </div>


                                {/* footer */}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowAddPaymentIn(false)}
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



            {showAddBankAcModal ? (
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
                                            Add Bank Account
                                        </h3>
                                    </div>
                                    <button
                                        className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowAddBankAcModal(false)}
                                    >
                                        <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div>
                                    <div className='flex'>
                                        <div className="input-container px-3">
                                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Account Display Name</label>
                                            <input class="input_field w-full" type="number" name="input-name" title="Input title" placeholder="Account Display Name" />

                                        </div>
                                        <div className="input-container px-3">
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Opening Balance</label>
                                            <input class="input_field w-full" type="number" name="input-name" title="Input title" placeholder="Opening Balance" />

                                        </div>
                                        <div className="input-container px-3">
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">As Of date</label>
                                            <input class="input_field w-full" type="number" name="input-name" title="Input title" placeholder="As Of date" />
                                        </div>
                                    </div>
                                    <div className='border p-3 m-4 rounded'>
                                        
                                        <div className='input-container'>
                                            <input type="checkbox" className='h-4 w-4 mx-2' onChange={() => handleCheckboxChange('upi')} />
                                            <label >Print UPI QR Code on Invoices</label>
                                        </div>
                                        <div className='input-container'>
                                            <input type="checkbox" className='h-4 w-4 mx-2' onChange={() => handleCheckboxChange('account')} />
                                            <label >Print bank details on invoices</label>
                                        </div>
                                        <div className='flex my-3'>
                                            {(showAccountFields|| showUpiFields) && (
                                                <div className="input-container px-3">
                                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Account Number</label>
                                                    <input class="input_field w-full" type="number" name="input-name" title="Input title" placeholder="Account Number" />
                                                </div>
                                            )}
                                            {(showAccountFields|| showUpiFields) && (
                                                <div className="input-container px-3">
                                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Ifsc Code</label>
                                                    <input class="input_field w-full" type="number" name="input-name" title="Input title" placeholder="Ifsc Code" />
                                                </div>
                                            )}
                                            {(showAccountFields|| showUpiFields) && (
                                                <div className="input-container px-3">
                                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Bank Name</label>
                                                    <input class="input_field w-full" type="text" name="input-name" title="Input title" placeholder="Bank Name" />
                                                </div>
                                            )}
                                            {showAccountFields && (
                                                <div className="input-container px-3">
                                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Account Holder Name</label>
                                                    <input class="input_field w-full" type="text" name="input-name" title="Input title" placeholder="Account Holder Name" />
                                                </div>
                                            )}
                                            {showUpiFields && (
                                                <div className="input-container px-3">
                                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">UPI ID for QR Code</label>
                                                    <input class="input_field w-full" type="text" name="input-name" title="Input title" placeholder="UPI ID for QR Code" />
                                                </div>
                                            )}
                                            
                                        </div>

                                    </div>
                                </div>


                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowAddBankAcModal(false)}
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
export default PaymentIn