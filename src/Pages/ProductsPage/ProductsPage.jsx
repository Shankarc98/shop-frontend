import Dashboard from "../../Components/Dashboard/Dashboard"
import Footer from "../../Components/Footer/Footer"
import Product from "../../Components/Product/Product"
import getProducts from "../../utils/helpers"
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar"
import CategoryButton from "../../Components/CategoryButton/CategoryButton"
import {useState, useEffect} from "react"; 
import  "../../Components/Footer/Footer.css"
import "../../Components/Dashboard/Dashboard.css"
import "../../Components/Product/Product.css"
import "../../Components/MobileNavBar/MobileNavBar.css"
import "../../Components/CategoryButton/CategoryButton.css"
import "./ProductsPage.css"

function ProductsPage(){
    const[products, setProducts] = useState([]); 

    useEffect(() => {
        
        async function getData(){
            let arr = await getProducts();
            setProducts(arr);
        }
        
        getData();
    }, []);
    
    return <div className = "product-page">
        <Dashboard />

        <h2 className = "page-title">Our Products</h2>

        <div className="category-button-container">
            
            <CategoryButton buttonName = "DTH"/>
            <CategoryButton buttonName = "Speakers"/>
            <CategoryButton buttonName = "Tools"/>
            <CategoryButton buttonName = "Remotes"/>
            <CategoryButton buttonName = "Wires & Cables"/>
            <CategoryButton buttonName = "Others"/>

        </div>
        <div className = "products-container">
            {
                products.map(i => <Product 
                                key = {i.id}
                                image = {i.image_url}
                                name = {i.name}
                                price = {i.price}
                                des1 = {i.des1}
                                des2 = {i.des2}
                                des3 = {i.des3}                    
                            />)
            }
        </div>
        
        <MobileNavBar />
        <div className = "footer-container">
            <Footer />
        </div>
        
    </div>
}

export default ProductsPage; 