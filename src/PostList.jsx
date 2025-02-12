// src/PostList.jsx
import React, { useState, useEffect } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter posts based on the search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        API Data Fetch Example
      </h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search posts..."
        className="p-2 border rounded mb-4 w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Error message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Loading state */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-xl">{post.title}</h3>
              <p className="text-gray-700">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
