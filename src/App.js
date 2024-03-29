import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import MyCompany from './components/MyCompany';
import Parties from './components/Parties';
import Items from './components/Items';
import SalesInvoice from './components/Sales/SalesInvoice';
import Estimate from './components/Sales/Estimate';
import PaymentIn from './components/Sales/PaymentIn';
import SalesOrder from './components/Sales/SalesOrder';
import PurchaseBill from './components/Purchase/PurchaseBill';
import PaymentOut from './components/Purchase/PaymentOut';
import PurchaseOrder from './components/Purchase/PurchaseOrder';
import PurchaseReturn from './components/Purchase/PurchaseReturn';
import DebitNote from './components/Purchase/DebitNote';
import Expense from './components/Expense';
import AddBankAc from './components/Cash,Bank,Assets/AddBankAc';
import CashInHand from './components/Cash,Bank,Assets/CashInHand';
import Cheques from './components/Cash,Bank,Assets/Cheques';
import Header from './components/Header';
import SalesInvoice2 from './components/Sales/SalesInvoice2';
import AddSale from './components/Sales/AddSale';
// import ModalApp from './components/ModalApp';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Router>
      <Header />
      <div className='flex h-screen'>
        
        <Sidebar showModal={showModal} setShowModal={setShowModal} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <MyCompany showModal={showModal} setShowModal={setShowModal} />
        <div className='w-full h-full'>
          <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/Parties" exact element={<Parties />} />
            <Route path="/items" exact element={<Items />} />
            <Route path="/sales-invoice-firstPage" exact element={<SalesInvoice />} />
            <Route path="/sales-invoice" exact element={<SalesInvoice2 />} />
            <Route path="/add-sale" exact element={<AddSale />} />
            <Route path="/estimate" exact element={<Estimate />} />
            <Route path="/payment-in" exact element={<PaymentIn />} />
            <Route path="/sale-order" exact element={<SalesOrder />} />
            <Route path="/purchase-bill" exact element={<PurchaseBill />} />
            <Route path="/payment-out" exact element={<PaymentOut />} />
            <Route path="/purchase-order" exact element={<PurchaseOrder />} />
            <Route path="/purchase-return" exact element={<PurchaseReturn />} />
            <Route path="/debit-note" exact element={<DebitNote />} />
            <Route path="/expense" exact element={<Expense />} />
            <Route path="/add-bank-account" exact element={<AddBankAc />} />
            <Route path="/cash-in-hand" exact element={<CashInHand />} />
            <Route path="/cheques" exact element={<Cheques />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
