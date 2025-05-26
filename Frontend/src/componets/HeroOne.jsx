import styles from "./HeroOne.module.css";

const HeroOne = () => {
  return (
    <div className={`${styles.heroOne} d-flex align-items-center justify-content-center`}>
      <h1 className={`${styles.title} text-center`}>
        Bringing <span style={{ color: "#ff9800" }}>Happiness</span> to Your <span style={{ color: "#667eea" }}>Plate</span>
      </h1>
    </div>
  );
};

export default HeroOne;
