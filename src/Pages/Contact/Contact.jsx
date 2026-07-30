import Dashboard from "../../Components/Dashboard/Dashboard";
import Footer from "../../Components/Footer/Footer"
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar";
import {useState} from "react"; 
import axios from "axios";
import "./Contact.css";
import "../../Components/Dashboard/Dashboard.css";
import "../../Components/MobileNavBar/MobileNavBar.css"
import "../../Components/Footer/Footer.css";

function Contact(){
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState(null);
    const [subject, setSubject] = useState(null);
    const [message, setMessage] = useState(null);


    function handleName(event){
        setName(event.target.value);
    }
    function handleEmail(event){
        setEmail(event.target.value);
    }
    function handleSubject(event){
        setSubject(event.target.value);
    }
    function handleMessage(event){
        setMessage(event.target.value);
    }

    async function submitEnquiry(){
        const url = import.meta.env.VITE_API_URL; 

        const body = {
            name : name,
            email : email,
            subject : subject,
            message : message
        }
        await axios.post(`${url}/sendEnquiry`, body);

    }
    return <div className="contact-page">
        <Dashboard />
        
        <h2 className = "page-title">Contact Us</h2>

        <div className="contact-container">
            
            <div className = "opening-hrs-container">
                <h4>Opening Hours</h4>
                <p className = "contact-field">Sunday to Friday</p>
                <p className = "contact-field">9:00 a.m too 8:00 p.m</p>
                <p className = "contact-field">+91 9894257279</p>
            </div>

            <div className = "address-container">
                <h4>Address</h4>
                <p className = "contact-field">Sankar Electronics</p>
                <p className = "contact-field">Thambidurai Street</p>
                <p className = "contact-field">Attayampatti</p>
                <p className = "contact-field">Salem District</p>
                <p className = "contact-field">637503</p>
            </div>

            <div className = "email-container">
                <h4>E-Mail</h4>
                <p className = "contact-field">shansunthi@gmail.com</p>
            </div>

            <form onSubmit = {submitEnquiry} className = "message-container">
                <p className = "message-description">Send your query, we will contact you soon <br/> * Required fields</p>
                <input onChange = {handleName} className = "name-input message-field message" type = "text" placeholder="Name *" value = {name}></input>
                <input onChange = {handleEmail}className = "email-input message-field message" type = "text" placeholder="Email *" value = {email}></input>
                <input onChange = {handleSubject} className = "subject-input message-field message" type = "text" placeholder="Subject" value = {subject}></input>
                <input onChange = {handleMessage} className = "message-input message-field message" type = "text" placeholder="Message" value = {message}></input>
                <input className = "submit-message" type = "submit"/>
            </form>
        </div>

        <MobileNavBar />
        <div className="footer-container">
            <Footer />
        </div>
    </div> 
}

export default Contact; 