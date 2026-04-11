"use client";

import Link from "next/link";

export default function PostCard({ post }: any) {
  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>

      <p className="text-gray-500 text-sm mb-2">
        ✍️ {post.author}
      </p>

      <p className="text-gray-600 text-sm mb-2">
        👀 {post.views} views
      </p>

      <Link href={`/post/${post._id}`}>
        <button className="text-blue-500">Read Full →</button>
      </Link>
    </div>
  );
}