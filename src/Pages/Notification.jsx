import React, { useEffect, useState } from 'react'
import axiosInstance from "../Axios/axios"
import { useNavigate } from 'react-router-dom'

const Notification = () => {

    const [notification, setNotification] = useState([])
    const navigate = useNavigate()

    const handleNotification = async(id) => {
        try {
            await axiosInstance.post('event/is_seen/', {id})
            navigate("/mytasks")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        async function getData(){
            try {
                const res = await axiosInstance.get('event/get_all_notifications/')
                setNotification(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    },[handleNotification])

    return (
        <div className='flex justify-center'>
            <div className='my-16 flex flex-col bg-[#FAF6F5] w-6/12 rounded-xl h-auto p-6'>
                <h1 className='text-4xl mb-5'>Notifications</h1>
                {
                    [...notification].reverse().map((d, i) => (
                        <div onClick={()=>handleNotification(d?.id)} key={i} className={`${d.is_seen? "bg-white" : "bg-blue-200"} cursor-pointer p-5 border-2 my-1 rounded-xl font-semibold flex justify-between`}>
                            <h1 className=''>{d.title}</h1>
                            {d.is_seen ? (<></>) : (<h1 className='size-5 rounded-full bg-blue-700'></h1>) }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Notification
