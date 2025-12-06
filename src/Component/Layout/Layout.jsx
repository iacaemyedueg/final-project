import React from "react";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";

import "../Layout/Layout.css";
// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Product from "../Product/Products";
import { Outlet } from "react-router-dom";

export default function Layout() {
  // const { t } = useTranslation();
  return (
    <>
      <Nav />
      {/* <h1>Lay out</h1> */}
      {/* <section className=" hero-section text-white">
        <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center">
          <div className="hero-text">
            <h1>{t("heroTitle")}</h1>
            <p className="text-center">{t("heroDesc")}</p>
          </div>
          <Link to="products">
            <button type="button" className="btn btn mt-3">
              {t("heroBtn")}
            </button>
          </Link>
        </div>
      </section> */}
      <Outlet />
      <Footer />
    </>
  );
}
