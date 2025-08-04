import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';

const ManageSales = () => {

    const { token } = useAuth();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        if (!token?.token) return;

        axios
            .get('http://localhost:8000/api/payments', {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
            })
            .then(res => {
                setPayments(res.data?.payments);
            })
            .catch(err => {
                console.error('Failed to fetch payments:', err);
            });
    }, [token]);

    return (
        <div>
            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2 font-serif">
                    🧾 All Sales
                </h2>

                {payments.length === 0 ? (
                    <div className="text-gray-600 text-base">No Sales found.</div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className=" w-full bg-white rounded-md shadow-md border border-gray-200 text-sm sm:text-base">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
                                <tr>
                                    <th className="px-4 py-3 text-left whitespace-nowrap">#</th>
                                    <th className="px-4 py-3 text-left whitespace-nowrap">Email</th>
                                    <th className="px-4 py-3 text-left whitespace-nowrap">Event</th>
                                    <th className="px-4 py-3 text-left whitespace-nowrap">Amount</th>
                                    <th className="px-4 py-3 text-left whitespace-nowrap md:block hidden">Date</th>
                                    <th className="px-4 py-3 text-left whitespace-nowrap">Image</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                {payments.map((payment, index) => (
                                    <tr key={payment.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3 break-all max-w-[200px] ">{payment.email}</td>

                                        <td className="px-4 py-3">{payment.event_title}</td>
                                        <td className="px-4 py-3 text-green-600 font-semibold break-all">৳{payment.amount}</td>
                                        <td className="px-4 py-3 md:block hidden">
                                            {new Date(payment.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            {payment.image_path && (
                                                <img
                                                    src={`http://localhost:8000/storage/${payment.image_path}`}
                                                    alt={payment.event_title}
                                                    className="w-[60px] h-[60px] object-cover rounded"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
            </div>
        </div>
    );
};

export default ManageSales;