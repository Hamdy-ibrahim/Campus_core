import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/shared.css";

function Marketplace() {

const currentUser = JSON.parse(
localStorage.getItem("loggedInUser")
);

const [search, setSearch] = useState("");

const [items, setItems] = useState([]);

useEffect(()=>{

const savedItems = JSON.parse(
localStorage.getItem("marketplaceItems")
);

if(savedItems){

setItems(savedItems);

}
else{

const demoItems=[

{
id:1,
emoji:"💻",
title:"Dell Latitude Laptop",
category:"Electronics",
price:45000,
seller:"Brian",
description:"Core i7 • 16GB RAM • 512GB SSD"
},

{
id:2,
emoji:"📚",
title:"Java Programming Book",
category:"Books",
price:1200,
seller:"Mary",
description:"Excellent condition."
},

{
id:3,
emoji:"🪑",
title:"Study Chair",
category:"Furniture",
price:3500,
seller:"Kevin",
description:"Comfortable wooden chair."
},

{
id:4,
emoji:"🎧",
title:"Wireless Headphones",
category:"Electronics",
price:5000,
seller:"Sarah",
description:"Noise cancelling."
}

];

localStorage.setItem(
"marketplaceItems",
JSON.stringify(demoItems)
);

setItems(demoItems);

}

},[]);

const filteredItems = items.filter(item=>

item.title.toLowerCase().includes(search.toLowerCase())

);

return(

<div className="dashboard">

<Sidebar/>

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

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

<div className="market-grid">

{filteredItems.map(item=>(

<div
className="market-card"
key={item.id}
>

<div className="market-emoji">

{item.emoji}

</div>

<h3>

{item.title}

</h3>

<h2>

KES {item.price}

</h2>

<p>

{item.description}

</p>

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