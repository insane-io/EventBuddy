import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from "../Axios/axios"

const Orgform = () => {
    const location = useLocation()
    const [value, setvalue] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        setvalue(location.state.value)
        console.log("value",value)
    }, [])

    const [formData, setFormData] = useState({
        title: '',
        event_type: location.state.value,
        description: '',
        date: '',
        endTime: '',
        venue: '',
        budget: '',
        no_of_guests: '',
        image: null,
        contact: '',
        organiser: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const res = await axiosInstance.post("event/create_event/", formData)
        navigate("/myevent")
    };

    console.log("value",value)

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-[#FAF6F5] rounded-lg mx-24 mt-12">
                <h1 className="p-7 text-4xl font-bold">Wedding Event</h1>

                {/* Event Title */}
                <div className="p-7">
                    <label htmlFor="title" className="block text-lg font-semibold mb-2">Event Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
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
                        <label htmlFor="no_of_guests" className="block text-lg font-semibold mb-2">Number of Guests</label>
                        <input
                            type="number"
                            id="no_of_guests"
                            name="no_of_guests"
                            value={formData.no_of_guests}
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
                {value === "wedding" ? (
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
                ) : value === "birthday" ? (
                    <>
                        {/* Birthday Form Fields */}
                        <div className="px-7">
                            <label htmlFor="bd_person" className="block text-lg font-semibold mb-2">Birthday Person's Name</label>
                            <input
                                type="text"
                                id="bd_person"
                                name="bd_person"
                                value={formData.bd_person}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                                placeholder="Enter birthday person's name"
                            />
                        </div>
                        <div className="px-7">
                            <label htmlFor="age" className="block text-lg font-semibold mb-2">Age</label>
                            <input
                                type="text"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                                placeholder="Enter Age"
                            />
                        </div>
                    </>
                ) : value === "culture" ? (
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
                ) : value === "fest" ? (
                    <>
                        <div className="px-7">
                            <label htmlFor="fest_name" className="block text-lg font-semibold mb-2">Fest Name</label>
                            <input
                                type="text"
                                id="fest_name"
                                name="fest_name"
                                value={formData.fest_name}
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
                                placeholder="Enter event Theme"
                            />
                        </div>
                        <div className="px-7">
                            <label htmlFor="college_name" className="block text-lg font-semibold mb-2">College name</label>
                            <input
                                type="text"
                                id="college_name"
                                name="college_name"
                                value={formData.college_name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5B5B]"
                                placeholder="Enter College Name"
                            />
                        </div>
                    </>) : value === "custom" ?
                    (<></>) : null}


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
