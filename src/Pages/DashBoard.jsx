import React, { useState } from 'react';

const DashBoard = () => {
  const [page, setPage] = useState("Tasks");

  return (
    <div className='h-[38.45rem] flex'>
      <div className='w-2/12 flex flex-col items-center h-full bg-[#FFE8E2]'>
        <h1 className='text-3xl text-[#EC525C] border-b-2 flex justify-center w-full mt-5 pb-5'>DashBoard</h1>
        <div className='gap-3 flex flex-col mt-6'>
          <button onClick={() => setPage("Tasks")} className={`py-4 rounded-2xl text-xl ${page === "Tasks" ? "bg-[#FFCBBE]" : ""} hover:bg-[#FFCBBE] w-52`}>Tasks</button>
          <button onClick={() => setPage("Expense Tracker")} className={`py-4 w-52 rounded-2xl ${page === "Expense Tracker" ? "bg-[#FFCBBE]" : ""} text-xl hover:bg-[#FFCBBE]`}>Expense Tracker</button>
          <button onClick={() => setPage("Vendors")} className={`py-4 w-52 rounded-2xl text-xl ${page === "Vendors" ? "bg-[#FFCBBE]" : ""} hover:bg-[#FFCBBE]`}>Vendors</button>
          <button onClick={() => setPage("Calendar")} className={`py-4 w-52 rounded-2xl text-xl ${page === "Calendar" ? "bg-[#FFCBBE]" : ""} hover:bg-[#FFCBBE]`}>Calendar</button>
        </div>
      </div>
      <div className='p-3 w-10/12 flex flex-col items-center'>
        <h1 className='text-2xl font-semibold my-5'>Wedding </h1>
        {
          page === "Tasks" ? (
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Priority</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Due Date</th>
                  <th className="px-4 py-2 border">Assigned To</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">1</td>
                  <td className="px-4 py-2 border">Chat Modal App</td>
                  <td className="px-4 py-2 border">
                    <span className="text-white bg-blue-500 py-1 px-2 rounded">High</span>
                  </td>
                  <td className="px-4 py-2 border">New</td>
                  <td className="px-4 py-2 border">2020-11-05</td>
                  <td className="px-4 py-2 border">Mostafa</td>
                  <td className="px-4 py-2 border">
                    <button className="text-blue-500 hover:underline mr-2">✏️</button>
                    <button className="text-red-500 hover:underline">🗑️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : page === "Expense Tracker" ? (
            <div className='flex flex-col items-center'>
              <h1>Expense Tracker</h1>
              <img src="https://www.jaspersoft.com/content/dam/jaspersoft/images/graphics/infographics/pie-chart-example.svg" alt="" />
            </div>
          ) : page === "Vendors" ? (
            <div>
              <h1>Vendors</h1>
            </div>
          ) : page === "Calendar" ? (
            <div>
              <h1>Calendar</h1>
            </div>
          ) : null
        }

      </div>
    </div>
  );
};

export default DashBoard;
