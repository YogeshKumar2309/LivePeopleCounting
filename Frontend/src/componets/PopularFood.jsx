import styles from "./PopularFood.module.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";

const PopularFood = ({ item }) => {
  if (!item) return null; // Prevent rendering if item is undefined

  const discountPercent = item?.price
    ? Math.round(((item.price - item.offerPrice) / item.price) * 100)
    : 0;

  return (
    <div className={`card ${styles.myImgWrapper}`}>
      <div
        className={styles.myImg}
        style={{ backgroundImage: `url(${item?.img || ""})` }}
      >
        {item?.badge && <span className={styles.badgeTag}>{item.badge}</span>}
      </div>
      <div className={styles.glassCardBody}>
        <div>
          <h5 className="fw-bold fs-4 mb-2">{item?.title || "No Title"}</h5>
          <p className="text-muted small mb-2">{item?.desc || "No Description"}</p>
          <div className="d-flex align-items-center gap-2 mb-2">
            {item?.category && (
              <span className="badge bg-secondary">{item.category}</span>
            )}
            {item?.rating && (
              <span className="text-warning d-flex align-items-center gap-1">
                <FaStar /> {item.rating}
              </span>
            )}
          </div>
        </div>
        <div>
          <p className="d-flex align-items-center justify-content-between">
            <span>
              <LiaRupeeSignSolid />{" "}
              <del className="text-muted">{item?.price || "-"}</del>{" "}
              <span className="fw-semibold text-dark">
                {item?.offerPrice || "-"}
              </span>
            </span>
            {discountPercent > 0 && (
              <span className={`px-2 py-1 ${styles.discountBadge}`}>
                {discountPercent}% OFF
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularFood;
