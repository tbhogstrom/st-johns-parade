import { useState, useEffect } from 'react';

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set parade date to July 6th, 2024 (first Saturday in July)
    // Set parade date - ensure timezone is handled properly
    const paradeDate = new Date('2025-05-10T12:00:00-04:00'); // Eastern Time

    const timer = setInterval(() => {
      const now = new Date();
      const difference = paradeDate.getTime() - now.getTime();

      if (difference < 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="text-center px-4">
      <div className="bg-white text-primary rounded-lg shadow-lg p-3 mb-1">
        <span className="text-3xl font-bold">{value.toString().padStart(2, '0')}</span>
      </div>
      <div className="text-sm font-medium text-white">{label}</div>
    </div>
  );

  return (
    <div className="bg-primary text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Countdown to Parade Day</h2>
          <p className="text-white/80">Join us Saturday, May 10th, 2025 at 12:00 PM</p>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner;