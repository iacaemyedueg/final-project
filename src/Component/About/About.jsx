import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Button } from "react-bootstrap";
import aboutImage from "../../assets/carpetimg/carpet2.jpg";
import "./About.css";

export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="about-hero-section py-5 py-md-6" dir={isRTL ? "rtl" : "ltr"}>
      <Container>
        <Row className="align-items-center g-5 p-5">
          {/* Image Column */}
          <Col lg={6} className="order-lg-1 order-2">
            <div className="about-image-wrapper mx-auto">
              <img
                src={aboutImage}
                alt={t('aboutSection.title')}
                className="img-fluid about-hero-img"
              />
            </div>
          </Col>

          {/* Content Column */}
          <Col lg={6} className="order-lg-2 order-1">
            <div className={isRTL ? "text-lg-end text-center" : "text-lg-start text-center"}>
              <h2 className="fw-bold mb-4 text-dark">
                {t('aboutSection.title')}
              </h2>
              <p 
                className="lead fs-5 text-muted mb-4" 
                style={{ whiteSpace: "pre-line" }}
              >
                {t('aboutSection.description')}
              </p>
              <div className={isRTL ? "d-flex justify-content-lg-end justify-content-center" : "d-flex justify-content-lg-start justify-content-center"}>
                <Button className="px-5 py-3 shadow-sm discover-btn fw-600">
                  {t('aboutSection.button')}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}