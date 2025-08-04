import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaTicket } from 'react-icons/fa6';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { toast } from 'react-toastify';

const EventsDetails = () => {

    const { token } = useAuth();
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const hasShownToast = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token?.role === 'admin' && !hasShownToast.current) {
            toast.error("Admin can't access this page!");
            hasShownToast.current = true;
        }
    }, [token?.role]);

    //  Block admin access
    if (token?.role === 'admin') {
        return <Navigate to="/allEvents" replace />;
    }

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/events/${id}`);
                setEvent(response.data.event);
            } catch (error) {
                console.error('Failed to load event:', error);
            }
        };

        fetchEvent();
    }, [id]);

    const handleBuyTicket = async () => {
        try {
            const payload = {
                event_id: event?.id,
                title: event?.title,
                price: event?.price,
                image_path: event?.image_path,
                user_id: token?.id,
                user_email: token?.user?.email,
            };

            await axios.post('http://localhost:8000/api/store-purchase', payload, {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
            });

            toast.success('Event added to your dashboard!');
            navigate('/dashboard/purchasesEvents')

        } catch (error) {
            console.error(error.response?.data || error);
            toast.error('Something went wrong');
        }
    };



    if (!event) return <p className="text-center py-10">Loading event details...</p>;

    return (
        <div className='py-10 lg:px-[85px] md:px-8 px-4'>
            <div className="py-10">
                <h2 className="text-3xl font-bold mb-4 font-serif">{event.title}</h2>
                {event.image_path && (
                    <img
                        src={`http://localhost:8000/storage/${event?.image_path}`}
                        alt={event.title}
                        className="w-full lg:h-[450px] md:h-[350px] object-cover rounded mb-6"
                    />
                )}
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Price:</strong> ৳{event.price}</p>
                <p><strong>Start:</strong> {new Date(event.start_time).toLocaleString()}</p>
                <p><strong>End:</strong> {new Date(event.end_time).toLocaleString()}</p>

                <p className='w-[300px] btn mt-3'>

                    <button
                        onClick={handleBuyTicket}
                        disabled={new Date() > new Date(event.end_time)}
                        className={`shadow-md px-5 py-2 rounded-md flex justify-center items-center gap-2 
        ${new Date() > new Date(event.end_time) ? 'bg-black cursor-not-allowed' : ' text-white'}`}
                    >
                        <FaTicket />
                        {new Date() > new Date(event.end_time) ? 'Event Ended' : 'Buy Ticket Now!'}
                    </button>
                </p>
            </div>

        </div>
    );
};

export default EventsDetails;