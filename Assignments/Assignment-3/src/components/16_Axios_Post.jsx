
import React, { useState } from "react";
import axios from "axios";

const Axios_Post = () => {
      const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // dummyjson expects JSON and typically a userId with the post
      console.log('Sending post:', post);
      const response = await axios.post(
        "https://dummyjson.com/posts/add",
        { ...post, userId: 1 },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log('Response:', response);
      setMessage("Post Added! id: " + (response.data && response.data.id));
      setPost({ title: "", body: "" }); // clear form
    } catch (error) {
      // Provide a more helpful message for debugging
      const errDetails = error.response
        ? `${error.response.status} ${error.response.statusText} - ${JSON.stringify(
            error.response.data
          )}`
        : error.message;
      setMessage("Failed to add post: " + errDetails);
      console.error('Post error:', error);
    }
  };
  return (
    <div>
          <div style={{ padding: "20px" }}>
      <h2>Add New Post</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            style={{ padding: "6px", marginLeft: "10px", width: "250px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Body: </label>
          <textarea
            name="body"
            value={post.body}
            onChange={handleChange}
            style={{ padding: "6px", marginLeft: "10px", width: "250px" }}
          />
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          Submit
        </button>
      </form>

      {/* Success message */}
      {message && (
        <p style={{ marginTop: "20px", fontWeight: "bold", color: "green" }}>
          {message}
        </p>
      )}
    </div>
    </div>
  )
}

export default Axios_Post
