import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import React, { useState, useEffect, useRef, useCallback } from 'react';
// import OnClickOutside from 'react-onclickoutside';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const data = [
    { type: 'c', number: 23, date: '2024-01-20', total: 1000, balance: 500 },
    { type: 'A', number: 123, date: '2024-01-20', total: 1000, balance: 500 },
    { type: 'd', number: 4123, date: '2024-01-20', total: 1000, balance: 500 },
    { type: 'b', number: 223, date: '2024-01-20', total: 1000, balance: 500 },
    // Add more data entries as needed
];

const Items = () => {
    const [additionalFields, setAdditionalFields] = useState(false);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(1);
    const [isDivClicked, setDivClicked] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [stock, setStock] = useState(false);
    const [viewInputs, setViewInputs] = useState('pricing');


    const [showAdjustItemModal, setshowAdjustItemModal] = useState(false);
    const [showAddItemModal, setshowAddItemModal] = useState(false);
    const [showEditUnitModal, setShowEditUnitModal] = useState(false);

    const [tracking, setTracking] = useState(null);

    const divRef = useRef(null);
    const searchRef = useRef(null);




    const handleHeaderClick = (column) => {
        if (sortedColumn === column) {
            setSortDirection(-sortDirection);
        } else {
            setSortedColumn(column);
            setSortDirection(1);
        }
    };

    const sortedData = [...data].sort((a, b) => {
        const aValue = a[sortedColumn];
        const bValue = b[sortedColumn];

        if (typeof aValue === 'string') {
            return sortDirection * aValue.localeCompare(bValue);
        }

        return sortDirection * (aValue - bValue);
    });

    //for search bar and logo 

    const handleClickOutside = (event) => {
        if (
            divRef.current.contains(event.target) ||
            searchRef.current.contains(event.target)

        ) {
            setDivClicked(true);
        } else {
            setDivClicked(false);
        }
        console.log()
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    //for model


    const handleAdjustModelButtonClick = () => {
        setshowAdjustItemModal(!showAdjustItemModal);
    };

    const handleStockCheckBox = () => {
        setStock(!stock)

    }

    const handleViewInputButton = (selectedView) => {
        setViewInputs(selectedView);
    };


    return (
        <>
            <div className='' style={{ height: "90vh" }}>
                <div className='w-full text-center border shadow-md m-b-1 h-12'>
                    <h2 className='text-xl'>Name</h2>
                </div>
                <div className='flex h-full'>
                    <div className='w-1/4 border shadow-lg m-1'>


                        <div className='flex items-center justify-between m-2 my-6' >

                            <div>
                                <div
                                    ref={divRef}
                                    onClick={handleClickOutside}
                                    style={{
                                        display: isDivClicked ? "none" : "flex",
                                    }}
                                >
                                    <div className='bg-gray-200 duration-200 hover:bg-gray-300 rounded-full p-3'  >
                                        <svg class=" h-4 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div ref={searchRef} >
                                    <p >{isDivClicked && <div><input type="text" className='border-2 p-1' placeholder='Search' /></div>}</p>
                                </div>
                            </div>







                            <div className='flex text-white' style={{ display: isDivClicked ? "none" : "flex" }}>
                                <div onClick={() => setshowAddItemModal(!showAddItemModal)} className='bg-orange-400 flex justify-around items-center rounded-l-lg px-3 py-2 shadow hover:shadow-lg hover:bg-orange-300 duration-100'>
                                    <h2 className='text-white px-1 font-bold'>+</h2>
                                    <h2>Add Item</h2>
                                </div>


                                <Menu as="div" className="relative inline-block text-left bg-orange-500 rounded-r-lg shadow hover:shadow-lg hover:bg-orange-300 duration-100">
                                    <div>
                                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-gray-900">
                                            <svg class="w-4 h-4 text-gray-800 dark:text-white my-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                                            </svg>
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Import Parties
                                                        </a>
                                                    )}
                                                </Menu.Item>

                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>



                            </div>
                        </div>

                        <div className='flex text-gray-500 border border-bottom'>
                            <div className='flex p-2 hover:bg-gray-300 justify-around w-3/6 items-center'>
                                <svg class="w-3 h- text-gray-500 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="1" d="M5 13V1m0 0L1 5m4-4 4 4" />
                                </svg>
                                <h2>Party</h2>
                                <svg class="w-4 h-4 text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z" />
                                </svg>
                            </div>
                            <div className='p-2 hover:bg-gray-300 w-full text-end'>.Amount</div>
                        </div>
                        <div>
                            <div>
                                <div className='flex p-2 justify-between text-gray-500 hover:bg-gray-200 duration-150'>
                                    <div>party1</div>
                                    <div>0.00</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='w-3/4 '>
                        <div className='border shadow-lg m-1 p-2'>
                            <div className='flex justify-between my-2'>
                                <div>Party1</div>
                                <div className='flex items-center rounded-lg bg-blue-500 text-white font-bold text-sm px-2 py-1 cursor-pointer duration-150 hover:bg-blue-600' onClick={handleAdjustModelButtonClick}>
                                    <div className='rounded-full p-1 '>
                                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                                        </svg>
                                    </div>
                                    <h2>ADJUST ITEM</h2>
                                </div>
                            </div>
                            <div className='text-xs'>
                                <div className='flex justify-between my-2'>
                                    <h2>SALE PRICE: <span className='text-green-500'> ₹ 0.00 </span>(excl)</h2>
                                    <h2>STOCK QUANTITY <span className='text-blue-500'>0</span></h2>
                                </div>
                                <div className='flex justify-between my-2'>
                                    <h2>PURCHASE PRICE: <span className='text-green-500'> ₹ 0.00 </span>(excl)</h2>
                                    <h2>STOCK VALUE: <span className='text-green-500'> ₹ 0.00 </span>(excl)</h2>

                                </div>
                            </div>
                        </div>
                        <div className='border shadow-lg m-1 p-2 '>
                            <div className='flex justify-between my-2'>
                                <h2>TRANSACTIONS</h2>
                                <input type="text" className='border-2 p-1' placeholder='Search' />
                            </div>
                            <div>
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead className='border'>
                                        <tr>
                                            <th onClick={() => handleHeaderClick('type')} className="cursor-pointer p-2 border"><div className='flex justify-between items-center'><h2>Type</h2>  <svg class="w-4 h-4 text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z" />
                                            </svg></div></th>
                                            <th onClick={() => handleHeaderClick('number')} className="cursor-pointer p-2 border"><div className='flex justify-between items-center'><h2>Number</h2>  <svg class="w-4 h-4 text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z" />
                                            </svg></div></th>
                                            <th onClick={() => handleHeaderClick('date')} className="cursor-pointer p-2 border"><div className='flex justify-between items-center'><h2>Date</h2>  <svg class="w-4 h-4 text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z" />
                                            </svg></div></th>
                                            <th onClick={() => handleHeaderClick('total')} className="cursor-pointer p-2 border"><div className='flex justify-between items-center'><h2>Total</h2>  <svg class="w-4 h-4 text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z" />
                                            </svg></div></th>
                                            <th onClick={() => handleHeaderClick('balance')} className="cursor-pointer p-2 border"><div className='flex justify-between items-center'><h2>Balance</h2>  <svg class="w-4 h-4 text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z" />
                                            </svg></div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedData.map((row, index) => (
                                            <tr className='' key={index}>
                                                <td>{row.type}</td>
                                                <td>{row.number}</td>
                                                <td>{row.date}</td>
                                                <td>{row.total}</td>
                                                <td>{row.balance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>






            {showAdjustItemModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                                    <div className='flex'>
                                        <h3 className="text-xl font-semibold mx-2">
                                            Stock Adjustment
                                        </h3>
                                        <div className='flex mx-2 '>
                                            <p className={` font-semibold ${stock ? "text-gray-400" : "text-blue-500"} `}>Add Stock</p>
                                            <div className='mx-2'>

                                                <label class="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" value="" className="sr-only peer" checked={stock} onChange={handleStockCheckBox} />
                                                    <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                            <p className={` font-semibold ${stock ? "text-blue-500" : "text-gray-400"} `}>Reduce Stock</p>
                                        </div>
                                    </div>
                                    <button
                                        className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setshowAdjustItemModal(false)}
                                    >
                                        <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className='m-6 text-sm border-b py-2'>
                                    <p>Item Name</p>
                                    <div className='flex justify-between items-center  '>
                                        <p className='font-bold'>Item1</p>
                                        <input className="input_field" type="date" name="input-name" title="Inpit title" placeholder="Adjustment Date" />
                                    </div>
                                </div>
                                <div className="relative p-6 flex">

                                    <div class="input_container mx-2 ">
                                        <label class="input_label">Total Qty</label>
                                        <input class="input_field w-full" type="text" name="input-name" title="Inpit title" />
                                    </div>
                                    <div class="input_container mx-2 ">
                                        <label class="input_label">At Price</label>
                                        <input class="input_field w-full" type="number" name="input-name" title="Inpit title" placeholder="" />
                                    </div>

                                    <div class="input_container mx-2 ">
                                        <label class="input_label">Details</label>
                                        <input class="input_field w-full" style={{ width: "30rem" }} type="number" name="input-name" title="Inpit title" placeholder="" />
                                    </div>

                                </div>






                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setshowAdjustItemModal(false)}
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


            {showAddItemModal ? (
                <>
                    <div
                        className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
                                    <div className='flex'>
                                        <h3 className="text-xl font-semibold mx-2">
                                            Add Item
                                        </h3>
                                        <div className='flex mx-2 '>
                                            <p className={` font-semibold ${toggle ? "text-gray-400" : "text-blue-500"} `}>Product</p>
                                            <div className='mx-2'>

                                                <label class="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" value="" class="sr-only peer" checked={toggle} onChange={() => setToggle(!toggle)} />
                                                    <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                            <p className={` font-semibold ${toggle ? "text-blue-500" : "text-gray-400"} `}>Service</p>
                                        </div>
                                    </div>
                                    <button
                                        className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setshowAddItemModal(false)}
                                    >
                                        <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>

                                {!toggle ?

                                    <div>
                                        <div className="relative p-6">
                                            <div className='flex'>
                                                <div class="input_container mx-2 ">
                                                    <label class="input_label">Item Name :</label>
                                                    <input class="input_field" type="number" name="input-name" title="Input title" placeholder="" />
                                                </div>
                                                <div class="input_container mx-2 ">
                                                    <label class="input_label">Category :</label>
                                                    <input class="input_field" type="text" name="input-name" title="Input title" />
                                                </div>

                                                <div class="input_container mx-2 ">
                                                    <label class="input_label">ItemHsn :</label>
                                                    <input class="input_field" type="number" name="input-name" title="Input title" placeholder="" />
                                                </div>
                                                <div class="input_container mx-2 ">
                                                    <label class="input_label">Item Code</label>
                                                    <div className='flex'>
                                                        <input class="input_field" type="number" name="input-name" title="Input title" placeholder="" />
                                                        <a href="" className='border text-xs text-white bg-blue-500 font-semibold whitespace-nowrap flex items-center px-2 rounded-xl'>Assign Code</a>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='flex'>

                                                <div class="input_container mx-2">
                                                    <label class="input_label">Descriptions</label>
                                                    <textarea className='input_field' id="" cols="30" rows="10"></textarea>
                                                </div>
                                                <div class="input_container mx-2">
                                                    <label class="input_label">Add Image</label>
                                                    <input class="input_field" type="file" name="input-name" title="Input title" placeholder="" />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="relative p-6 flex">
                                            <button
                                                className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowEditUnitModal(!showEditUnitModal)}
                                            >
                                                Edit Unit
                                            </button>
                                        </div>

                                        <div className="flex items-center mb-4 p-6">
                                            <input
                                                type="radio"
                                                id="option1"
                                                name="options"
                                                value="option1"
                                                checked={tracking === 'option1'}
                                                onChange={() => setTracking('option1')}
                                                className="mr-2 h-4 w-4"
                                            />
                                            <label htmlFor="option1" className="mr-4">Batch Tracking</label>

                                            <input
                                                type="radio"
                                                id="option2"
                                                name="options"
                                                value="option2"
                                                checked={tracking === 'option2'}
                                                onChange={() => setTracking('option2')}
                                                className="mr-2 h-4 w-4"
                                            />
                                            <label htmlFor="option2">Serial No. Tracking</label>
                                            <button
                                                onClick={() => setTracking(null)}
                                                className="text-blue-500 font-bold py-2 px-4 rounded"
                                            >
                                                Clear Tracking
                                            </button>
                                        </div>


                                        <div className='p-6'>
                                            <div className='border-b-2'>
                                                <button className={`px-3 py-2 text-xl active:bg-gray-200 ${viewInputs === 'pricing' && "border-b-2 border-blue-500 text-blue-500"} `} onClick={() => handleViewInputButton('pricing')}>Pricing</button>
                                                <button className={`px-3 py-2 text-xl active:bg-gray-200 ${viewInputs === 'stock' && "border-b-2 border-blue-500 text-blue-500"} `} onClick={() => handleViewInputButton('stock')}>Stock</button>
                                                <button className={`px-3 py-2 text-xl active:bg-gray-200 ${viewInputs === 'manufacturing' && "border-b-2 border-blue-500 text-blue-500"} `} onClick={() => handleViewInputButton('manufacturing')}>Manufacturing</button>
                                            </div>

                                            {viewInputs === 'pricing' && (

                                                <div>
                                                    <div className='border my-8 bg-gray-100 p-6'>
                                                        <h2 className=' text-lg font-semibold'>MRP</h2>
                                                        <div className='flex'>

                                                            <div className='p-2 input_container'>
                                                                <input type="text" placeholder='MRP' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                            </div>
                                                            <div className='p-2 input_container'>
                                                                <input type="text" placeholder='Disc. On MRP For Sale(%)' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                            </div>
                                                            <div className='p-2 input_container'>
                                                                <input type="text" placeholder='Disc. On MRP For Wholesale(%)' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />

                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div className='border my-8 bg-gray-100'>
                                                        <div className='p-6'>
                                                            <h2 className=' text-lg font-semibold'>Sale Price</h2>
                                                            <div className='flex'>

                                                                <div className='p-2'>
                                                                    <input type="text" placeholder='Sale Price' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                                    <select name="" id="" className='border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1'>
                                                                        <option value="With Tax">With Tax</option>
                                                                        <option value="Without Tax">Without Tax</option>
                                                                    </select>
                                                                </div>
                                                                <div className='p-2'>
                                                                    <input type="text" placeholder='Disc. on Sales Price' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                                    <select name="" id="" className='border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1'>
                                                                        <option value="Percentage">Percentage</option>
                                                                        <option value="Amount">Amount</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='p-6'>
                                                            <h2 className='py-6 text-lg font-semibold'>Wholesale Price</h2>
                                                            <div className='flex'>

                                                                <div className='p-2'>
                                                                    <input type="text" placeholder='Wholesale Price' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                                    <select name="" id="" className='border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1'>
                                                                        <option value="With Tax">With Tax</option>
                                                                        <option value="Without Tax">Without Tax</option>
                                                                    </select>
                                                                </div>
                                                                <div className='p-2'>
                                                                    <input type="text" placeholder='Minimum Wholesale Qty' className='border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-8 w-full'>
                                                        <div className='border my-8 bg-gray-100 w-6/12'>
                                                            <div className='p-6'>
                                                                <h2 className=' text-lg font-semibold'>Purchase Price</h2>
                                                                <div className='flex'>

                                                                    <div className='p-2'>
                                                                        <input type="text" placeholder='Purchase Price' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                                        <select name="" id="" className='border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1'>
                                                                            <option value="With Tax">With Tax</option>
                                                                            <option value="Without Tax">Without Tax</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='border my-8 bg-gray-100 w-6/12'>
                                                            <div className='p-6'>
                                                                <h2 className=' text-lg font-semibold'>Taxes</h2>
                                                                <div className='flex'>

                                                                    <div className='p-2 flex flex-col input_container'>
                                                                        {/* <label className='input_label'>Tax rate</label> */}
                                                                        <select name="" id="" className='border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1'>
                                                                            <option value=''>None</option>
                                                                            <option value='0'>GST@0</option>
                                                                            <option value='0'>IGST@0</option>
                                                                            <option value='0.25'>IGST@0.25%</option>
                                                                            <option value='0.25'>GST@0.25%</option>
                                                                            <option value='3'>IGST@3%</option>
                                                                            <option value='3'>GST@3%</option>
                                                                            <option value='5'>IGST@5%</option>
                                                                            <option value='5'>GST@5%</option>
                                                                            <option value='12'>IGST@12%</option>
                                                                            <option value='12'>GST@12%</option>
                                                                            <option value='18'>IGST@18%</option>
                                                                            <option value='18'>GST@18%</option>
                                                                            <option value='28'>IGST@28%</option>
                                                                            <option value='28'>GST@28%</option>
                                                                            <option value='exmpt'>exmpt</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>



                                                </div>
                                            )}

                                            {viewInputs === 'stock' && (
                                                <div>
                                                    <div className="p-6 flex">

                                                        <div class="input_container mx-2 ">
                                                            <label class="input_label">Opening Qty:</label>
                                                            <input class="input_field w-full" type="text" name="input-name" title="Input title" placeholder="Opening Qty" />
                                                        </div>
                                                        <div class="input_container mx-2 ">
                                                            <label class="input_label">At Price :</label>
                                                            <input class="input_field w-full" type="number" name="input-name" title="Input title" placeholder="At Price" />
                                                        </div>
                                                        <div class="input_container mx-2 ">
                                                            <label class="input_label">As Of Date :</label>
                                                            <input class="input_field w-full" type="date" name="input-name" title="Input title" placeholder="As Of Date :" />
                                                        </div>
                                                    </div>
                                                    <div className="p-6 flex">

                                                        <div class="input_container mx-2 ">
                                                            <label class="input_label">Min.StockMaintain:</label>
                                                            <input class="input_field w-full" type="text" name="input-name" title="Input title" placeholder="Min.StockMaintain" />
                                                        </div>
                                                        <div class="input_container mx-2 ">
                                                            <label class="input_label">Location :</label>
                                                            <input class="input_field w-full" type="number" name="input-name" title="Input title" placeholder="Location" />
                                                        </div>

                                                    </div>
                                                </div>
                                            )}


                                        </div>




                                    </div>
                                    :
                                    <div>
                                        <div className="relative p-6">
                                            <div className='flex'>
                                                <div class="input_container mx-2 ">
                                                    <label class="input_label">Service Name :</label>
                                                    <input class="input_field" type="number" name="input-name" title="Input title" placeholder="" />
                                                </div>
                                                <div class="input_container mx-2 ">
                                                    <label class="input_label">Category :</label>
                                                    <input class="input_field" type="text" name="input-name" title="Input title" />
                                                </div>

                                                <div class="input_container mx-2 ">
                                                    <label class="input_label">Service Hsn :</label>
                                                    <input class="input_field" type="number" name="input-name" title="Input title" placeholder="" />
                                                </div>
                                                <div class="input_container mx-2 ">
                                                    <label class="input_label">Service Code</label>
                                                    <div className='flex'>
                                                        <input class="input_field" type="number" name="input-name" title="Input title" placeholder="" />
                                                        <a href="" className='border text-xs text-white bg-blue-500 font-semibold whitespace-nowrap flex items-center px-2 rounded-xl'>Assign Code</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex'>

                                                <div class="input_container mx-2">
                                                    <label class="input_label">Descriptions</label>
                                                    <textarea className='input_field' id="" cols="30" rows="10"></textarea>
                                                </div>
                                                <div class="input_container mx-2">
                                                    <label class="input_label">Add Image</label>
                                                    <input class="input_field" type="file" name="input-name" title="Input title" placeholder="" />
                                                </div>
                                            </div>

                                        </div>


                                        <div className="relative p-6 flex">
                                            <button
                                                className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowEditUnitModal(!showEditUnitModal)}
                                            >
                                                Edit Unit
                                            </button>
                                        </div>

                                        <div className='p-6'>
                                            <div className='border-b-2'>
                                                <button className={`px-3 py-2 text-xl active:bg-gray-200 ${viewInputs === 'pricing' && "border-b-2 border-blue-500 text-blue-500"} `} onClick={() => handleViewInputButton('pricing')}>Pricing</button>
                                            </div>

                                            {viewInputs === 'pricing' && (

                                                <div>
                                                    <div className='border my-8 bg-gray-100 p-6'>
                                                        <h2 className=' text-lg font-semibold'>MRP</h2>
                                                        <div className='flex'>

                                                            <div className='p-2 input_container'>
                                                                <input type="text" placeholder='MRP' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                            </div>
                                                            <div className='p-2 input_container'>
                                                                <input type="text" placeholder='Disc. On MRP For Sale(%)' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                            </div>
                                                            <div className='p-2 input_container'>
                                                                <input type="text" placeholder='Disc. On MRP For Wholesale(%)' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='border my-8 bg-gray-100'>
                                                        
                                                        <div className='p-6'>
                                                            <h2 className=' text-lg font-semibold'>Sale Price</h2>
                                                            <div className='flex'>

                                                                <div className='p-2'>
                                                                    <input type="text" placeholder='Sale Price' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                                    <select name="" id="" className='border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1'>
                                                                        <option value="With Tax">With Tax</option>
                                                                        <option value="Without Tax">Without Tax</option>
                                                                    </select>
                                                                </div>
                                                                <div className='p-2'>
                                                                    <input type="text" placeholder='Disc. on Sales Price' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                                    <select name="" id="" className='border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1'>
                                                                        <option value="Percentage">Percentage</option>
                                                                        <option value="Amount">Amount</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='p-6'>
                                                            <h2 className='py-6 text-lg font-semibold'>Wholesale Price</h2>
                                                            <div className='flex'>

                                                                <div className='p-2'>
                                                                    <input type="text" placeholder='Wholesale Price' className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                                    <select name="" id="" className='border-2 rounded-r hover:border-black focus:border-blue-500 px-2 py-1'>
                                                                        <option value="With Tax">With Tax</option>
                                                                        <option value="Without Tax">Without Tax</option>
                                                                    </select>
                                                                </div>
                                                                <div className='p-2'>
                                                                    <input type="text" placeholder='Minimum Wholesale Qty' className='border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='border my-8 bg-gray-100'>
                                                        <div className='p-6'>
                                                            <h2 className=' text-lg font-semibold'>Taxes</h2>
                                                            <div className='flex'>

                                                                <div className='p-2 flex flex-col input_container'>
                                                                    {/* <label className='input_label'>Tax rate</label> */}
                                                                    <select name="" id="" className='w-1/3 border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1'>
                                                                        <option value=''>None</option>
                                                                        <option value='0'>GST@0</option>
                                                                        <option value='0'>IGST@0</option>
                                                                        <option value='0.25'>IGST@0.25%</option>
                                                                        <option value='0.25'>GST@0.25%</option>
                                                                        <option value='3'>IGST@3%</option>
                                                                        <option value='3'>GST@3%</option>
                                                                        <option value='5'>IGST@5%</option>
                                                                        <option value='5'>GST@5%</option>
                                                                        <option value='12'>IGST@12%</option>
                                                                        <option value='12'>GST@12%</option>
                                                                        <option value='18'>IGST@18%</option>
                                                                        <option value='18'>GST@18%</option>
                                                                        <option value='28'>IGST@28%</option>
                                                                        <option value='28'>GST@28%</option>
                                                                        <option value='exmpt'>exmpt</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>



                                                </div>
                                            )}


                                        </div>




                                    </div>

                                }



                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setshowAddItemModal(false)}
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



            {showEditUnitModal ? (
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
                                            Edit Unit
                                        </h3>

                                    </div>
                                    <button
                                        className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowEditUnitModal(false)}
                                    >
                                        <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className='flex'>
                                    <div className=" px-3">
                                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Select Basic Unit</label>
                                        <select id="countries" class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value="">None</option>
                                            <option value="bags">BAGS(Bag)</option>
                                            <option value="bottle">BOTTLE(Btl)</option>
                                            <option value="box">BOX(Box)</option>
                                            <option value="bundles">BUNDLES(Bdl)</option>
                                            <option value="cans">CANS(can)</option>
                                            <option value="cartons">CARTONS(Ctn)</option>
                                            <option value="dogens">DOGENS(Dzn)</option>
                                            <option value="grammes">GRAMMES(GM)</option>
                                            <option value="kilograms">KILOGRAMS(KG)</option>
                                            <option value="litters">LITTERS(Ltr)</option>
                                            <option value="meaters">MEATERS(Mtr)</option>
                                            <option value="mililiter">MILILITER(Ml)</option>
                                            <option value="numbers">NUMBERS(Nos)</option>
                                            <option value="packs">PACKS(Pac)</option>
                                            <option value="pairs">PAIRS(Prs)</option>
                                            <option value="pieces">PIECES(Pcs)</option>
                                            <option value="quintals">QUINTALS(Qtl)</option>
                                            <option value="rolls">ROLLS(Rol)</option>
                                            <option value="squarefeet">SQUARE FEET(Sqf)</option>
                                        </select>
                                    </div>
                                    <div className="px-3">
                                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Select Secondary Unit:</label>
                                        <select id="countries" class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value="">None</option>
                                            <option value="bags">BAGS(Bag)</option>
                                            <option value="bottle">BOTTLE(Btl)</option>
                                            <option value="box">BOX(Box)</option>
                                            <option value="bundles">BUNDLES(Bdl)</option>
                                            <option value="cans">CANS(can)</option>
                                            <option value="cartons">CARTONS(Ctn)</option>
                                            <option value="dogens">DOGENS(Dzn)</option>
                                            <option value="grammes">GRAMMES(GM)</option>
                                            <option value="kilograms">KILOGRAMS(KG)</option>
                                            <option value="litters">LITTERS(Ltr)</option>
                                            <option value="meaters">MEATERS(Mtr)</option>
                                            <option value="mililiter">MILILITER(Ml)</option>
                                            <option value="numbers">NUMBERS(Nos)</option>
                                            <option value="packs">PACKS(Pac)</option>
                                            <option value="pairs">PAIRS(Prs)</option>
                                            <option value="pieces">PIECES(Pcs)</option>
                                            <option value="quintals">QUINTALS(Qtl)</option>
                                            <option value="rolls">ROLLS(Rol)</option>
                                            <option value="squarefeet">SQUARE FEET(Sqf)</option>
                                        </select>
                                    </div>
                                </div>




                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowEditUnitModal(false)}
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
    )
}

export default Items