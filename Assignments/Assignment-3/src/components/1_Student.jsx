import React from 'react'
import students from './assets/students.json'

const Student = () => {
  return (
    <div className="container my-4" style={{display:"flex"}}>
      <div className="row" style={{display:"flex"}} >
        {students.map((s,i)=>(
          <div key={i} className="col-md-6 col-lg-4 mb-4" >
            <div className="card shodow h-100" style={{ backgroundColor:"blue",margin:"10px"}}>
             <div className="card-body" style={{ backgroundColor:"red", padding:"5px"}}>
              <h4 className="card-title text-primary">{s.name}</h4>
                <h6 className="card-subtitle mb-3 text-muted">{s.dept}</h6>
               <h6 className="card-subtitle mb-3 text-muted">{s.year}</h6>
               </div> 
               </div>
            </div>
         
        ))}
      </div>
     
    </div>
  )
}

export default Student
