import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import logoImage from '../assets/logo/Tickify-Logo-light.png';
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
    const navigate = useNavigate();
    const { logout, token } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;

            if (token) {
                await fetch('http://localhost:8000/api/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
        logout();
        navigate('/login');
    };

    const navOptions = (
        <>
            <li><Link to='/' className="menu_font hover:text-[#bce484] hover:bg-transparent">Home</Link></li>
            <li><Link to='/allEvents' className="menu_font hover:text-[#bce484] hover:bg-transparent">Events</Link></li>
            <li><Link to='/activities' className="menu_font hover:text-[#bce484] hover:bg-transparent">Activities</Link></li>
            <li><Link to='/contactUs' className="menu_font hover:text-[#bce484] hover:bg-transparent">Contact Us</Link></li>
            {
                token && <>
                    {
                        token?.role === 'admin' ? (
                            <li><Link to='/dashboard' className="menu_font hover:text-[#bce484] hover:bg-transparent">Dashboard</Link></li>
                        ) : (
                            <li><Link to='/dashboard' className="menu_font hover:text-[#bce484] hover:bg-transparent">Dashboard</Link></li>
                        )
                    }
                </>
            }
        </>
    );

    return (
        <>
            {/* Navbar top */}
            <div className="fixed w-full z-[1000] bg-white shadow-sm">
                <div className="navbar max-w-screen-xl mx-auto py-3 lg:px-14 md:px-8 px-4">
                    <div className="navbar-start flex items-center gap-4">
                        {/* Hamburger button for mobile */}
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-xl">
                            <FaBars />
                        </button>

                        {/* Logo */}
                        <Link to='/' className="text-xl">
                            <img className="w-28" src={logoImage} alt="tickify logo" />
                        </Link>
                    </div>

                    {/* Center nav for large screens */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navOptions}
                        </ul>
                    </div>

                    {/* Right auth button */}
                    <div className="navbar-end">
                        {
                            token ? (
                                <button onClick={handleLogout} className="btn text-white">Logout</button>
                            ) : (
                                <NavLink to='/login' className="btn text-white">Sign In</NavLink>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* Sidebar overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}


            {/* Sidebar drawer for mobile */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[1001] transform transition-transform duration-300 ease-in-out 
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden flex flex-col`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <img className="w-24" src={logoImage} alt="Tickify logo" />
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="text-sm flex items-center gap-1 px-2 py-1 border rounded hover:bg-gray-100 transition"
                    >
                        <FaTimes className="w-4 h-4" />
                        <span></span>
                    </button>
                </div>

                {/* Sidebar Menu */}
                <ul className="menu p-4 space-y-2 flex-1">
                    {navOptions}
                    <li className="mt-4">
                        {
                            token ? (
                                <button onClick={handleLogout} className="btn w-full text-white">Logout</button>
                            ) : (
                                <NavLink to='/login' className="btn w-full text-white">Sign In</NavLink>
                            )
                        }
                    </li>
                </ul>
            </div>

        </>
    );
};

export default Navbar;
