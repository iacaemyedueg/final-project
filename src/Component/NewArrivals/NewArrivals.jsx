import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import carpetImg from "../../assets/carpetimg/carpet2.jpg";
import "./NewArrivals.css";

export default function NewArrivals() {
  const [hasScrolled, setHasScrolled] = useState(false);

  const products = Array(20)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      src: carpetImg,
      alt: `سجادة فاخرة ${i + 1}`,
    }));

  return (
    <section className="new-arrivals py-5">
      <div className="container position-relative">
              <h2 className="text-center mb-5 fw-bold display-6">New Arrivals</h2>
              

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          dir={document.documentElement.dir === "rtl" ? "rtl" : "ltr"}
          spaceBetween={10}
          slidesPerView={1.2}
          centeredSlides={false}
          loop={false}
          speed={800}
          onSlideChange={(swiper) => setHasScrolled(swiper.activeIndex > 0)}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
            1536: { slidesPerView: 5 }, 
          }}
          className="new-arrivals-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Link to={`/product/${product.id}`} className="d-block">
                <div className="image-wrapper">
                  <img
                    src={product.src}
                    alt={product.alt}
                    className="new-arrival-img"
                  />
                  <div className="image-overlay">
                    <span>عرض المنتج</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          <div className={`custom-prev ${hasScrolled ? "visible" : ""}`}>
            <svg viewBox="0 0 24 24">
              <path
                d="M15 18L9 12L15 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="custom-next">
            <svg viewBox="0 0 24 24">
              <path
                d="M9 18L15 12L9 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Swiper>
      </div>
    </section>
  );
}