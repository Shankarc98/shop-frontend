import Dashboard from "../../Components/Dashboard/Dashboard"
import Footer from "../../Components/Footer/Footer"
import ServiceCard from "../../Components/ServiceCard/ServiceCard"
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar"
import "../../Components/ServiceCard/ServiceCard.css"
import  "../../Components/Footer/Footer.css"
import "../../Components/Dashboard/Dashboard.css"
import "../../Components/MobileNavBar/MobileNavBar.css"
import "./Services.css"

function Services(){    
       
    return <div className = "services-page">
        <Dashboard 
            searchbox = {true}
            category = {"services"}
        />
        <main className="page-content">
            <div className="page-intro">
                <h1 className="page-title">Services that keep you connected</h1>
                <p>From repair and DTH support to hands-on technical guidance, our team is here to help.</p>
            </div>
            <div className="services-list">
                <ServiceCard image="/images/Services/repair.jpg" service="Repair Services" description="Professional repair services for TVs, speakers, home theatres, amplifiers, and other electronic devices."/>
                <ServiceCard image="/images/Services/recharge.jpg" service="DTH Services" description="Quick DTH recharge services with assistance for setup, activation, and troubleshooting."/>
                <ServiceCard image="/images/Services/guidance.jpg" service="Technical Assistance" description="Expert guidance for electronic projects, component selection, circuit troubleshooting, and technical consultation."/>
            </div>
        </main>

        <MobileNavBar />
        <Footer />
    </div>
}

export default Services;