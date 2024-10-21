import Calendar from "react-calendar";

import { useAuth } from "../context/datecontext";

import { Calendar3 } from "react-bootstrap-icons";
import List from "./List";
import "react-calendar/dist/Calendar.css";
import "./Calendars.scss";

const Calendars = () => {
  const { todos, setDate } = useAuth();

  const onDate = (value) => {
    setDate(value.toLocaleDateString());
  };

  return (
    <div className="calendarbox">
      <Calendar className="calendar" onChange={onDate} />
      <div className="events">
        <p className="title-event">
          Eventos <Calendar3 />
        </p>

        <List todos={todos} />
      </div>
    </div>
  );
};

export default Calendars;
