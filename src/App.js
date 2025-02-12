import React, { useState, useEffect } from "react";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const postsPerPage = 10;

  useEffect(() => {
    // Check if data is in localStorage
    const cachedPosts = localStorage.getItem("posts");
    if (cachedPosts) {
      setPosts(JSON.parse(cachedPosts));
      setFilteredPosts(JSON.parse(cachedPosts));
      setLoading(false);
    } else {
      // Fetch data from API
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          setFilteredPosts(data);
          localStorage.setItem("posts", JSON.stringify(data));
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch data");
          setLoading(false);
        });
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const result = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(result);
    setCurrentPage(1); // Reset to the first page after search
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-5xl text-blue-600 font-extrabold mb-6">Post List</h1>
      <div className="mb-6 w-full md:w-1/2">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && <div className="text-lg text-gray-500">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Show "No results found" if no filtered posts */}
      {searchQuery && filteredPosts.length === 0 && (
        <div className="text-center text-red-500 text-lg">No results found</div>
      )}

      {/* Display posts if available */}
      {filteredPosts.length > 0 && <PostList posts={currentPosts} />}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
