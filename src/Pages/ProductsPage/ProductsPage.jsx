import Dashboard from "../../Components/Dashboard/Dashboard"
import Footer from "../../Components/Footer/Footer"
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar"
import CategoryButton from "../../Components/CategoryButton/CategoryButton"
import  "../../Components/Footer/Footer.css"
import "../../Components/Dashboard/Dashboard.css"
import "../../Components/MobileNavBar/MobileNavBar.css"
import "../../Components/CategoryButton/CategoryButton.css"
import "./ProductsPage.css"

function ProductsPage(){
    return <div className = "product-page">
        <Dashboard 
            searchbox = {true}
            category = {"products"}
        />

        <main className="page-content">
        <div className="page-intro">
            <h1 className="page-title">Our Products</h1>
            <p>Browse the shelves by category, or search for a product by name.</p>
        </div>

        <div className="category-button-container">
            {["DTH", "Speakers", "Tools", "Remotes", "Wires & Cables", "Others"].map((category) => (
                <CategoryButton key={category} buttonName={category}/>
            ))}
        </div>
        </main>
        <MobileNavBar />
        <Footer />
        
    </div>
}

export default ProductsPage; 