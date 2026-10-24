import "./ProductCategory.css";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Product from "../../Components/Product/Product";
import Footer from "../../Components/Footer/Footer";
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar";
import {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import "../../Components/Dashboard/Dashboard.css";
import "../../Components/Product/Product.css";
import "../../Components/Footer/Footer.css";
import "../../Components/MobileNavBar/MobileNavBar.css"

export default function ProductCategory(){
    const location = useLocation(); 
    const category = typeof location.state === "string" ? location.state : "";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(Boolean(category));
    const [error, setError] = useState(false);

    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!category) return undefined;
        let active = true;
        axios.get(`${url}/getCategoryProducts/${category.toLowerCase()}`)
            .then((response) => {
                if (active) setProducts(Array.isArray(response.data) ? response.data : []);
            })
            .catch(() => {
                if (active) setError(true);
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, [category, url]);

    const title = category ? `${category.charAt(0).toUpperCase()}${category.slice(1)}` : "Choose a category";

    return <div className = "product-category-page">
        <Dashboard 
            searchbox = {true}
            category = {category || "products"}
        />
        <main className="page-content">
            <div className="page-intro">
                <h1 className="page-title">{title}</h1>
                <p>{category ? `Products listed in ${category}.` : "Start with the full product catalog."}</p>
            </div>
            {!category && <p className="state-message">Choose a category from <Link to="/products">all products</Link>.</p>}
            {loading && <p className="state-message" role="status">Loading products…</p>}
            {error && <p className="state-message state-error" role="alert">Products couldn’t be loaded. Please try again shortly.</p>}
            {!loading && !error && category && products.length === 0 && <p className="state-message">No products are listed in this category right now.</p>}
            {!loading && !error && products.length > 0 && <div className="category-products-container">
                {products.map((product) => (
                    <Product
                        key={product.id}
                        image={product.image_url}
                        price={product.price}
                        name={product.name}
                        des1={product.des1}
                        des2={product.des2}
                        des3={product.des3}
                    />
                ))}
            </div>}
        </main>
        
        <MobileNavBar/>
        <Footer/>
        
    </div>
}