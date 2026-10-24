import InventoryIcon from "@mui/icons-material/Inventory";
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import InfoIcon from '@mui/icons-material/Info';
import HandymanIcon from '@mui/icons-material/Handyman';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import {NavLink} from "react-router-dom";
import "./MobileNavBar.css";

function MobileNavBar(){
    const items = [
        {label: "Home", to: "/", icon: <HomeFilledIcon/>},
        {label: "About", to: "/aboutus", icon: <InfoIcon/>},
        {label: "Products", to: "/products", icon: <InventoryIcon/>},
        {label: "Services", to: "/services", icon: <HandymanIcon/>},
        {label: "Contact", to: "/contact", icon: <ContactPageIcon/>},
        {label: "Location", to: "/location", icon: <PlaceOutlinedIcon/>},
    ];

    return <nav className="mobile-navbar" aria-label="Mobile navigation">
        {items.map((item) => (
            <NavLink
                key={item.to}
                to={item.to}
                className={({isActive}) => `mobile-nav-btn${isActive ? " is-active" : ""}`}
                aria-label={item.label}
                end={item.to === "/"}
            >
                {item.icon}
                <span className="mobile-nav-label">{item.label}</span>
            </NavLink>
        ))}
    </nav>
}

export default MobileNavBar;