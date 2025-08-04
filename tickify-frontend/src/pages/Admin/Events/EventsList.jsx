import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthProvider';
import Loader from '../../../utils/Loader/Loader';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import Swal from 'sweetalert2';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

const EventsList = () => {
    const { isLoading, setIsLoading, token } = useAuth();

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
            const response = await axios.get('http://localhost:8000/api/admin/events', {
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                },
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
            const response = await axios.get('http://localhost:8000/api/admin/event-categories', {
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                }
            });
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // laod 
    useEffect(() => {
        if (token?.token) {
            fetchCategories();
            fetchEvents(1);
        }
    }, [token]);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchEvents(1); // Reset to page 1
    };

    // handle event delete 
    const handleDelete = (eventId) => {
        console.log(eventId);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to Delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            showClass: {
                popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
            },
            hideClass: {
                popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
            }
        }).then((result) => {
            // console.log(result)
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/admin/events/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${token?.token}`,
                    },
                })
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The event has been deleted.",
                            icon: "success",
                            showClass: {
                                popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
                            },
                            hideClass: {
                                popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
                            }
                        });
                        fetchEvents(pagination.current_page);
                    })
                    .catch(error => {
                        console.error('Error deleting event:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the event.",
                            icon: "error",
                            showClass: {
                                popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
                            },
                            hideClass: {
                                popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
                            }
                        });
                    });
            }
        });
    };


    const handleEdit = (event) => {
        navigate(`/dashboard/events/${event.id}/edit`);
    }
    const handleView = (event) => {
        navigate(`/dashboard/events/${event.id}`);
    }

    // use loader 
    if (isLoading) return <div className="text-center text-lg">
        <Loader></Loader>
    </div>;

    // console.log(events)

    return (
        <div className="max-w-4xl mx-auto mt-10">

            {/* search filed  */}
            <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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



            <h2 className="text-2xl font-bold mb-6 text-center uppercase font-serif">Events</h2>
            <ul className=" grid lg:grid-cols-2 gap-3">
                {events.map(event => (
                    <li key={event.id} className="bg-white p-4 shadow rounded-md border relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold">Event Title: {event.title}</h3>
                                <p className="text-gray-600">
                                    <span className='font-medium'>Description</span> : {
                                        event.description.split(" ").length > 8
                                            ? event.description.split(" ").slice(0, 8).join(" ") + " ..."
                                            : event.description
                                    }
                                </p>
                                <p className="text-sm text-gray-500"><span className='font-medium'>Location</span>: {event.location}</p>
                                <p className="text-sm text-gray-500"><span className='font-medium'>Category</span>: {event.category}</p>
                                <p className="text-sm text-gray-500"><span className='font-medium'>Price</span>: {event.price}</p>
                                <p className="text-sm text-gray-500"><span className='font-medium'>Start</span>: {new Date(event.start_time).toLocaleString()}</p>
                                <p className="text-sm text-gray-500"><span className='font-medium'>End</span>: {new Date(event.end_time).toLocaleString()}</p>
                            </div>

                            <div className="flex space-x-4 text-xl mt-2">
                                <AiOutlineEye
                                    onClick={() => handleView(event)}
                                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                                    title="View"
                                />
                                <AiOutlineEdit
                                    onClick={() => handleEdit(event)}
                                    className="text-yellow-500 cursor-pointer hover:text-yellow-700"
                                    title="Edit"
                                />
                                <AiOutlineDelete
                                    onClick={() => handleDelete(event?.id)}
                                    className="text-red-500 cursor-pointer hover:text-red-700"
                                    title="Delete"
                                />
                            </div>
                        </div>

                        {event.image_path && (
                            <img
                                src={`http://localhost:8000/storage/${event.image_path}`}
                                alt={event.title}
                                className="mt-4 w-full max-h-64 object-cover rounded"
                            />
                        )}
                    </li>
                ))}
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

export default EventsList;
