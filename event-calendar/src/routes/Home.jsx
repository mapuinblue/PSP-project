import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Clock from "../components/Clock";
import Calendars from "../components/Calendars";
import Sidebar from "../components/Sidebar";
import TodoList from "../components/TodoList";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/datecontext";

const Home = () => {
  const navigate = useNavigate();
  const { users } = useAuth();

  useEffect(() => {
    if (users.email) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate, users.email]);

  return (
    <div>
      <div className="mainContainer">
        <Sidebar />
        <div className="container">
          <div>
            <Clock />
            <TodoList />
          </div>

          <Calendars />
        </div>
      </div>
    </div>
  );
};

export default Home;
