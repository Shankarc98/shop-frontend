import Dashboard from "../../Components/Dashboard/Dashboard"
import Carousel from "../../Components/Carousel/Carousel"
import Discover from "../../Components/Discover/Discover"
import Product from "../../Components/Product/Product"
import Footer from "../../Components/Footer/Footer"
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar"
import {useNavigate} from "react-router-dom"
import {useEffect, useRef, useState} from "react"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import getProducts from "../../utils/helpers.js";
import CategoryButton from "../../Components/CategoryButton/CategoryButton";
import "./Home.css";
import "../../Components/Dashboard/Dashboard.css";
import "../../Components/Carousel/Carousel.css";
import "../../Components/Discover/Discover.css";
import "../../Components/Product/Product.css";
import "../../Components/Footer/Footer.css";
import "../../Components/MobileNavBar/MobileNavBar.css"

function Home(){
    
    const navigate = useNavigate(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const productSliderRef = useRef(null);
    const [sliderPosition, setSliderPosition] = useState({canScrollPrevious: false, canScrollNext: false});

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

    async function retryProducts() {
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

    useEffect(() => {
        const slider = productSliderRef.current;
        if (!slider) return undefined;

        function updateSliderPosition() {
            setSliderPosition({
                canScrollPrevious: slider.scrollLeft > 0,
                canScrollNext: slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1,
            });
        }

        updateSliderPosition();
        slider.addEventListener("scroll", updateSliderPosition, {passive: true});
        window.addEventListener("resize", updateSliderPosition);

        return () => {
            slider.removeEventListener("scroll", updateSliderPosition);
            window.removeEventListener("resize", updateSliderPosition);
        };
    }, [products]);

    function scrollProducts(direction) {
        const slider = productSliderRef.current;
        if (!slider) return;

        const productCard = slider.querySelector(".product-card");
        const gap = Number.parseFloat(window.getComputedStyle(slider).columnGap) || 0;
        const scrollDistance = productCard ? productCard.getBoundingClientRect().width + gap : slider.clientWidth;
        slider.scrollBy({left: direction * scrollDistance, behavior: "smooth"});
    }
    
    return <div className="home">
    <Dashboard 
        searchbox = {true}
        category = {"home"}
    />
    <Carousel />
    <main className="home-content">
        <section className="home-categories">
            <div className="section-heading">
                <h2>Find your next essential</h2>
                <p>Browse the categories available at Sankar Electronics.</p>
            </div>
            <div className="category-button-container">
                {["DTH", "Speakers", "Tools", "Remotes", "Wires & Cables", "Others"].map((category) => (
                    <CategoryButton key={category} buttonName={category}/>
                ))}
            </div>
        </section>

        <section className="discover-section" aria-labelledby="discover-heading">
            <div className="section-heading">
                <h2 id="discover-heading">More than a shop</h2>
                <p>Product help, reliable service, and a friendly place to start.</p>
            </div>
            <div className="discover-card">
                <Discover handleClick={() => navigate("/products")} title="Explore products" image="/images/Discover/discoverproduct.jpg"/>
                <Discover handleClick={() => navigate("/services")} title="Repair & services" image="/images/Discover/discoverservices.jpg"/>
                <Discover handleClick={() => navigate("/contact")} title="Talk to our team" image="/images/Discover/discovercontact.jpg"/>
            </div>
        </section>

        <section className="product-container" aria-labelledby="featured-products-heading">
            <div className="section-heading section-heading-row">
                <div>
                    <h2 id="featured-products-heading">From the product counter</h2>
                    <p>Browse the current catalog.</p>
                </div>
                <div className="product-slider-actions">
                    <div className="product-slider-controls" role="group" aria-label="Featured product navigation">
                        <button
                            type="button"
                            className="product-slider-control"
                            aria-label="Previous products"
                            onClick={() => scrollProducts(-1)}
                            disabled={!sliderPosition.canScrollPrevious}
                        >
                            <ChevronLeftIcon aria-hidden="true"/>
                        </button>
                        <button
                            type="button"
                            className="product-slider-control"
                            aria-label="Next products"
                            onClick={() => scrollProducts(1)}
                            disabled={!sliderPosition.canScrollNext}
                        >
                            <ChevronRightIcon aria-hidden="true"/>
                        </button>
                    </div>
                    <button type="button" className="text-link" onClick={() => navigate("/products")}>View all products <span aria-hidden="true">→</span></button>
                </div>
            </div>
            {loading && <p className="state-message" role="status">Loading products…</p>}
            {error && <div className="state-message state-error" role="alert">
                <span>Products couldn’t be loaded. Check your connection and try again.</span>
                <button type="button" className="button button-secondary" onClick={retryProducts}>Try again</button>
            </div>}
            {!loading && !error && products.length === 0 && <p className="state-message">No products are available right now.</p>}
            {!loading && !error && products.length > 0 && <div className="home-card-container home-card-slider">
                <div className="home-product-slider" ref={productSliderRef} role="region" aria-label="Featured products" tabIndex={0}>
                    {products.map((product) => (
                        <Product
                            key={product.id}
                            image={product.image_url}
                            name={product.name}
                            price={product.price}
                            des1={product.des1}
                            des2={product.des2}
                            des3={product.des3}
                        />
                    ))}
                </div>
            </div>}
        </section>
    </main>

    <MobileNavBar />

    <Footer />
    
  </div>
}

export default Home; 