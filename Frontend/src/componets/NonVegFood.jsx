import PopularFood from "./PopularFood";
import styles from "./VegFood.module.css";

const VegFood = () => {
  return (
    <>
      <center>
        <h1 style={{
          color: "#667eea",
          fontWeight: "700",
          margin: "2rem 0",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
        }}>
          🥦 Vegetarian Food
        </h1>
      </center>
      <div className={`${styles.myContainer} d-flex flex-wrap justify-content-center gap-4 px-4`}>
        <PopularFood />
        <PopularFood />
        <PopularFood />
        <PopularFood />
        <PopularFood />
        <PopularFood />
      </div>
    </>
  );
};

export default VegFood;
