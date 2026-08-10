import React, { useState } from 'react';
import './Gallery.css';
import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightIcon } from 'lucide-react';

const locations = [
  "Italy", "Dubai", "London", "Berlin", "Rome", "Lisbon", "India", "China", "Japan"
];

const images = [
  "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513622470522-26c311186a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522083165195-3444bed50e47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const Gallery = () => {
  const [activeLocation, setActiveLocation] = useState("Italy");
  const [currentIndex, setCurrentIndex] = useState(2); // Start with center image

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="gallery-container">
      {/* Header Section */}
      <div className="gallery-header">
        <span className="gallery-label">GALLERY</span>
        <h1 className="gallery-title">My Visual Diary</h1>
        <p className="gallery-subtitle">
          See the world through my lens:<br />
          adventures in photos and videos
        </p>
      </div>

      {/* Filter Pills */}
      <div className="filter-container">
        {locations.map((loc) => (
          <button
            key={loc}
            className={`filter-btn ${activeLocation === loc ? 'active' : ''}`}
            onClick={() => setActiveLocation(loc)}
          >
            {loc}
          </button>
        ))}
        <button className="filter-btn view-more">
          View More <ArrowRightIcon size={16} style={{ marginLeft: '4px' }} />
        </button>
      </div>

      {/* Carousel Section */}
      <div className="carousel-container">
        <div className="carousel">
          {images.map((img, index) => {
            // Calculate relative position to active index for coverflow effect
            let offset = index - currentIndex;
            // Handle wrap around
            if (offset < -2) offset += images.length;
            if (offset > 2) offset -= images.length;

            let className = "carousel-item";
            if (offset === 0) className += " active";
            else if (offset === -1) className += " prev1";
            else if (offset === 1) className += " next1";
            else if (offset === -2) className += " prev2";
            else if (offset === 2) className += " next2";
            else className += " hidden";

            return (
              <div key={index} className={className}>
                <img src={img} alt="Travel" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="nav-controls">
        <button className="nav-btn" onClick={prevSlide}>
          <ArrowLeft size={20} />
        </button>
        <button className="nav-btn" onClick={nextSlide}>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
