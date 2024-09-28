import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../Axios/axios";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

Chart.register(...registerables);
const localizer = momentLocalizer(moment);

const DashBoard = () => {
  const [page, setPage] = useState("Tasks");
  const [form, setForm] = useState(false);
  const [check, setCheck] = useState(false);
  const { id } = useParams();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assigned_to: '',
    assignedName: '',
    start_date: '',
    end_date: '',
    priority: '',
    status: '',
    event: id
  });
  const [dummyCollaborators, setDummyCollaborators] = useState([]);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [filteredCollaborators, setFilteredCollaborators] = useState([]);
  const collaboratorRef = useRef(null);
  const [tableData, setTableData] = useState([]);

  const events = [
    {
      title: 'Wedding Ceremony',
      start: new Date(2024, 8, 1, 10, 0), // September 1, 2024, 10:00 AM
      end: new Date(2024, 8, 1, 12, 0),   // September 1, 2024, 12:00 PM
    },
    {
      title: 'Reception Party',
      start: new Date(2024, 8, 3, 13, 0), // September 3, 2024, 1:00 PM
      end: new Date(2024, 8, 3, 14, 0),   // September 3, 2024, 2:00 PM
    },
  ];

  useEffect(() => {
    async function getStaff() {
      try {
        const res = await axiosInstance.get("http://127.0.0.1:8000/event/get_all_staff/");
        setDummyCollaborators(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStaff();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collaboratorRef.current && !collaboratorRef.current.contains(event.target)) {
        setShowCollaborators(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });

    if (name === 'assignedName') {
      filterCollaborators(value);
    }
  };

  const filterCollaborators = (searchTerm) => {
    const filtered = dummyCollaborators.filter(collaborator =>
      collaborator.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collaborator.user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCollaborators(filtered);
    setShowCollaborators(true);
  };
  const handleCollaboratorSelect = (collaborator) => {
    setTaskData({
      ...taskData,
      assigned_to: collaborator.user.id,
      assignedName: `${collaborator.user.first_name} ${collaborator.user.last_name}`
    });
    console.log(collaborator.id)
    setShowCollaborators(false)
  };

  const handleFormSubmit = async () => {
    console.log("Form Submitted with Data:", taskData);
    try {
      const res = await axiosInstance.post('event/create_tasks/', taskData)
      // console.log(res.data);
      setCheck(!check)
    } catch (error) {
      console.error(error)
    }
    setTaskData({
      title: '',
      description: '',
      assigned_to: '',
      assignedName: '',
      start_date: '',
      end_date: '',
      priority: '',
      status: ''
    });
    setForm(false);
  };

  useEffect(() => {
    async function getData() {
      try {
        const res = await axiosInstance.get(`event/get_task_org/?event_id=${id}`);
        setTableData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [check]);

  console.log(dummyCollaborators)
  const [vendors, setVendors] = useState([])

  useEffect(()=>{
    async function getData(){
      try {
        const res = await axiosInstance.get('event/get_all_vendors/')
        setVendors(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  },[])

  // const vendors = [
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     type: 'Caterer',
  //     brand: 'Gourmet Catering',
  //     product: 'Wedding Buffet',
  //     budget: '$5000',
  //     contact: '123-456-7890'
  //   },
  //   {
  //     id: 2,
  //     name: 'Sarah Smith',
  //     type: 'Photographer',
  //     brand: 'Perfect Clicks',
  //     product: 'Wedding Photography',
  //     budget: '$2000',
  //     contact: '098-765-4321'
  //   },
  //   {
  //     id: 3,
  //     name: 'Michael Johnson',
  //     type: 'Florist',
  //     brand: 'Bloom Masters',
  //     product: 'Floral Decorations',
  //     budget: '$1500',
  //     contact: '321-654-9870'
  //   },
  //   // Add more vendors as needed
  // ];

  const [searchQuery, setSearchQuery] = useState('');

  // Filter vendors based on search query
  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [statistics, setStatistics] = useState(null);  // State to hold fetched statistics data

  // Fetch event statistics dynamically
  useEffect(() => {
    async function getStatistics() {
      try {
        const res = await axiosInstance.get(`http://127.0.0.1:8000/event/get_statistics/?event_id=${id}`);
        setStatistics(res.data);
        console.log(res.data);  // Log the fetched data for debugging
      } catch (error) {
        console.error(error);
      }
    }
    getStatistics();
  }, [id]);

  // Display a loading message until data is fetched
  if (!statistics) {
    return <div>Loading...</div>;
  }

  // Extracting task details and budget data from the fetched API data
  const taskDetails = statistics.task_details || [];
  const totalExpected = statistics.total_expected_budget || 0;
  const totalActual = statistics.total_actual_budget || 0;

  // Bar chart data for tasks (Expected vs. Actual budgets)
  const taskChartData = {
    labels: taskDetails.map(task => task.title),  // Assuming task title is stored in 'title'
    datasets: [
      {
        label: 'Expected Budget',
        data: taskDetails.map(task => task.expected_budget),  // Expected budget data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Actual Budget',
        data: taskDetails.map(task => task.actual_budget),  // Actual budget data
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data for total budgets
  const totalChartData = {
    labels: ['Total Budget'],
    datasets: [
      {
        label: 'Total Expected Budget',
        data: [totalExpected],  // Total expected budget
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Actual Budget',
        data: [totalActual],  // Total actual budget
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options for better visualization
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Tasks',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
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
      <div className='p-3 w-full flex flex-col px-10 overflow-y-auto '>
        <h1 className='text-4xl font-bold my-5'>Wedding </h1>
        {page === "Tasks" ? (
          <>
            <div className='w-full justify-start'>
              <button onClick={() => setForm(!form)} className='w-32 p-3 rounded-lg my-3 bg-[#FFCBBE]'>Add Task</button>
            </div>
            {form && (
              <>
                <div className='flex flex-col items-center w-full gap-y-2 my-4'>
                  <div className='flex justify-start w-full gap-20 '>
                    <h1 className='w-1/12 text-xl'>Title</h1>
                    <input
                      type="text"
                      name="title"
                      value={taskData.title}
                      onChange={handleInputChange}
                      className='border-2 w-full h-10 px-3 rounded-md'
                      placeholder='Enter Task Name '
                    />
                  </div>
                  <div className='flex justify-start w-full gap-20 '>
                    <h1 className='w-1/12 text-xl'>Sub Title</h1>
                    <textarea
                      name="description"
                      value={taskData.description}
                      onChange={handleInputChange}
                      className='border-2 w-full rounded-md px-3'
                      placeholder='Enter Description of the work'
                    />
                  </div>
                  <div className='flex justify-start w-full gap-20 relative' ref={collaboratorRef}>
                    <h1 className='w-1/12 text-xl'>Assigned</h1>
                    <div className='w-full'>
                      <input
                        type="text"
                        name="assignedName"
                        value={taskData.assignedName}
                        onChange={handleInputChange}
                        onFocus={() => setShowCollaborators(true)}
                        className='border-2 w-full h-10 px-3 rounded-md'
                        placeholder='Search for collaborators'
                      />
                      {showCollaborators && filteredCollaborators.length > 0 && (
                        <div className='absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1'>
                          <ul className='max-h-40 overflow-y-auto'>
                            {filteredCollaborators.map(collaborator => (
                              <li
                                key={collaborator.id}
                                onClick={() => handleCollaboratorSelect(collaborator)}
                                className='p-2 hover:bg-gray-100 cursor-pointer'
                              >
                                {collaborator.user.first_name} {collaborator.user.last_name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='flex justify-start w-full gap-20 '>
                    <h1 className='w-1/12 text-xl'>Start</h1>
                    <input
                      type="date"
                      name="start_date"
                      value={taskData.start_date}
                      onChange={handleInputChange}
                      className='border-2 w-full h-10 px-3 rounded-md'
                    />
                  </div>
                  <div className='flex justify-start w-full gap-20 '>
                    <h1 className='w-1/12 text-xl'>End</h1>
                    <input
                      type="date"
                      name="end_date"
                      value={taskData.end_date}
                      onChange={handleInputChange}
                      className='border-2 w-full h-10 px-3 rounded-md'
                    />
                  </div>
                  <div className="flex justify-start w-full gap-20 items-center">
                    <label className="block text-gray-700 text-sm w-1/12 font-bold mb-2">Priority</label>
                    <div className="flex items-center">
                      <input
                        className="mr-2"
                        type="radio"
                        id="highPriority"
                        name="priority"
                        value="high"
                        checked={taskData.priority === 'high'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="highPriority" className="mr-4">High</label>
                      <input
                        className="mr-2"
                        type="radio"
                        id="mediumPriority"
                        name="priority"
                        value="medium"
                        checked={taskData.priority === 'medium'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="mediumPriority" className="mr-4">Medium</label>
                      <input
                        className="mr-2"
                        type="radio"
                        id="lowPriority"
                        name="priority"
                        value="low"
                        checked={taskData.priority === 'low'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="lowPriority">Low</label>
                    </div>
                    <div className='flex items-center gap-5'>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                      <div className="flex items-center">
                        <input
                          className="mr-2"
                          type="radio"
                          id="statusNew"
                          name="status"
                          value="new"
                          checked={taskData.status === 'new'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="statusNew" className="mr-4">New</label>
                        <input
                          className="mr-2"
                          type="radio"
                          id="statusInProgress"
                          name="status"
                          value="inProgress"
                          checked={taskData.status === 'inProgress'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="statusInProgress" className="mr-4">In Progress</label>
                        <input
                          className="mr-2"
                          type="radio"
                          id="statusCompleted"
                          name="status"
                          value="completed"
                          checked={taskData.status === 'completed'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="statusCompleted">Completed</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-5 my-5">
                    <button onClick={() => setForm(false)} className="bg-blue-500 rounded-lg text-white w-20 py-3 hover:bg-blue-600">Cancel</button>
                    <button onClick={handleFormSubmit} className="bg-green-500 rounded-lg text-white w-20 py-3 hover:bg-green-600">Save</button>
                  </div>
                </div>
              </>
            )}
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Priority</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Due Date</th>
                  <th className="px-4 py-2 border">Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((d, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 border">{d.id}</td>
                    <td className="px-4 py-2 border">{d.title}</td>
                    <td className="px-4 py-2 border">
                      <span className="text-white bg-blue-500 py-1 px-2 rounded">{d.priority}</span>
                    </td>
                    <td className="px-4 py-2 border">{d.status}</td>
                    <td className="px-4 py-2 border">{d.end_date}</td>
                    <td className="px-4 py-2 border">{d.assigned_to.user.first_name} {d.assigned_to.user.last_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : page === "Expense Tracker" ? (
          <div className="bg-[#FAF6F5] p-7 rounded-3xl">
            <h1 className="text-4xl font-bold mb-4">Expense Tracker</h1>
            <div className='grid grid-cols-2 gap-8'>
              <div className='col-span-1'>
                {/* Bar Chart for Individual Tasks */}
                <h2 className="text-2xl font-normal my-4">Estimated vs. Real Budget for Tasks</h2>
                <div className="w-full md:w-full h-80 mb-4">
                  <Bar data={taskChartData} options={options} />
                </div>
              </div>
              <div className='col-span-1'>
                {/* Total Budget Bar Chart */}
                <h2 className="text-2xl font-normal my-4">Total Estimated vs. Real Budget</h2>
                <div className="w-full md:w-full h-80 mb-4">
                  <Bar data={totalChartData} options={options} />
                </div>
              </div>
            </div>

            {/* Task List */}
            <h2 className="text-2xl font-normal my-4">Task List</h2>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Expected Budget</th>
                  <th className="border border-gray-300 px-4 py-2">Actual Budget</th>
                </tr>
              </thead>
              <tbody>
                {taskDetails.map(task => (
                  <tr key={task.task_id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                    <td className="border border-gray-300 px-4 py-2">₹{task.expected_budget.toLocaleString()}</td>
                    <td className="border border-gray-300 px-4 py-2">₹{task.actual_budget.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {statistics && (
              <div className="mt-6 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold">Savings / Over-Expenditure</h2>
                <p className="text-lg mt-2">
                  {statistics.total_actual_budget < statistics.total_expected_budget ? (
                    <>
                      You saved: <span className="font-bold">₹{(statistics.total_expected_budget - statistics.total_actual_budget).toLocaleString()}</span>
                    </>
                  ) : (
                    <>
                      Over-expenditure: <span className="font-bold">₹{(statistics.total_actual_budget - statistics.total_expected_budget).toLocaleString()}</span>
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Over/Under Budget Indicator */}
            {/* You can add additional indicators here if needed */}
          </div>

        ) : page === "Vendors" ? (
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-8">Vendors</h1>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Vendor by Name..."
              className="mb-6 p-3 w-full rounded-lg border border-gray-300"
            />

            {/* Vendor List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map(vendor => (
                <div key={vendor.id} className="bg-white p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-2">{vendor.name}</h2>
                  <p className="text-gray-600 mb-1"><strong>Vendor Type:</strong> {vendor.type}</p>
                  <p className="text-gray-600 mb-1"><strong>Brand Name:</strong> {vendor.brand}</p>
                  <p className="text-gray-600 mb-1"><strong>Product:</strong> {vendor.product}</p>
                  <p className="text-gray-600 mb-1"><strong>Budget:</strong> {vendor.budget}</p>
                  <p className="text-gray-600 mb-1"><strong>Contact No:</strong> {vendor.contact}</p>
                </div>
              ))}
            </div>

            {/* No results found */}
            {filteredVendors.length === 0 && (
              <p className="text-center text-gray-500 mt-8">No vendors found with the name "{searchQuery}".</p>
            )}
          </div>
        ) : page === "Calendar" ? (
          <div>
            <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()}
          style={{ height: '80vh' }}  // Adjust calendar height
        />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashBoard;