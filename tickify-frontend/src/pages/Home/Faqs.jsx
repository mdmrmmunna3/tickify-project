import React from 'react';

const Faqs = () => {
    return (
        <div className='py-10 lg:px-14 md:px-8 px-4'>
            <div className='text-center mb-8'>
                <h2 className=" text-3xl video_text font-semibold"> FAQs </h2>
                <p className='text-center descrip text-[14px] mt-2'>our FAQs are here to help you get the most out of Tickify</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">

                <div className='basis-[35%] overflow-hidden '>
                    <img src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/img/faq.png" alt="faqs image" />
                </div>

                <div className='basis-[61%] overflow-hidden px-2'>
                    <div className="collapse collapse-plus accro_shadow">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title font-semibold text-[#999]">How do I pay for the tickets?</div>
                        <div className="collapse-content text-sm">Depending on the organizers VISA & Mastercard/Bkash/Nagad/Upay is the medium through which you can pay for the tickets.</div>
                    </div>
                    <div className="collapse collapse-plus accro_shadow ">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold text-[#999]">I can't access the email of my Tickify account. What to do?</div>
                        <div className="collapse-content text-sm">Don't worry. You can download the ticket from the Tickify Profile page.</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Faqs;