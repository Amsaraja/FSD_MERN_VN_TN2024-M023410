import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Header(){
return (
<header>
<div className="container nav" style={{justifyContent:'space-between'}}>
<div style={{fontWeight:700,fontSize:'1.2rem'}}>College Info Portal</div>
<nav>
<NavLink to="/" end className={({isActive})=> isActive? 'active' : ''}>Home</NavLink>
<NavLink to="/about" className={({isActive})=> isActive? 'active' : ''} style={{marginLeft:8}}>About</NavLink>
<NavLink to="/departments" className={({isActive})=> isActive? 'active' : ''} style={{marginLeft:8}}>Departments</NavLink>
<NavLink to="/contact" className={({isActive})=> isActive? 'active' : ''} style={{marginLeft:8}}>Contact</NavLink>
</nav>
</div>
</header>
)
}