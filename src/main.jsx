import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import "./Components/Carousel/Carousel.css"
import "./Components/Dashboard/Dashboard.css"
import "./Components/Discover/Discover.css"
import "./Components/Product/Product.css"
import "./Components/Footer/Footer.css"
import "./Pages/AboutUs/AboutUs.css"
import "./Pages/Home/Home.css"
import "./Pages/ProductsPage/ProductsPage.css"
import "./Pages/Services/Services.css"
import "./Components/ServiceCard/ServiceCard.css"
import "./Pages/Location/Location.css"
import "./Pages/Contact/Contact.css"
import "./Pages/ManageProducts/ManageProducts.css"
import "./Components/AdminHeader/AdminHeader.css"
import "./Components/AdminProductCard/AdminProductCard.css"
import "./Components/ManageCard/ManageCard.css"
import "./Pages/Enquiries/Enquiries.css"
import "./Components/EnquiryCard/EnquiryCard.css"
import "./Pages/AdminLogin/AdminLogin.css"
import "./redesign.css"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
