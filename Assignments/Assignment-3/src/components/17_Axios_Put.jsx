import React, {useEffect,useState} from 'react'

const Axios_Put = () => {
    const [user, setUser] = useState(null); // holds the user object
  const [loading, setLoading] = useState(true); // initial fetch loading
  const [error, setError] = useState(""); // fetch error
  const [updating, setUpdating] = useState(false); // PUT in progress
  const [message, setMessage] = useState(""); // success / failure message

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("https://dummyjson.com/users/1");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        // pick only fields we want to edit (you can add/remove)
        setUser({
          id: data.id,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || ""
        });
      } catch (err) {
        setError("Error loading data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Generic change handler for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated user via PUT
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    setMessage("");
    try {
      const res = await fetch(`https://dummyjson.com/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          phone: user.phone
        })
      });

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();

      // Update local state from response (dummyjson returns updated object)
      setUser((prev) => ({ ...prev, ...updated }));
      setMessage("User updated!");
    } catch (err) {
      console.error(err);
      setMessage("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "480px" }}>
      <h2>Edit User (ID: {user.id})</h2>

      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", fontSize: 14 }}>First Name</label>
          <input
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", fontSize: 14 }}>Last Name</label>
          <input
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", fontSize: 14 }}>Username</label>
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", fontSize: 14 }}>Email</label>
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", fontSize: 14 }}>Phone</label>
          <input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          style={{
            padding: "10px 16px",
            cursor: updating ? "not-allowed" : "pointer"
          }}
        >
          {updating ? "Updating..." : "Update User"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "12px", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
    </div>
  )
}

export default Axios_Put
