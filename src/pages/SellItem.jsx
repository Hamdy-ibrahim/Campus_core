import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/shared.css";

function SellItem() {

const navigate = useNavigate();

const currentUser = JSON.parse(
localStorage.getItem("loggedInUser")
);

const [title,setTitle] = useState("");
const [price,setPrice] = useState("");
const [category,setCategory] = useState("");
const [description,setDescription] = useState("");
const [emoji,setEmoji] = useState("📦");

function submitItem(e){

e.preventDefault();

const items = JSON.parse(
localStorage.getItem("marketplaceItems")
) || [];

const newItem = {

id: Date.now(),

title,

price,

category,

description,

emoji,

seller: currentUser.fullname,

sellerEmail: currentUser.email

};

items.push(newItem);

localStorage.setItem(
"marketplaceItems",
JSON.stringify(items)
);

alert("Item listed successfully!");

navigate("/marketplace");

}

return(

<div className="dashboard">

<Sidebar/>

<main className="main-content">

<section className="market-hero">

<h1>🛒 Sell an Item</h1>

<p>

Post an item for other students to buy.

</p>

</section>

<form
className="sell-form"
onSubmit={submitItem}
>

<label>Item Name</label>

<input
type="text"
required
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<label>Price (KES)</label>

<input
type="number"
required
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<label>Category</label>

<select
required
value={category}
onChange={(e)=>setCategory(e.target.value)}
>

<option value="">Choose Category</option>

<option>Books</option>

<option>Electronics</option>

<option>Furniture</option>

<option>Fashion</option>

<option>Other</option>

</select>

<label>Emoji</label>

<select
value={emoji}
onChange={(e)=>setEmoji(e.target.value)}
>

<option>📚</option>
<option>💻</option>
<option>📱</option>
<option>🪑</option>
<option>🎧</option>
<option>⌚</option>
<option>👕</option>
<option>📦</option>

</select>

<label>Description</label>

<textarea
rows="5"
required
value={description}
onChange={(e)=>setDescription(e.target.value)}
></textarea>

<button
className="sell-submit"
type="submit"
>

Post Item

</button>

</form>

</main>

</div>

);

}

export default SellItem;