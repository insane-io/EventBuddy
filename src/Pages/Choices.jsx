import React, { useEffect } from 'react';
import { BsFillPeopleFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { MdOutlineFestival } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const Choices = () => {


    return (
        <>
            <div className="bg-[#FAF6F5] rounded-lg m-10">
                <h1 className="text-4xl font-bold text-center pt-8 mb-9">Choose your Event Category</h1>
                <div className="grid grid-cols-4 mx-64 mb-10">
                    {[
                        { icon: BsFillPeopleFill, label: "Wedding" },
                        { icon: FaBirthdayCake, label: "Birthday" },
                        { icon: IoSchoolSharp, label: "College Fest" },
                        { icon: MdOutlineFestival, label: "Cultural Event" },
                        { icon: FiPlusCircle, label: "Custom Event" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{
                                scale: 1.05,
                                borderColor: "#E57373",
                                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                            }}
                            className="bg-[#F8E0E0] rounded-lg cursor-pointer m-2 flex flex-col items-center border-2 border-transparent"
                        >
                            <item.icon className="text-6xl mt-4" />
                            <h1 className="text-2xl font-normal text-center pt-2 mb-9">{item.label}</h1>
                        </motion.div>
                    ))}
                </div>
                <div>
                    <h1 className="text-2xl text-[#6F6F6F] font-thin text-center pt-2 pb-9">
                        Start planning the perfect event by selecting a category that matches your occasion.
                    </h1>
                </div>
            </div>
        </>
    );
}

export default Choices;
