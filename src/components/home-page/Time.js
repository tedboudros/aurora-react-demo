import React, { useEffect, useState } from "react";

import moment from "moment";

const timeFormat = "h:mm a";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const timeCheckInterval = setInterval(() => {
      const newTime = moment();

      if (newTime.format(timeFormat) !== currentTime.format(timeFormat))
        setCurrentTime(() => newTime);
    }, 5 * 1000); // Every 10 seconds

    return () => {
      clearInterval(timeCheckInterval);
    };
  }, []);

  const formattedTime = currentTime.format(timeFormat);

  const hrs = formattedTime.split(":")[0];
  const rest = formattedTime.split(":")[1];

  return (
    <div className="time">
      {hrs}
      <span className="middle">:</span>
      {rest}
    </div>
  );
};

export default Time;
