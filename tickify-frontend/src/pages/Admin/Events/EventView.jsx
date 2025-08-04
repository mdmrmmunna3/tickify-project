import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthProvider';
import Loader from '../../../utils/Loader/Loader';
import { FaArrowLeftLong } from "react-icons/fa6";

const EventView = () => {
    const { id } = useParams(); // <-- Gets event ID from URL
    const { token } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/admin/events/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token?.token}`,
                    }
                });
                // console.log(response)
                setEvent(response.data.event);
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token?.token) fetchEvent();
    }, [id, token]);

    if (loading) return <Loader />;

    if (!event) return <p className="text-center text-red-500">Event not found.</p>;

    return (
        <div>
            <p className='w-[300px]'>

                <Link to='/dashboard/events' className='shadow-md px-5 py-2 rounded-md flex justify-center items-center gap-2'><span><FaArrowLeftLong /></span> <span>Go Back To EventList</span></Link>
            </p>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
                <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                <p className="mb-2"><strong>Description:</strong> {event.description}</p>
                <p className="mb-2"><strong>Location:</strong> {event.location}</p>
                <p className="mb-2"><strong>Category:</strong> {event.category}</p>
                <p className="mb-2"><strong>Price:</strong> {event.price}</p>
                <p className="mb-2"><strong>Status:</strong> {event.status}</p>
                <p className="mb-2"><strong>Start Time:</strong> {new Date(event.start_time).toLocaleString()}</p>
                <p className="mb-2"><strong>End Time:</strong> {new Date(event.end_time).toLocaleString()}</p>
                {event.image_path && (
                    <img
                        src={`http://localhost:8000/storage/${event.image_path}`}
                        alt={event.title}
                        className="mt-4 w-full max-h-96 object-cover rounded"
                    />
                )}
            </div>
        </div>
    );
};

export default EventView;
