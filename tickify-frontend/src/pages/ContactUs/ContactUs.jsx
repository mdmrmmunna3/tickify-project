import React from 'react';

const ContactUs = () => {
    return (
        <div className='py-10 lg:px-[85px] md:px-8 px-4'>
            <div className='text-center mb-10 bg-[#00352f] py-4 rounded-md text-white mt-12'>
                <h2 className=" text-3xl video_text font-semibold"> Contact Us!</h2>
                <p className='text-center descrip text-xl mt-2 font-serif'>Saturday - Thursday (11 AM - 7 PM)</p>
            </div>

            <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4'>
                <div className='text-center p-5 card_shadow rounded-md'>
                    {/* img part  */}
                    <div className='flex justify-center items-center mb-2 p-5 '>
                        <img
                            style={{
                                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
                            }}
                            src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/messenger.png" alt="messenger" className='p-3 rounded-md offer_img w-14' />
                    </div>
                    {/* content  */}
                    <h3 className='text-xl mb-1'>Messenger</h3>
                    <h4>Tickify</h4>
                    <p className='mt-6 describ text-[16px]'>Connect with Tickify’s official page for prompt assistance.</p>
                    <button className='btn text-xl font-medium text-white mt-3'>Chat on Messenger</button>
                </div>

                <div className='text-center p-5 card_shadow rounded-md'>
                    {/* img part  */}
                    <div className='flex justify-center items-center mb-2 p-5 '>
                        <img
                            style={{
                                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
                            }}
                            src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/wa.png" alt="whatsapp" className='p-3 rounded-md offer_img w-14' />
                    </div>
                    {/* content  */}
                    <h3 className='text-xl mb-1'>Whatsapp</h3>
                    <h4>+8801835099555</h4>
                    <p className='mt-6 describ text-[16px]'>Chat with Tickify on WhatsApp for quick support.</p>
                    <button className='btn text-xl font-medium text-white mt-3'>Chat on Whatsapp</button>
                </div>

                <div className='text-center p-5 card_shadow rounded-md'>
                    {/* img part  */}
                    <div className='flex justify-center items-center mb-2 p-5 '>
                        <img
                            style={{
                                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
                            }}
                            src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/call.png" alt="callus" className='p-3 rounded-md offer_img w-14' />
                    </div>
                    {/* content  */}
                    <h3 className='text-xl mb-1'>Phone</h3>
                    <h4>+8801835099555</h4>
                    <p className='mt-6 describ text-[16px]'>Call Tickify via phone for immediate assistance.</p>
                    <button className='btn text-xl font-medium text-white mt-3'>Call Us</button>
                </div>

                <div className='text-center p-5 card_shadow rounded-md'>
                    {/* img part  */}
                    <div className='flex justify-center items-center mb-2 p-5 '>
                        <img
                            style={{
                                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
                            }}
                            src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/email.png" alt="Email" className='p-3 rounded-md offer_img w-14' />
                    </div>
                    {/* content  */}
                    <h3 className='text-xl mb-1'>Email</h3>
                    <h4>tickify.live@gmmail.com</h4>
                    <p className='mt-6 describ text-[16px]'>Email Tickify for detailed responses to your queries.</p>
                    <button className='btn text-xl font-medium text-white mt-3'>Chat on Messenger</button>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;