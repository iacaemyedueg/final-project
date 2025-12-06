import React from 'react';
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../../Context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';
import '../Product/products.css';

export default function Wishlist() {
  const { t } = useTranslation();
  const { wishlistItems, removeFromWishlist, clearWishlist, wishlistCount, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleRemoveItem = (id, e) => {
    e?.stopPropagation();
    removeFromWishlist(id);
  };

  const handleFavoriteClick = (product, e) => {
    e?.stopPropagation();
    toggleWishlist(product);
  };

  const goToDetails = (product, e) => {
    e?.stopPropagation();
    navigate(`/productDetails/${product.id}`, {
      state: { fromCategory: product.category }
    });
  };

  return (
    <div className="wishlist-container bg-light min-vh-100 py-4">
      <div className="container">

        {/* HEADER */}
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h1 className="wishlist-title fw-bold mb-0">
              {t('wishlist.title')} ({wishlistCount})
            </h1>

            {wishlistItems.length > 0 && (
              <button className="btn btn-outline-danger btn-sm" onClick={clearWishlist}>
                <i className="fas fa-trash me-2"></i>{t('wishlist.clearAll')}
              </button>
            )}
          </div>
          <hr className="wishlist-divider mt-3"/>
        </div>


        {/* IF ITEMS EXIST */}
        {wishlistItems.length > 0 ? (
          <div className="row g-4">
            {wishlistItems.map(product => (
              <div key={product.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div className="product-card h-100" onClick={() => goToDetails(product)}>

                  <div className="card-image position-relative">
                    <img src={product.image} alt={product.name} className="main-image w-100 h-100"/>
                    <img src={product.hoverImage} alt="hover" className="hover-image w-100 h-100"/>

                    <div className="card-actions position-absolute">
                      <button className="action-btn favorite-active" onClick={(e)=>handleFavoriteClick(product,e)}>
                        <i className="fas fa-heart text-danger"></i>
                      </button>

                      <button className="action-btn" onClick={(e)=>goToDetails(product,e)}>
                       <i className="far fa-eye"></i>
                      </button>
                    </div>
                  </div>

                  <div className="card-info">
                    <h3 className="product-title">
                      {product.name.split(" ").slice(0,2).join(" ")}
                    </h3>
                    <p className="product-desc">{product.description}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (

          // IF EMPTY VIEW
          <div className="empty-wishlist text-center py-5">
            <div className="empty-wishlist-icon mb-4">
              <i className="fas fa-heart-broken"></i>
            </div>

            <h3 className="empty-wishlist-title mb-3">{t('wishlist.emptyTitle')}</h3>
            <p className="empty-wishlist-text mb-4">{t('wishlist.emptyText')}</p>

        
          </div>
        )}

      </div>
    </div>
  );
}
