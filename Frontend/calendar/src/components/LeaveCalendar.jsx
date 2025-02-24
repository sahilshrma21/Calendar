import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import "../styles.css"; // Import CSS

const LeaveCalendar = () => {
  const [leaveDates, setLeaveDates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/leaves")
      .then((res) => setLeaveDates(res.data.map(leave => new Date(leave.date))))
      .catch((err) => console.error("Error fetching leaves", err));
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === "month" && leaveDates.some(d => d.toDateString() === date.toDateString())) {
      return "react-calendar__tile--leave"; // Apply custom CSS class
    }
  };

  return (
    <div className="calendar-container">
      <h2>Leave Calendar</h2>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default LeaveCalendar;
