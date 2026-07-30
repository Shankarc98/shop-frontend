import InventoryIcon from "@mui/icons-material/Inventory";
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import InfoIcon from '@mui/icons-material/Info';
import HandymanIcon from '@mui/icons-material/Handyman';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {useNavigate} from "react-router-dom";
import "./MobileNavBar.css";

function MobileNavBar(){

    const navigate = useNavigate(); 

    return <div className = "mobile-navbar">

        <div className = "mobile-nav-btn"  onClick = {() => navigate("/")} >
            <HomeFilledIcon /> 
            <p className = "mobile-nav-label">Home</p>
        </div>

        <div className = "mobile-nav-btn" onClick = {() => navigate("/aboutus")}>
            <InfoIcon />
            <p className = "mobile-nav-label">About Us</p>
        </div>

        <div className = "mobile-nav-btn" onClick = {() => navigate("/products")}>
            <InventoryIcon />   
            <p className = "mobile-nav-label">Products</p>
        </div>

        <div className = "mobile-nav-btn" onClick = {() => navigate("/services")}>
            <HandymanIcon />
            <p className = "mobile-nav-label">Services</p>
        </div>

        <div className = "mobile-nav-btn" onClick = {() => navigate("/contact")}>
            <ContactPageIcon />
            <p className = "mobile-nav-label">Contact Us</p>
        </div>
    </div>
}

export default MobileNavBar;