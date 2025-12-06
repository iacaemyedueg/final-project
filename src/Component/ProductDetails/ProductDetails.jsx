import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../../Context/WishlistContext';
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

// Mock data - This will be replaced with API call
const mockProducts = [
  {
    id: 1,
    name: "Afghani Pluchi - Handmade Rug",
    description: "Handmade Afghani wool carpet, premium quality.",
    fullDescription: "Handmade Afghani wool carpet, premium quality. Hand-knotted of hand-spun, vegetable-dyed wool in Afghanistan.",
    images: [pr11, pr12, pr13],
    material: "Wool",
    origin: "Afghanistan",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    soldCount: 10,
    category: "Homes"
  },
  {
    id: 2,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr21, pr22, pr23],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
    soldCount: 5,
    category: "Homes"
  },
  {
    id: 3,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr31, pr32, pr33],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
    soldCount: 5,
    category: "Homes"
  },
  {
    id: 7,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr41, pr42, pr43],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
    soldCount: 5,
    category: "Homes"
  },
  {
    id: 8,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr51, pr52, pr53],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
    soldCount: 5,
    category: "mosque"
  },
  {
    id: 9,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr61, pr62, pr63],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
    soldCount: 5,
    category: "mosque"
  },
  {
    id: 10,
    name: "Persian Rug",
    description: "Beautiful Persian handmade rug.",
    fullDescription: "Traditional Persian design with premium materials.",
    images: [pr71, pr72],
    material: "Wool",
    origin: "Persia",
    careInstructions: "Dry clean only",
    inStock: true,
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

  // Favorite state
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupAnimation, setPopupAnimation] = useState('');
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Refs for timeout management
  const popupTimeoutRef = useRef(null);


 const handleBackToProducts = () => {
  const fromCategory = location.state?.fromCategory;
  if (fromCategory) {
    navigate('/products', { state: { category: fromCategory } });
  } else {
    navigate('/products');
  }
};

  const handleFavoriteClick = (product, e) => {
    if (e) e.stopPropagation();

    const newFavoriteState = toggleWishlist(product);
    const isCurrentlyFavorite = isInWishlist(product.id); // Use this for popup

    const message = newFavoriteState
      ? t('wishlist.addedToFavorite')
      : t('wishlist.removedFromFavorite');

    // Clear any existing timeout
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }

    setPopupMessage(message);
    setPopupAnimation('fade-in');
    setShowPopup(true);

    popupTimeoutRef.current = setTimeout(() => {
      setPopupAnimation('fade-out');

      popupTimeoutRef.current = setTimeout(() => {
        setShowPopup(false);
        setPopupAnimation('');
        popupTimeoutRef.current = null;
      }, 300);
    }, 1500);
  };

  // Handle RTL direction for Arabic
  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Cleanup timeouts on component unmount
  useEffect(() => {
    return () => {
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
    };
  }, []);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
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

  // Image loading effect
  useEffect(() => {
    setImageLoaded(false);
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedImage]);

  if (loading) {
    return (
      <div className="pd-loading">
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

        {/* CENTER - Large Image */}
        <div className="pd-main-image-wrapper">
          <div className="pd-main-image-container">
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

        {/* RIGHT - Product Info */}
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
              <div className="pd-spec-item">
                <strong><i className="fas fa-arrows-alt-h me-1"></i> {t('productDetails.width')}:</strong>
                <span>{t('productDetails.widthHint')}</span>
              </div>
              <div className="pd-spec-item">
                <strong><i className="fas fa-arrows-alt-v me-1"></i> {t('productDetails.height')}:</strong>
                <span>{t('productDetails.heightHint')}</span>
              </div>
            </div>
            <button
              className={`pd-heart-btn ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={() => handleFavoriteClick(product)}
              aria-label={isInWishlist(product.id) ? t('productDetails.removeFromFavorite') : t('productDetails.addToFavorite')}
            >
              <i className={`${isInWishlist(product.id) ? 'fas text-danger' : 'far'} fa-heart`}></i>
              <span className="pd-heart-text">
                {isInWishlist(product.id) ? t('productDetails.removeFromFavorite') : t('productDetails.addToFavorite')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Popup Message */}
     {showPopup && (
        <div className="pd-popup-overlay">
          <div className={`pd-popup ${isInWishlist(product.id) ? 'pd-popup-success' : 'pd-popup-remove'} ${popupAnimation}`}>
            <i className={`fas ${isInWishlist(product.id) ? 'fa-heart' : 'fa-heart-broken'} pd-popup-icon`}></i>
            <span className="pd-popup-text">{popupMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}