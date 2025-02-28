import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

const thoughts = [
  "Stay positive, work hard, make it happen! 💪",
  "Every day is a fresh start. 🌅",
  "Believe in yourself and all that you are. ✨",
  "Success is the sum of small efforts, repeated daily. 🔄",
  "The only way to do great work is to love what you do. ❤️"
];

const getRandomThought = () => thoughts[Math.floor(Math.random() * thoughts.length)];

const SchoolCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [event, setEvent] = useState(null);
  const [leave, setLeave] = useState(null);
  const [events, setEvents] = useState({});
  const [leaves, setLeaves] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      fetchData(selectedDate);
    }
  }, [selectedDate]);

  const fetchData = async (date) => {
    if (!date) {
      console.error("Selected date is undefined");
      return;
    }

    setLoading(true);
    try {
      const formattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

      console.log("Fetching data for:", formattedDate);

      const response = await axios.get(`http://localhost:5000/details/${formattedDate}`);

      console.log("Response data:", response.data);

      setEvent(response.data.event || null);
      setLeave(response.data.leave || null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setEvent(null);
      setLeave(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    if (!date) {
      console.error("handleDateChange: Selected date is undefined");
      return;
    }

    console.log("Selected Date:", date);
    setSelectedDate(date);
    fetchData(date);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate("/admin")}
        className="self-end mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Admin
      </button>
      <div className="flex space-x-6">
        {/* Calendar Component */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={({ date }) => {
              const formattedDate = date.toISOString().split("T")[0];
              console.log("Rendering Tile for:", formattedDate);
              return events[formattedDate] ? (
                <p className="text-blue-500 text-xs">Event</p>
              ) : leaves[formattedDate] ? (
                <p className="text-red-500 text-xs">Leave</p>
              ) : null;
            }}
          />
        </div>

        {/* Description Box */}
        <div className="w-64 p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Details</h3>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : event ? (
            <div className="mt-2">
              <h4 className="text-xl font-bold text-blue-500">{event.title}</h4>
              <p className="text-gray-600">{event.description}</p>
            </div>
          ) : leave ? (
            <div className="mt-2">
              <h4 className="text-xl font-bold text-red-500">Leave: {leave.name}</h4>
              <p className="text-gray-600">{leave.reason}</p>
            </div>
          ) : (
            <p className="text-gray-400 mt-2">💡 Thought of the day: {getRandomThought()}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolCalendar;
