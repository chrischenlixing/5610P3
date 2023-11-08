
import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import "./Calender.css";

function Calender(props) {
    const [date, setDate] = useState(new Date());
    const timerID = useRef(null);

    useEffect(() => {
        timerID.current = setInterval(tick, 1000);
        return () => clearInterval(timerID.current);
    }, []);

    const tick = () => {
        setDate(new Date());
    };

    return (
        <div className="clock">
            <div className="calendar">
                <div className="calendar-date">
                    {date.toLocaleDateString()}
                </div>
                <div className="clock-time">
                    {date.toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
}

Calender.propTypes = {
    format: PropTypes.string
};

export default Calender;