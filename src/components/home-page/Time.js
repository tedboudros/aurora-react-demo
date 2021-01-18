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
    }, 10 * 1000); // Every 10 seconds

    return () => {
      clearInterval(timeCheckInterval);
    };
  }, []);

  return <span>{currentTime.format(timeFormat)}</span>;
};

export default Time;
