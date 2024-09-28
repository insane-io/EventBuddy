
import landing from '../Assets/landing1.png'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import landdd from '../Assets/landdddd.png'

const Landing = () => {
    const [activeIndex, setActiveIndex] = useState(1); // Middle image is active by default
    const images = [
        "https://via.placeholder.com/200x300",
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/200x300"
    ];

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <>
            <div className=" p-10 items-center m-24 rounded-xl bg-[#FAF6F5]">
                <h1 className='text-8xl font-bold'>Seamless Event Planning,</h1>
                <div className='grid grid-cols-2'>
                    <div className='col-span-1'><h1 className='text-8xl font-bold'>Made Simple</h1>
                        <p className='text-[#696969] mt-9 w-1/3 mb-6 text-3xl'>Collaborate, organize, and manage your events effortlessly with Event Buddy.</p>
                        <button className='bg-red-500 text-white w-1/2 py-3 px-6 rounded-3xl'>Get Started</button>

                    </div>
                    <div className='col-span-1 p-6'>
                        <img
                            src={landing} // You can replace this with your actual image URL or file path
                            alt="Description of Image"
                            className="w-4/6 h-auto object-cover" // You can adjust these classes as needed
                        />
                    </div>

                </div>


            </div>


            <div className=' m-24'>
                <h1 className='text-8xl font-bold'>Service we Offering </h1>
                <div className="mx-24 mt-32">


                    {/* Carousel Container */}
                    <div className="relative flex justify-center items-center space-x-4">
                        {/* Left Arrow */}
                        <button onClick={handlePrev} className="absolute left-0 p-4 bg-gray-200 rounded-full">
                            ❮
                        </button>

                        {/* Image Cards */}
                        <div className="flex space-x-24 items-center justify-center">
                            {images.map((img, index) => (
                                <motion.div
                                    key={index}
                                    className={`cursor-pointer ${index === activeIndex ? 'scale-110 z-10' : 'scale-90'}`}
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: index === activeIndex ? 1.6 : 0.9 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <img
                                        src={img}
                                        alt={`Carousel ${index}`}
                                        className={`object-cover rounded-lg ${index === activeIndex ? 'h-72 w-52' : 'h-60 w-40'}`}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Right Arrow */}
                        <button onClick={handleNext} className="absolute right-0 p-4 bg-gray-200 rounded-full">
                            ❯
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-10 m-32 rounded-xl bg-[#FAF6F5]">
                <div className='grid grid-cols-3 gap-6 rounded-xl'>
                    <div className='col-span-1'>
                        <img src="https://via.placeholder.com/200x300" alt="Description of Image" className="w-full h-56  object-cover rounded-3xl" />
                    </div>
                    <div className='col-span-1'>
                        <img src="https://via.placeholder.com/200x300" alt="Description of Image" className="w-full h-56  object-cover rounded-3xl" />
                    </div>
                    <div className='col-span-1'>
                        <img src="https://via.placeholder.com/200x300" alt="Description of Image" className="w-full h-56  object-cover rounded-3xl" />
                    </div>

                </div>
                <div className='grid grid-cols-7 gap-6 rounded-xl'>
                    <div className='col-span-2 my-6'>
                        <img src="https://via.placeholder.com/200x300" alt="Description of Image" className="w-full h-56  object-cover rounded-3xl" />
                    </div>
                    <div className='col-span-3 my-6'>
                        <img src="https://via.placeholder.com/200x300" alt="Description of Image" className="w-full h-56  object-cover rounded-3xl" />
                    </div>
                    <div className='col-span-2 my-6'>
                        <img src="https://via.placeholder.com/200x300" alt="Description of Image" className="w-full h-56  object-cover rounded-3xl" />
                    </div>
                </div>


            </div>

            <div className='bg-[#F3F3F3]'>
                <div className='grid grid-cols-2 m-24'>
                    <div className='col-span-1 m-8'>
                        <h1 className='text-7xl font-bold'>Plan, Organize, and
                            <br /> Execute Events Without the Hassle
                        </h1>
                        <p className='text-[#696969] mt-9 w- mb-9 text-xl'>Event Buddy is a collaborative platform that helps you plan and manage events with ease. Whether it’s a wedding, corporate event, or birthday party, you can assign tasks, track budgets, and get real-time updates all in one place.</p>
                        <button className='bg-red-500 text-white w-1/4 py-3 px-6 rounded-3xl'>Create Events</button>

                    </div>
                    <div className='col-span-1  p-6 m-12'>
                        <img
                            src={landdd} // You can replace this with your actual image URL or file path
                            alt="Description of Image"
                            className="w-4/6 h-auto object-cover" // You can adjust these classes as needed
                        />
                    </div>
                </div>
            </div>




        </>
    )
}

export default Landing
