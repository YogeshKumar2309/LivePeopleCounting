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

      <div className={`${styles.myContainer} container`}>
        <div className="row g-4">
          <div className="col-md-4 d-flex justify-content-center">
            <PopularFood />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <PopularFood />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <PopularFood />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <PopularFood />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <PopularFood />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <PopularFood />
          </div>
        </div>
      </div>
    </>
  );
};

export default VegFood;
