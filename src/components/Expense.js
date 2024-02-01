import React, { useState } from 'react'

const Expense = () => {
  const [isSelectPartyOpen, setIsSelectPartyOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddSerialNoModal, setShowAddSerialNoModal] = useState(false);
  const [addItems, setAddItems] = useState([{ name: '', quantity: '', price: '', tax: '', amount: '' }]);
  const [inputSerialNumber, setInputSerialNumber] = useState('');
  const [serialNumbers, setSerialNumbers] = useState([]);
  const [addPaymentType, setAddPaymentType] = useState([{ paymentType: '', referenceNo: '', amount: '' }]);
  const [gst, setGst] = useState(false);

  const toggleSelectPartyDropdown = () => {
    setIsSelectPartyOpen(!isSelectPartyOpen);
  };

  const handleSearchPartyChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredParties = [
    'Party1',

  ].filter(item => item.toLowerCase().includes(searchTerm));

  const handleGstCheckBox = () => {
    setGst(!gst)

  }

  const addItemFunc = () => {
    setAddItems([...addItems, { name: '', Description: '', BatchNo: '', ModelNo: '', EXPDate: '', MFGDate: '', MRP: '', Size: '', quantity: '', price: '', tax: '', amount: '' }]);
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
      <div className='flex items-center'>
        <h2 className='text-xl font-bold my-3 mx-6'>Expense</h2>
        <div className='flex mx-2 '>
          <p className={` font-semibold ${!gst ? "text-gray-400" : "text-blue-500"} `}>GST</p>
          <div className='mx-2'>

            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" checked={gst} onChange={handleGstCheckBox} />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      <div className='p-6'>
        <div className='flex justify-between'>
          <div className="mx-2 flex flex-col items-start" >


            <div className='w-full'>
              <select className='input_field' name="" id="" placeholder="Expense">
                <option value="">Expense Category</option>
                <option value="Petrol">Petrol</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Tea">Tea</option>
                <option value="Transpost">Transpost</option>
              </select>
            </div>

            {gst &&

              <div className="relative group my-5" style={{ width: "15rem" }}>
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


            }
          </div>
          <div className=''>
            <div class="flex justify-between items-center my-2">
              <label class="input_label">Expense No</label>
              <input class="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2" type="number" name="input-name" placeholder="Ref no" />

            </div>
            <div class="flex justify-between items-center my-2">
              <label class="input_label">Due Date</label>
              <input class="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none mx-2" type="date" name="input-name" placeholder="Invoice Date" />
            </div>
          </div>
        </div>

        <div>



          <div className='my-3'>
            <table className="min-w-full bg-white border border-gray-300">
              <thead className='border'>
                <tr>
                  <th className=" p-2 border"><div className='flex justify-between items-center text-xs'><h2>Item Name</h2></div></th>
                  <th className=" p-2 border"><div className='flex justify-between items-center text-xs'><h2>Quantity</h2></div></th>
                  <th className=" p-2 border"><div className='flex justify-between items-center text-xs'><h2>Price/unit</h2></div></th>
                  {gst &&
                    <th className=" p-2 border"><div className='flex justify-between items-center text-xs'><h2>Tax</h2></div></th>
                  }
                  <th className=" p-2 border"><div className='flex justify-between items-center text-xs'><h2>Amount</h2></div></th>
                  <th className=" p-2 border"><div className='flex justify-between items-center text-xs'><h2>Action</h2></div></th>
                </tr>
              </thead>
              <tbody>
                {addItems.map((item, index) => (

                  <tr className=''>
                    <td>
                      <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="input-name" title="Input title" placeholder="Item Name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
                    </td>


                    <td>
                      <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="input-name" title="Input title" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />

                    </td>
                    <td>
                      <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="input-name" title="Input title" placeholder="Price" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} />
                    </td>
                    {gst &&

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
                    }
                    <td>
                      <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " style={{ width: "100%" }} type="text" name="input-name" title="Input title" placeholder="Amount" value={item.amount} onChange={(e) => handleItemChange(index, 'amount', e.target.value)} />

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
              <button className='text-blue-500 px-2 py-1 rounded m-2' onClick={addItemFunc}>+ Add Row</button>
              <input className="border-2 rounded hover:border-black focus:border-blue-500 px-2 py-1 outline-none " type="text" name="input-name" title="Input title" placeholder="Total" />
            </div>

          </div>


        </div>
        <div className='w-3/6 border rounded-lg p-4 my-2'>
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
              <button className='text-white p-2 m-2 rounded' onClick={() => removePaymentFunc(index)}>
                <svg class="w-4 h-4 font-semibold text-gray-800 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                </svg>
              </button>

            </div>
          ))}
          <button className='text-white bg-blue-400 px-2 py-1 rounded m-2' onClick={addPaymentFunc}> + Add Payment Type</button>
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

export default Expense