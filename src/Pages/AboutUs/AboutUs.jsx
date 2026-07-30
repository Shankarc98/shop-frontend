import Dashboard from "../../Components/Dashboard/Dashboard"
import Footer from "../../Components/Footer/Footer"
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar";
import "./AboutUs.css"
import "../../Components/Dashboard/Dashboard.css";
import "../../Components/Footer/Footer.css";
import "../../Components/MobileNavBar/MobileNavBar.css"

function AboutUs(){
    return <div className="about-us-container">
        
        <Dashboard />
        <h2 className = "page-title">About Us</h2>

        <p className = "about-description">
            We have been offering quality Products and Services since 1999. 
            We remain deeply committed to bridging the gap between premium innovation and everyday affordability for our customers. 
            We continue to be your trusted neighborhood destination for everything from daily gadgets to complex home systems
        </p>

        <div className = "about-card">
            <h3 className = "about-title">Our Mission & Approach</h3>
            <p className = "about-card-description">
            Our mission is to provide reliable, high-quality electronics at fair prices 
            while delivering exceptional customer service. We focus on understanding our customers' needs, recommending the right products,
            and providing reliable support before and after every purchase.
            </p>
        </div>

        <div className = "about-card">
            <h3 className = "about-title" >Our Values</h3>
            <p className = "about-card-description">
            We put our customers at the center of everything we do,
            listening to their needs and helping them make informed purchasing decisions.
            We offer products from trusted brands that meet high standards of performance, durability, and reliability.
            We conduct our business with honesty, transparency, and respect, building trust with every customer.
            </p>
        </div>

        <div className = "about-card">
            <h3 className = "about-title">Our Mission & Approach</h3>
            <p className = "about-card-description">
            Our mission is to provide reliable, high-quality electronics at fair prices 
            while delivering exceptional customer service. We focus on understanding our customers' needs, recommending the right products,
            and providing reliable support before and after every purchase.
            </p>
        </div>

        <div className = "about-image-container">
            <img className = "shop-images" src = "/images/shop/shop2.jpg" alt = "shop"/>
            <img className = "shop-images" src = "/images/shop/shop4.jpg" alt = "shop"/>
            <img className = "shop-images" src = "/images/shop/shop3.jpg" alt = "shop"/>
            <img className = "shop-images" src = "/images/shop/shop5.jpg" alt = "shop"/>
            <img className = "shop-images" src = "/images/shop/shop1.jpg" alt = "shop"/>
        </div>

        <MobileNavBar />
        <div className="footer-container">
            <Footer />
        </div>
    </div>
}

export default AboutUs;