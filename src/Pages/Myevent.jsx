import React from 'react';
import { motion } from 'framer-motion';

const EventCards = () => {
    return (
        <>
            <div className="bg-[#FAF6F5]  rounded-xl m-24 p-7">
                <h1 className="text-4xl font-bold mb-8">My Event</h1>

                {/* Card Grid */}
                <div className="grid grid-cols-3 gap-24 mx-24 mb-8 "  >
                    {/* Card 1 */}
                    <motion.div className="bg-[#FDEBE9] rounded-3xl shadow-lg p-6" whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Event 1"
                            className="w-full h-40 object-cover mb-4 rounded-xl"
                        />
                        <h2 className="text-2xl font-bold mb-2">Event 1</h2>
                        <p className="text-gray-700 mb-4">Start Date</p>
                        <p className="text-gray-700 mb-4">End Date</p>

                        {/* Wrap button in a flex container to align it to the right */}
                        <div className="flex justify-end">
                            <div 
                                className="text-[#1EA012] font-bold text-2xl px-4 py-2 rounded-3xl cursor-pointer">
                                Budget
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    );
}

export default EventCards;
