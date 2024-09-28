import React from 'react';
import { motion } from 'framer-motion';
import wedding from '../Assets/wedding2.jpg';

const Orglanding = () => {
    return (
        <>
            <div className="flex justify-center items-center m-24 rounded-xl bg-[#FAF6F5]">
                <div className="  flex flex-col md:flex-row p-10">
                    <div className="md:w-2/3">
                        <h1 className="text-7xl font-bold mb-4">Welcome
                            <br />to Event Buddy!</h1>
                        <p className="text-[#696969y] w-1/2 mb-6">
                            Planning your next event has never been easier. Whether you're organizing a wedding, corporate event, or a fun get-together, Event Buddy is here to guide you through each step of the process.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-500 text-white py-3 px-6 rounded-lg"
                        >
                            Create Your Event
                        </motion.button>
                    </div>

                    <div className="md:w-1/3 mt-6 md:mt-0 md:ml-8">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="overflow-hidden rounded-lg"
                        >
                            <img
                                src={wedding}
                                alt="Wedding Couple"
                                className="object-cover w-full  "
                            />



                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orglanding