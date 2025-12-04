import React from 'react'
import { Link } from 'react-router-dom'
import DepartmentCard from '../components/DepartmentCard'
import departmentsData from '../data/departments.json'


export default function Home(){
const allDepartments = departmentsData
return (
<div className="container">
<div className="hero">
<div style={{flex:1}}>
<h1>Welcome to Our College</h1>
<p className="muted">Empowering future leaders through excellence in education and research.</p>
<div style={{marginTop:12}}>
<Link to="/departments"><button className="btn">Explore Departments</button></Link> <br />
<Link to="/contact" style={{}}><button style={{marginTop:8}} className="btn">Contact Us</button></Link>
</div>
<div style={{flex:1}}>
<img 
  src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop" 
  alt="campus" 
  style={{
    width:'100%',
    height:'300px',
    objectFit:'cover',
    borderRadius:10,
    marginTop:24
  }} 
/>
</div>
</div>

</div>


<section style={{marginTop:12}}>
<h2>Why this college?</h2>
<p className="muted">Strong academics, active research, industry links and a vibrant campus life.</p>
<div className="grid" style={{marginTop:10}}>
<div className="card"><h4>Experienced Faculty</h4><p className="muted">Leaders in teaching and research.</p></div>
<div className="card"><h4>Modern Labs</h4><p className="muted">Hands-on labs & research centers.</p></div>
<div className="card"><h4>Placements</h4><p className="muted">Strong placement record with top recruiters.</p></div>
<div className="card"><h4>Student Life</h4><p className="muted">Clubs, sports and cultural events.</p></div>
</div>
</section>


<section style={{marginTop:16}}>
<h2>All Departments</h2>
<div className="grid" style={{marginTop:8}}>
{allDepartments.map(d => <DepartmentCard key={d.id} dept={d} />)}
</div>
</section>


</div>
)
}