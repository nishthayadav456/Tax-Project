import React, { useState } from 'react'

const Estimate = () => {
    const [isSelectPartyOpen, setIsSelectPartyOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [addItems, setAddItems] = useState([{ name: '', quantity: '', price: '', tax: '', amount: '' }]);


    const toggleSelectPartyDropdown = () => {
        setIsSelectPartyOpen(!isSelectPartyOpen);
    };

    const handleSearchPartyChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredParties = [
        'Party1',

    ].filter(item => item.toLowerCase().includes(searchTerm));



    const addItemFunc = () => {
        setAddItems([...addItems, { name: '', quantity: '', price: '', tax: '', amount: '' }]);
    };
    const removeItem = (index) => {
        const newItems = [...addItems];
        newItems.splice(index, 1);
        setAddItems(newItems);
    };

    const handleItemChange = (index, key, newValue) => {
        const newItems = [...addItems];
        newItems[index][key] = newValue;
        setAddItems(newItems);
    };
    console.log(addItems);

    return (
        <>
            <h2 className='text-xl font-bold my-3 mx-6'>Estimate/Quotation</h2>
            <div className='p-6'>
                <div className='flex justify-between'>
                    <div class="input_container mx-2 ">
                        <div className="relative group" style={{ width: "15rem" }}>
                            <button
                                id="dropdown-button"
                                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                                onClick={toggleSelectPartyDropdown}
                            >
                                <span className="mr-2">Party</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div
                                id="dropdown-menu"
                                className={`absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ${isSelectPartyOpen ? '' : 'hidden'}`}
                            >
                                {/* Search input */}
                                <input
                                    id="search-input"
                                    className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                                    type="text"
                                    placeholder="Search items"
                                    autoComplete="off"
                                    onChange={handleSearchPartyChange}
                                />
                                {/* Dropdown content goes here */}
                                {filteredParties.map((item, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div class="input_container">
                            <label class="input_label">Ref No</label>
                            <input class="input_field" type="number" name="input-name" placeholder="Ref no" />

                        </div>
                        <div class="input_container ">
                            <label class="input_label">Invoice Date</label>
                            <input class="input_field" type="date" name="input-name" placeholder="Invoice Date" />
                        </div>
                    </div>
                </div>

                <div>



                    <div className='my-3'>
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead className='border'>
                                <tr>
                                    <th className=" p-2 border"><div className='flex justify-between items-center'><h2>Item Name</h2>  
                                    </div></th>
                                    <th className=" p-2 border"><div className='flex justify-between items-center'><h2>Quantity</h2>  
                                    </div></th>
                                    <th className=" p-2 border"><div className='flex justify-between items-center'><h2>Price/unit</h2>  
                                    </div></th>
                                    <th className=" p-2 border"><div className='flex justify-between items-center'><h2>Tax</h2> 
                                    </div></th>
                                    <th className=" p-2 border"><div className='flex justify-between items-center'><h2>Amount</h2>  
                                    </div></th>
                                    <th className=" p-2 border"><div className='flex justify-between items-center'><h2>Action</h2>  
                                    </div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {addItems.map((item, index) => (

                                    <tr className=''>
                                        <td>
                                            <input className="input_field " style={{ width: "100%" }} type="text" name="input-name" title="Input title" placeholder="Item Name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />

                                        </td>
                                        <td>
                                            <input className="input_field w-full" style={{ width: "100%" }} type="text" name="input-name" title="Input title" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />

                                        </td>
                                        <td>
                                            <input className="input_field w-full" style={{ width: "100%" }} type="text" name="input-name" title="Input title" placeholder="Price" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} />

                                        </td>
                                        <td>
                                            <select className="input_field w-full" style={{ width: "100%" }} value={item.tax} onChange={(e) => handleItemChange(index, 'tax', e.target.value)}>
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
                                        </td>
                                        <td>
                                            <input className="input_field w-full" style={{ width: "100%" }} type="text" name="input-name" title="Input title" placeholder="Amount" value={item.amount} onChange={(e) => handleItemChange(index, 'amount', e.target.value)} />

                                        </td>
                                        <td>
                                            <button className='text-white bg-gray-600 p-2 m-2 rounded' onClick={() => removeItem(index)}>
                                                <svg class="w-4 h-4 font-semibold text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <button className='text-white bg-green-600 px-2 py-1 rounded m-2' onClick={addItemFunc}>Add Field</button>

                    </div>


                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"

                    >
                        Save Changes
                    </button>
                </div>



            </div>
        </>
    )
}

export default Estimate