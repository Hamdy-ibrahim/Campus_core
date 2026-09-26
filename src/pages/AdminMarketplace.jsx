import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminMarketplace() {

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    category: "Other",
    description: "",
    emoji: "📦",
    seller: "",
    sellerEmail: ""
  });

  // Get marketplace items from API
  useEffect(() => {
    fetch("http://localhost:5000/api/marketplace")
      .then(res => res.json())
      .then(data => {
        setItems(data);
      })
      .catch(err => {
        console.error("Failed to load marketplace:", err);
      });
  }, []);

  // Add marketplace item
  async function addItem() {

    if (
      !newItem.title ||
      !newItem.price ||
      !newItem.seller ||
      !newItem.sellerEmail ||
      !newItem.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/marketplace",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newItem)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to add item");
        return;
      }

      // Add the item returned by the API
      setItems(prevItems => [
        data,
        ...prevItems
      ]);

      // Clear form
      setNewItem({
        title: "",
        price: "",
        category: "Other",
        description: "",
        emoji: "📦",
        seller: "",
        sellerEmail: ""
      });

      alert("Item added successfully!");

    } catch (err) {

      console.error(err);
      alert("Could not connect to the server.");

    }
  }

  // Delete marketplace item
  async function deleteItem(id) {

    if (!window.confirm("Delete this listing?")) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/marketplace/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to delete item");
        return;
      }

      setItems(prevItems =>
        prevItems.filter(item => item.id !== id)
      );

    } catch (err) {

      console.error(err);
      alert("Could not connect to the server.");

    }
  }

  return (
    <div className="admin-page">

      <AdminSidebar />

      <div className="admin-content">

        <h1>Marketplace Management</h1>

        <div className="admin-form">

          <input
            type="text"
            placeholder="Item Name"
            value={newItem.title}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                title: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Price (KES)"
            value={newItem.price}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                price: e.target.value
              })
            }
          />

          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                category: e.target.value
              })
            }
          >
            <option>Books</option>
            <option>Electronics</option>
            <option>Furniture</option>
            <option>Fashion</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            placeholder="Seller Name"
            value={newItem.seller}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                seller: e.target.value
              })
            }
          />

          <input
            type="email"
            placeholder="Seller Email"
            value={newItem.sellerEmail}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                sellerEmail: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                description: e.target.value
              })
            }
          />

          <select
            value={newItem.emoji}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                emoji: e.target.value
              })
            }
          >
            <option>📦</option>
            <option>📚</option>
            <option>💻</option>
            <option>📱</option>
            <option>🪑</option>
            <option>🎧</option>
            <option>⌚</option>
            <option>👕</option>
          </select>

          <button onClick={addItem}>
            Add Item
          </button>

        </div>

        <table className="admin-table">

          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Category</th>
              <th>Seller</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {items.map((item) => (

              <tr key={item.id}>

                <td>{item.emoji} {item.title}</td>

                <td>
                  KES {Number(item.price).toLocaleString()}
                </td>

                <td>{item.category}</td>

                <td>{item.seller}</td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminMarketplace;