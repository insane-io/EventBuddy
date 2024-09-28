import React, { useState, useEffect } from 'react';
import axiosInstance from "../Axios/axios"

const Mytasks = () => {
    const [data, setData] = useState([])

    const handleButtonClick = async (id) => {
        const res = await axiosInstance.post("/event/staff_task/", { task_id: id, status: "completed" })
    };

    useEffect(() => {
        async function getData() {
            try {
                const res = await axiosInstance.get('event/get_task_staff/')
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [handleButtonClick])

    return (
        <>
            <div className="bg-[#FAF6F5] rounded-xl m-24 p-7">
                <h1 className="text-4xl font-bold mb-8">My Tasks</h1>
                <div className="justify-start bg-[#FAF6F5]">
                    {
                        data.map((d, i) => (
                            <div key={i} className="bg-[#FDEBE9] my-6 rounded-xl shadow-lg p-7 flex flex-col md:flex-row mx-24 justify-between">
                                <div className="flex-1 flex flex-col md:flex-row justify-start items-start">
                                    <div className="md:w-58 h-48 rounded-xl overflow-hidden">
                                        <img
                                            src="https://via.placeholder.com/400x200"
                                            alt="Event Banner"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="mx-6">
                                        <h2 className="text-3xl font-bold">{d.event.title}</h2>
                                        <p className="text-gray-600 text-2xl">{d.title}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end w-40 md:w-48 ml-auto">
                                    <div className="text-right">
                                        <p className="text-gray-500 text-xl">Due Date</p>
                                        <p className=" font-semibold text-3xl">{d.end_date}</p>
                                    </div>
                                    <div className="text-right mt-4">
                                        <p className="text-gray-500 text-xl">Event Budget</p>
                                        <p className="  text-2xl font-bold">₹ {d.event.budget}</p>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => handleButtonClick(d.id)} disabled={d.status === "completed"}
                                            className={`py-2 px-4 rounded-lg text-black ${d.status === "completed" ? 'bg-green-100' : 'bg-blue-500'}`}
                                        >{d.status === "completed" ? "Completed" : "Mark As Done"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    );
};

export default Mytasks;
