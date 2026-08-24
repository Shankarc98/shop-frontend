import {useState, useEffect} from "react"; 
import "./Carousel.css";

function Carousel(){
    
    const [isMobile, setMobile] = useState(window.innerWidth <= 600);
    
    useEffect(() => {
        function handleResize(){
            setMobile(window.innerWidth <= 368);            
        }

        window.addEventListener("resize", handleResize); 

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])
    return <div id="myCarousel" className="carousel slide mb-6 pointer-event" data-bs-ride="carousel"> 
    <div className="carousel-indicators"> 
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="" aria-label="Slide 1">
            </button> 
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className="active" aria-current="true">
                </button> 
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className="">
                    </button> 
                    </div> 
                    <div className="carousel-inner"> 
                        <div className="carousel-item"> 
                            
                            <img className="shop-img" src={isMobile ? "/images/Carousel/carousel1.png" : "/images/dth.png"} alt="banner"/>
                                <div className="container"> 
                                  
                                </div> 
                        </div> 
                    <div className="carousel-item active"> 
                        <img className="shop-img" src={isMobile ? "/images/Carousel/carousel2.png" : "/images/ups.png"} alt="shop"/>

                    <div className="carousel-container"> 
                                                
                    </div> 
                    </div> 
                    
                    <div className="carousel-item"> 
                        <img className="shop-img" src={isMobile ? "/images/Carousel/carousel3.png" : "/images/speaker.png"} alt="shop"/>

                        <div className="carousel-container"> 
                                                            
                        </div> 
                    </div> 
                </div> 
                                                                <button className="carousel-control-prev carousel-control" type="button" data-bs-target="#myCarousel" data-bs-slide="prev"> 
                                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span> 
                                                                    <span className="visually-hidden">Previous</span> 
                                                                    </button> 
                                                                    <button className="carousel-control-next carousel-control" type="button" data-bs-target="#myCarousel" data-bs-slide="next"> 
                                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span> 
                                                                        <span className="visually-hidden">Next</span> 
    </button> 
    </div>
}

export default Carousel;