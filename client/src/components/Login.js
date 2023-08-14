import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import swal from "sweetalert"
import './styling/Auth.css'

export default function Login() {
    const navigate = useNavigate();

    const moveTo = () => {
        navigate('/register');
    };

    const LoginUser = () => {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        axios.post("http://localhost:3001/auth/login", {
            username: username,
            password: password
        }).then((response) => {
            if(response.data.error){
                swal({
                    title: "Failed!",
                    text: response.data.error,
                    icon: "warning",
                    timer: 5000,
                    button: false
                });
            }
            else{
                sessionStorage.setItem("accessToken", response.data.accessToken);
                navigate('/home');
            }
        })
    }

    return (
        <div className='Auth'>
            <div className="wrapper">
                <div className='form'>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" id='login-username' placeholder='Username' required />
                        <i className='bx bxs-user'></i>
                    </div>

                    <div className="input-box">
                        <input type="password" id='login-password' placeholder='Password' required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>

                    <button id='btn-login' className='btn' onClick={LoginUser}>Login</button>

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
