import React, { useState } from 'react'

const Notification = () => {

    const [notification, setNotification] = useState(
        [
            { title: "Invite Link", type: "invitation", isSeen: false },
            { title: "You have been assigned a task!", type: "normal", isSeen: false },
            { title: "Invite Link", type: "invitation", isSeen: true, status: "accepted" },
            { title: "Invite Link", type: "invitation", isSeen: true, status: "declined" },
            { title: "You have been assigned a task!", type: "normal", isSeen: true },
        ]
    )

    return (
        <div className='flex justify-center'>
            <div className='my-16 flex flex-col bg-[#FAF6F5] w-6/12 rounded-xl h-auto p-6'>
                <h1 className='text-4xl mb-5'>Notifications</h1>
                {
                    notification.map((d, i) => (
                        d.type === "normal" ? (
                            <div key={i} className={`${d.isSeen ? "bg-white" : "bg-blue-300"} p-5 border-2 my-1 rounded-xl font-semibold`}>
                                <h1 className=''>{d.title}</h1>
                            </div>
                        ) : (
                            <div key={i} className={`${d.isSeen ? "bg-white" : "bg-blue-300"} ${d.status === "accepted" ? "border-green-400" : d.status === "declined" ? "border-red-400" : null} p-5 flex justify-between my-1 items-center border-2 rounded-xl font-semibold`}>
                                <h1 className=''>{d.title}</h1>
                                {
                                    d.isSeen ? (
                                        <h1 className={d.status === "accepted" ? "text-green-400" : "text-red-400"}>{d.status}</h1>
                                    ) : (
                                        <div>
                                            <button className='mx-5 rounded-full size-5'>❌</button>
                                            <button className='mx-5 rounded-full size-5'>✅</button>
                                        </div>
                                    )
                                }

                            </div>
                        )
                    ))
                }
            </div>
        </div>
    )
}

export default Notification
