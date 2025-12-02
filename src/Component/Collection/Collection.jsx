import React from "react";
import "./Collection.css";
import {
  FaTruck,
  FaMoneyBillWave,
  FaGlobeAsia,
  FaRedoAlt,
  FaSmile,
} from "react-icons/fa";


const localImage = (num) =>
  new URL(`../../assets/carpetimg/carpet${num}.jpg`, import.meta.url).href;


const collections = [
  { name: "DOLCE",   price: "Starting At Rs 1099", img: localImage(6) },
  { name: "IMPERIA", price: "Starting At Rs 1099", img: localImage(8) },
  { name: "RIACE",   price: "Starting At Rs 1099", img: localImage(11) },
  { name: "ROVERE",  price: "Starting At Rs 1099", img: localImage(13) },
];

const benefits = [
  { icon: <FaTruck />,          title: "Free Delivery" },
  { icon: <FaMoneyBillWave />,  title: "COD Available" },
  { icon: <FaGlobeAsia />,      title: "Delivery Across India" },
  { icon: <FaRedoAlt />,        title: "Easy Return" },
  { icon: <FaSmile />,          title: "Good Quality" },
];


const saleImage = localImage(21);

export default function Collection() {
  return (
    <section className="collection-section">
      <div className="container">
      
        <header className="collection-header">
          <h2 className="collection-title">Shop By Collection</h2>
        </header>

      
        <div className="collection-grid">
          {collections.map((item, i) => (
            <div key={i} className="collection-card">
              <img
                src={item.img}
                alt={item.name}
                className={`collection-img`}
              
              />
              <div className="collection-overlay" />
              <div className="collection-info">
                <div className="collection-name">{item.name}</div>
                <div className="collection-price">{item.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="collection-sale">
          <div className="sale-text">
            <h3 className="sale-title">Big Sale!</h3>
            <p className="sale-date">Starts December 2nd – December 10th</p>
            <p className="sale-line">
              Enjoy <span>10% Off</span> On Premium Quality Rugs – Give Your
              Home An Extra Touch Of Elegance!
            </p>
            <p className="sale-foot">
              Don’t Miss Out On Incredible Discounts!
            </p>
          </div>

          <div className="sale-circle-wrap">
            <img
              src={saleImage}
              alt="Big sale rug"
              className="sale-circle-img"
            />
          </div>
        </div>

        {/* ====== BENEFITS + SUBSCRIBE ====== */}
        <section className="benefits-section">
      
          <div className="benefits-grid">
            {benefits.map((item, i) => (
              <div key={i} className="benefit-card">
                <span className="benefit-icon">{item.icon}</span>
                <span className="benefit-title">{item.title}</span>
              </div>
            ))}
          </div>

          {/* صندوق الإيميل */}
          <div className="subscribe-box">
            <h3 className="subscribe-title">Exclusively For You!</h3>
            <p className="subscribe-text">
              Be The First To Know About New Collections,<br/> Launches, Sales, And
              Much More!
            </p>

            <form
              className="subscribe-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email Address"
                className="subscribe-input"
              />
              <button className="subscribe-btn">Subscribe</button>
            </form>
          </div>
        </section>
      </div>
    </section>
  );
}