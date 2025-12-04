import React, {useState} from 'react'
import departmentsJson from '../data/departments.json'


export default function Contact(){
const [form, setForm] = useState({name:'',email:'',dept:'',message:''})
const [submitted, setSubmitted] = useState(null)


function handleChange(e){
setForm(prev=>({...prev,[e.target.name]:e.target.value}))
}
function handleSubmit(e){
e.preventDefault()
setSubmitted(form)
setForm({name:'',email:'',dept:'',message:''})
}


return (
<div className="container">
<section>
<h1>Contact Us</h1>
<form onSubmit={handleSubmit} style={{maxWidth:600,marginTop:12}}>
<div className="form-row">
<label>Name</label>
<input name="name" value={form.name} onChange={handleChange} required />
</div>
<div className="form-row">
<label>Email</label>
<input name="email" type="email" value={form.email} onChange={handleChange} required />
</div>
<div className="form-row">
<label>Department</label>
<select name="dept" value={form.dept} onChange={handleChange} required>
<option value="">Select</option>
{departmentsJson.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
</select>
</div>
<div className="form-row">
<label>Message</label>
<textarea name="message" rows="4" value={form.message} onChange={handleChange} required />
</div>
<button className="btn" type="submit">Submit</button>
</form>
</section>

{submitted && (
<section>
<h3>Submitted Details</h3>
<p><strong>Name:</strong> {submitted.name}</p>
<p><strong>Email:</strong> {submitted.email}</p>
<p><strong>Department:</strong> {departmentsJson.find(d=>d.id===submitted.dept)?.name || submitted.dept}</p>
<p><strong>Message:</strong> {submitted.message}</p>
</section>
)}
</div>
)
}