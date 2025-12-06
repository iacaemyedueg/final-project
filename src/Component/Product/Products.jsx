import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../../Context/WishlistContext';
import '../Product/products.css';

// Import your images
import pr11 from '../../assets/img/images/Homes/1.3.jpg';
import pr11Hover from '../../assets/img/images/Homes/1.2.jpg';
import pr21 from '../../assets/img/images/Homes/2.1.jpg';
import pr22Hover from '../../assets/img/images/Homes/2.3.jpg';
import pr31 from '../../assets/img/images/Homes/3.2.jpg';
import pr32Hover from '../../assets/img/images/Homes/3.3.jpg';
import pr41 from '../../assets/img/images/Homes/4.2.jpg';
import pr42Hover from '../../assets/img/images/Homes/4.1.jpg';
import pr51 from '../../assets/img/images/mosque/1.2.jpg';
import pr52Hover from '../../assets/img/images/mosque/1.3.jpg';
import pr61 from '../../assets/img/images/mosque/2.2.jpg';
import pr62Hover from '../../assets/img/images/mosque/2.3.jpg';
import pr71 from '../../assets/img/images/Travels/1.1.jpg';
import pr72Hover from '../../assets/img/images/Travels/1.2.jpg';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Abstract Shore",
    description: "Beautiful abstract design hand tufted rug",
    image: pr11,
    hoverImage: pr11Hover,
    category: "Homes"
  },
  {
    id: 2,
    name: "Aegean Classic - Handmade Wool Kilim",
    description: "Traditional handmade wool kilim rug",
    image: pr21,
    hoverImage: pr22Hover,
    category: "Homes"
  },
  {
    id: 3,
    name: "Afghani Plush - Handmade Rug",
    description: "Authentic Afghani handmade rug",
    image: pr31,
    hoverImage: pr32Hover,
    category: "Homes"
  },
  {
    id: 4,
    name: "Afghani Plush - Handmade Rug",
    description: "Luxurious Afghani plush rug",
    image: pr11,
    hoverImage: pr11Hover,
    category: "Homes"
  },
  {
    id: 5,
    name: "Art Deco Rug",
    description: "Elegant Art Deco style rug",
    image: pr21,
    hoverImage: pr22Hover,
    category: "Homes"
  },
  {
    id: 6,
    name: "Modern Geometric Rug",
    description: "Contemporary geometric pattern rug",
    image: pr31,
    hoverImage: pr32Hover,
    category: "Homes"
  },
  {
    id: 7,
    name: "Modern Geometric Rug",
    description: "Contemporary geometric pattern rug",
    image: pr41,
    hoverImage: pr42Hover,
    category: "Homes"
  },
  {
    id: 8,
    name: "Modern Geometric Rug",
    description: "Contemporary geometric pattern rug",
    image: pr51,
    hoverImage: pr52Hover,
    category: "mosque"
  },
  {
    id: 9,
    name: "Modern Geometric Rug",
    description: "Contemporary geometric pattern rug",
    image: pr61,
    hoverImage: pr62Hover,
    category: "mosque"
  },
  {
    id: 10,
    name: "Modern Geometric Rug",
    description: "Contemporary geometric pattern rug",
    image: pr71,
    hoverImage: pr72Hover,
    category: "Travels"
  }
];

export default function Products() {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Favorite state
  const [favorites, setFavorites] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupAnimation, setPopupAnimation] = useState('');
  const popupTimeoutRef = useRef(null);
  const [currentFavoriteState, setCurrentFavoriteState] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const navigate = useNavigate();
  const location = useLocation();

  // Handle favorite click with popup
  const handleFavoriteClick = (product, e) => {
    if (e) {
      e.stopPropagation();
    }

    const newFavoriteState = toggleWishlist(product);

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
    setCurrentFavoriteState(newFavoriteState);

    popupTimeoutRef.current = setTimeout(() => {
      setPopupAnimation('fade-out');

      popupTimeoutRef.current = setTimeout(() => {
        setShowPopup(false);
        setPopupAnimation('');
        popupTimeoutRef.current = null;
      }, 300);
    }, 700);
  };

  // Cleanup timeouts on component unmount
  useEffect(() => {
    return () => {
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setProducts(mockProducts);

        // Check if category was passed from home page using state
        if (location.state && location.state.category) {
          const category = location.state.category;
          setSelectedCategory(category);
          const filtered = mockProducts.filter(product =>
            product.category === category
          );
          setFilteredProducts(filtered);
        } else {
          // If no category passed, show all products
          setFilteredProducts(mockProducts);
        }
      }
      catch (error) {
        console.error('Error fetching products:', error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.state]);

  // Update displayed products when filtered products or current page changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    setDisplayedProducts(productsToShow);
  }, [filteredProducts, currentPage, productsPerPage]);

  // Clear category filter
  const clearFilters = () => {
    setSelectedCategory(null);
    setFilteredProducts(products);
    // Reset to first page when clearing filters
    setCurrentPage(1);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= 1) {
      return [1];
    }

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = 3;
      }

      if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      if (startPage > 2) {
        pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Navigate to product details
  const goToProductDetails = (productId, productCategory, e) => {
    if (e) {
      e.stopPropagation();
    }
    navigate(`/productDetails/${productId}`, {
      state: {
        fromCategory: selectedCategory || productCategory
      }
    });
  };

  // Handle RTL direction for Arabic
  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="thread-loader"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-3 px-md-4 px-lg-5 bg-light min-vh-100">
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <h2 className="products-main-title fw-bold mb-3 mt-3 mt-md-4 ms-2 ms-md-3 ms-lg-5">
            {selectedCategory ? `${selectedCategory} ${t('products.title')}` : t('products.title')}
          </h2>
          <hr className="w-90 mx-auto" />
        </div>
      </div>

      {/* Products Grid */}
      <div className="row">
        <div className="col-12">
          <div className="products-grid-container">

            {/* Products Grid */}
            <div className="row g-4 g-md-4">
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
                  <div key={product.id} className="col-12 col-sm-6 col-xl-4">
                    <div
                      className="product-card h-100"
                      onClick={() => goToProductDetails(product.id, product.category)}
                    >
                      <div className="card-image position-relative">
                        <img src={product.image} alt={product.name} className="main-image w-100 h-100" />
                        <img src={product.hoverImage} alt={product.name} className="hover-image w-100 h-100" />
                        <div className="card-actions position-absolute">
                          <button
                            className={`action-btn ${isInWishlist(product.id) ? 'favorite-active' : ''}`}
                            onClick={(e) => handleFavoriteClick(product, e)}
                          >
                            <i className={`${isInWishlist(product.id) ? 'fas' : 'far'} fa-heart ${isInWishlist(product.id) ? 'text-danger' : ''}`}></i>
                          </button>

                          <button
                            className="action-btn"
                            onClick={(e) => goToProductDetails(product.id, product.category, e)}
                          >
                            <i className="far fa-eye"></i>
                          </button>
                        </div>
                      </div>

                      <div className="card-info">
                        <h3 className="product-title">
                          {product.name.split(" ").slice(0, 2).join(" ")}
                        </h3>
                        <p className="product-desc">{product.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="no-products text-center py-5">
                    <h3 className="mb-3">{t('products.noProducts')}</h3>
                    <p className="mb-4">{t('products.noProductsMatch')}</p>
                    <button className="clear-filter-btn" onClick={clearFilters}>
                      {t('products.clearFilter')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="pagination-container mt-4">
                <div className="pagination-info-top mb-3">
                  <span className="products-count">
                    {t('products.showing')} {((currentPage - 1) * productsPerPage) + 1} - {Math.min(currentPage * productsPerPage, filteredProducts.length)} {t('products.of')} {filteredProducts.length} {t('products.total')}
                  </span>
                </div>

                {filteredProducts.length > 0 && (
                  <div className="pagination-controls-bottom">
                    <div className="pagination-controls">
                      <button
                        className="pagination-btn prev-next"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <i className={`fas fa-chevron-${i18n.language === 'ar' ? 'right' : 'left'}`}></i>
                      </button>

                      {getPageNumbers().map((page, index) => (
                        <button
                          key={index}
                          className={`pagination-btn ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}
                          onClick={() => typeof page === 'number' && setCurrentPage(page)}
                          disabled={page === '...'}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        className="pagination-btn prev-next"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        <i className={`fas fa-chevron-${i18n.language === 'ar' ? 'left' : 'right'}`}></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="products-popup-overlay">
          <div className={`products-popup ${currentFavoriteState ? 'products-popup-success' : 'products-popup-remove'} ${popupAnimation}`}>
            <i className={`fas ${currentFavoriteState ? 'fa-heart' : 'fa-heart-broken'} products-popup-icon`}></i>
            <span className="products-popup-text">{popupMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}