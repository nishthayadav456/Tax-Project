import React, { useState } from 'react'

const AddSale = () => {
    const [addItems, setAddItems] = useState([{ category: '', name: '', code: '', HSNCode: '', serialNo: '', Description: '', Count: '', BatchNo: '', ModelNo: '', EXPDate: '', MFGDate: '', MRP: '', Size: '', quantity: '', freeQTY: '', unit: '', discount: '', price: '', tax: '', addCess: '', amount: '' }]);
    const [showAddSerialNoModal, setShowAddSerialNoModal] = useState(false);
    const [inputSerialNumber, setInputSerialNumber] = useState('');
    const [serialNumbers, setSerialNumbers] = useState([]);
    const [toggle, setToggle] = useState(true);




    const addItemFunc = () => {
        // console.log("event", event.target.name, event.target.value)
        setAddItems([...addItems, { category: '', name: '', code: '', HSNCode: '', serialNo: '', Description: '', Count: '', BatchNo: '', ModelNo: '', EXPDate: '', MFGDate: '', MRP: '', Size: '', quantity: '', freeQTY: '', unit: '', discount: '', price: '', tax: '', addCess: '', amount: '' }]);
        console.log(addItems)
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
        console.log(addItems)

    };
    const handleSerialNumberChange = (event) => {
        setInputSerialNumber(event.target.value);
    };

    const handleAddSerialNumber = () => {
        if (inputSerialNumber.trim() !== '') {
            setSerialNumbers([...serialNumbers, parseInt(inputSerialNumber)]);
            setInputSerialNumber('');
        }
        console.log(serialNumbers)
    };

    const handleRemoveNumber = (index) => {
        const updatedNumbers = [...serialNumbers];
        updatedNumbers.splice(index, 1);
        setSerialNumbers(updatedNumbers);
    };




    return (
        <>
            <div className='flex items-center'>
                <h2 className='text-xl font-bold my-3 mx-6 '>Sale</h2>
                <div className="flex mx-2 ">
                    <p
                        className={` font-semibold ${toggle ? "text-gray-400" : "text-blue-500"
                            } `}
                    >
                        Credit
                    </p>
                    <div className="mx-2">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                class="sr-only peer"
                                checked={toggle}
                                onChange={() => setToggle(!toggle)}
                            />
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <p
                        className={` font-semibold ${toggle ? "text-blue-500" : "text-gray-400"
                            } `}
                    >
                        Cash
                    </p>
                </div>
            </div>
            <div className=''>
                <div className='flex justify-between'>
                    <div>
                        <div className="m-2 flex justify-center items-start" >
                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2" type="text" name="" placeholder="Customer" />
                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2" type="text" name="" placeholder="Billing Name" />
                        </div>
                        <div className="m-2 flex justify-center items-start" >
                            <textarea className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2 w-full" name="" placeholder='Billing Address' id="" cols="" rows="3"></textarea>
                            <textarea className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2 w-full" name="" placeholder='Shipping Address' id="" cols="" rows="3"></textarea>
                        </div>
                    </div>

                    <div>
                        <div className="m-2 flex justify-center items-start" >
                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2" type="number" name="" placeholder="Phone No." />
                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2" type="text" name="" placeholder="E-Way No." />
                        </div>
                        <div className="m-2" >
                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2" type="number" name="" placeholder="PO No." />
                        </div>
                        <div className="m-2" >
                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2" type="date" name="" placeholder="PO Date." />
                        </div>

                    </div>


                    <div className=''>
                        <div class="flex justify-between items-center my-2">
                            <label class="input_label">Invoice Number</label>
                            <input class="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2 w-36" type="number" name="" placeholder="Invoice Number" />

                        </div>
                        <div class="flex justify-between items-center my-2">
                            <label class="input_label">Invoice Date</label>
                            <input class="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2 w-36" type="date" name="" placeholder="Invoice Date" />
                        </div>
                        <div class="flex justify-between items-center my-2">
                            <label class="input_label">Time</label>
                            <input class="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2 w-36" type="time" name="" placeholder="Invoice Date" />
                        </div>
                        <div class="flex justify-between items-center my-2">
                            <label class="input_label">State of supply</label>
                            <select class="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2 w-36"
                            >
                                <option value=''>None</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Puducherry">Puducherry</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>



                    <div className=' mx-2 my-3 w-[80vw] overflow-scroll'>
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead className='border'>
                                <tr>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Category</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Item Name</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Item Code</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>HSN Code</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Serial No.</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Description</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Count</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Batch No.</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Model No.</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>EXP. Date</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>MFG. Date</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>MRP</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Size</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Quantity</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Free QTY</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Unit</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Discount</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Price/unit</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Tax</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Add Cess</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Amount</h2></div></th>
                                    <th className=" p-2 border whitespace-nowrap"><div className='flex justify-between items-center text-xs'><h2>Action</h2></div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {addItems.map((item, index) => (

                                    <tr className=''>
                                        <td>
                                            <select className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} >
                                                <option value="">tools</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Item Name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Item Code" value={item.code} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="HSN Code" value={item.HSNCode} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
                                        </td>
                                        <td>
                                            <button onClick={() => setShowAddSerialNoModal(!showAddSerialNoModal)}>
                                                <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M5 8h0m0 4h0m0 4h0" />
                                                </svg>
                                            </button>
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Description" value={item.Description} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Count" value={item.Count} onChange={(e) => handleItemChange(index, 'BatchNo', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Batch No." value={item.BatchNo} onChange={(e) => handleItemChange(index, 'BatchNo', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Model No." value={item.ModelNo} onChange={(e) => handleItemChange(index, 'ModelNo', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="EXP. Date" value={item.EXPDate} onChange={(e) => handleItemChange(index, 'EXPDate', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="MFG. Date" value={item.MFGDate} onChange={(e) => handleItemChange(index, 'MFGDate', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="MRP" value={item.MRP} onChange={(e) => handleItemChange(index, 'MRP', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Size" value={item.Size} onChange={(e) => handleItemChange(index, 'Size', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Free QTY" value={item.freeQTY} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />
                                        </td>
                                        <td>
                                            <select className='border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none ' id="">
                                                <option value="">none</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Discount" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Price/unit" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} />
                                        </td>
                                        <td>
                                            <select className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} value={item.tax} onChange={(e) => handleItemChange(index, 'tax', e.target.value)}>
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
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Add Cess" value={item.amount} onChange={(e) => handleItemChange(index, 'amount', e.target.value)} />
                                        </td>
                                        <td>
                                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="" placeholder="Amount" value={item.amount} onChange={(e) => handleItemChange(index, 'amount', e.target.value)} />
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
                        <div className='flex justify-between items-center'>
                            <button className='text-blue-500 border border-blue-500 px-2 py-1 rounded m-2' onClick={addItemFunc}>Add Row</button>
                            <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " type="text" name="" placeholder="Total" />
                        </div>

                    </div>



                </div>

                <div>
                    <div>

                        <div className='flex'>
                            <div className='m-2'>
                                <textarea className='border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none' name="" id="" cols="30" rows="3"></textarea>
                            </div>
                            <div className='m-2'>
                                <select className='border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none'>
                                    <option value="">Show All</option>
                                    <option value="">Original</option>
                                    <option value="">Duplicate</option>
                                    <option value="">Triplicate</option>
                                </select>

                            </div>
                        </div>

                        <div className='m-2'>
                            <input className='border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none' placeholder='Add Image' type="file" />
                        </div>
                        <div className='m-2'>
                            <input className='border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none' placeholder='Add Document' type="file" />
                        </div>
                    </div>
                    <div></div>

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





            {showAddSerialNoModal ? (
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
                                        onClick={() => setShowAddSerialNoModal(false)}
                                    >
                                        <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>


                                <div>
                                    <input type="text" placeholder='Serial Number' onChange={handleSerialNumberChange} className='border-2 rounded-l hover:border-black focus:border-blue-500 px-2 py-1 outline-none' />
                                    <button onClick={handleAddSerialNumber}>Add</button>
                                    <ul>
                                        {serialNumbers.map((number, index) => (
                                            <li key={index}>{number}
                                                <button onClick={() => handleRemoveNumber(index)}>X</button>
                                            </li>

                                        ))}
                                    </ul>
                                </div>



                                {/* footer */}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowAddSerialNoModal(false)}
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

export default AddSale