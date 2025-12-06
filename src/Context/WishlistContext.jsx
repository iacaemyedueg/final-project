import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

// Store image paths as strings instead of imported modules
const productImageMap = {
  1: { image: '/src/assets/img/images/Homes/1.3.jpg', hoverImage: '/src/assets/img/images/Homes/1.2.jpg' },
  2: { image: '/src/assets/img/images/Homes/2.1.jpg', hoverImage: '/src/assets/img/images/Homes/2.3.jpg' },
  3: { image: '/src/assets/img/images/Homes/3.2.jpg', hoverImage: '/src/assets/img/images/Homes/3.3.jpg' },
  7: { image: '/src/assets/img/images/Homes/4.2.jpg', hoverImage: '/src/assets/img/images/Homes/4.1.jpg' },
  8: { image: '/src/assets/img/images/mosque/1.2.jpg', hoverImage: '/src/assets/img/images/mosque/1.3.jpg' },
  9: { image: '/src/assets/img/images/mosque/2.2.jpg', hoverImage: '/src/assets/img/images/mosque/2.3.jpg' },
  10:{ image: '/src/assets/img/images/Travels/1.1.jpg', hoverImage: '/src/assets/img/images/Travels/1.2.jpg' }
};

export const WishlistProvider = ({ children }) => {

  // ------------- FIX APPLIED HERE ----------- //
  // ✓ data loads BEFORE React mounts
  // ✓ prevents overwrite caused by Strict Mode
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading wishlist:', error);
      return [];
    }
  });
  // ------------------------------------------- //

  // Auto-save wishlist changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('localStorage Save Error:', error);
    }
  }, [wishlistItems]);

  // Ensure product images format stays correct
  const getProductForWishlist = (product) => {
    if (product.image && product.hoverImage) {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: typeof product.image === 'string' ? product.image : productImageMap[product.id]?.image,
        hoverImage: typeof product.hoverImage === 'string' ? product.hoverImage : productImageMap[product.id]?.hoverImage,
        category: product.category
      };
    }

    if (product.images && Array.isArray(product.images)) {
      const img = productImageMap[product.id];
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: img?.image || product.images[0],
        hoverImage: img?.hoverImage || product.images[1] || product.images[0],
        category: product.category
      };
    }

    return product;
  };

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, getProductForWishlist(product)];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id) => wishlistItems.some(item => item.id === id);

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };

  const clearWishlist = () => setWishlistItems([]);

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount: wishlistItems.length,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};

export default WishlistContext;
