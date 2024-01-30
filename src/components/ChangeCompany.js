import React from 'react'

const ChangeCompany = ({ showChangeCompanyModal, setShowChangeCompanyModal }) => {
    return (
        <>

            <>
                <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-3/5 my-6 mx-auto">
                        {/*content*/}
                        <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t bg-gray-800 text-white">
                                <div className="flex">
                                    <h3 className="text-xl font-semibold mx-2">Change Company</h3>
                                </div>
                                <div className='flex items-center'>
                                    <div>
                                        <input type="text" className='bg-gray-600 px-3 py-1 rounded-full' placeholder='Search Company' />
                                    </div>
                                    <p
                                        className="rounded-full px-2 cursor-pointer text-xl font-semibold "
                                        onClick={() => setShowChangeCompanyModal(false)}
                                    >
                                        <span className="  text-2xl block ">
                                            ×
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className='bg-gray-100 px-6 py-3 h-96'>
                                <div className=' flex justify-between my-4'>

                                    <p >Below are the company that are created by you</p>
                                    <svg class="w-8 h-8 text-gray-800 dark:text-blue-700 bg-blue-200 p-1 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4" />
                                    </svg>

                                </div>
                                <div className='flex justify-between items-center p-6 bg-white h-12'>
                                    <div className='flex justify-center items-center'>
                                        <p>My Company</p>
                                        <p className='text-white bg-orange-400 p-1 mx-2 text-xs rounded-full'>Current Company</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <p className='border-r-2 px-6'>SYNC OFF</p>
                                        <button className='bg-white text-blue-700 font-semibold border rounded-lg px-6 py-1 mx-6'>Open</button>
                                    </div>
                                </div>

                            </div>

                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        setShowChangeCompanyModal(false)
                                    }}
                                >
                                    New Company
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>


        </>
    )
}

export default ChangeCompany