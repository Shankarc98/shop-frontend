import Dashboard from "../../Components/Dashboard/Dashboard"
import Footer from "../../Components/Footer/Footer"
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar";
import "./AboutUs.css"
import "../../Components/Dashboard/Dashboard.css";
import "../../Components/Footer/Footer.css";
import "../../Components/MobileNavBar/MobileNavBar.css"

function AboutUs(){
    return <div className="about-us-container">
        
        <Dashboard 
            searchbox = {true}
            category = {"aboutus"}
        />
        <main className="page-content about-content">
            <div className="page-intro">
                <h1 className="page-title">About Sankar Electronics</h1>
                <p className="about-description">
                    We have been offering quality Products and Services since 1999. We remain deeply committed to bridging the gap between premium innovation and everyday affordability for our customers. We continue to be your trusted neighborhood destination for everything from daily gadgets to complex home systems.
                </p>
            </div>

            <section className="about-story">
                <div className="about-story-copy">
                    <h2>Good advice is part of the product.</h2>
                    <p>Our mission is to provide reliable, high-quality electronics at fair prices while delivering exceptional customer service. We focus on understanding our customers' needs, recommending the right products, and providing reliable support before and after every purchase.</p>
                </div>
                <img src="/images/shop/shop3.png" alt="Electronics and accessories arranged on the shop shelves" loading="lazy"/>
            </section>

            <section className="about-values">
                <div>
                    <h2>Our values</h2>
                    <p>We put our customers at the center of everything we do, listening to their needs and helping them make informed purchasing decisions. We offer products from trusted brands that meet high standards of performance, durability, and reliability. We conduct our business with honesty, transparency, and respect, building trust with every customer.</p>
                </div>
                <div>
                    <h2>Why choose us</h2>
                    <p>We strive to make every customer experience simple, reliable, and satisfying. From helping you choose the right product to providing dependable after-sales support, we are committed to quality, transparent pricing, genuine products, and professional service. Whether you're purchasing a new appliance or repairing an existing one, we aim to be your trusted electronics partner.</p>
                </div>
            </section>

            <section className="about-gallery" aria-label="Inside Sankar Electronics">
                {[
                    ["/images/shop/shop2.png", "Electronics and accessories on display"],
                    ["/images/shop/shop4.png", "DTH service signage outside the shop"],
                    ["/images/shop/shop5.png", "DTH service provider displays"],
                    ["/images/shop/shop1.png", "Sankar Electronics storefront"],
                ].map(([image, alt]) => <img key={image} src={image} alt={alt} loading="lazy"/>)}
            </section>
        </main>

        <MobileNavBar />
        <Footer />
    </div>
}

export default AboutUs;