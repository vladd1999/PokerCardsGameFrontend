import { useState, useEffect } from 'react';

const Timer = () => {

  const [seconds, setSeconds] = useState(0);

  const deadline = Date.now() + 30000;

  const getTime = (deadline: any) => {
    const time = deadline - Date.now();
    if (Math.floor((time / 1000) % 60) > -1)

      setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div >
      <p id="second">{seconds < 10 ? seconds : seconds}</p>
      <span className="text">Seconds</span>
    </div>

  );
};

export default Timer;