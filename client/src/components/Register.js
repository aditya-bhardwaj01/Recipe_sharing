import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styling/Auth.css'
import swal from "sweetalert"
import axios from "axios"

export default function Register() {
    const [initialsGiven, setInitialsGiven] = useState(0);
    const navigate = useNavigate();

    const nameReg = /^.+$/;
    const usernameReg = /^[^\s]{5,}$/;
    const passwordReg = /^(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",<.>/?])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-_=+{}[\]|;:'",<.>/?]{8,}$/;
    const phoneReg = /^\d{10}$/;
    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let name = "", username = "", password = "", phone = "", email = "";

    const moveBack = () => {
        navigate('/');
    };

    const checkUsernameAvailability = () => {
        document.getElementById("btn-continue").disabled = true;
        axios.post("http://localhost:3001/auth/register/availability", {
            name: name,
            username: username,
            password: password,
            phone: phone,
            email: email
        }).then((response) => {
            if(response.data.error){
                swal({
                    title: "Failed!",
                    text: response.data.error,
                    icon: "warning",
                    timer: 5000,
                    button: false
                });
                document.getElementById("btn-continue").disabled = false;
            }
            else{
                swal({
                    title: "Success",
                    text: response.data.success,
                    icon: "success",
                    timer: 5000,
                    button: false
                });
                document.getElementById('reg-name').value = "";
                document.getElementById('reg-username').value = "";
                document.getElementById("btn-continue").disabled = false;
                setInitialsGiven(1)
            }
        })
    }

    const verifyContact = () => {
        name = document.getElementById('reg-name').value;
        username = document.getElementById('reg-username').value;
        password = document.getElementById('reg-password').value;
        phone = document.getElementById('reg-phone').value;
        email = document.getElementById('reg-email').value;

        if (nameReg.test(name) === false) {
            swal({
                title: "Wrong name format!",
                text: "Name should have atleast one character.",
                icon: "warning",
                timer: 5000,
                button: false,
            });
        }
        else if (usernameReg.test(username) === false) {
            swal({
                title: "Wrong username format!",
                text: "Username shoud have atleast a length of 5 without any space.",
                icon: "warning",
                timer: 5000,
                button: false,
            });
        }
        else if (passwordReg.test(password) === false) {
            swal({
                title: "Wrong password format!",
                text: "Password should have atleast a length of 8 having atleast one character, one number and one special character.",
                icon: "warning",
                timer: 5000,
                button: false,
            });
        }
        else if (phoneReg.test(phone) === false) {
            swal({
                title: "Incorrect phone number!",
                text: "Phone number is not in correct format.",
                icon: "warning",
                timer: 5000,
                button: false,
            });
        }
        else if (emailReg.test(email) === false) {
            swal({
                title: "Incorrect email id!",
                text: "Email id is not in correct format.",
                icon: "warning",
                timer: 5000,
                button: false,
            });
        }
        else {
            checkUsernameAvailability();
        }
    }

    const verifyIdentity = () => {
        document.getElementById("btn-register").disabled = true;

        var phoneOTP = document.getElementById('phone-otp').value;
        var emailOTP = document.getElementById('email-otp').value;

        axios.post("http://localhost:3001/auth/register/otpverify", {
            phoneOTP: phoneOTP,
            emailOTP: emailOTP
        }).then((response) => {
            if(response.data.error){
                swal({
                    title: "Failed!",
                    text: response.data.error,
                    icon: "warning",
                    timer: 5000,
                    button: false
                });
                document.getElementById("btn-register").disabled = false;
            }
            else{
                swal({
                    title: "Success",
                    text: response.data.success,
                    icon: "success",
                    timer: 5000,
                    button: false
                });
                document.getElementById("btn-register").disabled = false;
                navigate('/')
            }
        })
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
                                    <input type="text" placeholder='Name' id='reg-name' required />
                                    <i className='bx bxs-user-pin'></i>
                                </div>

                                <div className="input-box">
                                    <input type="text" placeholder='Username' id='reg-username' required />
                                    <i className='bx bxs-user'></i>
                                </div>

                                <div className="input-box">
                                    <input type="password" placeholder='Password' id='reg-password' required />
                                    <i className='bx bxs-lock-alt'></i>
                                </div>

                                <div className="input-box">
                                    <input type="phone" placeholder='Phone' id='reg-phone' required />
                                    <i className='bx bxs-phone'></i>
                                </div>

                                <div className="input-box">
                                    <input type="email" placeholder='Email' id='reg-email' required />
                                    <i className='bx bxs-envelope'></i>
                                </div>

                                <button className='btn' id='btn-continue' onClick={verifyContact}>Continue</button>

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
                                    <input type="text" id='phone-otp' placeholder='OTP sent on phone' required />
                                </div>

                                <div className="input-box">
                                    <input type="text" id='email-otp' placeholder='OTP sent on email' required />
                                </div>

                                <button className='btn' id='btn-register' onClick={verifyIdentity}>Register</button>

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
