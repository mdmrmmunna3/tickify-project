import React from 'react';

const GradientCard = ({ title, content, gradient }) => {
    return (
        <div className=''>
            <div className={`rounded-xl shadow-lg p-6 hover:shadow-md cursor-pointer text-white ${gradient}`}>
                <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default GradientCard;