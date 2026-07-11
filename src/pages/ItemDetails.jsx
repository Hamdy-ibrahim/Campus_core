import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/shared.css";

function ItemDetails() {

const { id } = useParams();

const navigate = useNavigate();

const [item, setItem] = useState(null);

useEffect(() => {

const items = JSON.parse(
localStorage.getItem("marketplaceItems")
) || [];

const selected = items.find(
item => item.id === Number(id)
);

setItem(selected);

}, [id]);

if(!item){

return(

<div className="dashboard">

<Sidebar/>

<main className="main-content">

<h2>Item not found.</h2>

<button
className="back-btn"
onClick={()=>navigate("/marketplace")}
>

← Back

</button>

</main>

</div>

);

}

return(

<div className="dashboard">

<Sidebar/>

<main className="main-content">

<button
className="back-btn"
onClick={()=>navigate("/marketplace")}
>

← Back to Marketplace

</button>

<div className="club-header">

<div>

<div
style={{
fontSize:"80px",
marginBottom:"15px"
}}
>

{item.emoji}

</div>

<h1>

{item.title}

</h1>

<p>

{item.description}

</p>

</div>

<h1
style={{
color:"#2563eb"
}}
>

KES {item.price}

</h1>

</div>

<div className="club-stats">

<div>

<h2>

{item.category}

</h2>

<p>Category</p>

</div>

<div>

<h2>

{item.seller}

</h2>

<p>Seller</p>

</div>

<div>

<h2>

Available

</h2>

<p>Status</p>

</div>

<div>

<h2>

CampusCore

</h2>

<p>Marketplace</p>

</div>

</div>

<div className="details-grid">

<div>

<div className="detail-card">

<h2>

📝 Description

</h2>

<p>

{item.description}

</p>

</div>

</div>

<div>

<div className="detail-card">

<h2>

👤 Seller Information

</h2>

<p>

<strong>Name:</strong> {item.seller}

</p>

<p>

<strong>Category:</strong> {item.category}

</p>

<p>

<strong>Price:</strong> KES {item.price}

</p>

<button
className="register-btn"
style={{
marginTop:"20px",
width:"100%"
}}
>

Contact Seller

</button>

</div>

</div>

</div>

</main>

</div>

);

}

export default ItemDetails;