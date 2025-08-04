import React from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock } from 'react-icons/fi'; // Icon imports
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthProvider';

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    const { login } = useAuth();

    const onSubmit = async (data) => {
        // console.log(data);

        const res = await fetch('http://localhost:8000/api/auth', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await res.json();
        // console.log(result);

        // apply successfull and error message condition using tostify
        if (result.status === false) {
            toast.error(result?.message);
        } else {
            if (result.status === true) {
                const userInfo = {
                    id: result?.id,
                    role: result?.role,
                    token: result?.token
                }
                login(JSON.stringify(userInfo));
                toast.success(result?.message);
                navigate(from, { replace: true })
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm bg-white bg-opacity-90 p-8 rounded-lg shadow-lg space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 uppercase font-serif">Sign In</h2>

                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 top-1 pl-3 flex items-center text-gray-400">
                            <FiMail />
                        </span>
                        <input
                            id="email"
                            type="email"
                            placeholder='Email Address'
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Please enter a valid email address'
                                }
                            })}
                            aria-invalid={errors.email ? "true" : "false"}
                            className={`mt-1 w-full pl-10 pr-4 py-2 border bg-transparent ${errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                    </div>
                    {errors.email?.type === "required" && (
                        <p role="alert" className="mt-1 text-sm text-red-600">
                            Email is required
                        </p>
                    )}
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 top-1 pl-3 flex items-center text-gray-400">
                            <FiLock />
                        </span>
                        <input
                            id="password"
                            type="password"
                            placeholder='Password'
                            {...register("password", { required: "Password is required" })}
                            aria-invalid={errors.password ? "true" : "false"}
                            className={`mt-1 w-full pl-10 pr-4 py-2 border bg-transparent ${errors.password ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                    </div>
                    {errors.password && (
                        <p role="alert" className="mt-1 text-sm text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                    </a>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-black hover:bg-[#424649] text-white font-semibold rounded-md transition duration-300"
                >
                    Login Now!
                </button>

                {/* Sign Up Prompt */}
                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to='/signUp' className="text-blue-600 hover:underline font-medium">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
