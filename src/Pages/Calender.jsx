import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar styles

const localizer = momentLocalizer(moment);

const Calender = () => {
  // Example events data
  const events = [
    {
      title: 'Meeting with Client',
      start: new Date(2024, 8, 1, 10, 0), // September 1, 2024, 10:00 AM
      end: new Date(2024, 8, 1, 12, 0),   // September 1, 2024, 12:00 PM
    },
    {
      title: 'Lunch Break',
      start: new Date(2024, 8, 3, 13, 0), // September 3, 2024, 1:00 PM
      end: new Date(2024, 8, 3, 14, 0),   // September 3, 2024, 2:00 PM
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Calendar</h1>
      <div className="h-screen bg-white rounded-lg shadow-lg">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()}
          style={{ height: '80vh' }}  // Adjust calendar height
        />
      </div>
    </div>
  );
};

export default Calender;
