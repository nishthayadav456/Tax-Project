import React, { useState } from 'react';

const MyCompany = ({ showModal, setShowModal }) => {
    // const [showModal, setShowModal] = React.useState(false);
    const [additionalFields, setAdditionalFields] = useState(false);
    
  const addMoreFields = () => {
    setAdditionalFields(true);
  };
  const closeBtn = () => {
    setAdditionalFields(false);
    setShowModal(false);
  };
  return (
    <>

    
{showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Firm
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex">
                  <div className='m-1'>
                    <div class="input_container">
                      <label for="password_field" class="input_label">Business Name</label>
                      <input id="password_field" class="input_field w-full" type="file" name="input-name" title="Inpit title" placeholder="Enter your full name" />
                    </div>
                  </div>
                  <div className='m-1'>
                    <div class="input_container">
                      <label for="password_field" class="input_label">Business Name</label>
                      <input id="password_field" class="input_field w-full" type="text" name="input-name" title="Inpit title" placeholder="Enter your full name" />
                    </div>
                    <div class="input_container">
                      <label for="password_field" class="input_label">GSTIN</label>
                      <input id="password_field" class="input_field w-full" type="number" name="input-name" title="Inpit title" placeholder="" />
                    </div>

                    <div class="input_container">
                      <label for="password_field" class="input_label">Phone No.</label>
                      <input id="password_field" class="input_field w-full" type="number" name="input-name" title="Inpit title" placeholder="" />
                    </div>
                    <div class="input_container">
                      <label for="password_field" class="input_label">Email</label>
                      <input id="password_field" class="input_field w-full" type="email" name="input-name" title="Inpit title" placeholder="" />
                    </div>
                  </div>
                </div>

                


                {additionalFields ?
                <>
                    <div className="input_container">
                      <label htmlFor="new_field1" className="input_label">New Field 1</label>
                      <input id="new_field1" className="input_field w-full" type="text" name="new-input-name" title="New Field 1" placeholder="Enter something" />
                    </div>
                    <div className="input_container">
                      <label htmlFor="new_field2" className="input_label">New Field 2</label>
                      <input id="new_field2" className="input_field w-full" type="text" name="new-input-name" title="New Field 2" placeholder="Enter something" />
                    </div>
                    {/* Add more fields as needed */}
                  </> 
                  :
                  <button className='text-blue-500 text-xl' onClick={addMoreFields}>More Information</button>

                  
                }

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeBtn()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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

export default MyCompany