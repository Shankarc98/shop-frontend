import Dashboard from "../../Components/Dashboard/Dashboard"
import Footer from "../../Components/Footer/Footer"
import  "../../Components/Footer/Footer.css"
import "../../Components/Dashboard/Dashboard.css"
import "./Location.css"

function Location(){
    return <div className = "location-page">
        <Dashboard />
        <h2 className="page-title">Where to find us</h2>
        <div className = "location-container">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500387.11050943146!2d77.4748992919922!3d11.532170236730531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babe70013b8e023%3A0x423bf77f7f55105c!2sSankar%20Electronics!5e0!3m2!1sen!2sin!4v1782209627506!5m2!1sen!2sin" 
                className="map"
                width="800" 
                height="450" 
                allowFullScreen="" 
                loading="lazy" 
                title="google-map"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>

        <div className="footer-container">
            <Footer />
        </div>
    </div>
}

export default Location;