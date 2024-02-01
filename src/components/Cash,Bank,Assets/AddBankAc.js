import React, {useState} from 'react'

const AddBankAc = () => {
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

    return (
        <>
            <div className='flex flex-col justify-around items-center shadow-lg m-6 border' style={{ height: "90vh" }}>
                <div className='text-center'>
                    <h2 className='text-3xl font-semibold'>Banking with Vyapar</h2>
                    <p className='text-gray-400 text-lg font-semibold'>Add Bank accounts on Vyapar and you can effortlessley:</p>
                </div>

                <div className='flex gap-10 justify-center items-center mx-16'>
                    <div className='border rounded-lg p-3 '>
                        <div className='flex items-center'>
                            <svg className="w-8 h-8 text-gray-800 dark:text-blue-400 mx-1 bg-blue-100 rounded-full p-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.4 18H19c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v5c0 .6.4 1 1 1h2.6m9.4-7V5c0-.6-.4-1-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4c0 .6-.4 1-1 1H8a1 1 0 0 1-1-1v-4Z" />
                            </svg>
                            <h2 className='font-semibold text-lg'>Print Bank Details on Invoices</h2>
                        </div>
                        <p className='text-gray-600'>Print account details on your invoices and get payments via NEFT/RTGS/IMPS etc.</p>
                    </div>
                    <div className='border rounded-lg p-3 '>
                        <div className='flex items-center'>
                            <svg className="w-8 h-8 text-gray-800 dark:text-blue-400 mx-1 bg-blue-100 rounded-full p-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-6 4h6m-6 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z" />
                            </svg>
                            <h2 className='font-semibold text-lg'>Connect Bank Online</h2>
                        </div>
                        <p className='text-gray-600'>Get transactions and balance in real time on Vyapar from your bank.</p>
                    </div>
                    <div className='border rounded-lg p-3 '>
                        <div className='flex items-center'>
                            <svg className="w-8 h-8 text-gray-800 dark:text-blue-400 mx-1 bg-blue-100 rounded-full p-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M5 4c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clip-rule="evenodd" />
                            </svg>

                            <h2 className='font-semibold text-lg'>Receive Online Payments</h2>
                        </div>
                        <p className='text-gray-600'>Print QR code on your invoices or send payment links to your customers.</p>
                    </div>
                </div>

                <div className='flex justiy-center items-center cursor-pointer' >
                    <h2 className='text-white bg-red-600 rounded-full font-semibold px-3 py-2' onClick={() => setShowAddBankAcModal(!showAddBankAcModal)}>+ Add Bank Account</h2>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <p className='text-xs'>At Vyapar, the security of your details is our top priority.</p>
                    <div className='flex items-center bg-amber-200 w-2/4 rounded-lg p-1'>
                        <svg class="w-12 h-12 text-gray-800 dark:text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z" clip-rule="evenodd" />
                        </svg>

                        <p className='text-xs text-justify text-gray-700'>Vyapar never stores any details that you enter. No one can access them without your permission.</p>
                    </div>
                </div>
            </div>



            

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
    )
}

export default AddBankAc
