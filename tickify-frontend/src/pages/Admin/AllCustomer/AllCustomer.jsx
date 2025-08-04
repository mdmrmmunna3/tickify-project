import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { FaTrash } from 'react-icons/fa';
import Loader from '../../../utils/Loader/Loader';
import Swal from 'sweetalert2';

const AllCustomer = () => {
    const { isLoading, setIsLoading, token } = useAuth();
    const [users, setUsers] = useState([]);

    // Fetch all users 
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/users', {
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                }
            });
            const usersData = response?.data?.users || [];
            const customerUsers = usersData.filter(user => user.role === 'customer');
            setUsers(customerUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    };


    // handle event delete 
    const handleDeleteUser = (userId) => {
        // console.log(userId);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to Delete this Customer or User!",
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
                axios.delete(`http://localhost:8000/api/admin/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token?.token}`,
                    },
                })
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The User or Customer has been deleted.",
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
                        fetchUsers();
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

    useEffect(() => {
        if (token?.token) {
            fetchUsers();
        }
    }, [token]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 font-serif">All Customers</h2>

            {isLoading ? (
                <p><Loader></Loader></p>
            ) : users.length === 0 ? (
                <p>No customer users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Role</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-6">{user?.name}</td>
                                    <td className="py-3 px-6">{user?.email}</td>
                                    <td className="py-3 px-6 capitalize">{user?.role}</td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            onClick={() => handleDeleteUser(user?.id)}
                                            className="text-red-500 hover:text-red-700 transition"
                                            title="Delete user"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllCustomer;
