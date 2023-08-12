import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styling/Auth.css'

export default function Register() {
    const [initialsGiven, setInitialsGiven] = useState(0);
    const navigate = useNavigate();

    const moveBack = () => {
        navigate('/');
    };

    const verifyContact = () => {
        setInitialsGiven(1)
    }

    const verifyIdentity = () => {
        navigate('/')
    }

    return (
        <div className='Auth'>
            <div className="wrapper">
                {
                    initialsGiven === 0 ?
                        <div>
                            <div className='form'>
                                <h1>Register</h1>
                                <div className="input-box">
                                    <input type="text" placeholder='Name' required />
                                    <i class='bx bxs-user-pin'></i>
                                </div>

                                <div className="input-box">
                                    <input type="text" placeholder='Username' required />
                                    <i class='bx bxs-user'></i>
                                </div>

                                <div className="input-box">
                                    <input type="password" placeholder='Password' required />
                                    <i class='bx bxs-lock-alt'></i>
                                </div>

                                <div className="input-box">
                                    <input type="phone" placeholder='Phone' required />
                                    <i class='bx bxs-phone'></i>
                                </div>

                                <div className="input-box">
                                    <input type="email" placeholder='Email' required />
                                    <i class='bx bxs-envelope'></i>
                                </div>

                                <button className='btn' onClick={verifyContact}>Continue</button>

                                <div className='register-link'>
                                    <p>
                                        Go to
                                        <button onClick={moveBack}>Login</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div className='form'>
                                <h1>Register</h1>
                                <div className="input-box">
                                    <input type="text" placeholder='OTP sent on phone' required />
                                </div>

                                <div className="input-box">
                                    <input type="text" placeholder='OTP sent on email' required />
                                </div>

                                <button className='btn' onClick={verifyIdentity}>Register</button>

                                <div className='register-link'>
                                    <p>
                                        Go to
                                        <button onClick={moveBack}>Login</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
