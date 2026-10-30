import "./ProductCategory.css";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Product from "../../Components/Product/Product";
import Footer from "../../Components/Footer/Footer";
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar";
import {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import getProducts from "../../utils/helpers";
import "../../Components/Dashboard/Dashboard.css";
import "../../Components/Product/Product.css";
import "../../Components/Footer/Footer.css";
import "../../Components/MobileNavBar/MobileNavBar.css"

export default function ProductCategory(){
    const location = useLocation(); 
    const category = typeof location.state === "string" ? location.state : "";
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(false);
    const [loading, setLoading] = useState(Boolean(category));
    const [error, setError] = useState(false);

    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        let active = true;
        getProducts()
            .then((items) => {
                if (!active) return;
                const uniqueCategories = new Map();
                for (const product of Array.isArray(items) ? items : []) {
                    if (typeof product.category !== "string" || !product.category.trim()) continue;
                    const value = product.category.trim();
                    uniqueCategories.set(value.toLowerCase(), value);
                }
                setCategories([...uniqueCategories.values()].sort((left, right) => left.localeCompare(right)));
            })
            .catch(() => {
                if (active) setCategoriesError(true);
            })
            .finally(() => {
                if (active) setCategoriesLoading(false);
            });
        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        if (!category) return undefined;
        let active = true;
        axios.get(`${url}/getCategoryProducts/${encodeURIComponent(category)}`)
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
            <nav className="product-category-tabs" aria-label="Product categories">
                {categoriesLoading && <p className="product-category-tabs-state" role="status">Loading categories…</p>}
                {categoriesError && <p className="product-category-tabs-state" role="alert">Categories couldn’t be loaded.</p>}
                {!categoriesLoading && !categoriesError && categories.length === 0 && (
                    <p className="product-category-tabs-state">No categories are available right now.</p>
                )}
                {!categoriesLoading && !categoriesError && categories.length > 0 && (
                    <div className="product-category-tabs-list">
                        {categories.map((item) => {
                            const isCurrentCategory = item.toLowerCase() === category.trim().toLowerCase();
                            return (
                                <Link
                                    key={item}
                                    className={`product-category-tab${isCurrentCategory ? " product-category-tab-active" : ""}`}
                                    to="/productCategory"
                                    state={item}
                                    aria-current={isCurrentCategory ? "page" : undefined}
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>
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