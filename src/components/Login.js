import React from 'react'

const Login = () => {
    return (
        <>
        <div className='flex justify-center items-center w-full'>

            <div class="modal p-6">
                <form class="form p-12">
                    <h2 className='text-center text-xl' style={{fontSize: "2rem"}}>Let's Login Now!</h2>
                    <div class="credit-card-info--form">
                        <div class="input_container">
                            <label for="password_field" class="input_label">Username</label>
                            <input id="password_field" class="input_field w-full" type="text" name="input-name" title="Inpit title" placeholder="Enter your full name" />
                        </div>
                        <div class="input_container">
                            <label for="password_field" class="input_label">Password</label>
                            <input id="password_field" class="input_field w-full" type="number" name="input-name" title="Inpit title" placeholder="" />
                        </div>

                    </div>
                    <button class="purchase--btn">Login</button>
                    <a>by continuing, you accept the <span className='tetx-blue-400'>Terms and Conditions</span></a>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login