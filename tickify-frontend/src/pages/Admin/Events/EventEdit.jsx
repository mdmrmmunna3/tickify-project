import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthProvider';
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader/Loader';

const EventEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const fileInputRef = useRef();

    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/admin/events/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token?.token}`,
                    }
                });

                const event = res.data.event;

                // Populate form fields
                reset({
                    title: event.title,
                    description: event.description,
                    location: event.location,
                    category: event.category,
                    price: event.price,
                    start_time: event.start_time?.slice(0, 16), // trim for datetime-local
                    end_time: event.end_time?.slice(0, 16),
                    status: event.status
                });

            } catch (err) {
                console.error('Failed to fetch event:', err);
                toast.error('Failed to load event');
            } finally {
                setLoading(false);
            }
        };

        if (token?.token) fetchEvent();
    }, [id, token, reset]);

    const onSubmit = async (data) => {
        const formData = new FormData();

        // Append all fields except image
        for (const key in data) {
            if (key !== 'image') {
                formData.append(key, data[key]);
            }
        }

        // Append image only if user selected a new one
        if (data.image?.[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            await axios.post(`http://localhost:8000/api/admin/events/${id}?_method=PUT`, formData, {
                headers: {
                    'Authorization': `Bearer ${token?.token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            toast.success('Event updated successfully');
            navigate('/dashboard/events');
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update event');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-serif uppercase">Edit Event</h2>

            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-5">

                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        className="w-full border px-3 py-2 rounded bg-transparent"
                        {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        className="w-full border px-3 py-2 rounded h-24 resize-none bg-transparent"
                        {...register('description')}
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block mb-1 font-medium">Location</label>
                    <input
                        className="w-full border px-3 py-2 rounded bg-transparent"
                        {...register('location')}
                    />
                </div>

                {/* Start Time */}
                <div>
                    <label className="block mb-1 font-medium">Start Time</label>
                    <input
                        type="datetime-local"
                        className="w-full border px-3 py-2 rounded bg-transparent"
                        {...register('start_time', { required: 'Start time is required' })}
                    />
                    {errors.start_time && <p className="text-red-500 text-sm">{errors.start_time.message}</p>}
                </div>

                {/* End Time */}
                <div>
                    <label className="block mb-1 font-medium">End Time</label>
                    <input
                        type="datetime-local"
                        className="w-full border px-3 py-2 rounded bg-transparent"
                        {...register('end_time', {
                            required: 'End time is required',
                            validate: (value) => {
                                const start = new Date(watch('start_time'));
                                const end = new Date(value);
                                return end >= start || 'End time must be after start time';
                            },
                        })}
                    />
                    {errors.end_time && <p className="text-red-500 text-sm">{errors.end_time.message}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <input
                        className="w-full border px-3 py-2 rounded bg-transparent"
                        {...register('category')}
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        className="w-full border px-3 py-2 rounded bg-transparent"
                        {...register('status')}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full border px-3 py-2 rounded bg-transparent"
                        {...register('price', {
                            required: 'Price is required',
                            min: { value: 0, message: 'Price cannot be negative' }
                        })}
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                {/* Image */}
                <div>
                    <label className="block mb-1 font-medium">Replace Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:border file:border-gray-300
                            file:rounded file:bg-white
                            file:text-gray-700 hover:file:bg-gray-100 bg-transparent"
                        {...register('image')}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded text-white font-semibold ${isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isSubmitting ? 'Updating...' : 'Update Event'}
                </button>
            </form>
        </div>
    );
};

export default EventEdit;
