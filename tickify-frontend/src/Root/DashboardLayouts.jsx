// components/DashboardLayouts.jsx
import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { FaBars, FaTimes } from 'react-icons/fa';

const DashboardLayouts = () => {
    const { token, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const isAdmin = token?.role === 'admin';

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

    const menuItems = [
        { label: 'Dashboard', path: '/dashboard' },
        ...(isAdmin
            ? [
                { label: 'Manage Events', path: '/dashboard/events' },
                { label: 'Create Events', path: '/dashboard/createEvent' },
                { label: 'Manage Customers', path: '/dashboard/users' },
                { label: 'Manage Sales', path: '/dashboard/sales' },
            ]
            : [
                // { label: 'Events', path: '/dashboard/events' },
                { label: 'My Purchases Event', path: '/dashboard/purchasesEvents' },
                { label: 'My Purchases', path: '/dashboard/purchases' },
            ]),
    ];

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Overlay for mobile and medium */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed z-50 top-0 left-0  w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:z-auto flex flex-col`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700 lg:hidden">
                    <Link to='/' className="text-xl">
                        <img className="w-28" src="https://floral-mountain-2867.fly.storage.tigris.dev/media/site_logo/Tickify-Logo-light.png" alt="tickify logo" />
                    </Link>
                    <button onClick={() => setSidebarOpen(false)}>
                        <FaTimes className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div className="hidden lg:block p-4 text-xl font-bold">
                    <Link to='/' className="text-xl">
                        <img className="w-28" src="https://floral-mountain-2867.fly.storage.tigris.dev/media/site_logo/Tickify-Logo-light.png" alt="tickify logo" />
                    </Link>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                    <nav className="p-4 flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded hover:bg-gray-700 transition ${isActive ? 'bg-gray-700' : ''}`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="p-4">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Content area */}
            <div className="flex-1 flex flex-col min-h-screen ">
                {/* Topbar */}
                <header className="bg-white shadow px-4 py-5 flex items-center justify-between sticky top-0 z-10 h-20">
                    <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <FaBars className="w-6 h-6" />
                    </button>
                    <h1 className="lg:text-lg md:text-xl font-semibold font-serif uppercase">
                        Welcome to {token?.role} Dashboard
                    </h1>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-hidden">
                    {/* Scrollable Outlet content */}
                    <div className="h-full overflow-y-auto mx-2">
                        <Outlet />
                    </div>
                </main>
            </div>

        </div>
    );
};

export default DashboardLayouts;
