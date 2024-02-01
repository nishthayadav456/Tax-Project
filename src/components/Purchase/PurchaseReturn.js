import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Table from '../Table';
import { Link } from 'react-router-dom';

const PurchaseReturn = () => {
    const [showAddPaymentIn, setShowAddPaymentIn] = useState(false);
const [purchaseReturnData, setpurchaseReturnData]=useState([])
    const [data1,setData1]=useState({
        partyName:"",
        phoneNumber: "",
        returnNumber: "",
        billNumber: "",
        billDate:"",
        date: "",
        time: "",
        stateOfSupply:"",
        purchaseOrder: [
          {
            category: "",
            itemName: "",
            itemCode: "",
            hsnCode: "",
            serialNo: "",
            description: "",
            batchNo:"",
            modelNo: "",
            expDate: "",
            mfgDate: "",
            customField: "",
            size: "",
            qty: "",
            unit: "",
            periceUnitWithTex:"",
            periceUnitWithoutTex: "",
            discountpersant: "",
            discountAmount: "",
            taxPersant: "",
            taxAmount: "",
            amount: "",
          },
        ],
        paymentType: [
          {
            cash:"",
            cheque: { 
            refreanceNo:"", 
            checkAmount:""
         },
            bankDetail: {
              accountName: "",
              openingBalance: "",
              asOfDate:"",
            },
          },
        ],
        addDescription: "",
        discount: [
        { discountRatet: "", 
            discountAmount: "" 
        }],
        tax: "",
        roundOff: "",
        total: "",
        advanceAmount: "",
    })
    const changeHandle=(event)=>{
        setData1({ ...data1, [event.target.name]: event.target.value });
      }
    
   const handleClick=async()=>{
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    try{
const requestData={
    partyName:data1.partyName,
    phoneNumber:data1.phoneNumber ,
    returnNumber:data1.returnNumber ,
    billNumber:data1.billNumber ,
    billDate:data1.billDate,
    date:data1.date,
    time:data1.time ,
    stateOfSupply:data1.stateOfSupply,
    purchaseOrder: 
      {
        category:data1.purchaseOrder[0].category ,
        itemName:data1.purchaseOrder[0].itemName ,
        itemCode:data1.purchaseOrder[0].itemCode ,
        hsnCode:data1.purchaseOrder[0].hsnCode ,
        serialNo:data1.purchaseOrder[0].serialNo ,
        description:data1.purchaseOrder[0].description ,
        batchNo:data1.purchaseOrder[0].batchNo,
        modelNo:data1.purchaseOrder[0].modelNo ,
        expDate:data1.purchaseOrder[0].expDate ,
        mfgDate:data1.purchaseOrder[0].mfgDate ,
        customField:data1.purchaseOrder[0].customField ,
        size:data1.purchaseOrder[0].size,
        qty:data1.purchaseOrder[0].qty ,
        unit: data1.purchaseOrder[0].unit,
        periceUnitWithTex:data1.purchaseOrder[0].periceUnitWithTex,
        periceUnitWithoutTex:data1.purchaseOrder[0].periceUnitWithoutTex ,
        discountpersant:data1.purchaseOrder[0].discountpersant ,
        discountAmount:data1.purchaseOrder[0].discountAmount ,
        taxPersant:data1.purchaseOrder[0].taxPersant ,
        taxAmount:data1.purchaseOrder[0].taxAmount ,
        amount:data1.purchaseOrder[0].amount ,
      },
    
    paymentType: 
      {
        cash:data1.paymentType[0].cash,
        cheque: { 
        refreanceNo:data1.paymentType[0].cheque.refreanceNo, 
        checkAmount:data1.paymentType[0].cheque.checkAmount,
     },
        bankDetail: {
          accountName: data1.paymentType[0].bankDetail.accountName,
          openingBalance:data1.paymentType[0].bankDetail.openingBalance,
          asOfDate:data1.paymentType[0].bankDetail.asOfDate,
        },
      },
    
    addDescription:data1.addDescription,
    discount: 
    { discountRatet:data1.discount[0].discountRatet, 
        discountAmount:data1.discount[0].discountAmount 
    },
    tax: data1.tax,
    roundOff:data1.roundOff,
    total:data1.total,
    advanceAmount:data1.advanceAmount,
}
console.log("requestData", requestData);

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.post(
    "https://ca-backend-api.onrender.com/:firmId/purchaseReturn/create",
    requestData,
    { headers }
  );

  console.log("post", requestData, response.data);
  setData1(response.data.result);
  localStorage.setItem("token", response.data.result.token);

    }
    catch(error){
        console.error(error.message)
    }
   }

   
    //get API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const getDataResponse = await axios.get(
          "https://ca-backend-api.onrender.com/:firmId/purchaseReturn/getAll",
          { headers }
        );

        setpurchaseReturnData(getDataResponse.data.data);
       
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);



    // Sample data array
    const rowData = [
        { date: '2022-01-01', referenceNo: '001', partyName: 'Company A', categoryName: 'Category 1', type: 'Income', total: 1000, status: 'Paid', balance: 0 },
        { date: '2022-01-02', referenceNo: '002', partyName: 'Company B', categoryName: 'Category 2', type: 'Expense', total: 500, status: 'Received', balance: 500 },
        // Add more sample data as needed
    ];

    // Column definitions
    const columnDefs = [
        { headerName: 'Date', field: 'date' },
        { headerName: 'Reference No', field: 'referenceNo' },
        { headerName: 'Party Name', field: 'partyName' },
        { headerName: 'Category Name', field: 'categoryName' },
        { headerName: 'Type', field: 'type' },
        { headerName: 'Total', field: 'total' },
        { headerName: 'Status', field: 'status' },
        { headerName: 'Balance', field: 'balance' },
        // { headerName: 'amount', field: 'amount' },
        { headerName: 'Print', field: 'print' },
    ];





    return (
        <>
            <div>
                <div className='m-4 py-3 flex justify-between shadow'>
                    <div className='flex items-center '>
                        <select className='text-2xl font-semibold outline-none duration-150 active:bg-gray-100 mx-3'>
                            <option className='text-lg' value="This Month">This Month</option>
                            <option className='text-lg' value="Last Month">Last Month</option>
                            <option className='text-lg' value="This Quarter">This Quarter</option>
                            <option className='text-lg' value="This Year">This Year</option>
                            <option className='text-lg' value="Custom">Custom</option>
                        </select>

                        <div className='flex border items-center'>
                            <p className='bg-gray-400 text-white '>Between</p>
                            <input className='px-2' type="date" value="" />
                            <p className='px-2'>To</p>
                            <input className='px-2' type="date" value="" />
                        </div>
                        <select className='font-semibold border duration-150 active:bg-gray-100 mx-3 px-2'>
                            <option value="All Firms">All Firms</option>
                            <option value="My Company">My Company</option>
                        </select>
                    </div>
                    <div className='flex items-center'>
                        <div className='m-2 flex flex-col justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                <path fill="#4CAF50" d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z"></path><path fill="#FFF" d="M32 15H39V18H32zM32 25H39V28H32zM32 30H39V33H32zM32 20H39V23H32zM25 15H30V18H25zM25 25H30V28H25zM25 30H30V33H25zM25 20H30V23H25z"></path><path fill="#2E7D32" d="M27 42L6 38 6 10 27 6z"></path><path fill="#FFF" d="M19.129,31l-2.411-4.561c-0.092-0.171-0.186-0.483-0.284-0.938h-0.037c-0.046,0.215-0.154,0.541-0.324,0.979L13.652,31H9.895l4.462-7.001L10.274,17h3.837l2.001,4.196c0.156,0.331,0.296,0.725,0.42,1.179h0.04c0.078-0.271,0.224-0.68,0.439-1.22L19.237,17h3.515l-4.199,6.939l4.316,7.059h-3.74V31z"></path>
                            </svg>
                            <p className='text-sm'>Excel Report</p>
                        </div>
                        <div className='m-2 flex flex-col justify-center items-center'>
                            <svg className="w-4 h-4 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.4 18H19c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v5c0 .6.4 1 1 1h2.6m9.4-7V5c0-.6-.4-1-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4c0 .6-.4 1-1 1H8a1 1 0 0 1-1-1v-4Z" />
                            </svg>
                            <p className='text-sm'>Print</p>
                        </div>
                    </div>
                </div>
                <div className='m-4 border shadow p-2'>
                    <div className='flex justify-end my-2'>
                        <Link to="/debit-note" className='flex items-center justify-center rounded-lg bg-blue-500 text-white font-bold text-sm px-2 py-1 cursor-pointer duration-150 hover:bg-blue-600' onClick={() => setShowAddPaymentIn(!showAddPaymentIn)}>
                            {/* <span className='text-blue-500 bg-white rounded-full text-lg p-0'>+</span> */}
                            <h2>+ Add Debit Note</h2>
                        </Link>
                    </div>
                    <Table rowData={rowData} columnDefs={columnDefs} />

                </div>
            </div>



        </>
    );
};
export default PurchaseReturn