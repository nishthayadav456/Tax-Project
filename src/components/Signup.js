import React from 'react'
import { useState } from "react";
import axios from "axios";
const Signup = () => {
    const [data, setData] = useState(
        {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        }
    )
    const changeHandle = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const handleClick=(e)=>{
        e.preventDefault()
        console.log(data)
        axios.post("https://ca-backend-api.onrender.com/companyRegister/auth/signup",data)
        .then((res)=>{
            localStorage.setItem("token",res.data.token)
            alert("Registered successfully!");
   })
          .catch((err)=>{
          console.log(err)      
          })
        setData({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""

        })
 
    }
    return (
        <>
        <div className='flex justify-center items-center w-full'>

            <div class="modal p-6">
                <form class="form p-12">
                    <h2 className='text-center text-xl' style={{fontSize: "2rem"}}>Let's Signup Now!</h2>
                    <div class="credit-card-info--form">
                        <div class="input_container">
                            <label for="password_field" class="input_label">Enter Full Name</label>
                            <input id="password_field" class="input_field w-full" type="text" name="name" title="Inpit title" placeholder="Enter Full Name" value={data.name} onChange={changeHandle} />
                        </div>
                        <div class="input_container">
                            <label for="password_field" class="input_label">Contact No</label>
                            <input id="password_field" class="input_field w-full" type="number" name="phone" title="Inpit title" placeholder="Enter your Contact No"value={data.phone} onChange={changeHandle} />
                        </div>
                        <div class="input_container">
                            <label for="password_field" class="input_label">Email Address</label>
                            <input id="password_field" class="input_field w-full" type="email" name="email" title="Inpit title" placeholder="Enter your Email Address" value={data.email} onChange={changeHandle} />
                        </div>
                        <div class="input_container">
                            <label for="password_field" class="input_label">Password</label>
                            <input id="password_field" class="input_field w-full" type="password" name="password" title="Inpit title" placeholder="Password"  value={data.password} onChange={changeHandle} />
                        </div>
                        <div class="input_container">
                            <label for="password_field" class="input_label">Confirm Password</label>
                            <input id="password_field" class="input_field w-full" type="password" name="confirmPassword" title="Inpit title" placeholder="Confirm Password"   value={data.confirmPassword} onChange={changeHandle} />
                        </div>

                    </div>
                    <button class="purchase--btn" onClick={handleClick}>Signup</button>
                    <a>by continuing, you accept the <span className='tetx-blue-400'>Terms and Conditions</span></a>
                </form>
            </div>
        </div>
        </>
    )
}

export default Signup