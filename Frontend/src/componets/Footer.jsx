import { FaInstagram } from "react-icons/fa";
import { MdOutlineFacebook } from "react-icons/md";
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={`myCenterFooter ${styles.myFoter}`} style={{ background: "linear-gradient(90deg, #667eea, #764ba2)", color: "#fff" }}>
      <div className="container myFooter">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-2 border-top border-light">
          <div className="col-md-4 d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-white text-decoration-none lh-1 fw-bold fs-5">
              YogeshWebDev
            </a>
            <span className="mb-3 mb-md-0 text-white-50">© 2025 YogeshWebDev, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex gap-3">
            <li>
              <a className="text-white-50 fs-4" href="#">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a className="text-white-50 fs-4" href="#">
                <MdOutlineFacebook />
              </a>
            </li>
            <li>
              <a className="text-white-50 fs-4" href="#">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#facebook"></use>
                </svg>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
