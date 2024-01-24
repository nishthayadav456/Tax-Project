import React, { useState } from 'react';
import axios from 'axios';
const MyCompany = ({ showModal, setShowModal }) => {
  const [data, setData] = useState(
    {
      companyLogo:"",
      companyName: "",
      gstinNumber:"",
      phoneNumber: "",
      email:"",
      Pincode:"",
      businessAddress:"",
}
)

  // const [showModal, setShowModal] = React.useState(false);
  const [additionalFields, setAdditionalFields] = useState(false);

  const addMoreFields = () => {
    setAdditionalFields(true);
  };
  const closeBtn = () => {
    setAdditionalFields(false);
    setShowModal(false);
  };
  const changeHandle = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
}
const handleClick = () => {
  const requestData = {
    companyLogo:data.companyLogo,
    companyName:data.companyName,
    gstinNumber:data.gstinNumber,
    phoneNumber:data.phoneNumber,
    email:data.email,
    Pincode:data.Pincode,
    businessAddress:data.businessAddress,
    

    
  };
  axios.post("https://ca-backend-api.onrender.com/firm_registration", requestData)
      .then((res) => {
        console.log(res.data.result.token);
        setShowModal(false); 
        setData(res.data);
        localStorage.setItem("token",res.data.result.token);
       
      })
      .catch((error) => {
        console.error(error);
       
      });
  };
  return (
    <>


      {showModal ? (
        <>
          <div
            className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto">
             
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
               
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Firm
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0   float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black   h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
               

                
                <div className="p-6 flex">
                  <div className='m-1 w-full'>
                    <div class="input_container">
                      <label  class="input_label">Add Logo</label>
                      <input id="password_field" class="input_field " type="file" name="companyLogo"  placeholder="Add Logo" value={data.companyLogo} onChange={changeHandle}  />
                    </div>
                  </div>
                  <div className='m-1 w-full'>
                    <div class="input_container">
                      <label  class="input_label">Business Name</label>
                      <input id="password_field" class="input_field" type="text" name="companyName"  placeholder="Business Name"  value={data.companyName} onChange={changeHandle} />
                    </div>
                    <div class="input_container">
                      <label  class="input_label">GSTIN</label>
                      <input id="password_field" class="input_field " type="number" name=" gstinNumber"  placeholder="Enter GSTIN" value={data. gstinNumber} onChange={changeHandle} />
                    </div>

                    <div class="input_container">
                      <label  class="input_label">Phone No.</label>
                      <input id="password_field" class="input_field" type="number" name="phone"  placeholder="Enter phone"  value={data.phoneNumber} onChange={changeHandle} />
                    </div>
                    <div class="input_container">
                      <label  class="input_label">Email</label>
                      <input id="password_field" class="input_field" type="email" name="email"  placeholder="Enter Email"  value={data.email} onChange={changeHandle} />
                    </div>
                  </div>
                </div>




                {additionalFields ?
                  <div className=' p-6 flex'>
                    <div className='m-1 w-full'>
                      <div className="input_container">
                        <label className="input_label" >Business Address</label>
                        <textarea className='input_field' name="businessAddress" id="" cols="30" rows="10" value={data.businessAddress} onChange={changeHandle}></textarea>
                        {/* <input id="new_field1" className="input_field w-full" type="text" name="new-input-name" title="New Field 1" placeholder="Enter something" /> */}
                      </div>
                      <div className="input_container">
                        <label className="input_label">Pincode</label>
                        <input className="input_field" type="number" name="Pincode" title="New Field" placeholder="Pincode"  value={data.pincode} onChange={changeHandle}/>
                      </div>
                      <div class="input_container ">
                        <label class="input_label">State</label>
                        <select id="countries" class="input_field">
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

                      <div className="input_container">
                        <label className="input_label">Business Description</label>
                        <textarea className='input_field' name="" id="" cols="30" rows="10"></textarea>
                      </div>
                    </div>
                    <div className='m-1 w-full'>
                      <div class="input_container ">
                        <label class="input_label">Business Type</label>
                        <select id="countries" class="input_field">
                          <option value=''>None</option>
                          <option value='Retail'>Retail</option>
                          <option value='Wholesale'>Wholesale</option>
                          <option value='Distributor'>Distributor</option>
                          <option value='Service'>Service</option>
                          <option value='Manufacturing'>Manufacturing</option>
                          <option value='Other'>Other</option>
                        </select>
                      </div>
                      <div class="input_container ">
                        <label class="input_label">Business Category</label>
                        <select id="countries" class="input_field">
                          <option value=''>None</option>

                        </select>
                      </div>
                      <div className="input_container">
                        <label className="input_label">Add Signature</label>
                        <input className="input_field" type="file" name="new-input-name"  placeholder="Add Signature" onChange={changeHandle}/>
                      </div>
                    </div>
                  </div>

                  :
                  <button className='text-blue-500 text-xl' onClick={addMoreFields}>More Information</button>


                }

                
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
                    onClick={handleClick}
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