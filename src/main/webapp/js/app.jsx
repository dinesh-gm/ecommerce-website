const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 1999, category: "Electronics" },
  { id: 2, name: "Smart Watch", price: 2499, category: "Electronics" },
  { id: 3, name: "Running Shoes", price: 1799, category: "Fashion" },
  { id: 4, name: "Backpack", price: 1299, category: "Fashion" },
  { id: 5, name: "Coffee Mug", price: 299, category: "Home" },
  { id: 6, name: "Notebook", price: 149, category: "Stationery" }
];

function App() {
  const [cart, setCart] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("All");

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const current = prev[product.id] || 0;
      return { ...prev, [product.id]: current + 1 };
    });
  };

  const decreaseFromCart = (productId) => {
    setCart(prev => {
      const current = prev[productId] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: current - 1 };
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = PRODUCTS.find(p => p.id === Number(id));
    return { product, qty };
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cartItems.reduce(
    (sum, { product, qty }) => sum + product.price * qty,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    alert(
      `Order placed! Items: ${totalItems}, Total: ₹${totalAmount}. (Demo only)`
    );
  };

  return (
    <div className="app-container">
      <header style={{ marginBottom: 16 }}>
        <h1>Mini Ecommerce Store</h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
          Demo React + JSX app packaged with Maven and deployed on Tomcat.
        </p>
      </header>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <div>
          <span className="badge">
            Cart: {totalItems}
          </span>
        </div>
      </div>

      <section>
        <h2>Products</h2>
        {filteredProducts.length === 0 ? (
          <p className="empty">No products match your search.</p>
        ) : (
          <div className="product-list">
            {filteredProducts.map(product => {
              const qtyInCart = cart[product.id] || 0;
              return (
                <div key={product.id} className="product-card">
                  <div className="product-name">{product.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    {product.category}
                  </div>
                  <div className="product-price">₹{product.price}</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                    {qtyInCart > 0 && (
                      <>
                        <button
                          className="btn btn-secondary"
                          onClick={() => decreaseFromCart(product.id)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: "0.85rem" }}>
                          {qtyInCart} in cart
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="cart">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty">Cart is empty. Add some products!</p>
        ) : (
          <>
            {cartItems.map(({ product, qty }) => (
              <div key={product.id} className="cart-item">
                <div>
                  <div className="cart-item-name">{product.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    Qty: {qty} × ₹{product.price}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => decreaseFromCart(product.id)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                  <button
                    className="btn"
                    style={{ background: "#f97373", color: "#ffffff" }}
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <div>
                <strong>Total:</strong> ₹{totalAmount}
              </div>
              <button className="btn btn-primary" onClick={handleCheckout}>
                Checkout (Demo)
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
