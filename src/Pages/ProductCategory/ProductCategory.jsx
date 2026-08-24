import "./ProductCategory.css";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Product from "../../Components/Product/Product";
import Footer from "../../Components/Footer/Footer";
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar";
import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import "../../Components/Dashboard/Dashboard.css";
import "../../Components/Product/Product.css";
import "../../Components/Footer/Footer.css";
import "../../Components/MobileNavBar/MobileNavBar.css"

export default function ProductCategory(props){
    const navigate = useNavigate();
    const location = useLocation(); 
    const category = location?.state;
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [suggestions, setSuggestions] = useState(null);
    const [isSuggestion, setIsSuggestion] = useState(false);

    const url = import.meta.env.VITE_API_URL;

   
    async function getCategoryProducts(category){

        try{
            const response = await axios.get(`${url}/getCategoryProducts/${category.toLowerCase()}`)    
            const array = response.data;   
            setProducts(array);
            
        }
        catch(err){
            console.log(err.stack);
        }
        
    }
    useEffect(() => {        
        
        getCategoryProducts(category);         
    }, [category])
    
    

    
   

    return <div className = "product-category-page">
        <Dashboard 
            searchbox = {true}
            category = {category}            
        />
        
        <h2 className = "page-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            
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