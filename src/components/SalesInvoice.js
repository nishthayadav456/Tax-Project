import React from 'react'

const SalesInvoice = () => {
    return (
        <>
            <div>
                <h2>Enter details to make your first Sale 🚀</h2>
                <p>First sale is made in less than a minute on Vyapar</p>
                <div className='flex'>
                    <div>
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
                        <div class="input_container mx-2 ">
                            <label class="input_label">Customer Name :</label>
                            <input class="input_field w-full" type="number" name="input-name" title="Input title" placeholder="Customer Name" />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SalesInvoice