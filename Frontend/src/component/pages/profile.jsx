
import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const emptyUser = {
    name: "",
    email: "",
    phone: "",
    university: "",
    bio: "",
  };

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("unitrade_user")) || emptyUser;
    } catch {
      return emptyUser;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("unitrade_products")) || [];
    } catch {
      return [];
    }
  });

  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");

  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("unitrade_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("unitrade_products", JSON.stringify(products));
  }, [products]);

  const hasProfile = Object.values(user).some(
    (value) => value.trim() !== ""
  );

  function handleUserChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function saveProfile(e) {
    e.preventDefault();
    setShowProfileForm(false);
  }

  function handleProductChange(e) {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  }

  function addProduct(e) {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      ...productForm,
    };

    setProducts((prev) => [...prev, newProduct]);

    setProductForm({
      name: "",
      category: "",
      price: "",
      description: "",
    });

    setShowProductForm(false);
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  return (
    <div className="up-dashboard">
      <aside className="up-sidebar">
        <h2 className="up-logo">UniTrade</h2>

        <nav>
          {["Profile", "My Listings", "Favorites", "Orders"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`up-nav-button ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      <main className="up-main">
        <header className="up-header">
          <h1>{activeTab}</h1>
        </header>

        {activeTab === "Profile" && (
          <section className="up-profile-section">
            <div className="up-profile-card">
              <div className="up-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>

              <h2>{user.name || "Your Name"}</h2>
              <p>{user.university || "Your University"}</p>

              <button
                type="button"
                className="up-primary-button"
                onClick={() => setShowProfileForm(true)}
              >
                {hasProfile ? "Edit Profile" : "Complete Profile"}
              </button>
            </div>

            <div className="up-details-card">
              <h2>Personal Information</h2>

              <p>
                <strong>Name:</strong> {user.name || "Not added yet"}
              </p>
              <p>
                <strong>Email:</strong> {user.email || "Not added yet"}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone || "Not added yet"}
              </p>
              <p>
                <strong>University:</strong>{" "}
                {user.university || "Not added yet"}
              </p>
              <p>
                <strong>About Me:</strong> {user.bio || "Not added yet"}
              </p>
            </div>
          </section>
        )}

        {activeTab === "My Listings" && (
          <section className="up-listings-section">
            <div className="up-section-heading">
              <h2>My Products</h2>

              <button
                type="button"
                className="up-primary-button"
                onClick={() => setShowProductForm(true)}
              >
                + Add Product
              </button>
            </div>

            {products.length === 0 ? (
              <div className="up-empty-state">
                <h3>No products yet</h3>
                <p>Your products will appear here after you add them.</p>
              </div>
            ) : (
              <div className="up-products-grid">
                {products.map((product) => (
                  <div className="up-product-card" key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <p className="up-price">{product.price} EGP</p>
                    <p>{product.description}</p>

                    <button
                      type="button"
                      className="up-delete-button"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "Favorites" && (
          <div className="up-empty-state">
            <h3>No favorites yet</h3>
            <p>Your favorite products will appear here.</p>
          </div>
        )}

        {activeTab === "Orders" && (
          <div className="up-empty-state">
            <h3>No orders yet</h3>
            <p>Your orders will appear here.</p>
          </div>
        )}
      </main>

      {/* PROFILE MODAL */}
      {showProfileForm && (
        <div
          className="up-modal-overlay"
          onClick={() => setShowProfileForm(false)}
        >
          <div
            className="up-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="up-close-button"
              onClick={() => setShowProfileForm(false)}
            >
              ×
            </button>

            <h2>Complete Your Profile</h2>
            <p className="up-modal-description">
              Enter your personal information.
            </p>

            <form onSubmit={saveProfile}>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleUserChange}
                placeholder="Enter your name"
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleUserChange}
                placeholder="Enter your email"
              />

              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleUserChange}
                placeholder="Enter your phone number"
              />

              <label>University</label>
              <input
                type="text"
                name="university"
                value={user.university}
                onChange={handleUserChange}
                placeholder="Enter your university"
              />

              <label>About Me</label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleUserChange}
                placeholder="Tell us about yourself"
                rows="3"
              />

              <button type="submit" className="up-primary-button up-save-button">
                Save Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showProductForm && (
        <div
          className="up-modal-overlay"
          onClick={() => setShowProductForm(false)}
        >
          <div
            className="up-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="up-close-button"
              onClick={() => setShowProductForm(false)}
            >
              ×
            </button>

            <h2>Add New Product</h2>

            <form onSubmit={addProduct}>
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleProductChange}
                placeholder="Enter product name"
                required
              />

              <label>Category</label>
              <input
                type="text"
                name="category"
                value={productForm.category}
                onChange={handleProductChange}
                placeholder="Enter category"
                required
              />

              <label>Price (EGP)</label>
              <input
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleProductChange}
                placeholder="Enter price"
                min="0"
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleProductChange}
                placeholder="Describe your product"
                rows="3"
              />

              <button type="submit" className="up-primary-button up-save-button">
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
