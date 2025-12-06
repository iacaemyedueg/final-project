import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageButton from "./LanguageButton";
import { useWishlist } from "../../Context/WishlistContext";
import "../Navbar/nav.css";

export default function Nav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { wishlistCount } = useWishlist(); 
  return (
    <>
      <header>
        {/* start topbar */}
        <div className="topbar py-2">
          <div className="container-fluid">
            <div className="d-flex d-lg-none justify-content-between align-items-center">
              <span className="fw-bold text-center w-100">
                {t("superSale")}
              </span>

              <button
                className="navbar-toggler text-white border-0 ms-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#topbarCollapse"
              >
                <i className="fa-solid fa-bars fs-3 text-white"></i>
              </button>
            </div>

            <div className="collapse d-lg-none" id="topbarCollapse">
              <div className="p-3">
                {/* Left */}
                <div className="d-flex justify-content-center my-2">
                  <Link
                    href="#"
                    className="text-decoration-none text-white mx-2"
                  >
                    {t("orderTracking")}
                  </Link>
                  <span>|</span>
                  <Link
                    href="#"
                    className="text-decoration-none text-white mx-2"
                  >
                    {t("myAccount")}
                  </Link>
                </div>

                {/* Right */}
                <div className="d-flex justify-content-center align-items-center flex-wrap my-2">
                  <Link
                    href="#"
                    className="mx-1 text-decoration-none text-white"
                  >
                    <i className="fa-solid fa-envelope mx-1"></i>
                    Carpetwave@gmail.com
                  </Link>

                  <span className="px-1">|</span>

                  <Link href="#" className="mx-1">
                    <i className="fa-brands fa-facebook-f text-white"></i>
                  </Link>
                  <Link href="#" className="mx-1">
                    <i className="fa-brands fa-instagram text-white"></i>
                  </Link>
                  <Link href="#" className="mx-1">
                    <i className="fa-brands fa-youtube text-white"></i>
                  </Link>

                  <div className="mx-1">
                    <LanguageButton />
                  </div>
                </div>
              </div>
            </div>

            <div className="row align-items-center d-none d-lg-flex">
              {/* Left */}
              <div className="col-lg-4 d-flex justify-content-start align-items-center">
                <Link
                  href="#"
                  className="text-decoration-none text-white top-link"
                >
                  {t("orderTracking")}
                </Link>
                <span className="px-2">|</span>
                <Link
                  href="#"
                  className="text-decoration-none text-white top-link"
                >
                  {t("myAccount")}
                </Link>
              </div>

              {/* Center */}
              <div className="col-lg-4 text-center">
                <span className="fw-bold">{t("superSale")}</span>
              </div>

              {/* Right */}
              <div className="col-lg-4 d-flex justify-content-end align-items-center">
                <Link
                  href="#"
                  className="mx-1 text-decoration-none text-white top-link"
                >
                  <i className="fa-solid fa-envelope "></i>
                  elqamar@gmail.com
                </Link>
                <span className="px-1">|</span>

                <Link href="#" className="mx-1 top-link">
                  <i className="fa-brands fa-facebook-f text-white"></i>
                </Link>
                <Link href="#" className="mx-1 top-link">
                  <i className="fa-brands fa-instagram text-white"></i>
                </Link>
                <Link href="#" className="mx-1 top-link">
                  <i className="fa-brands fa-youtube text-white"></i>
                </Link>

                <div className="mx-1">
                  <LanguageButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end topbar */}

        {/* start navbar */}
        <nav className="navbar navbar-expand-lg bg-white px-5 py-3">
          <div className="container-fluid">
            {/* Left */}

            <Link to="/" className="navbar-brand" >
              <img src="../src/assets/logo.jpg" alt="logo" className="img-fluid rounded-circle" />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNav"
              aria-controls="mainNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Center - Collapse */}
      {/* Center - Collapse */}
<div className="collapse navbar-collapse" id="mainNav">
  <div className="d-flex flex-grow-1 justify-content-center mt-3 mt-lg-0">
    <div className="input-group p-1">
      <button
        className="btn btn-outline dropdown-toggle border-none browse-btn"
        type="button"
        data-bs-toggle="dropdown"
      >
        {t("browseCategory ")}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button 
            className="dropdown-item border-bottom"
            onClick={() => navigate('/products', { state: { category: 'Homes' } })}
          >
            {t("browse1")}
          </button>
        </li>
        <li>
          <button 
            className="dropdown-item border-bottom"
            onClick={() => navigate('/products', { state: { category: 'mosque' } })}
          >
            {t("browse2")}
          </button>
        </li>
        <li>
          <button 
            className="dropdown-item"
            onClick={() => navigate('/products', { state: { category: 'Travels' } })}
          >
            {t("browse3")}
          </button>
        </li>
      </ul>

                  <input
                    type="text"
                    className="form-control placeholder-in"
                    placeholder={t("search")}
                  />
                  <span className="search-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="d-flex align-items-center ms-lg-5 mt-3 mt-lg-0 need-help">
                <div className="call-icon mx-2">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div className="d-flex flex-column fw-bold">
                  <span>+201013253495</span>
                  <Link className="nav-link" to="#">
                    {t("needHelp")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* end navbar */}

        {/* start endbar */}
        {/* start endbar */}
<section className="end-bar bg-light py-2">
  <div className="container-fluid">
    <div className="row align-items-center gy-3">
      {/* Left */}
      <div className="col-12 col-lg-2 d-flex justify-content-center justify-content-lg-start">
        <div className="dropdown">
          <button
            className="btn dropdown-toggle bg-custom text-white"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i className="fa-solid fa-table-cells browse-icon mx-2"></i>
            {t("browseCategory ")}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button 
                className="dropdown-item border-bottom"
                onClick={() => navigate('/products', { state: { category: 'Homes' } })}
              >
                {t("browse1")}
              </button>
            </li>
            <li>
              <button 
                className="dropdown-item border-bottom"
                onClick={() => navigate('/products', { state: { category: 'mosque' } })}
              >
                {t("browse2")}
              </button>
            </li>
            <li>
              <button 
                className="dropdown-item"
                onClick={() => navigate('/products', { state: { category: 'Travels' } })}
              >
                {t("browse3")}
              </button>
            </li>
          </ul>
        </div>
      </div>

              {/* Middle */}
              <div className="col-12 col-lg-8 d-flex justify-content-center gap-4 flex-wrap">
                <Link className="text-dark text-decoration-none fw-bold custom-tab">
                  {t("home")}
                </Link>

                <Link className="text-dark text-decoration-none fw-bold custom-tab">
                  {t("about")}
                </Link>

                {/* <ul className="navbar-nav m-0 p-0">
                  <li className="nav-item dropdown custom-tab">
                    <button
                      className="nav-link dropdown-toggle text-dark fw-bold p-0 custom-dropdown"
                      data-bs-toggle="dropdown"
                    >
                      {t("shop ")}
                    </button>
                    <ul className="dropdown-menu mt-2">
                      <li>
                        <Link className="dropdown-item border-bottom" href="#">
                          {t("browse1")}
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item border-bottom" href="#">
                          {t("browse2")}
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          {t("browse3")}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul> */}

                <Link className="text-dark text-decoration-none fw-bold custom-tab">
                  {t("contact")}
                </Link>
              </div>

              {/* Right */}
              <div className="col-12 col-lg-2 d-flex justify-content-center justify-content-lg-end gap-3 fs-5">
                <Link className="text-dark" to="/Wishlist">
                  <i className="fa-solid fa-heart"></i>
                </Link>
                <Link className="text-dark">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
                <Link className="text-dark" to="profile">
                  <i className="fa-solid fa-user"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* end endbar */}
      </header>
    </>
  );
}
