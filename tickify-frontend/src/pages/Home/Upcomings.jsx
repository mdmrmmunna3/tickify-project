import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import Loader from '../../utils/Loader/Loader';
import axios from 'axios';

const Upcomings = () => {
    const { isLoading, setIsLoading, token } = useAuth();

    const [events, setEvents] = useState([]);
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

    const fetchEvents = async (page = 1) => {
        try {
            const response = await axios.get('http://localhost:8000/api/events');

            const eventData = response.data.events;
            setEvents(eventData.data);
            setPagination({
                current_page: eventData.current_page,
                last_page: eventData.last_page,
            });

        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // laod 
    useEffect(() => {

        fetchEvents(1);

    }, []);

    // use loader 
    if (isLoading) return <div className="text-center text-lg">
        <Loader></Loader>
    </div>;

    return (
        <div className='pt-10 lg:px-[85px] md:px-8 px-4'>
            <div className='text-center mb-10'>
                <h2 className=" text-3xl video_text font-semibold"> Explore Upcomings!</h2>
                <p className='text-center descrip text-xs mt-2'>Explore the Universe of Events at Your Fingertips.</p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.slice(0, 3).map(event => {
                    const now = new Date();
                    const start = new Date(event.start_time);
                    const end = new Date(event.end_time);

                    let status = '';
                    let badgeColor = '';

                    if (now < start) {
                        status = 'Upcoming';
                        badgeColor = 'bg-blue-600';
                    } else if (now >= start && now <= end) {
                        status = 'Live Now';
                        badgeColor = 'bg-red-600';
                    } else {
                        status = 'Done';
                        badgeColor = 'bg-gray-600';
                    }

                    return (
                        <li key={event.id} className="bg-white shadow-md rounded-xl overflow-hidden border relative">
                            {/* Image with category and status badge */}
                            <div className="relative">
                                {event.image_path && (
                                    <img
                                        src={`http://localhost:8000/storage/${event.image_path}`}
                                        alt={event.title}
                                        className="w-full h-44 object-cover"
                                    />
                                )}
                                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                    {event.category}
                                </div>
                                <div className={`absolute top-2 right-2 ${badgeColor} text-white text-xs font-semibold px-2 py-1 rounded`}>
                                    {status}
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="p-4">
                                <div className="flex items-start space-x-3">
                                    {/* Date badge */}
                                    <div className="bg-black text-white px-3 py-2 rounded text-center">
                                        <p className="text-lg font-bold">
                                            {new Date(event.start_time).getDate()}
                                        </p>
                                        <p className="text-xs uppercase">
                                            {new Date(event.start_time).toLocaleString('default', { month: 'short' })}
                                        </p>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium">Description:</span>{" "}
                                            {event.description.split(" ").length > 8
                                                ? event.description.split(" ").slice(0, 8).join(" ") + " ..."
                                                : event.description}
                                        </p>
                                        <p className="text-sm text-gray-500"><span className='font-medium'>Location</span>: {event.location}</p>
                                        <p className="text-sm text-gray-500"><span className='font-medium'>Price</span>: Starts from ৳{event.price}</p>
                                        <p className="text-sm text-gray-500"><span className='font-medium'>Start</span>: {start.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500"><span className='font-medium'>End</span>: {end.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>


        </div>
    );
};

export default Upcomings;