import Dashboard from "../../Components/Dashboard/Dashboard"
import Footer from "../../Components/Footer/Footer"
import  "../../Components/Footer/Footer.css"
import "../../Components/Dashboard/Dashboard.css"
import "./Location.css"

function Location(){
    return <div className = "location-page">
        <Dashboard 
            searchbox = {true}
            category = {"location"}
        />
        <main className="page-content">
            <div className="page-intro">
                <h1 className="page-title">Come by the shop</h1>
                <p>Find Sankar Electronics on Thambidurai Street in Attayampatti.</p>
            </div>
            <div className="location-layout">
                <div className="location-details">
                    <h2>Sankar Electronics</h2>
                    <p>Thambidurai Street<br/>Attayampatti<br/>Salem District, 637503</p>
                    <a className="button button-primary" href="https://maps.google.com/?q=Sankar+Electronics+Attayampatti" target="_blank" rel="noreferrer">Open directions</a>
                </div>
                <div className="location-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500387.11050943146!2d77.4748992919922!3d11.532170236730531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babe70013b8e023%3A0x423bf77f7f55105c!2sSankar%20Electronics!5e0!3m2!1sen!2sin!4v1782209627506!5m2!1sen!2sin"
                        className="map"
                        allowFullScreen
                        loading="lazy"
                        title="Map showing Sankar Electronics in Attayampatti"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </main>
        <Footer />
    </div>
}

export default Location;