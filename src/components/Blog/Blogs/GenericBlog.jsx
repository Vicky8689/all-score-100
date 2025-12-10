import React, { useState } from "react";

import "./GenericBlog.css";
function Hero({ post }) {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg mb-6">
     
      <div className="p-6 bg-white">
        <h1 className="text-2xl font-bold mb-1">{post.title}</h1>
        {post.subtitle && <p className="text-sm text-gray-600 mb-3">{post.subtitle}</p>}
        <div className="flex gap-4 text-sm text-gray-700">
          {post.date && <div>📅 {post.date}</div>}
          {post.location && <div>📍 {post.location}</div>}
        </div>
      </div>
    </div>
  );
}

function Gallery({ images = [] }) {
  if (!images.length) return null;
  return (
    <div className="gallery-grid my-4">
  {images.map((src, i) => (
    <div key={i}>
      <img src={src} alt={`gallery-${i}`} />
    </div>
  ))}
</div>

  );
}

function PostCard({ post }) {
  return (
    <article className="bg-white rounded-lg p-6 shadow-md">
      <Hero post={post} />
      {post.content && (
        <section className="prose max-w-none mb-4">
          {post.content.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </section>
      )}

      {post.highlights?.length > 0 && (
        <>
          <h3 className="font-semibold mt-4">Highlights</h3>
          <ul className="list-disc ml-6 mb-4">
            {post.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </>
      )}

      <Gallery images={post.gallery} />

      {post.video && (
        <div className="my-4">
          <h4 className="font-medium">Event Video</h4>
          <div className="mt-2 aspect-video">
            <iframe
              title={`video-${post.id}`}
              src={post.video}
              allowFullScreen
              className="w-full h-64"
            />
          </div>
        </div>
      )}

      {post.quotes?.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium">Voices</h4>
          <div className="mt-2 space-y-2">
            {post.quotes.map((q, i) => (
              <blockquote key={i} className="border-l-4 pl-4 italic text-gray-700">{q}</blockquote>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-sky-600 text-white rounded shadow-sm hover:opacity-95"
        >
          🖨️ Print / Save as PDF
        </button>
        {post.gallery?.length > 0 && (
          <a
            href="#gallery"
            className="px-4 py-2 border rounded text-sky-600 border-sky-600"
          >
            📷 View Full Gallery
          </a>
        )}
      </div>
    </article>
  );
}

export default function GenericBlog({ posts = [], title = "Blog", description = "" }) {
  const [selected, setSelected] = useState(posts[0]?.id || null);
  const current = posts.find((p) => p.id === selected) || posts[0] || {};
  if (!posts.length) return <div className="p-6">No posts available.</div>;
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold">{title}</h2>
          {description && <p className="text-gray-600 mt-2">{description}</p>}
        </header>
        <div className="flex flex-col md:flex-row gap-6">
          <main className="flex-1">
            <PostCard post={current} />
          </main>
        </div>
      </div>
    </div>
  );
}
