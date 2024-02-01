import React from 'react'

const NewCompany = ({ newCompany, setNewCompany }) => {
    return (
        <>

            <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-2/6 my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none px-12 py-8">
                        {/*header*/}
                        <div className="flex items-start justify-between text-gray-800">
                            <div className="flex">
                                <h3 className="text-3xl font-semibold mx-2">ADD BUSINESS</h3>
                            </div>
                            <div className='flex items-center'>
                                <p
                                    className="rounded-full px-2 cursor-pointer text-xl font-semibold "
                                    onClick={() => setNewCompany(false)}
                                >
                                    <span className="  text-2xl block ">
                                        ×
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <input className='outline-none text-lg border-b-2 w-full my-2 p-2' type="text" placeholder='Business Name' />
                            </div>
                            <div>
                                <input className='outline-none text-lg border-b-2 w-full my-2 p-2' type="number" placeholder='Phone' />
                            </div>
                            <div>
                                <input className='outline-none text-lg border-b-2 w-full my-2 p-2' type="email" placeholder='Email' />
                            </div>
                        </div>

                        <div className='my-3 text-sm'>
                            <p>By clicking on the Login button I accept the <a href="" className='text-red-500' > terms and conditions</a></p>
                        </div>


                        <div className="flex items-center py-6 border-solid ">
                            <button
                                className="bg-red-500 text-white active:bg-blue-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    setNewCompany(true)
                                }}
                            >
                                LOGIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}


        </>

    )
}

export default NewCompany