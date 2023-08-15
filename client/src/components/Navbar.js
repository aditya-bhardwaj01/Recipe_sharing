import React from 'react'
import logo from "./img/logo.jpg";
import "./styling/Navbar.css"
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='Navbar'>
            <nav className="navbar navbar-expand-lg bg-transparent">
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="">Navbar</a> */}
                    <img src={logo} alt="Logo" style={{ height: '60px', width: '60px', borderRadius: "30px" }} />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" style={{ padding: "10px", fontWeight: "bold", color: "white" }}>
                                <Link className="nav-link" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item" style={{ padding: "10px", fontWeight: "bold", color: "white" }}>
                                <Link className="nav-link" aria-current="page" to="/profile">Profile</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
