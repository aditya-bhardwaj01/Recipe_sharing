import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styling/Auth.css'

export default function Login() {
    const navigate = useNavigate();

    const moveTo = () => {
        navigate('/register');
    };

    return (
        <div className='Auth'>
            <div className="wrapper">
                <div className='form'>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                        <i className='bx bxs-user'></i>
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder='Password' required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>

                    {/* <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />Remember me
                        </label>
                        <Link to="/home">Forgot password?</Link>
                    </div> */}

                    <button className='btn'>Login</button>

                    <div className='register-link'>
                        <p>
                            Don't have an account?
                            <button onClick={moveTo}>Register</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
