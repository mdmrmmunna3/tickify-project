import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, useRouteError } from 'react-router-dom';
import errorVideo from '../../assets/error/error.mp4';
const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div>
            <div className='flex items-center justify-center pb-10'>
                <div>
                    {/* <img src={errorImg} alt="" className='h-[350px]' /> */}
                    <video className='h-[500px] w-full' src={errorVideo} autoPlay
                        loop
                        muted ></video>
                    <p className='text-red-500 text-center'>{error.statusText || error.message}</p>

                    <div className='flex justify-center items-center mt-3'>
                        <Link to='/dashboard'
                            style={
                                {
                                    background: `linear-gradient(90deg, #835D23 0%, #B58130 100%)`,
                                    cursor: 'pointer'
                                }
                            }
                            className='flex justify-center items-center text-xl titel_content text-white px-5 py-2 space-x-3 rounded-md'
                        > <span className='pe-3'><FaHome></FaHome></span> Back To Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
