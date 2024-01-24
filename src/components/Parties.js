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

const Parties = () => {
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(1);
    const [isDivClicked, setDivClicked] = useState(false);
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



    return (
        <>
            <div className='' style={{ height: "90vh" }}>
                <div className='w-full text-center border shadow-md m-b-1 h-12'>
                    <h2 className='text-xl'>Name</h2>
                </div>
                <div className='flex h-full'>
                    <div className='w-1/4 border shadow-lg m-1'>
                        <div className='flex items-center justify-around shadow m-2 p-2'>
                            <div className='p-2 rounded-full bg-red-300'>
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                    <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className='font-bold'>Import Parties</h2>
                                <p className='text-sm text-gray-500'>Use Contacts from phone or gmail</p>
                            </div>
                            <div>
                                <svg class="w-6 h-6 text-gray-800 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                    <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                                </svg>
                            </div>
                        </div>

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







                            <div className='flex text-white' style={{ display: isDivClicked ? "none" : "flex"}}>
                                <div className='bg-orange-400 flex justify-around items-center rounded-l-lg px-3 py-2 shadow hover:shadow-lg hover:bg-orange-300 duration-100'>
                                    <h2 className='text-white px-1 font-bold'>+</h2>
                                    <h2>Add Party</h2>
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
                            <div>
                                <div>Party1</div>
                            </div>
                            <div className='text-sm'>
                                <div className='flex justify-between my-2'>
                                    <h2>Phone: <span>9518549504</span></h2>
                                    <h2>Address <span className='text-blue-500'>Add Address</span></h2>
                                </div>
                                <div className='flex justify-between my-2'>
                                    <h2>Email: <span className='text-blue-500'>Add Email</span></h2>
                                    <h2>GSTIN <span className='text-blue-500'>Add GSTIN</span></h2>
                                </div>
                                <div className='flex justify-between my-2'>
                                    <h2>No Creadit card Limit Set: <span className='text-blue-500'>Set Creadit card</span></h2>
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
        </>
    )
}

export default Parties