import React from 'react'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='border-t'>
            <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
                <p>&copy; All Rights Reserved 2025.</p>
                <div className='flex item-center gap-4 justify-center text-2xl'>
                    <a href=""style={{color: "blue"}}>
                        <FaFacebook />
                    </a>
                    <a href="" style={{color: "#890000ec"}}>
                        <FaInstagram />
                    </a>
                    <a href="" style={{ color: "blue" }}>
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer