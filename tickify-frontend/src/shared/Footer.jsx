import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebook, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { IoIosHome } from 'react-icons/io';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { TfiEmail } from 'react-icons/tfi';

const Footer = () => {
    return (
        <div className='bg-black'>
            <footer className="footer sm:footer-horizontal text-base-content pt-10 pb-3 lg:px-20 md:px-10 px-4">
                <aside>

                    <img src="https://floral-mountain-2867.fly.storage.tigris.dev/media/site_logo/tickify-email-logo.png" alt="" className='w-[115px]' />
                    <h5 className='describ text-white text-[16px]'>A concern of Adventor Global Limited.</h5>
                    <small className='describ text-xs text-white'>TRADE LICENSE: TRAD/DNCC/141845/2022</small>

                    <div className='my-6'>
                        <h4 className='describ uppercase pb-3 text-white font-semibold'>Follow Us</h4>
                        {/* socal icons part  */}
                        <div className='flex justify-center items-center gap-3 text-xl'>
                            <a href="" target='_blank' className='transition-transform duration-300 hover:-translate-y-1.5'>
                                <FaFacebook />
                            </a>
                            <a href="" target='_blank' className='transition-transform duration-300 hover:-translate-y-1.5'>
                                <AiFillInstagram />
                            </a>
                            <a href="" target='_blank' className='transition-transform duration-300 hover:-translate-y-1.5'>
                                <FaYoutube />
                            </a>
                            <a href="" target='_blank' className='transition-transform duration-300 hover:-translate-y-1.5'>
                                <FaTiktok />
                            </a>
                            <a href="" target='_blank' className='transition-transform duration-300 hover:-translate-y-1.5'>
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>
                </aside>

                {/* more info  */}
                <nav>
                    <h6 className="footer-title uppercase text-white">More Info</h6>
                    <a className="group inline-flex items-center gap-1 transition-transform duration-300 hover:translate-x-1 cursor-pointer">
                        <span>Contact Us</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                    </a>
                    <a className="group inline-flex items-center gap-1 transition-transform duration-300 hover:translate-x-1 cursor-pointer">
                        <span>FAQ</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                    </a>

                </nav>

                {/* legal  */}
                <nav>
                    <h6 className="footer-title uppercase text-white">Legals</h6>
                    <a className="group inline-flex items-center gap-1 transition-transform duration-300 hover:translate-x-1 cursor-pointer">
                        <span>Terms and Conditions</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                    </a>
                    <a className="group inline-flex items-center gap-1 transition-transform duration-300 hover:translate-x-1 cursor-pointer">
                        <span>Privacy Policy</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                    </a>
                    <a className="group inline-flex items-center gap-1 transition-transform duration-300 hover:translate-x-1 cursor-pointer">
                        <span>Refund Policy</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                    </a>
                </nav>

                {/* contact  */}
                <nav>
                    <h6 className="footer-title uppercase text-white">Contacts</h6>
                    <span className='flex justify-center items-center gap-5 '>
                        <small className='text-xl text-[#a9dd36]'><IoIosHome /></small>
                        <small className='text-[16px]'>House 6, Road 16, Block D, Mirpur 6, Dhaka 1216</small>
                    </span>
                    <span className='flex justify-center items-center gap-5 '>
                        <small className='text-xl text-[#a9dd36]'><MdOutlinePhoneAndroid /></small>
                        <small className='text-[16px]'>+88 018 35099 555</small>
                    </span>
                    <span className='flex justify-center items-center gap-5 '>
                        <small className='text-xl text-[#a9dd36]'><TfiEmail /></small>
                        <small className='text-[16px]'>tickify.live@gmail.com</small>
                    </span>
                </nav>
            </footer>

            {/* hr  */}
            <hr className='pt-1 lg:mx-20 md:mx-10 mx-4' />
            {/* bottom footer  */}
            <div className='grid md:grid-cols-2 text-white lg:mx-20 md:mx-10 mx-4 py-3'>
                <div>
                    <div className='flex gap-3 mb-3 md:mb-0'>
                        <img src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/pgw-bkash.svg" alt="Bkash" className='w-[55px] h-5 grayscale hover:grayscale-0 transition duration-300' />

                        <img src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/pgw-nagad.png" alt="Nagad" className='w-[55px] h-5 grayscale hover:grayscale-0 transition duration-300' />

                        <img src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/pgw-upay-2.svg" alt="Upay" className='w-[55px] h-5 grayscale hover:grayscale-0 transition duration-300' />

                        <img src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/pgw-visa.svg" alt="visa card" className='w-[55px] h-5 grayscale hover:grayscale-0 transition duration-300' />

                        <img src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/pgw-mastercard.svg" alt="master card" className='w-[55px] h-5 grayscale hover:grayscale-0 transition duration-300' />
                    </div>

                </div>
                <div className='md:text-end text-start'>
                    <span>2025 © Tickify</span> <small className='mx-1'> | </small> <span> A concern of Adventor Global Ltd</span>
                </div>
            </div>

        </div>
    );
};

export default Footer;