
import { useEffect, useState } from 'react';
import GradientCard from '../../shared/GradientCard';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import Loader from '../../utils/Loader/Loader';
import { useNavigate } from 'react-router-dom';

// chart import 
import dayjs from 'dayjs';

// Chart.js setup
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const { isLoading, setIsLoading, token } = useAuth();
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState({ totalAmount: 0, chartData: [] });
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
    const navigate = useNavigate();

    // fetch event data 
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/allevents', {
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                }
            });

            const eventData = response.data.events;
            // console.log(eventData);
            setEvents(eventData);

        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // fetch all users 
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/users', {
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                }
            });
            const usersData = response?.data?.users || [];

            // Filter users with role "customer"
            // const customerUsers = usersData.filter(user => user.role === 'customer');
            // console.log('Customer Users:', customerUsers);
            setUsers(usersData);

        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch Payments and aggregate monthly sales
    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/payments', {
                headers: { Authorization: `Bearer ${token?.token}` },
            });

            const paymentsData = response?.data?.payments || [];
            const totalAmount = paymentsData.reduce((sum, payment) => sum + Number(payment.amount), 0);

            // Aggregate by month
            const monthlySales = {};
            paymentsData.forEach(payment => {
                const month = dayjs(payment.created_at).format('YYYY-MM');
                if (!monthlySales[month]) {
                    monthlySales[month] = 0;
                }
                monthlySales[month] += Number(payment.amount);
            });

            const chartData = Object.entries(monthlySales).map(([date, amount]) => ({ date, amount }));
            // console.log(totalAmount)
            setPayments({ totalAmount, chartData });

        } catch (error) {
            console.error('Error fetching payments:', error);
        } finally {
            setIsLoading(false);
        }
    };
    // laod 
    useEffect(() => {
        if (token?.token) {
            fetchEvents(1);
            fetchUsers();
            fetchPayments();
        }
    }, [token]);



    if (isLoading) return <div className="text-center text-lg">
        <Loader></Loader>
    </div>;

    const handleEvent = () => {
        navigate(`/dashboard/events`);
    }
    const handleUsers = () => {
        navigate(`/dashboard/users`);
    }
    const handleSales = () => {
        navigate(`/dashboard/sales`);
    }


    return (
        <div className='grid grid-cols-1 mt-4'>
            {/* import dynamic gradient color  */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
                <div onClick={handleUsers}>
                    <GradientCard
                        title="All Customers"
                        content={`Total Customers: ${users?.length}`}
                        gradient="bg-gradient-to-r from-emerald-400 to-cyan-500"
                    />
                </div>

                <div onClick={handleEvent}>
                    <GradientCard
                        title="All Events"
                        content={`Total Events: ${events?.length}`}
                        gradient="bg-gradient-to-r from-sky-500 to-blue-700"
                    />
                </div>
                <div onClick={handleSales}>
                    <GradientCard
                        title="All Sales"
                        content={`Total Sales: ${payments?.totalAmount} TK`}
                        gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
                        className='hover:bg-red-500 '
                    />
                </div>
            </div>


            {/* Monthly Sales Chart */}
            {payments.chartData.length > 0 && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow col-span-3">
                    <h2 className="text-xl font-bold mb-4">Monthly Sales Overview</h2>
                    <Line
                        data={{
                            labels: payments.chartData.map(p => p.date),
                            datasets: [
                                {
                                    label: 'Monthly Sales (TK)',
                                    data: payments.chartData.map(p => p.amount),
                                    borderColor: 'rgb(75, 192, 192)',
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    tension: 0.3,
                                    fill: true,
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Monthly Sales Chart' },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function (value) {
                                            return `${value} TK`;
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;