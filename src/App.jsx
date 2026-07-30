import {Route, Routes} from "react-router-dom"; 
import Home from "./Pages/Home/Home"
import AboutUs from "./Pages/AboutUs/AboutUs"
import ProductsPage from "./Pages/ProductsPage/ProductsPage"
import Services from "./Pages/Services/Services"
import Location from "./Pages/Location/Location"
import Contact from "./Pages/Contact/Contact"
import ManageProducts from "./Pages/ManageProducts/ManageProducts"
import Enquiries from "./Pages/Enquiries/Enquiries"
import AdminLogin from "./Pages/AdminLogin/AdminLogin"
import ProductCategory from "./Pages/ProductCategory/ProductCategory";

function App() {
  
    return <Routes>
      <Route path = "/" element = {<Home />}/>
      <Route path = "/aboutus" element = {<AboutUs/>}/>
      <Route path = "/products" element = {<ProductsPage />}/>
      <Route path = "/services" element = {<Services />}/>
      <Route path = "/location" element = {<Location />}/>
      <Route path = "/contact" element = {<Contact />} />
      <Route path = "/adminLogin" element = {<AdminLogin />}/>
      <Route path = "/manageProducts" element = {<ManageProducts />}/>
      <Route path = "/manageEnquiries" element = {<Enquiries />} />
      <Route path = "/productCategory" element = {<ProductCategory />}/>
    </Routes>
}

export default App
