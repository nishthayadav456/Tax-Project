import React, { useState } from 'react'

const SalesInvoice = () => {
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [addItems, setAddItems] = useState([{ name: '', quantity: '', price:'', tax:'', amount:'' }]);



    const addItemFunc = () => {
        setAddItems([...addItems, { name: '', quantity: '', price:'', tax:'', amount:'' }]);
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
        <div className='flex justify-center items-center '>
            <div className='border m-5 p-6 shadow-xl'style={{ width: "50%" }} >
                <div className='border-b-2 py-2'>

                    <h2 className='text-xl font-bold'>Enter details to make your first Sale 🚀</h2>
                    <p className='text-gray-600 '>First sale is made in less than a minute on Vyapar</p>
                </div>
                <div className='flex justify-between py-4'>
                    <div className=''>
                        <div className='flex items-center'>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white bg-blue-500 p-1 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M9 7V2.2a2 2 0 0 0-.5.4l-4 3.9a2 2 0 0 0-.3.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm2-2a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm0 3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm-6 4c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H8a1 1 0 0 1-1-1v-6Zm8 1v1h-2v-1h2Zm0 3h-2v1h2v-1Zm-4-3v1H9v-1h2Zm0 3H9v1h2v-1Z" clip-rule="evenodd" />
                            </svg>

                            <h2 className='text-xl font-bold'>Invoice Details :</h2>
                        </div>
                        <div>
                            <p>Invoice Number : 01</p>
                            <p>Invoice Date : 24-01-2024</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center'>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white bg-blue-500 p-1 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M9 7V2.2a2 2 0 0 0-.5.4l-4 3.9a2 2 0 0 0-.3.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm2-2a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm0 3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm-6 4c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H8a1 1 0 0 1-1-1v-6Zm8 1v1h-2v-1h2Zm0 3h-2v1h2v-1Zm-4-3v1H9v-1h2Zm0 3H9v1h2v-1Z" clip-rule="evenodd" />
                            </svg>

                            <h2 className='text-xl font-bold'>Bill To :</h2>
                        </div>
                        <div class="input_container">
                            <label class="input_label">Customer Name :</label>
                            <input class="input_field w-full" type="number" name="input-name" title="Input title" placeholder="Customer Name" />
                        </div>
                    </div>
                </div>
                <div className='my-4 border-2 border-dotted border-blue-500 text-blue-500 flex justify-center items-center rounded p-3 cursor-pointer bg-gray-100' onClick={() => setShowAddItemModal(!showAddItemModal)}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 13h3.4a1 1 0 0 1 1 .6 4 4 0 0 0 7.3 0 1 1 0 0 1 .9-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9" />
                    </svg>
                    <h2> Add Item</h2>
                </div>

                <div className='border-b-2 py-4'>
                    <div className='flex items-center my-2 '>
                        {/* <h2 className='bg-blue-500 text-white rounded-full h-6 w-6 '>&#8377;</h2> */}

                        <h2 className='text-xl font-bold'>Invoice Collection :</h2>
                    </div>
                    <div class="flex justify-between items-center my-2">
                        <label class="input_label">Invoice Amount*</label>
                        <input class="input_field " style={{ backgroundColor: "white", border: "1px solid black" }} type="number" name="input-name" title="Inpit title" placeholder="" />
                    </div>
                    <div class="flex justify-between items-center my-2">
                        <label class="input_label">Received</label>
                        <input class="input_field " style={{ backgroundColor: "white", border: "1px solid black" }} type="number" name="input-name" title="Inpit title" placeholder="" />
                    </div>
                </div>

                <div className='my-4 text-emerald-500 flex justify-between items-center rounded p-3 cursor-pointer bg-emerald-100'>
                    <h2>Balance</h2>
                    <h2> &#8377; 0.00</h2>
                </div>

                <div className='text-center flex justify-center'>
                    <div className='rounded-full bg-red-500 text-white px-3 py-2 flex font-bold'>

                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M9 7V2.2a2 2 0 0 0-.5.4l-4 3.9a2 2 0 0 0-.3.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm2-2a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm0 3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3Zm-6 4c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H8a1 1 0 0 1-1-1v-6Zm8 1v1h-2v-1h2Zm0 3h-2v1h2v-1Zm-4-3v1H9v-1h2Zm0 3H9v1h2v-1Z" clip-rule="evenodd" />
                        </svg>

                        <h2 >Create Your Invoice</h2>
                    </div>
                </div>

            </div>
            </div>





            {showAddItemModal ? (
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
                                            Add Item
                                        </h3>

                                    </div>
                                    <button
                                        className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowAddItemModal(false)}
                                    >
                                        <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>


                                <div>
                                    {addItems.map((item, index) => (
                                        <div className='flex justify-center items-center' key={index}>
                                            <div class="input_container mx-2 ">
                                                <label class="input_label">Item Name</label>
                                                <input class="input_field w-full" type="text" name="input-name" title="Input title" placeholder="Field Name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
                                            </div>
                                            <div class="input_container mx-2 ">
                                                <label class="input_label">Quantity</label>
                                                <input class="input_field w-full" type="text" name="input-name" title="Input title" placeholder="Field Value" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />
                                            </div>
                                            <div class="input_container mx-2 ">
                                                <label class="input_label">Price/unit</label>
                                                <input class="input_field w-full" type="text" name="input-name" title="Input title" placeholder="Field Value" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} />
                                            </div>
                                            
                                            <div class="input_container mx-2 ">
                                                <label class="input_label">Tax</label>
                                                <select class="input_field" value={item.tax} onChange={(e) => handleItemChange(index, 'tax', e.target.value)}>
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
                                            <div class="input_container mx-2 ">
                                                <label class="input_label">Amount</label>
                                                <input class="input_field w-full" type="text" name="input-name" title="Input title" placeholder="Field Value" value={item.amount} onChange={(e) => handleItemChange(index, 'amount', e.target.value)} />
                                            </div>
                                            <button className='text-white bg-gray-600 px-2 py-2 mt-5 rounded' onClick={() => removeItem(index)}>
                                                <svg class="w-4 h-4 font-semibold text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                                </svg>
                                            </button>

                                        </div>
                                    ))}
                                    <button className='text-white bg-green-600 px-2 py-1 rounded m-2' onClick={addItemFunc}>Add Field</button>
                                </div>



                                {/* footer */}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowAddItemModal(false)}
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

export default SalesInvoice