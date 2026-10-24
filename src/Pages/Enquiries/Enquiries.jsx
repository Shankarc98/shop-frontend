import AdminHeader from "../../Components/AdminHeader/AdminHeader"
import {useState, useEffect} from "react"; 
import EnquiryCard from "../../Components/EnquiryCard/EnquiryCard"
import axios from "axios";
import "./Enquiries.css";
import "../../Components/AdminHeader/AdminHeader.css";
import "../../Components/EnquiryCard/EnquiryCard.css";

function Enquiries(){
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [query, setQuery] = useState("");

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
            
            setEnquiries(Array.isArray(response.data) ? response.data : []);
            setError(false);

        }catch{
            setError(true);
        } finally {
            setLoading(false);
        }
    }
    const filteredEnquiries = enquiries.filter((enquiry) =>
        `${enquiry.name} ${enquiry.email} ${enquiry.subject} ${enquiry.message}`
            .toLowerCase()
            .includes(query.trim().toLowerCase())
    );
    return <div className="enquiries-page">

        <AdminHeader />

        <main className="admin-main">
            <div className="admin-page-heading">
                <div>
                    <h2 className="admin-title">Customer enquiries</h2>
                    <p>Read and manage messages sent through the contact form.</p>
                </div>
            </div>
            <div className="admin-toolbar">
                <label htmlFor="enquiry-filter">Search enquiries</label>
                <input id="enquiry-filter" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, email, or message"/>
                <span className="admin-result-count">{filteredEnquiries.length} {filteredEnquiries.length === 1 ? "enquiry" : "enquiries"}</span>
            </div>
            {loading && <p className="state-message" role="status">Loading enquiries…</p>}
            {error && <div className="state-message state-error" role="alert">
                <span>Enquiries couldn’t be loaded.</span>
                <button type="button" className="button button-secondary" onClick={() => {setLoading(true); getEnquiries();}}>Try again</button>
            </div>}
            {!loading && !error && enquiries.length === 0 && <p className="state-message">There are no enquiries to review.</p>}
            {!loading && !error && enquiries.length > 0 && filteredEnquiries.length === 0 && <p className="state-message">No enquiries match “{query}”.</p>}
            {!loading && !error && filteredEnquiries.length > 0 && <div className="enquiry-cards-container">
                {filteredEnquiries.map((enquiry) => (
                    <EnquiryCard
                        key={enquiry.id}
                        id={enquiry.id}
                        name={enquiry.name}
                        email={enquiry.email}
                        subject={enquiry.subject}
                        message={enquiry.message}
                        setEnquiries={setEnquiries}
                        getEnquiries={getEnquiries}
                    />
                ))}
            </div>}
        </main>
    </div>
}

export default Enquiries; 