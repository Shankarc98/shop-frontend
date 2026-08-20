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

export default function ProductCategory(){
    const navigate = useNavigate();
    const location = useLocation(); 
    const category = location?.state;
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    const url = import.meta.env.VITE_API_URL;

    console.log("top of productcategory - location.state: ", location.state, "category: ", category);
   
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
    
    useEffect(() => {

        if(!searchTerm.trim()){
            getCategoryProducts(category);
            return 
        }
        const timer = setTimeout(() => {
            searchProducts(searchTerm);                 

        }, 500);

        return () => clearTimeout(timer);

    }, [searchTerm, category])

    async function searchProducts(searchTerm){
                
        const api = `${url}/searchProducts?q=${encodeURIComponent(searchTerm)}&currentCategory=${encodeURIComponent(category.toLowerCase())}`;
        const response = await fetch(api);
        const body = await response.json();
        
        console.log("body from productcategory",body);
        if(body.products.length !== 0 && !body.redirect){
            setProducts(body.products);
        }
        else if(body.products.length !== 0 && body.redirect){
            console.log("redirecting to new page"); 
            navigate("/productCategory",{
                state : body.category
            });
        }


    }

    return <div className = "product-category-page">
        <Dashboard 
            searchbox = {true}
            category = {category}
            setSearchTerm = {setSearchTerm}
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