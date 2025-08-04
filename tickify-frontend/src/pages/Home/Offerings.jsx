import React from 'react';

const Offerings = () => {
    return (
        <div className='pt-10 mx-5'>
            <div className='text-center'>
                <h2 className=" text-3xl video_text font-semibold"> Our Offerings </h2>
                <p className='text-center descrip text-[14px] mt-2'>Explore the key features that make Tickify the perfect choice for event organizers</p>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-10 rounded-md">
                {/* frist card  */}
                <div className='text-center p-5 card_shadow'>
                    {/* img part  */}
                    <div className='flex justify-center items-center mb-2 p-5 '>
                        <img
                            style={{
                                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
                            }}
                            src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/ticket.png" alt="Easy Ticket Purchase" className='p-3 rounded-md offer_img' />
                    </div>
                    {/* content  */}
                    <h4>Easy Ticket Purchase</h4>
                    <p className='mt-6 describ text-[16px]'>Browse, and purchase tickets for a variety of events, from concerts to conferences, all from your device with ease and convenience.</p>
                </div>

                {/* second card  */}
                <div className='text-center p-5 card_shadow'>
                    {/* img part  */}
                    <div className='flex justify-center items-center mb-2 p-5 '>
                        <img
                            style={{
                                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
                            }}
                            src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/email-delivery.png" alt="Ticket Delivery" className='p-3 rounded-md offer_img' />
                    </div>
                    {/* content  */}
                    <h4>Instant Ticket Delivery</h4>
                    <p className='mt-6 describ text-[16px]'>Receive your tickets immediately upon purchase via email. If preferred, users can also opt to receive their tickets on WhatsApp.</p>
                </div>

                {/* third card  */}
                <div className='text-center p-5 card_shadow'>
                    {/* img part  */}
                    <div className='flex justify-center items-center mb-2 p-5 '>
                        <img
                            style={{
                                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
                            }}
                            src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/payment-method.png" alt=" Payment Methods" className='p-3 rounded-md offer_img' />
                    </div>
                    {/* content  */}
                    <h4>Multiple Payment Methods</h4>
                    <p className='mt-6 describ text-[16px]'>Enjoy flexible payment options with bKash, Nagad, Upay, Visa, Mastercard, and more, ensuring secure and smooth transactions.</p>
                </div>

                {/* fourth card  */}
                <div className='text-center p-5 card_shadow'>
                    {/* img part  */}
                    <div className='flex justify-center items-center mb-2 p-5 '>
                        <img
                            style={{
                                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
                            }}
                            src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/tickipass.png" alt="Tickipass Feature" className='p-3 rounded-md offer_img' />
                    </div>
                    {/* content  */}
                    <h4>Tickipass Feature</h4>
                    <p className='mt-6 describ text-[16px]'>Access purchased tickets instantly with Tickipass, displaying QR codes from your device, eliminating the need for printed e-ticket PDFs.</p>
                </div>

                {/* fifth card  */}
                <div className='text-center p-5 card_shadow'>
                    {/* img part  */}
                    <div className='flex justify-center items-center mb-2 p-5 '>
                        <img
                            style={{
                                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
                            }}
                            src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/dashboard.png" alt="Comprehensive Dashboard" className='p-3 rounded-md offer_img' />
                    </div>
                    {/* content  */}
                    <h4>Comprehensive Dashboard</h4>
                    <p className='mt-6 describ text-[16px]'>Access real-time sales reports and attendance data through our user-friendly dashboard, providing valuable insights at your fingertips.</p>
                </div>

                {/* six card  */}
                <div className='text-center p-5 card_shadow'>
                    {/* img part  */}
                    <div className='flex justify-center items-center mb-2 p-5 '>
                        <img
                            style={{
                                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
                            }}
                            src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/icons/scan.png" alt="Scanning" className='p-3 rounded-md offer_img' />
                    </div>
                    {/* content  */}
                    <h4>Smooth Scanning</h4>
                    <p className='mt-6 describ text-[16px]'>Streamline the entry process with our efficient ticket scanning system, ensuring a
                        hassle-free experience for attendees and organizers.</p>
                </div>

            </div>
        </div>
    );
};

export default Offerings;