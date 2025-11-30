import React, {useState} from 'react'

const Profile = () => {
    const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,     // update the specific field dynamically
    });
  };
  return (
    <div>
      <div style={{ padding: "20px" }}>
      <h2>Edit Profile</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          style={{ padding: "6px", marginLeft: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          style={{ padding: "6px", marginLeft: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Phone: </label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          style={{ padding: "6px", marginLeft: "10px" }}
        />
      </div>

      <h3 style={{ marginTop: "20px" }}>Updated Profile:</h3>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
    </div>
    </div>
  )
}

export default Profile
