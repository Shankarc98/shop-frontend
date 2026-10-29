import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./Carousel.css";

const slides = [
    {image: "/images/shop/shop2.png", alt: "Electronics and accessories displayed on the shop shelves", label: "Inside the shop"},
    {image: "/images/shop/shop3.png", alt: "Product shelves inside Sankar Electronics", label: "Find the right product"},
    {image: "/images/Services/repair.jpg", alt: "Hands-on electronic repair work", label: "Repair and technical help"},
];

function Carousel() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (paused || reduceMotion) return undefined;
        const timer = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % slides.length);
        }, 7000);
        return () => window.clearInterval(timer);
    }, [paused]);

    const currentSlide = slides[activeSlide];

    return <section className="store-hero" aria-label="Welcome to Sankar Electronics">
        <div className="hero-copy">
            <h1>Good technology starts with good advice.</h1>
            <p>Explore electronics, find a repair service, or talk to your neighborhood team.</p>
            <div className="hero-actions">
                <Link to="/products" className="button button-primary">Browse products</Link>
                <Link to="/services" className="button button-secondary">Explore services</Link>
            </div>
            <div className="hero-proof">
                <span className="hero-rule" aria-hidden="true"/>
                <span>Local guidance since 1999</span>
            </div>
        </div>
        <div className="hero-image-panel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <img key={currentSlide.image} className="hero-image" src={currentSlide.image} alt={currentSlide.alt}/>
            <div className="hero-image-caption">
                <span>{currentSlide.label}</span>
                <div className="hero-slide-controls" aria-label="Choose a shop photo">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.image}
                            type="button"
                            className={`hero-slide-dot${index === activeSlide ? " is-active" : ""}`}
                            onClick={() => setActiveSlide(index)}
                            aria-label={`Show ${slide.label.toLowerCase()}`}
                            aria-pressed={index === activeSlide}
                        />
                    ))}
                    <button
                        type="button"
                        className="hero-pause"
                        onClick={() => setPaused((value) => !value)}
                        aria-label={paused ? "Resume photo rotation" : "Pause photo rotation"}
                    >
                        {paused ? "Play" : "Pause"}
                    </button>
                </div>
            </div>
        </div>
    </section>
}

export default Carousel;