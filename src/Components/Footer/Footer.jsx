import "./Footer.css";
import {Link} from "react-router-dom";

function Footer(){
    return <footer className="site-footer">
        <div className="footer-main">
            <div className="footer-brand">
                <img src="/images/logo.png" alt="Sankar Electronics"/>
                <p>Helpful electronics, local service, and a team ready to guide you.</p>
            </div>
            <nav className="footer-links" aria-label="Footer navigation">
                <Link to="/products">Products</Link>
                <Link to="/services">Services</Link>
                <Link to="/aboutus">About us</Link>
                <Link to="/location">Find our shop</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <p className="footer-note">A neighborhood electronics store since 1999.</p>
        </div>
        <div className="footer-bottom">
            <span>Sankar Electronics</span>
            <span>Attayampatti, Salem District</span>
        </div>
    </footer>
}

export default Footer;