import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Departments from './pages/Departments'
import DepartmentDetail from './pages/DepartmentDetail'
import Contact from './pages/Contact'


export default function App(){
return (
<div>
<Header />
<main style={{minHeight:'70vh'}}>
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/about" element={<About/>} />
<Route path="/departments" element={<Departments/>} />
<Route path="/departments/:id" element={<DepartmentDetail/>} />
<Route path="/contact" element={<Contact/>} />
</Routes>
</main>
<Footer />
</div>
)
}