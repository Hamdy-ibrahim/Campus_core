import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/shared.css";

function Marketplace() {

  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  // Get marketplace items from API
  useEffect(() => {

    fetch("http://localhost:5000/api/marketplace?status=active")
      .then(res => res.json())
      .then(data => {
        setItems(data);
      })
      .catch(err => {
        console.error("Failed to load marketplace:", err);
      });

  }, []);

  // Search items
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main-content">

        <section className="market-hero">

          <h1>🛒 Marketplace</h1>

          <p>
            Buy and sell items with fellow students.
          </p>

        </section>

        <section className="market-summary">

          <div className="summary-card">

            <h3>Available Listings</h3>

            <h1>{items.length}</h1>

            <p>
              Browse great deals around campus.
            </p>

          </div>

          <Link
            to="/sell-item"
            className="sell-btn"
          >
            + Sell Item
          </Link>

        </section>

        <div className="market-search">

          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="market-grid">

          {filteredItems.map(item => (

            <div
              className="market-card"
              key={item.id}
            >

              <div className="market-emoji">
                {item.emoji}
              </div>

              <h3>{item.title}</h3>

              <h2>
                KES {Number(item.price).toLocaleString()}
              </h2>

              <p>{item.description}</p>

              <span>
                Seller: {item.seller}
              </span>

              <div className="market-buttons">

                <Link
                  to={`/marketplace/${item.id}`}
                  className="details-btn"
                >
                  View Item
                </Link>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Marketplace;