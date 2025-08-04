import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyPurchasesEvent = () => {
    const { token } = useAuth();
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/my-purchases', {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                    },
                });
                // console.log(res.data);
                setPurchases(res.data.purchases);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load purchases");
            }
        };

        fetchPurchases();
    }, []);

    const handlePayNow = async (purchase) => {
        try {
            const res = await axios.post(
                'http://localhost:8000/api/create-checkout-session',
                {
                    title: purchase.title,
                    price: purchase.price,
                    image_path: purchase.image_path,
                    purchase_id: purchase.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                    },
                }
            );

            window.location.href = res.data.url;
        } catch (error) {
            toast.error("Stripe Checkout failed");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Purchased Events</h2>
            {purchases.length === 0 ? (
                <p>You haven’t purchased any events yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchases.map(purchase => (
                        <div key={purchase.id} className="border rounded shadow p-4">
                            <h3 className="text-xl font-semibold mb-2">{purchase.title}</h3>
                            {purchase.image_path && (
                                <img
                                    src={`http://localhost:8000/storage/${purchase.image_path}`}
                                    alt={purchase.title}
                                    className="w-full h-48 object-cover rounded mb-2"
                                />
                            )}
                            <p><strong>Price:</strong> ৳{purchase.price}</p>
                            <p><strong>Status:</strong> {purchase.is_paid ? "Paid" : "Unpaid"}</p>
                            {!purchase.is_paid && (
                                <button
                                    onClick={() => handlePayNow(purchase)}
                                    className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                >
                                    Pay Now
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPurchasesEvent;