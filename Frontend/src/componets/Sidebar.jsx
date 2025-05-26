import styles from "./Sidebar.module.css";

const Sidebar = ({ selectedTab, vegSelected }) => {
  const handleClick = (tab) => (e) => {
    e.preventDefault();
    vegSelected(selectedTab === tab ? '' : tab); // Toggle functionality
  };

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-4 ${styles.mySidbar}`}
      style={{
        width: "15vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        boxShadow: "2px 0 15px rgba(0,0,0,0.2)",
      }}
    >
      <a
        href="#"
        className="d-flex align-items-center mb-4 text-white text-decoration-none"
      >
        <svg className="bi pe-none me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4 fw-bold">🍰 Desserts Menu</span>
      </a>
      <hr className="border-light" />

      <ul className="nav nav-pills flex-column gap-2">
        <li>
          <a
            href="#"
            className={`nav-link ${selectedTab === 'desserts' ? 'active' : ''} text-white`}
            onClick={handleClick('desserts')}
            style={{
              background: selectedTab === 'desserts' ? "rgba(255, 214, 0, 0.25)" : "transparent",
              transition: "all 0.3s ease",
            }}
          >
            Western & Bakery Desserts
          </a>
          {selectedTab === 'desserts' && (
            <ul className="mt-2 ps-3">
              <li className="text-white mb-2">🍰 Cakes & Pastries</li>
              <li className="text-white mb-2">🍦 Ice Creams & Frozen Desserts</li>
              <li className="text-white mb-2">🍮 Custards & Puddings</li>
              <li className="text-white mb-2">🍩 Fried Desserts</li>
              <li className="text-white mb-2">🥧 Pies & Tarts</li>
              <li className="text-white mb-2">🍪 Cookies & Confections</li>
            </ul>
          )}
        </li>
      </ul>

      <hr className="border-light" />
      <p className="text-center text-white small">Made with ❤️ by Yogesh</p>
    </div>
  );
};

export default Sidebar;
