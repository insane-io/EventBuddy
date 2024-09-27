import React, { useState } from 'react';

const Mytasks = () => {
    const [isDone, setIsDone] = useState(false); // Initial state is not done

    const handleButtonClick = () => {
        // Set state to true when the button is clicked
        setIsDone(true); // Mark task as done
    };

    return (
        <>
            <div className="bg-[#FAF6F5] rounded-xl m-24 p-7">
                <h1 className="text-4xl font-bold mb-8">My Tasks</h1>
                <div className="justify-start bg-[#FAF6F5]">
                    <div className="bg-[#FDEBE9] rounded-xl shadow-lg p-7 flex flex-col md:flex-row mx-24 justify-between">
                        <div className="flex-1 flex flex-col md:flex-row justify-start items-start">
                            {/* Image Banner */}
                            <div className="md:w-58 h-48 rounded-xl overflow-hidden">
                                <img
                                    src="https://via.placeholder.com/400x200" // Replace with actual image
                                    alt="Event Banner"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="mx-6">
                                <h2 className="text-3xl font-bold">Event Title</h2>
                                <p className="text-gray-600 text-2xl">Task Title</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end w-40 md:w-48 ml-auto">
                            {/* Due Date */}
                            <div className="text-right">
                                <p className="text-gray-500 text-xl">Due Date</p>
                                <p className=" font-semibold text-3xl">Dec 31, 2024</p>
                            </div>
                            {/* Budget */}
                            <div className="text-right mt-4">
                                <p className="text-gray-500 text-xl">Budget</p>
                                <p className="  text-2xl font-bold">$500</p>
                            </div>
                            {/* Button for Status */}
                            <div className="mt-4">
                                <button
                                    onClick={handleButtonClick}
                                    className={`py-2 px-4 rounded-lg text-black ${isDone ? 'bg-green-100' : 'bg-blue-500'}`}
                                    disabled={isDone} // Disable button if task is done
                                >
                                    {isDone ? '✅ Done' : 'Mark as Done'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mytasks;
