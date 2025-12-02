import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { useNavigate } from 'react-router-dom';
import Categories from "../Categories/Categories";
import Collection from "../Collection/Collection";
import bgVideo from "../../assets/bgVideo.mp4";

export default function Home() {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  // const handleCategoryClick = (category) => {
  //     navigate('/products', { state: { category: category } });
  // };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-white">
        <div className="video-bg d-flex flex-column justify-content-center align-items-center h-100 text-center ">
          <video autoPlay muted loop playsInline>
            <source src={bgVideo} type="video/mp4" />
          </video>

          <div className="hero-text text-center">
            <h1>{t("heroTitle")}</h1>
            <p>{t("heroDesc")}</p>
            <button className="btn hero-btn mt-3">{t("heroBtn")}</button>
          </div>
        </div>{" "}
      </section>
      {/* Categories Component */}
      <Categories />

      {/* Collection Component */}
      <Collection />
    </div>
  );
}