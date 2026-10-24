import AdminHeader from "../../Components/AdminHeader/AdminHeader"
import {useState, useEffect} from "react";
import getProducts from "../../utils/helpers";
import AdminProductCard from "../../Components/AdminProductCard/AdminProductCard"
import ManageCard from "../../Components/ManageCard/ManageCard"
import "./ManageProducts.css"
import "../../Components/AdminProductCard/AdminProductCard.css"
import  "../../Components/Footer/Footer.css"
import "../../Components/Dashboard/Dashboard.css"
import "../../Components/AdminHeader/AdminHeader.css"


function ManageProducts(){
    
    const emptyProduct = {
        id: null,
        name: "",
        image: "",
        price: "",
        des1: "",
        des2: "",
        des3: "",
        category: "DTH"
    }
    const [products, setProducts] = useState([]); 
    const [card, setCard] = useState(false); 
    const [operation, setOperation] = useState("Add Product");
    const [edit, setEdit] = useState(emptyProduct);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        let active = true;
        getProducts()
            .then((items) => {
                if (active) setProducts(Array.isArray(items) ? items : []);
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
    }, []);

    async function reloadProducts() {
        setLoading(true);
        setError(false);
        try {
            const items = await getProducts();
            setProducts(Array.isArray(items) ? items : []);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const filteredProducts = products.filter((product) =>
        `${product.name} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase())
    );

    return <div className = "manage-products">

        <AdminHeader />

        {card ? <ManageCard 
            isCard = {card}
            close = {() => {setCard(false); setEdit(emptyProduct)}}
            data = {setProducts}
            edit = {edit}
            operation = {operation}
        />: null}

        <main className="admin-main">
            <div className="admin-page-heading">
                <div>
                    <h2 className="admin-title">Product catalog</h2>
                    <p>Manage the products displayed on your storefront.</p>
                </div>
                <button type="button" onClick={() => {setCard(true); setOperation("Add Product")}} className="add-button">Add product <span aria-hidden="true">+</span></button>
            </div>
            <div className="admin-toolbar">
                <label htmlFor="product-filter">Search products</label>
                <input id="product-filter" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Product name or category"/>
                <span className="admin-result-count">{filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}</span>
            </div>
            {loading && <p className="state-message" role="status">Loading products…</p>}
            {error && <div className="state-message state-error" role="alert">
                <span>Products couldn’t be loaded.</span>
                <button type="button" className="button button-secondary" onClick={reloadProducts}>Try again</button>
            </div>}
            {!loading && !error && products.length === 0 && <p className="state-message">No products yet. Add a product to get started.</p>}
            {!loading && !error && products.length > 0 && filteredProducts.length === 0 && <p className="state-message">No products match “{query}”.</p>}
            {!loading && !error && filteredProducts.length > 0 && <div className="admin-products-list">
                {filteredProducts.map((product) => (
                    <AdminProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image_url}
                        image_id={product.image_id}
                        name={product.name}
                        price={product.price}
                        des1={product.des1}
                        des2={product.des2}
                        des3={product.des3}
                        category={product.category}
                        setCard={setCard}
                        setEdit={setEdit}
                        product={product}
                        setOperation={setOperation}
                        setProducts={setProducts}
                    />
                ))}
            </div>}
        </main>

    </div>
}

export default ManageProducts; 