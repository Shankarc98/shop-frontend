import AdminHeader from "../../Components/AdminHeader/AdminHeader"
import {useState, useEffect} from "react"; 
import EnquiryCard from "../../Components/EnquiryCard/EnquiryCard"
import axios from "axios";
import "./Enquiries.css";
import "../../Components/AdminHeader/AdminHeader.css";
import "../../Components/EnquiryCard/EnquiryCard.css";

function Enquiries(){
    const [enquiries, setEnquiries] = useState([]);

    useEffect(() => {

        getEnquiries(); 

    }, [])

    async function getEnquiries(){
        const url = import.meta.env.VITE_API_URL; 

        try{
            const token = JSON.parse(localStorage.getItem('token'));

            const response = await axios.get(`${url}/getEnquiries`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            
            setEnquiries(response.data);

        }catch(err){
            console.log(err.stack);
        }
    }
    return <div className="enquiries-page">

        <AdminHeader />

        <h3 className = "admin-title">Manage Queries</h3>
        <div className = "enquiry-cards-container">

            {
                enquiries ? enquiries.map(e => {
                   return <EnquiryCard 
                        key = {e.id}
                        id = {e.id}
                        name = {e.name}
                        email = {e.email}
                        subject = {e.subject}
                        message = {e.message}
                        setEnquiries = {setEnquiries}
                        getEnquiries = {getEnquiries}
                    />
                }) : null
            }
        </div>
    </div>
}

export default Enquiries; 