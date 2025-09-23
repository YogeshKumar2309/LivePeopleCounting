import { FaFire, FaUtensils, FaChair, FaHourglassHalf } from "react-icons/fa";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [people, setPeople] = useState(50); // start from mid number
  const TOTAL_SEATS = 100;
  const availableSeats = TOTAL_SEATS - people;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPeople((prev) => {
  //       const change = Math.floor(Math.random() * 5) + 1; // 1 to 5
  //       const addOrSubtract = Math.random() > 0.5 ? 1 : -1; // 50% chance
  //       let newCount = prev + change * addOrSubtract;

  //       // clamp value between 0 and TOTAL_SEATS
  //       if (newCount < 0) newCount = 0;
  //       if (newCount > TOTAL_SEATS) newCount = TOTAL_SEATS;

  //       return newCount;
  //     });
  //   }, 100000); // every 2 seconds

  //   return () => clearInterval(interval);
  // }, []);


  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-slate-100 gap-8 mt-10">
      <h1 className="text-4xl font-bold text-gray-800 animate-fadeInDown">
        Live Dine-In Dashboard 🍽️
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        <div className="p-6 rounded-2xl text-white text-center backdrop-blur-lg shadow-lg bg-gradient-to-br from-pink-500 to-rose-600">
          <FaFire size={35} className="mx-auto" />
          <h3 className="text-2xl mt-2">Right Now!</h3>
          <p>🔥 Real-time status</p>
        </div>

        <div className="p-6 rounded-2xl text-white text-center backdrop-blur-lg shadow-lg bg-gradient-to-br from-orange-400 to-orange-600">
          <FaUtensils size={35} className="mx-auto" />
          <h3 className="text-3xl font-bold mt-2 transition-all">{people}</h3>
          <p>People dining 🍽️</p>
        </div>

        <div className="p-6 rounded-2xl text-white text-center backdrop-blur-lg shadow-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
          <FaChair size={35} className="mx-auto" />
          <h3 className="text-3xl font-bold mt-2 transition-all">{availableSeats}</h3>
          <p>Seats available 🪑</p>
        </div>

        <div className="p-6 rounded-2xl text-white text-center backdrop-blur-lg shadow-lg bg-gradient-to-br from-purple-500 to-purple-700">
          <FaHourglassHalf size={35} className="mx-auto" />
          <h3 className="text-2xl mt-2">Hurry!</h3>
          <p>⏳ Don’t miss out!</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
