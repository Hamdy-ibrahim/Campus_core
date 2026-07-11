import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function ClubDetails() {

const [searchParams] = useSearchParams();
const selectedClub = searchParams.get("club");

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

const clubKey = currentUser
  ? "joinedClubs_" + currentUser.email
  : "joinedClubs_guest";

const [joined, setJoined] = useState(false);
function joinClub() {

  if (joined) {

    alert("You have already joined this club.");

    return;

  }

  const saved =
    JSON.parse(localStorage.getItem(clubKey)) || [];

  saved.push(club.name);

  localStorage.setItem(
    clubKey,
    JSON.stringify(saved)
  );

  setJoined(true);

  alert("Successfully joined the club!");

}

const clubs = {

mathematics:{

name:"📐 Mathematics Society",

category:"Academic Club",

members:"84 Members",

meeting:"Monday",

venue:"Mathematics Block",

president:"Sarah Ahmed",

description:
"The Mathematics Society brings together students who enjoy solving problems, participating in mathematics competitions and helping fellow students improve their analytical skills.",

activities:[
"Weekly Problem Solving",
"Math Olympiad",
"Peer Tutoring"
]

},

debate:{

name:"🎤 Debate Society",

category:"Academic Club",

members:"95 Members",

meeting:"Tuesday",

venue:"Lecture Hall 3",

president:"David Kim",

description:
"Develop confidence, communication skills and critical thinking through debates and public speaking competitions.",

activities:[
"Weekly Debates",
"Public Speaking",
"Competitions"
]

},

accounting:{

name:"📚 Accounting Club",

category:"Academic Club",

members:"61 Members",

meeting:"Thursday",

venue:"Business Block",

president:"Aisha Omar",

description:
"Learn accounting principles, financial literacy and entrepreneurship through workshops and guest speakers.",

activities:[
"Finance Workshops",
"Business Talks",
"Case Studies"
]

},

programming:{

name:"💻 Programming Club",

category:"Technology Club",

members:"145 Members",

meeting:"Friday",

venue:"ICT Lab",

president:"John Doe",

description:
"Learn Java, Python, JavaScript, Web Development and Artificial Intelligence while participating in hackathons.",

activities:[
"Hackathons",
"Coding Challenges",
"Projects"
]

},

robotics:{

name:"🤖 Robotics Club",

category:"Technology Club",

members:"76 Members",

meeting:"Wednesday",

venue:"Engineering Lab",

president:"Kevin Mwangi",

description:
"Build robots, automation systems and engineering projects for university competitions.",

activities:[
"Robot Building",
"Automation",
"Innovation Challenge"
]

},

cybersecurity:{

name:"🔒 Cyber Security Club",

category:"Technology Club",

members:"58 Members",

meeting:"Friday",

venue:"Cyber Lab",

president:"Grace Wanjiku",

description:
"Learn ethical hacking, digital forensics and cyber defence using practical hands-on workshops.",

activities:[
"CTFs",
"Pen Testing",
"Security Workshops"
]

},

football:{

name:"⚽ Football Club",

category:"Sports Club",

members:"110 Members",

meeting:"Wednesday",

venue:"Main Field",

president:"Brian Otieno",

description:
"Represent the university in football leagues while improving teamwork and fitness.",

activities:[
"Training",
"League Matches",
"Fitness"
]

},

basketball:{

name:"🏀 Basketball Club",

category:"Sports Club",

members:"82 Members",

meeting:"Tuesday",

venue:"Sports Arena",

president:"Michael Kariuki",

description:
"Weekly training sessions and inter-university basketball competitions.",

activities:[
"Training",
"Competitions",
"Fitness"
]

},

volleyball:{

name:"🏐 Volleyball Club",

category:"Sports Club",

members:"67 Members",

meeting:"Thursday",

venue:"Indoor Court",

president:"Faith Njeri",

description:
"Improve volleyball skills through training sessions and friendly matches.",

activities:[
"Practice",
"Tournaments",
"Fitness"
]

},

music:{

name:"🎵 Music Club",

category:"Entertainment Club",

members:"98 Members",

meeting:"Friday",

venue:"Auditorium",

president:"Joseph Mwangi",

description:
"Join singers, instrumentalists and bands to perform during university events.",

activities:[
"Choir",
"Band Practice",
"Talent Shows"
]

},

photography:{

name:"📸 Photography Club",

category:"Entertainment Club",

members:"54 Members",

meeting:"Saturday",

venue:"Media Studio",

president:"Mercy Ali",

description:
"Learn photography, editing and event coverage while building your portfolio.",

activities:[
"Photo Walks",
"Editing",
"Events"
]

},

dance:{

name:"💃 Dance Club",

category:"Entertainment Club",

members:"72 Members",

meeting:"Thursday",

venue:"Auditorium",

president:"Lilian Achieng",

description:
"Practice different dance styles and perform during campus festivals.",

activities:[
"Practice",
"Shows",
"Competitions"
]

},

council:{

name:"👔 Student Council",

category:"Leadership Club",

members:"25 Members",

meeting:"Monday",

venue:"Administration Block",

president:"Student President",

description:
"Represent student interests and organize university activities.",

activities:[
"Leadership",
"Meetings",
"Events"
]

},

entrepreneurship:{

name:"🚀 Entrepreneurship Club",

category:"Leadership Club",

members:"63 Members",

meeting:"Wednesday",

venue:"Innovation Hub",

president:"Patrick Maina",

description:
"Learn how to build startups and develop entrepreneurial skills.",

activities:[
"Pitch Events",
"Business Plans",
"Networking"
]

},

rotaract:{

name:"🌍 Rotaract Club",

category:"Leadership Club",

members:"44 Members",

meeting:"Saturday",

venue:"Conference Room",

president:"Mary Wambui",

description:
"Volunteer in community service and leadership projects.",

activities:[
"Community Service",
"Fundraising",
"Leadership"
]

}

};

const club = clubs[selectedClub];
useEffect(() => {

  const saved =
    JSON.parse(localStorage.getItem(clubKey)) || [];

  setJoined(saved.includes(club.name));

}, [club.name, clubKey]);

if(!club){

return <h2>Club not found.</h2>;

}
return (

<div className="dashboard">

<Sidebar />

<main className="main-content">

<Link to="/clubs" className="back-btn">

<i className="fa-solid fa-arrow-left"></i>

Back to Clubs

</Link>

<div className="club-header">

<div>

<span className="club-tag">

{club.category}

</span>

<h1>

{club.name}

</h1>

<p>

{club.description}

</p>

</div>

<button
className="join-big-btn"
onClick={joinClub}
disabled={joined}
>

{joined ? "✓ Joined" : "Join Club"}

</button>

</div>

<div className="club-stats">

<div>

<h2>{club.members}</h2>

<p>Members</p>

</div>

<div>

<h2>4.9 ⭐</h2>

<p>Rating</p>

</div>

<div>

<h2>{club.meeting}</h2>

<p>Meeting Day</p>

</div>

<div>

<h2>{club.venue}</h2>

<p>Venue</p>

</div>

</div>

<div className="details-grid">

<div>

<div className="detail-card">

<h2>

<i className="fa-solid fa-circle-info"></i>

About the Club

</h2>

<p>

{club.description}

</p>

</div>

<div className="detail-card">

<h2>

<i className="fa-solid fa-code"></i>

Activities

</h2>

<ul className="detail-list">

{club.activities.map((activity,index)=>(

<li key={index}>

{activity}

</li>

))}

</ul>

</div>

<div className="detail-card">

<h2>

<i className="fa-solid fa-circle-check"></i>

Membership Requirements

</h2>

<ul className="detail-list">

<li>Registered CampusCore student</li>

<li>No previous experience required</li>

<li>Attend club meetings regularly</li>

<li>Respect all club members</li>

</ul>

</div>

</div>
<div>

<div className="detail-card">

<h2>

<i className="fa-solid fa-users"></i>

Club Leadership

</h2>

<div className="leader">

<strong>President</strong>

<span>{club.president}</span>

</div>

<div className="leader">

<strong>Vice President</strong>

<span>Sarah Ahmed</span>

</div>

<div className="leader">

<strong>Secretary</strong>

<span>Brian Otieno</span>

</div>

</div>

<div className="detail-card">

<h2>

<i className="fa-solid fa-chart-line"></i>

Club Statistics

</h2>

<div className="stats-list">

<p>

<strong>Founded:</strong> 2018

</p>

<p>

<strong>Projects Completed:</strong> 34

</p>

<p>

<strong>Hackathons Won:</strong> 12

</p>

<p>

<strong>Current Members:</strong> {club.members}

</p>

</div>

</div>

</div>

</div>

</main>

</div>

);

}

export default ClubDetails;