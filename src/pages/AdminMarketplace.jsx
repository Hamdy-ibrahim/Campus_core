import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

function AdminMarketplace() {

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    seller: ""
  });

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("marketplaceItems")) || [

        {
          id: 1,
          title: "HP Laptop",
          price: "KSh 45,000",
          seller: "John"
        },

        {
          id: 2,
          title: "Engineering Calculator",
          price: "KSh 3,000",
          seller: "Mary"
        }

      ];

    localStorage.setItem(
      "marketplaceItems",
      JSON.stringify(saved)
    );

    setItems(saved);

  }, []);

  function addItem() {

    if (
      !newItem.title ||
      !newItem.price ||
      !newItem.seller
    ) {

      alert("Please fill all fields.");

      return;

    }

    const updated = [

      ...items,

      {
        id: Date.now(),
        ...newItem
      }

    ];

    setItems(updated);

    localStorage.setItem(
      "marketplaceItems",
      JSON.stringify(updated)
    );

    setNewItem({
      title: "",
      price: "",
      seller: ""
    });

  }

  function deleteItem(id) {

    if (!window.confirm("Delete this listing?"))
      return;

    const updated = items.filter(
      item => item.id !== id
    );

    setItems(updated);

    localStorage.setItem(
      "marketplaceItems",
      JSON.stringify(updated)
    );

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
onChange={(e)=>
setNewItem({
...newItem,
title:e.target.value
})
}
/>

<input
type="text"
placeholder="Price"
value={newItem.price}
onChange={(e)=>
setNewItem({
...newItem,
price:e.target.value
})
}
/>

<input
type="text"
placeholder="Seller"
value={newItem.seller}
onChange={(e)=>
setNewItem({
...newItem,
seller:e.target.value
})
}
/>

<button onClick={addItem}>
Add Item
</button>

</div>

<table className="admin-table">

<thead>

<tr>

<th>Item</th>

<th>Price</th>

<th>Seller</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{items.map((item)=>(

<tr key={item.id}>

<td>{item.title}</td>

<td>{item.price}</td>

<td>{item.seller}</td>

<td>

<button
className="delete-btn"
onClick={()=>deleteItem(item.id)}
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