import { useState, useEffect } from "react";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import "./Clock.scss";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const locale = es;
  const formattedDate = format(date, "EEEE, d MMMM yyyy", { locale });
  const formattedTime = format(date, "HH:mm:ss");

  return (
    <div className="box">
      <h3 className="date"> {formattedDate}</h3>
      <h1 className="hour"> {formattedTime}</h1>
    </div>
  );
};

export default Clock;
