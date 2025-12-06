// src/Component/Categories/Categories.jsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

// ============ Local Image Loader ============ //
const localImage = (num) => {
  return new URL(`../../assets/carpetimg/carpet${num}.jpg`, import.meta.url)
    .href;
};

// ============ STATIC DATA ============ //
const categories = [
  { title: "House Mats", img: localImage(3), category: "Homes" },
  { title: "Travel Mats", img: localImage(25), category: "Travels" },
  { title: "Mosque Mats", img: localImage(27), category: "mosque" },
  // { title: "Modern Mats", img: localImage(30), category: "Homes" },
  // { title: "MOSQUE", img: localImage(29), category: "mosque" },
  // { title: "TRAVELS", img: localImage(28), category: "Travels" },
];

const gallery = [
  { title: "Living Area Mats", img: localImage(37) },
  { title: "Dining Area Mats", img: localImage(3) },
  { title: "Living Area Mats", img: localImage(37) },
];

// ============ COMPONENT ============ //
export default function Categories() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Handle category click
  const handleCategoryClick = (category) => {
    navigate("/products", { state: { category: category } });
  };

  const slideBy = (distance) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  const slideLeft = () => slideBy(-300);
  const slideRight = () => slideBy(300);

  return (
    <div className="categories-page">
      {/* TOP SECTION */}
      <section className="categories-top py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-4 text-center text-lg-start mb-4 mb-lg-0">
              <h2 className="categories-title">Shop By Categories</h2>
              <p className="categories-sub">
                Give Your Home Better Style And Comfort With Qamar Factory
              </p>
            </div>

            <div className="col-12 col-lg-8">
              <div className="slider-container">
                <button className="slider-btn left" onClick={slideLeft}>
                  ❮
                </button>

                <div
                  className="categories-scroll slider-wrapper"
                  ref={sliderRef}
                >
                  {categories.map((c, i) => (
                    <div
                      key={i}
                      className="cat-item"
                      onClick={() => handleCategoryClick(c.category)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="cat-circle">
                        <img src={c.img} alt={c.title} className="cat-img" />
                      </div>
                      <div className="cat-caption">{c.title}</div>
                    </div>
                  ))}
                </div>

                <button className="slider-btn right" onClick={slideRight}>
                  ❯
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMO */}
    <section className="promo-banner">
  <div className="container text-center">
    <div className="promo-small">Comfort And Stylish Mats</div>
    <h3 className="promo-headline">Give Your Home Extra Touch</h3>
    <p className="promo-desc">
      "Transform Your Space With Our Softest, Most Stylish
      <br /> Mats — Big Savings, Cozy Comfort!"
    </p>
  </div>
</section>

      {/* GALLERY */}
      <section className="gallery-section py-5">
        <div className="container">
          <div className="row gx-4 align-items-stretch">
            <div className="col-12 col-lg-8">
              <div className="feature-large">
                <img src={gallery[0].img} className="feature-img" />
              </div>
              <h4 className="feature-caption">{gallery[0].title}</h4>
            </div>

            <div className="col-12 col-lg-4">
              <div className="gallery-side">
                {gallery.slice(1).map((g, i) => (
                  <div key={i} className="feature-small">
                    <img src={g.img} className="feature-img-sm" />
                    <div className="feature-caption-sm">{g.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
