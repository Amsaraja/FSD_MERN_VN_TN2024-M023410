import React from 'react'
export default function Footer(){
return (
<footer className="footer">
<div className="container">
<div className="footer-content">
<div className="footer-section">
<h4>College Info Portal</h4>
<p>Excellence in Education Since 1995</p>
<p>© {new Date().getFullYear()} All Rights Reserved</p>
</div>
<div className="footer-section">
<h4>Contact Info</h4>
<p>📧 info@college.edu</p>
<p>📞 +91 1234567891</p>
<p>📍 123 Education St, Egmore, Chennai</p>
</div>
<div className="footer-section">
<h4>Quick Links</h4>
<p>Home | About | Departments</p>
<p>Contact | Department Details</p>

</div>
</div>
</div>
</footer>
)
}