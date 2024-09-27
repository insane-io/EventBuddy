import React, { useState } from 'react';
import { BsFillPeopleFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { MdOutlineFestival } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const Orgform = () => {
    const hello = "wedding"

    const [formData, setFormData] = useState({
        eventTitle: '',
        eventType: '',
        description: '',
        date: '',
        
        endTime: '',
        venue: '',
        budget: '',
        noOfGuests: '',
        image: null,
        contact: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // This would be replaced by your form submission logic
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-[#FAF6F5] rounded-lg m-24">
                <h1 className="p-7 text-4xl font-bold">Wedding Event</h1>

                {/* Event Title */}
                <div className="p-7">
                    <label htmlFor="eventTitle" className="block text-lg font-semibold mb-2">Event Title</label>
                    <input
                        type="text"
                        id="eventTitle"
                        name="eventTitle"
                        value={formData.eventTitle}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                        placeholder="Enter event title"
                    />
                </div>

                {/* Event Type */}
                <div className='grid grid-cols-2'>
                <div className="px-7 col-span-1">
                    <label htmlFor="contact" className="block text-lg font-semibold mb-2">Contact</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                        placeholder="Enter contact information"
                    />
                </div>
                
                </div>
                

                {/* Description */}
                <div className="p-7">
                    <label htmlFor="description" className="block text-lg font-semibold mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                        placeholder="Enter event description"
                    ></textarea>
                </div>

                {/* Date */}
                <div className='grid grid-cols-2'>
                <div className="px-7 col-span-1">
                    <label htmlFor="date" className="block text-lg font-semibold mb-2">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                    />
                </div>
                <div className="px-7 col-span-1">
                    <label htmlFor="due_date" className="block text-lg font-semibold mb-2">Due Date</label>
                    <input
                        type="date"
                        id="endTime"
                        name="endTime"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                    />
                </div>
                </div>
                {/* Venue */}
                <div className="p-7">
                    <label htmlFor="venue" className="block text-lg font-semibold mb-2">Venue</label>
                    <input
                        type="text"
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                        placeholder="Enter venue"
                    />
                </div>

                <div className='grid grid-cols-2'>
                    {/* Budget */}
                <div className="px-7 col-span-1">
                    <label htmlFor="budget" className="block text-lg font-semibold mb-2">Budget</label>
                    <input
                        type="text"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                        placeholder="Enter budget"
                    />
                </div>

                {/* Number of Guests */}
                <div className="px-7 col-span-1">
                    <label htmlFor="noOfGuests" className="block text-lg font-semibold mb-2">Number of Guests</label>
                    <input
                        type="number"
                        id="noOfGuests"
                        name="noOfGuests"
                        value={formData.noOfGuests}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                        placeholder="Enter number of guests"
                    />
                </div>
                </div>


                {/* Contact */}
                

                {/* Image Upload */}
                <div className="px-7">
                    <label htmlFor="image" className="block text-lg font-semibold mb-2">Event Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                    />
                </div>
                {hello === "wedding" ? (
                <>
                    {/* Wedding Form Fields */}
                    <div className="p-7">
                        <label htmlFor="bride_name" className="block text-lg font-semibold mb-2">Bride's Name</label>
                        <input
                            type="text"
                            id="bride_name"
                            name="bride_name"
                            value={formData.bride_name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                            placeholder="Enter bride's name"
                        />
                    </div>
                    <div className="px-7">
                        <label htmlFor="groom_name" className="block text-lg font-semibold mb-2">Groom's Name</label>
                        <input
                            type="text"
                            id="groom_name"
                            name="groom_name"
                            value={formData.groom_name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                            placeholder="Enter groom's name"
                        />
                    </div>
                    <div className="p-7">
                        <label htmlFor="theme" className="block text-lg font-semibold mb-2">Theme</label>
                        <input
                            type="text"
                            id="theme"
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                            placeholder="Enter event theme"
                        />
                    </div>
                </>
            ) : hello === "birthday" ? (
                <>
                    {/* Birthday Form Fields */}
                    <div className="px-7">
                        <label htmlFor="birthday_name" className="block text-lg font-semibold mb-2">Birthday Person's Name</label>
                        <input
                            type="text"
                            id="birthday_name"
                            name="birthday_name"
                            value={formData.birthday_name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                            placeholder="Enter birthday person's name"
                        />
                    </div>
                    <div className="px-7">
                        <label htmlFor="theme" className="block text-lg font-semibold mb-2">Theme</label>
                        <input
                            type="text"
                            id="theme"
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                            placeholder="Enter event theme"
                        />
                    </div>
                </>
            ) : hello === "culture" ? (
                <>
                    {/* Cultural Event Form Fields */}
                    <div className="px-7">
                        <label htmlFor="speakers_name" className="block text-lg font-semibold mb-2">Speakers' Names</label>
                        <input
                            type="text"
                            id="speakers_name"
                            name="speakers_name"
                            value={formData.speakers_name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                            placeholder="Enter speakers' names"
                        />
                    </div>
                    <div className="px-7">
                        <label htmlFor="host" className="block text-lg font-semibold mb-2">Host</label>
                        <input
                            type="text"
                            id="host"
                            name="host"
                            value={formData.host}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                            placeholder="Enter host's name"
                        />
                    </div>
                    <div className="px-7">
                        <label htmlFor="agenda" className="block text-lg font-semibold mb-2">Agenda</label>
                        <input
                            type="text"
                            id="agenda"
                            name="agenda"
                            value={formData.agenda}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                            placeholder="Enter event agenda"
                        />
                    </div>
                </>
            ) :  null}


                {/* Submit Button */}
                <div className="p-7">
                    <button
                        type="submit"
                        className="bg-[#FC5B5B] text-white font-semibold w-1/8 p-3 rounded-3xl hover:bg-[#e14e4e] transition-all"
                    >
                        Create Event
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Orgform;
