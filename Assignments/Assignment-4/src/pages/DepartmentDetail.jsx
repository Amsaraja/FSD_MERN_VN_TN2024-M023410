import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import departmentsJson from '../data/departments.json'


export default function DepartmentDetail(){
const { id } = useParams()
const [dept, setDept] = useState(null)


useEffect(()=>{
const found = departmentsJson.find(d => d.id === id)
setDept(found || null)
},[id])


if(!dept) return <div className="container"><p style={{marginTop:12}}>Department not found.</p></div>


return (
<div className="container">
<h1 style={{marginTop:12}}>{dept.name}</h1>
<p className="muted">{dept.fullDescription}</p>


<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginTop:12}}>
<div className="card">
<h3>Courses Offered</h3>
<ul style={{listStyle:'none', padding:0}}>
{dept.courses.map(c => <li key={c}>{c}</li>)}
</ul>
</div>


<div className="card">
<h3>Faculty</h3>
<ul style={{listStyle:'none', padding:0}}>
{dept.faculty.map(f => <li key={f}>{f}</li>)}
</ul>
</div>
</div>


<div className="card" style={{marginTop:12}}>
<h3>Labs & Facilities</h3>
<ul style={{listStyle:'none', padding:0}}>
{dept.labs.map(l => <li key={l}>{l}</li>)}
</ul>
</div>
</div>
)
}