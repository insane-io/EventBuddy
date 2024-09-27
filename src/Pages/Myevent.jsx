import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from "../Axios/axios"
import { Link } from 'react-router-dom';

const EventCards = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                const res = await axiosInstance.get("event/get_event/")
                console.log(res.data)
                setData(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        getData()
    }, [])

    return (
        <>
            <div className="bg-[#FAF6F5]  rounded-xl m-10 p-7">
                <h1 className="text-4xl font-bold mb-8">My Event</h1>
                <div className="grid grid-cols-3 gap-24 mx-24 mb-8 "  >
                    {
                        data.map((d) => (
                            <Link to={`/role/dashboard/${d.id}`}>
                                <motion.div className="bg-[#FDEBE9] rounded-3xl shadow-lg p-6" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                                    <img
                                        src={`${d.image}`}
                                        alt="Event 1"
                                        className="w-full h-40 object-cover mb-4 rounded-xl"
                                    />
                                    <h2 className="text-2xl font-bold mb-2">{d.title}</h2>
                                    <p className="text-gray-700 mb-4">Start Date: {d.date}, {d.start_time}</p>
                                    {d.end_time === null ? (<></>) : (<p className="text-gray-700 mb-4">End Time: {d.end_date}</p>)}
                                    <div className="flex justify-end">
                                        <div
                                            className="text-[#1EA012] font-bold text-2xl px-4 py-2 rounded-3xl">
                                            ₹ {d.budget}
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    }


                </div>
            </div>
        </>
    );
}

export default EventCards;
