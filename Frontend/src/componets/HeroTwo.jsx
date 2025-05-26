import { FaFire, FaUtensils, FaChair, FaHourglassHalf } from "react-icons/fa";
import styles from "./HeroTwo.module.css";
import { useEffect, useState } from "react";

const HeroTwo = () => {
  const [people, setPeople] = useState(0);
  const TOTAL_SEATS = 100;
  const availableSeats = TOTAL_SEATS - people;

  useEffect(() => {
    const fetchPeople = () => {
      fetch("/api/live-people")
        .then((res) => res.json())
        .then((data) => {
          setPeople(data.people || 0);
        })
        .catch((err) => console.error("API Error:", err));
    };

    fetchPeople(); // call once on mount

    const interval = setInterval(() => {
      fetchPeople(); // call every 5 seconds
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heroTwo}>
      <h1 className={styles.mainHeading}>Live Dine-In Dashboard 🍽️</h1>
      <div className={styles.gridContainer}>
        <div className={`${styles.card} ${styles.gradientRed}`}>
          <FaFire size={35} />
          <h3>Right Now!</h3>
          <p>🔥 Real-time status</p>
        </div>

        <div className={`${styles.card} ${styles.gradientOrange}`}>
          <FaUtensils size={35} />
          <h3 className={styles.counter}>{people}</h3>
          <p>People dining 🍽️</p>
        </div>

        <div className={`${styles.card} ${styles.gradientGreen}`}>
          <FaChair size={35} />
          <h3 className={styles.counter}>{availableSeats}</h3>
          <p>Seats available 🪑</p>
        </div>

        <div className={`${styles.card} ${styles.gradientPurple}`}>
          <FaHourglassHalf size={35} />
          <h3>Hurry!</h3>
          <p>⏳ Don’t miss out!</p>
        </div>
      </div>
    </div>
  );
};

export default HeroTwo;
