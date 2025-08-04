import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const location = useLocation();
    const [message, setMessage] = useState('Processing payment...');
    // const [paymentId, setPaymentId] = useState(null); // For download link

    useEffect(() => {
        const sessionId = new URLSearchParams(location.search).get('session_id');

        if (sessionId) {
            axios.get(`http://localhost:8000/api/payment-success?session_id=${sessionId}`)
                .then(res => {
                    const { message, amount, payment_id } = res.data;
                    setMessage(`${message} (৳${amount})`);
                    // setPaymentId(payment_id); // Store payment ID for ticket download
                })
                .catch(() => setMessage('❌ Payment verification failed.'));
        } else {
            setMessage('No payment session found.');
        }
    }, [location.search]);

    return (
        <div className="text-center py-20 px-4">
            <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
            <p className="text-lg">{message}</p>
            <p>Go To Your Dashboard 😊</p>
        </div>
    );
};

export default PaymentSuccess;
