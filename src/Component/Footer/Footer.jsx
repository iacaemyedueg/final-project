import React from 'react';
// import { useTranslation } from "react-i18next";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Description */}
        <div className="footer-section">
          <h2 className="footer-title">Carpet Wave</h2>
          <p className="footer-description">
            Specialized in manufacturing and exporting the finest types of mats. 
            We offer a wide variety of designs and high quality to meet all your needs.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="social-icon youtube">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Link</h3>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#shop">Shop</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Policies</h3>
          <ul className="footer-links">
            <li><a href="#terms">Terms & Condition</a></li>
            <li><a href="#shipping">Shipping & Delivery</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#return">Return</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Useful Link</h3>
          <ul className="footer-links">
            <li><a href="#warranty">Warranty</a></li>
            <li><a href="#account">Your Account</a></li>
            <li><a href="#faqs">FAQs</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Contact US</h3>
          <div className="contact-info">
            <p className="contact-item">
              <i className="fas fa-phone contact-icon"></i>
              +91809099098
            </p>
            <p className="contact-item">
              <i className="fas fa-envelope contact-icon"></i>
              Carpetwave@gmail.Com
            </p>
            <p className="contact-item">
              <i className="fas fa-map-marker-alt contact-icon"></i>
              Arcadia, South City II, Sec 49, Gurgaon
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <div className="footer-credits">
          <p>Design By Joya UI UX Designer</p>
          <p>©2024 Carpet Wave | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;