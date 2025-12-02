import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProductDetails.css';

// Local static assets
import pr11 from '../../assets/img/images/Homes/1.2.jpg';
import pr12 from '../../assets/img/images/Homes/1.3.jpg';
import pr13 from '../../assets/img/images/Homes/1.1.jpg';
import pr21 from '../../assets/img/images/Homes/2.3.jpg';
import pr22 from '../../assets/img/images/Homes/2.1.jpg';
import pr23 from '../../assets/img/images/Homes/2.2.jpg';
import pr31 from '../../assets/img/images/Homes/3.3.jpg';
import pr32 from '../../assets/img/images/Homes/3.2.jpg';
import pr33 from '../../assets/img/images/Homes/3.1.jpg';
import pr41 from '../../assets/img/images/Homes/4.1.jpg';
import pr42 from '../../assets/img/images/Homes/4.2.jpg';
import pr43 from '../../assets/img/images/Homes/4.3.jpg';
import pr51 from '../../assets/img/images/mosque/1.3.jpg';
import pr52 from '../../assets/img/images/mosque/1.2.jpg';
import pr53 from '../../assets/img/images/mosque/1.1.jpg';
import pr61 from '../../assets/img/images/mosque/2.3.jpg';
import pr62 from '../../assets/img/images/mosque/2.2.jpg';
import pr63 from '../../assets/img/images/mosque/2.1.jpg';
import pr71 from '../../assets/img/images/Travels/1.2.jpg';
import pr72 from '../../assets/img/images/Travels/1.1.jpg';

const uploadedImage = '/mnt/data/image.png';

// Mock data - This will be replaced with API call
const mockProducts = [
  {
    id: 1,
    name: "Afghani Pluchi - Handmade Rug",
    description: "Handmade Afghani wool carpet, premium quality.",
    fullDescription: "Handmade Afghani wool carpet, premium quality. Hand-knotted of hand-spun, vegetable-dyed wool in Afghanistan.",
    images: [pr11, pr12, pr13],
    features: ["Handmade", "Traditional Afghan Design", "Durable", "Cultural Heritage"],
    material: "Wool",
    origin: "Afghanistan",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    discount: 30,
    soldCount: 10,
    category: "Homes"
  },
  {
    id: 2,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr21, pr22, pr23],
    features: ["Handmade", "Persian Design", "Premium Wool"],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
    discount: 20,
    soldCount: 5,
    category: "Homes"
  },
  {
    id: 3,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr31, pr32, pr33],
    features: ["Handmade", "Persian Design", "Premium Wool"],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
    discount: 20,
    soldCount: 5,
    category: "Homes"
  },
  {
    id: 7,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr41, pr42, pr43],
    features: ["Handmade", "Persian Design", "Premium Wool"],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
    discount: 20,
    soldCount: 5,
    category: "Homes"
  },
  {
    id: 8,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr51, pr52, pr53],
    features: ["Handmade", "Persian Design", "Premium Wool"],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
    discount: 20,
    soldCount: 5,
    category: "mosque"
  },
  {
    id: 9,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr61, pr62, pr63],
    features: ["Handmade", "Persian Design", "Premium Wool"],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
    discount: 20,
    soldCount: 5,
    category: "mosque"
  },
  {
    id: 10,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr71, pr72],
    features: ["Handmade", "Persian Design", "Premium Wool"],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
    discount: 20,
    soldCount: 5,
    category: "Travels"
  }
];

export default function ProductDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Gallery state
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(true);

  // Customization state - Only width remains
  const [selectedWidth, setSelectedWidth] = useState(null);

  // Handle back button click
  const handleBackToProducts = () => {
    // Check if we came from a specific category
    const fromCategory = location.state?.fromCategory;
    if (fromCategory) {
      navigate('/products', { state: { category: fromCategory } });
    } else {
      navigate('/products');
    }
  };

  // Handle RTL direction for Arabic
  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'; 
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // This will be replaced with API call
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // For now: mock data
        const foundProduct = mockProducts.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    setImageLoaded(false);
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedImage]);

  if (loading) {
    return (
      <div className="products-loading">
        <div className="thread-loader"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-not-found">
        <h2>{t('productDetails.productNotFound')}</h2>
        <button className="pd-back-btn" onClick={handleBackToProducts}>
          <i className="fas fa-arrow-left me-2"></i>{t('productDetails.backToProducts')}
        </button>
      </div>
    );
  }

  const availableWidths = [60, 90, 120, 150, 180, 210];

  return (
    <div className="pd-container">
      <button className="pd-back-btn" onClick={handleBackToProducts}>
        <i className="fas fa-arrow-left me-2"></i>{t('productDetails.backToProducts')}
      </button>

      <div className="pd-content three-col-layout">
        {/* LEFT - Thumbnails vertical */}
        <div className="pd-thumbs-col" aria-hidden={false}>
          {product.images.map((img, idx) => (
            <button
              key={idx}
              className={`pd-thumb-btn ${selectedImage === idx ? 'active' : ''}`}
              onClick={() => setSelectedImage(idx)}
              aria-label={t('productDetails.viewImage', { number: idx + 1 })}
            >
              <img src={img} alt={`${product.name} thumb ${idx + 1}`} />
            </button>
          ))}
        </div>

        {/* CENTER - Large Image with discount badge */}
        <div className="pd-main-image-wrapper">
          <div className="pd-main-image-container">
            {/* Discount badge - only shows if discount exists */}
            {product.discount && product.discount > 0 && (
              <div className="pd-discount-badge-on-image">
                {t('productDetails.discount', { discount: product.discount })}
              </div>
            )}

            <img
              key={selectedImage}
              src={product.images[selectedImage]}
              alt={`${product.name} view ${selectedImage + 1}`}
              className={`pd-main-img ${imageLoaded ? 'visible' : 'hidden'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>
        </div>

        {/* RIGHT - Product Info + Customization Table */}
        <div className="pd-info right-info">
          <div className="pd-header no-breadcrumb">
            <h1 className="pd-title">{product.name}</h1>
          </div>

          <p className="pd-description">{product.description}</p>
          <p className="pd-full-description">{product.fullDescription}</p>

          {/* Product Specifications */}
          <div className="pd-specifications">
            <h4><i className="fas fa-info-circle me-2"></i> {t('productDetails.productSpecifications')}</h4>
            <div className="pd-specs-list">
              <div className="pd-spec-item">
                <strong><i className="fas fa-palette me-1"></i> {t('productDetails.material')}:</strong>
                <span>{product.material}</span>
              </div>
              <div className="pd-spec-item">
                <strong><i className="fas fa-globe me-1"></i> {t('productDetails.madeIn')}:</strong>
                <span>{product.origin}</span>
              </div>
              <div className="pd-spec-item">
                <strong><i className="fas fa-toolbox me-1"></i> {t('productDetails.careInstructions')}:</strong>
                <span>{product.careInstructions}</span>
              </div>
            </div>
          </div>

          {/* Customization Table - Only Width remains, Height is now text */}
          <div className="pd-customization-table new-table">
            <h3>
              <i className="fas fa-ruler-combined me-2"></i>
              {t('productDetails.customizeYourRug')}
            </h3>

            <div className="pd-table">
              {/* Width */}
              <div className="pd-table-row">
                <div className="pd-table-label">
                  <strong><i className="fas fa-arrows-alt-h me-1"></i> {t('productDetails.width')}:</strong>
                  <span className="pd-table-hint">{t('productDetails.widthHint')}</span>
                </div>
                <div className="pd-table-inputs">
                  <div className="pd-width-options">
                    {availableWidths.map(w => (
                      <button
                        key={w}
                        type="button"
                        className={`pd-option-btn ${selectedWidth === w ? 'active' : ''}`}
                        onClick={() => setSelectedWidth(w)}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Height - Changed to text only */}
              <div className="pd-table-row">
                <div className="pd-table-label">
                  <strong><i className="fas fa-arrows-alt-v me-1"></i> {t('productDetails.height')}:</strong>
                  <span className="pd-table-hint">{t('productDetails.heightHint')}</span>
                </div>
                <div className="pd-table-inputs">
                  <div className="pd-height-text-info">
                    <i className="fas fa-check-circle me-2"></i>
                    <span>{t('productDetails.customHeightAvailable')}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Features */}
          <div className="pd-features">
            <h4><i className="fas fa-star me-2"></i> {t('productDetails.productFeatures')}</h4>
            <div className="row">
              {product.features.map((f, i) => (
                <div key={i} className="col-md-6">
                  <div className="pd-feature-item">
                    <i className="fas fa-check me-2"></i>{f}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}