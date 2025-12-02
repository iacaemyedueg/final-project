import React, { useRef, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import "./Profile.css";

const Profile = () => {
  const profileRef = useRef(null);
  const cardsRef = useRef([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",  
    lastName: "",
    email: ""
  });
  const [tempData, setTempData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [addressData, setAddressData] = useState({
    country: "Egypt",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postalCode: "",
    governorate: "6th of October",
    city: "",
    phone: ""
  });
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (profileRef.current) {
      profileRef.current.classList.add('loaded');
    }
    
    const timer = setTimeout(() => {
      cardsRef.current.forEach(card => {
        if (card) card.classList.add('loaded');
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const showBootstrapToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  // دالة علشان نجيب الحرف الأول من كل اسم
  const getInitials = () => {
    const first = userData.firstName?.trim() || "";
    const last = userData.lastName?.trim() || "";
    
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
    } else if (first) {
      return first.charAt(0).toUpperCase();
    } else if (last) {
      return last.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getFullName = () => {
    const first = userData.firstName?.trim() || "";
    const last = userData.lastName?.trim() || "";
    
    if (first && last) {
      return `${first} ${last}`;
    } else if (first) {
      return first;
    } else if (last) {
      return last;
    }
    return "Your Name";
  };

  const handleEditClick = () => {
    setTempData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email
    });
    setShowEditModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserData({
      firstName: tempData.firstName,
      lastName: tempData.lastName,
      email: tempData.email
    });
    setShowEditModal(false);
    showBootstrapToast("Profile updated successfully!");
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    
    if (editingAddress) {
      const updatedAddresses = addresses.map(address => 
        address.id === editingAddress.id 
          ? { ...addressData, id: editingAddress.id, isDefault: address.isDefault }
          : address
      );
      setAddresses(updatedAddresses);
      showBootstrapToast("Address updated successfully!");
    } else {

      const newAddress = {
        id: Date.now(),
        country: addressData.country,
        firstName: addressData.firstName,
        lastName: addressData.lastName,
        address: addressData.address,
        apartment: addressData.apartment,
        postalCode: addressData.postalCode,
        governorate: addressData.governorate,
        city: addressData.city,
        phone: addressData.phone,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, newAddress]);
      showBootstrapToast("Address added successfully!");
    }
    
    setShowAddAddressModal(false);
    setEditingAddress(null);
    
    setAddressData({
      country: "Egypt",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      postalCode: "",
      governorate: "6th of October",
      city: "",
      phone: ""
    });
  };

  const handleCancelAddress = () => {
    setShowAddAddressModal(false);
    setEditingAddress(null);
    setAddressData({
      country: "Egypt",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      postalCode: "",
      governorate: "6th of October",
      city: "",
      phone: ""
    });
  };

  const handleEditAddress = () => {
    if (addresses.length > 0) {
      const addressToEdit = addresses[0]; 
      setEditingAddress(addressToEdit);
      
      setAddressData({
        country: addressToEdit.country,
        firstName: addressToEdit.firstName,
        lastName: addressToEdit.lastName,
        address: addressToEdit.address,
        apartment: addressToEdit.apartment || "",
        postalCode: addressToEdit.postalCode,
        governorate: addressToEdit.governorate,
        city: addressToEdit.city,
        phone: addressToEdit.phone
      });
      
      setShowAddAddressModal(true);
    }
  };

  const getEmailDisplay = () => {
    return userData.email?.trim() || "your.email@example.com";
  };

  return (
    <div className="profile-container" ref={profileRef}>
      
      <div 
        className={`toast position-fixed top-0 start-50 translate-middle-x mt-3 ${showToast ? 'show' : ''}`}
        style={{zIndex: 2000}}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex bg-success text-white p-3 rounded">
          <div className="toast-body d-flex align-items-center">
            <span className="me-2 fs-5">✓</span>
            <strong>{toastMessage}</strong>
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white ms-auto align-self-start"
            onClick={() => setShowToast(false)}
            aria-label="Close"
          ></button>
        </div>
      </div>

      {/* Header Section */}
      <div className="profile-header">
        <div className="avatar-section">
          <div className="avatar">{getInitials()}</div>
          <div className="user-info">
            <h1 className="user-name">{getFullName()}</h1>
            <p className="user-email">{getEmailDisplay()}</p>
          </div>
        </div>
        <button className="edit-btn" onClick={handleEditClick}>Edit Profile</button>
      </div>

      {/* Addresses Section */}
      <div className="section" ref={addToRefs}>
        <div className="section-header">
          <h2 className="section-title">My Addresses</h2>
        
          <button 
            className={addresses.length === 0 ? "add-btn" : "edit-address-main-btn"} 
            onClick={addresses.length === 0 ? () => setShowAddAddressModal(true) : handleEditAddress}
          >
            {addresses.length === 0 ? "Add New Address" : "Edit"}
          </button>
        </div>

        {addresses.length === 0 ? (
          // Empty State - لما مفيش عناوين
          <div className="empty-state" ref={addToRefs}>
            <h3 className="empty-title">No addresses yet</h3>
            <p className="empty-description">Add your first address to get started with shopping</p>
            {/* <button className="cta-btn" onClick={() => setShowAddAddressModal(true)}>Add Your First Address</button> */}
          </div>
        ) : (
          // Address Cards - لما يبقى في عناوين
          <div className="addresses-list">
            {addresses.map(address => (
              <div key={address.id} className="address-card">
                <div className="address-header">
                  <h3 className="address-name">
                    {address.firstName} {address.lastName}
                  </h3>
                  {address.isDefault && (
                    <span className="default-badge">Default</span>
                  )}
                </div>
                
                <div className="address-details">
                  <p className="address-line">{address.address}</p>
                  {address.apartment && (
                    <p className="address-line">{address.apartment}</p>
                  )}
                  <p className="address-line">
                    {address.city}, {address.governorate}, {address.postalCode}
                  </p>
                  <p className="address-line">{address.country}</p>
                  <p className="address-phone">Phone: {address.phone}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="edit-profile-modal">
            <div className="modal-header">
              {/* <h2 className="modal-title">Edit profile</h2> */}
            </div>
            
            <form className="modal-form" onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">First name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  placeholder="Enter your first name"
                  value={tempData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  placeholder="Enter your last name"
                  value={tempData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={tempData.email}
                  onChange={handleInputChange}
                />
                <p className="email-note">This email is used for sign-in and order updates</p>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="save-btn"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Address Modal */}
      {showAddAddressModal && (
        <div className="modal-overlay">
          <div className="add-address-modal">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingAddress ? "Edit address" : "Add address"}
              </h2>
              <div className="address-default-badge">
                <span className="default-badge-text">This is my default address</span>
              </div>
            </div>
            
            <form className="modal-form" onSubmit={handleSaveAddress}>
              <div className="form-group">
                <label className="form-label">Country/region</label>
                <select 
                  name="country"
                  className="form-input form-select"
                  value={addressData.country}
                  onChange={handleAddressInputChange}
                >
                  <option value="Egypt">Egypt</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    placeholder="Enter your first name"
                    value={addressData.firstName}
                    onChange={handleAddressInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    placeholder="Enter your last name"
                    value={addressData.lastName}
                    onChange={handleAddressInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-input"
                  placeholder="Enter your address"
                  value={addressData.address}
                  onChange={handleAddressInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Apartment, suite, etc (optional)</label>
                <input
                  type="text"
                  name="apartment"
                  className="form-input"
                  placeholder="Enter apartment, suite, etc"
                  value={addressData.apartment}
                  onChange={handleAddressInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Postal code</label>
                  <input
                    type="text"
                    name="postalCode"
                    className="form-input"
                    placeholder="Enter postal code"
                    value={addressData.postalCode}
                    onChange={handleAddressInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Governorate</label>
                  <select 
                    name="governorate"
                    className="form-input form-select"
                    value={addressData.governorate}
                    onChange={handleAddressInputChange}
                  >
                    <option value="6th of October">6th of October</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Giza">Giza</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-input"
                  placeholder="Enter your city"
                  value={addressData.city}
                  onChange={handleAddressInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <div className="phone-input-container">
                  <span className="phone-prefix">+20</span>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input phone-input"
                    placeholder="Enter your phone number"
                    value={addressData.phone}
                    onChange={handleAddressInputChange}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button"
                  className="cancel-btn" 
                  onClick={handleCancelAddress}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="save-btn"
                >
                  {editingAddress ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;