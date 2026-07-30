import Dashboard from "../../Components/Dashboard/Dashboard"
import Carousel from "../../Components/Carousel/Carousel"
import Discover from "../../Components/Discover/Discover"
import Product from "../../Components/Product/Product"
import Footer from "../../Components/Footer/Footer"
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar"
import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import "./Home.css";
import "../../Components/Dashboard/Dashboard.css";
import "../../Components/Carousel/Carousel.css";
import "../../Components/Discover/Discover.css";
import "../../Components/Product/Product.css";
import "../../Components/Footer/Footer.css";
import "../../Components/MobileNavBar/MobileNavBar.css"

function Home(){
    
    const navigate = useNavigate(); 
    const [products, setProducts] = useState([{id: 13, image: "/images/products.png", name: "inverter", price: 1200, des1: "descr1", des2: "descr2", des3: "descr3"}]);
    const url = import.meta.env.VITE_API_URL;
    useEffect(() => {
      getProducts(); 
      
    }, []);

    async function getProducts(){
      try{
        const response = await fetch(`${url}/`)
        let arr = await response.json();
        console.log(arr);
        setProducts(arr.slice(0,10));
      }
      catch(err){
        console.log(err.stack);
      }
    }  
    
    
    return <div className="home">
    <Dashboard />
    <Carousel />
    <h3 className = "sub-title">Discover</h3>
    <div className="discover-card">
      <Discover handleClick = {() => navigate("/products")} title="Our Products" image="images/Discover/discoverproduct.jpg" />
      <Discover handleClick = {() => navigate("/services")} title="Our Services" image="images/Discover/discoverservices.jpg"/>
      <Discover handleClick = {() => navigate("/contact")} title="Contact us" image="images/Discover/discovercontact.jpg"/>
    </div>

    <div className="product-container">
        
        <h3 className="sub-title">Our Top Products</h3>
        <div className="card-container">
         {  
            
            products.map((d, index) => 
            
            <Product 
                key = {d.id}
                image = {d.image_url}
                name = {d.name}
                price = {d.price}
                des1 = {d.des1}
                des2 = {d.des2}
                des3 = {d.des3}
              /> 
          )
        
          }
        </div>
        
    </div>

    <MobileNavBar />

    <div className="footer-container">
      <Footer />
    </div>
    
  </div>
}

export default Home; 