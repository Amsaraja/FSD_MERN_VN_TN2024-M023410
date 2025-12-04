import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function DepartmentCard({dept}){
const nav = useNavigate()
return (
<div className="card">
<h3>{dept.name}</h3>
<p className="muted">{dept.description}</p>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
<button className="btn" onClick={()=>nav(`/departments/${dept.id}`)}>View More</button>
<small className="muted">{dept.courses?.length} courses</small>
</div>
</div>
)
}