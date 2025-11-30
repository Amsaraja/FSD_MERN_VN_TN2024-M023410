import React, { useEffect, useState }  from 'react'

const Fetch_limit = () => {
    const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0); // each page = 5 users
  const USERS_PER_PAGE = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://dummyjson.com/users?limit=20");
      const data = await res.json();
      setUsers(data.users);
    };

    fetchUsers();
  }, []);

  // calculate start & end indexes
  const start = page * USERS_PER_PAGE;
  const end = start + USERS_PER_PAGE;
  const currentUsers = users.slice(start, end);

  const nextPage = () => {
    if (end < users.length) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  return (
    <div>
       <div style={{ padding: "20px" }}>
      <h2>Users (Page {page + 1})</h2>

      {/* Show users */}
      <ul>
        {currentUsers.map((user) => (
          <li key={user.id} style={{ marginBottom: "8px" }}>
            {user.firstName} {user.lastName} — {user.email}
          </li>
        ))}
      </ul>

      {/* Pagination Buttons */}
      <button
        onClick={prevPage}
        disabled={page === 0}
        style={{ marginRight: "10px", padding: "6px 12px" }}
      >
        Prev
      </button>

      <button
        onClick={nextPage}
        disabled={end >= users.length}
        style={{ padding: "6px 12px" }}
      >
        Next
      </button>
    </div>
    </div>
  )
}

export default Fetch_limit
