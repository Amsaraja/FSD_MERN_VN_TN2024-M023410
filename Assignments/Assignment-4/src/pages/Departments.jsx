import React, {useEffect, useState} from 'react'
import DepartmentCard from '../components/DepartmentCard'
import departmentsJson from '../data/departments.json'


export default function Departments(){
const [departments, setDepartments] = useState([])


useEffect(()=>{
// load from local json (imported above) — setting via useEffect to satisfy the requirement
setDepartments(departmentsJson)
},[])


return (
<div className="container">
<h1 style={{marginTop:12}}>Departments</h1>
<div className="grid" style={{marginTop:8}}>
{departments.map(d => <DepartmentCard key={d.id} dept={d} />)}
</div>
</div>
)
}