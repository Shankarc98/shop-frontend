import Dashboard from "../../Components/Dashboard/Dashboard"
import Footer from "../../Components/Footer/Footer"
import ServiceCard from "../../Components/ServiceCard/ServiceCard"
import "../../Components/ServiceCard/ServiceCard.css"
import  "../../Components/Footer/Footer.css"
import "../../Components/Dashboard/Dashboard.css"
import "./Services.css"

function Services(){    
       
    return <div className = "services-page">
        <Dashboard />

        <h2 className = "page-title">Our Services</h2>

        <ServiceCard image = "/images/Services/repair.jpg" service = "Repair Services" description = "Professional repair services for TVs, speakers, home theatres, amplifiers, and other electronic devices."/>
        <ServiceCard image = "/images/Services/recharge.jpg" service = "DTH Services" description = "Quick DTH recharge services with assistance for setup, activation, and troubleshooting."/>
        <ServiceCard image = "/images/Services/guidance.jpg" service = "Technical Assistance" description = "Expert guidance for electronic projects, component selection, circuit troubleshooting, and technical consultation."/>

        <div className = "footer-container">
            <Footer />
        </div>
    </div>
}

export default Services;