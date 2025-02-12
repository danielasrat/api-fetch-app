import React from "react";

const PostList = ({ posts }) => {
  return (
    <div className="w-full md:w-3/4 mt-8 space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-50 transition-colors"
        >
          <h2 className="text-2xl font-semibold text-blue-700">{post.title}</h2>
          <p className="text-gray-600 mt-2">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
