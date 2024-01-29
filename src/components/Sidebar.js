// src/components/Sidebar.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ showModal, setShowModal, isSidebarOpen, setIsSidebarOpen, save, setIssave }) => {
const [companyLogo,setCompanyLogo]=useState("")
const [companyName,setCompanyName]=useState("")
  // const [showModal, setShowModal] = React.useState(false);
  // const [additionalFields, setAdditionalFields] = useState(false);
  const [salesExpanded, setSalesExpanded] = useState(false);


  const handleButtonClick = () => {
    setShowModal(!showModal);
  };

  const toggleSales = () => {
    setSalesExpanded(!salesExpanded);
  };

useEffect(()=>{
  if(!save){
    return
  }
  
   async function  fetchCompanyDetails() {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response= await axios.get("https://ca-backend-api.onrender.com/firm_registration", {headers})
    if (response){
    console.log(response.data.data[response.data.data.length-1])
    const logourl=response.data.data[response.data.data.length-1].companyLogo
const Nameurl=response.data.data[response.data.data.length-1].companyName
    setCompanyLogo(logourl)
    setCompanyName(Nameurl)
    }
   
    }
    fetchCompanyDetails()
   
},[save])


  return (
    <>
      <div className={`bg-gray-800 text-white h-full w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/7 xl:w-1/8 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="lg:block">
          <div className='flex items-center p-5 border border-black' onClick={handleButtonClick}>
            <div className='rounded-full bg-blue-400 p-1 '>
             {companyLogo ? <img src={companyLogo} alt="logo" width="40" height="40" style={{ borderRadius: '100%' }}/> :
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-add-fill" viewBox="0 0 16 16">
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 1 1-1 0v-1h-1a.5.5 0 1 1 0-1h1v-1a.5.5 0 0 1 1 0" />
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
              <path d="m8 3.293 4.712 4.712A4.5 4.5 0 0 0 8.758 15H3.5A1.5 1.5 0 0 1 2 13.5V9.293z" />
            </svg>
             }
            </div>
           

           
            <h2>{companyName ? companyName : "My Company"}</h2>
           
          </div>
          <div>

            <Link to="/" className="block py-2 flex px-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-add-fill" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 1 1-1 0v-1h-1a.5.5 0 1 1 0-1h1v-1a.5.5 0 0 1 1 0" />
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                <path d="m8 3.293 4.712 4.712A4.5 4.5 0 0 0 8.758 15H3.5A1.5 1.5 0 0 1 2 13.5V9.293z" />
              </svg>
              <p className='px-2'>
                Home
              </p>
            </Link>
            <Link to="/parties" className="block py-2 flex px-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
              </svg>
              <p className='px-2'>
                Parties
              </p>
            </Link>
            <Link to="/items" className="block py-2 flex px-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
              </svg>
              <p className='px-2'>
                Items
              </p>
            </Link>




            <div
              className="py-2 px-2 cursor-pointer flex justify-between"
              onClick={toggleSales}
            >
              <div className='flex'>
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 3h-5.7a2 2 0 0 0-1.4.6L3.6 11a2 2 0 0 0 0 2.8l6.6 6.6a2 2 0 0 0 2.8 0l7.4-7.5a2 2 0 0 0 .6-1.4V6a3 3 0 0 0-3-3Zm-2.4 6.4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                </svg>

                <p className='px-2'>
                  Sales
                </p>
              </div>
              {salesExpanded ?
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7" />
                </svg>

                :

                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                </svg>
              }
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 mx-6 bg-gray-900 rounded ${salesExpanded ? 'max-h-screen' : 'max-h-0'
                }`}
            >
              <div className=" py-2">
                <Link to="/sales-invoice" className="block py-2 flex px-2">Sales Invoices</Link>
              </div>
              <div className=" py-2">
                <Link to="/estimate" className="block py-2 flex px-2">Estimate</Link>
              </div>
              <div className=" py-2">
                <Link to="/payment-in" className="block py-2 flex px-2">Payment In</Link>
              </div>
              <div className=" py-2">
                <Link to="/sale-order" className="block py-2 flex px-2">Sale Order</Link>
              </div>

            </div>

            <Link to="/login" className="block py-2 flex px-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
              </svg>
              <p className='px-2'>
                Login
              </p>
            </Link>
            <Link to="/signup" className="block py-2 flex px-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
              </svg>
              <p className='px-2'>
                Signup
              </p>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;