import React, {useState} from 'react'

const Students_name = () => {
     const students = [
    { name: "Asha", dept: "CSE" },
    { name: "Asha", dept: "IT" },
    { name: "Ravi", dept: "Mechanical" },
    { name: "Ravi", dept: "EEE" },
    { name: "Meera", dept: "ECE" },
    { name: "Karan", dept: "Civil" }
  ];

  const [search, setSearch] = useState("");

  // Filter by name (case-insensitive)
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <div>
      <div style={{ padding: "20px" }}>
      <h2>Student Database</h2>

      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      {/* Display results */}
      <ul style={{ marginTop: "20px" }}>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <li key={index}>
              {student.name} — <b>{student.dept}</b>
            </li>
          ))
        ) : (
          <p>No matching students found.</p>
        )}
      </ul>
    </div>
    </div>
  )
}

export default Students_name
