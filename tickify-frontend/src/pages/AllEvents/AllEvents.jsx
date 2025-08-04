import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';
import Loader from '../../utils/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const AllEvents = () => {
    const { isLoading, setIsLoading } = useAuth();

    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
    const [timeStatus, setTimeStatus] = useState('');

    // fetch event data 
    const fetchEvents = async (page = 1) => {
        try {
            const response = await axios.get('http://localhost:8000/api/events', {
                params: {
                    page,
                    search: search || '',
                    category: category || '',
                    time_status: timeStatus || '',
                }
            });

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

    // load filter category 
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/event-cate',);
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // laod 
    useEffect(() => {

        fetchCategories();
        fetchEvents(1);

    }, []);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchEvents(1); // Reset to page 1
    };

    // use loader 
    if (isLoading) return <div className="text-center text-lg">
        <Loader></Loader>
    </div>;

    // console.log(events)


    return (
        <div className='py-10 lg:px-[85px] md:px-8 px-4'>
            <div className='text-center mb-10 bg-[#00352f] py-2 rounded-md text-white mt-12'>
                <h2 className=" text-3xl video_text font-semibold"> Explore Events!</h2>
                <p className='text-center descrip text-xs mt-2'>Explore the Universe of Events at Your Fingertips.</p>
            </div>

            {/* search filed  */}
            <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 bg-transparent shadow-md rounded"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 bg-transparent shadow-md rounded"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* time_status field upcoming, live or done  */}
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            value=""
                            className='bg-transparent'
                            checked={timeStatus === ''}
                            onChange={() => setTimeStatus('')}
                        />
                        <span>All</span>
                    </label>

                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            className='bg-transparent'
                            value="upcoming"
                            checked={timeStatus === 'upcoming'}
                            onChange={() => setTimeStatus('upcoming')}
                        />
                        <span>Upcoming</span>
                    </label>

                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            value="live"
                            checked={timeStatus === 'live'}
                            onChange={() => setTimeStatus('live')}
                        />
                        <span>Live</span>
                    </label>

                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            value="done"
                            checked={timeStatus === 'done'}
                            onChange={() => setTimeStatus('done')}
                        />
                        <span>Done</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
                >
                    Apply Filters
                </button>
            </form>


            {/* show events card  */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => {
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
                            <div className="relative overflow-hidden cursor-pointer"
                                onClick={() => navigate(`/explorEvent/${event.id}`)}
                            >
                                {event.image_path && (
                                    <img
                                        src={`http://localhost:8000/storage/${event.image_path}`}
                                        alt={event.title}
                                        className="w-full h-44 object-cover hoverEffect"
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

            {/* Pagination Buttons */}
            <div className="flex justify-center mt-6 gap-2">
                {[...Array(pagination.last_page)].map((_, index) => {
                    const page = index + 1;
                    return (
                        <button
                            key={page}
                            onClick={() => fetchEvents(page)}
                            className={`px-4 py-2 border rounded ${pagination.current_page === page
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-blue-500 hover:bg-blue-100'
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

        </div>
    );
};

export default AllEvents;