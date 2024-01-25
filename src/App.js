
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
import Estimate from './components/Sales/Estimate';
import SalesInvoice from './components/Sales/SalesInvoice';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Router>
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
            <Route path="/sales-invoice" exact element={<SalesInvoice />} />
            <Route path="/estimate" exact element={<Estimate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
