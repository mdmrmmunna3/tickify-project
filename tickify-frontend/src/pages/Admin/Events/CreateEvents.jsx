import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthProvider';
import { useRef } from 'react';

const CreateEvents = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();
    const { token } = useAuth();
    const fileInputRef = useRef();

    const onSubmit = async (data) => {
        const formData = new FormData();
        for (const key in data) {
            if (key === 'image' && data[key]?.[0]) {
                formData.append(key, data[key][0]);
            } else {
                formData.append(key, data[key]);
            }
        }

        try {
            await axios.post('http://localhost:8000/api/admin/events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token?.token}`,
                },
            });

            reset(); // reset form fields
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
            toast.success('Event created successfully!');
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error('Something went wrong.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-serif uppercase">Create Event</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="space-y-5 overflow-visible"
            >
                {/* Title */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Title</label>
                    <input
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 bg-white"
                        {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                    <textarea
                        className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring focus:ring-blue-200 bg-white"
                        {...register('description')}
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Location</label>
                    <input
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 bg-white"
                        {...register('location')}
                    />
                </div>

                {/* Start Time */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Start Time</label>
                    <input
                        type="datetime-local"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 bg-white"
                        {...register('start_time', { required: 'Start time is required' })}
                    />
                    {errors.start_time && <p className="text-red-500 text-sm mt-1">{errors.start_time.message}</p>}
                </div>

                {/* End Time */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">End Time</label>
                    <input
                        type="datetime-local"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 bg-white"
                        {...register('end_time', {
                            required: 'End time is required',
                            validate: (value) => {
                                const start = new Date(watch('start_time'));
                                const end = new Date(value);
                                return end >= start || 'End time must be after start time';
                            },
                        })}
                    />
                    {errors.end_time && <p className="text-red-500 text-sm mt-1">{errors.end_time.message}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Category</label>
                    <input
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 bg-white"
                        {...register('category')}
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Status</label>
                    <select
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 bg-white"
                        {...register('status')}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Price (USD)</label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 bg-white"
                        {...register('price', {
                            required: 'Price is required',
                            min: { value: 0, message: 'Price cannot be negative' }
                        })}
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef} // ✅ reference to file input
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:border file:border-gray-300
                            file:rounded file:text-sm
                            file:font-semibold file:bg-white
                            file:text-gray-700 hover:file:bg-gray-100"
                        {...register('image')}
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 rounded text-white font-semibold ${isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 transition duration-200'
                            }`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Create Event'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvents;
