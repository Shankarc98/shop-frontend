import "./ProductCategory.css";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Product from "../../Components/Product/Product";
import Footer from "../../Components/Footer/Footer";
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar";
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import "../../Components/Dashboard/Dashboard.css";
import "../../Components/Product/Product.css";
import "../../Components/Footer/Footer.css";
import "../../Components/MobileNavBar/MobileNavBar.css"

export default function ProductCategory(){

    const location = useLocation(); 
    const category = location.state;    
    const [products, setProducts] = useState([]);
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function getCategoryProducts(){

            try{
                const response = await axios.get(`${url}/getCategoryProducts/${category.toLowerCase()}`)    
                console.log("response:", response);                
                setProducts(response.data);
            }
            catch(err){
                console.log(err.stack);
            }
            
        }

        getCategoryProducts();         
    }, [])
    

    return <div className = "product-category-page">
        <Dashboard />
        
        <h2 className = "page-title">{category}</h2>
            
        <div className = "category-products-container">
            {
                products.map(p => {
                    return <Product 
                        key = {p.id}                
                        image = {p.image_url}
                        price = {p.price}
                        name = {p.name}
                        des1 = {p.des1}
                        des2 = {p.des2}
                        des3 = {p.des3}
                        />
                })
            }
        </div>
        
        <MobileNavBar/>

        <div className = "footer-container">
            <Footer/>
        </div>
        
    </div>
}