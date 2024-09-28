import axios from 'axios';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../Axios/axios';
import { h1 } from 'framer-motion/client';

const Mytasks = () => {
    const [data, setData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [vendors, setVendors] = useState([]);
    const [check, setCheck] = useState(false);
    const [selectedVendors, setSelectedVendors] = useState({});

    useEffect(() => {
        async function getvendors() {
            try {
                const res = await axios.get("http://127.0.0.1:8000/event/get_all_vendors/");
                setVendors(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        getvendors();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const res = await axiosInstance.get('event/get_task_staff/');
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [check]);

    const handleAdd = (taskId, vendorId) => {
        setSelectedVendors(prev => ({ ...prev, [taskId]: vendorId }));
        closeModal();
    };

    const filteredVendors = vendors.filter(vendor =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleButtonClick = async (id) => {
        const vendorId = selectedVendors[id];
        if (!vendorId) {
            alert("Please select a vendor before marking the task as completed.");
            return;
        }
        const res = await axiosInstance.post("/event/staff_task/", { task_id: id, status: "completed", vendor_id: vendorId });
        setCheck(!check);
    };

    const handleSelectVendorClick = (task) => {
        setSelectedTask(task);
    };

    const closeModal = () => {
        setSelectedTask(null);
    };

    return (
        <>
            <div className="bg-[#FAF6F5] rounded-xl m-24 p-7">
                <h1 className="text-4xl font-bold mb-8">My Tasks</h1>
                <div className="justify-start bg-[#FAF6F5]">
                    {data.map((d, i) => (
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
                                    <button
                                        onClick={() => handleSelectVendorClick(d)}
                                        className="text-gray-600 bg-[#fdb2a0] p-3 rounded-lg mt-4 text-2xl"
                                        disabled={d.status === "completed"}
                                    >
                                        {d.status === "completed" ? (<h1>Selected</h1>) : (<h1>Select Vendor</h1>)}
                                    </button>
                                    {selectedVendors[d.id] && (
                                        <h1 className='text-xl mt-5 font-semibold'>
                                            {vendors.find(v => v.id === selectedVendors[d.id])?.name}
                                        </h1>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col items-end w-40 md:w-48 ml-auto">
                                <div className="text-right">
                                    <p className="text-gray-500 text-xl">Due Date</p>
                                    <p className="font-semibold text-3xl">{d.end_date}</p>
                                </div>
                                <div className="text-right mt-4">
                                    <p className="text-gray-500 text-xl">Event Budget</p>
                                    <p className="text-2xl font-bold">₹ {d.event.budget}</p>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleButtonClick(d.id)}
                                        disabled={d.status === "completed"}
                                        className={`py-2 px-4 rounded-lg text-black ${d.status === "completed" ? 'bg-green-100' : 'bg-blue-500'}`}
                                    >
                                        {d.status === "completed" ? "Completed" : "Mark As Done"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-4xl my-8">
                        <h2 className="text-2xl font-bold mb-4">Select A Vendor for <span className='underline underline-offset-2'>{selectedTask.event.title}</span></h2>
                        <div className="max-h-[calc(100vh-240px)] overflow-y-auto">
                            <h1 className="text-4xl font-bold mb-4">Vendors</h1>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Vendor by Name..."
                                className="mb-6 p-3 w-full rounded-lg border border-gray-300"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredVendors.map(vendor => (
                                    <div key={vendor.id} className="bg-white p-6 rounded-xl shadow-lg">
                                        <h2 className="text-2xl font-bold mb-2">{vendor.name}</h2>
                                        <p className="text-gray-600 mb-1"><strong>Vendor Type:</strong> {vendor.vendor_type}</p>
                                        <p className="text-gray-600 mb-1"><strong>Brand Name:</strong> {vendor.brand}</p>
                                        <p className="text-gray-600 mb-1"><strong>Budget:</strong> {vendor.budget}</p>
                                        <p className="text-gray-600 mb-1"><strong>Contact No:</strong> {vendor.contact}</p>
                                        <button onClick={() => handleAdd(selectedTask.id, vendor.id)} className="mt-4 py-2 px-4 bg-[#FFCBBE] text-white rounded-lg">Add</button>
                                    </div>
                                ))}
                            </div>
                            {filteredVendors.length === 0 && (
                                <p className="text-center text-gray-500 mt-8">No vendors found with the name "{searchQuery}".</p>
                            )}
                        </div>
                        <button
                            onClick={closeModal}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Mytasks;