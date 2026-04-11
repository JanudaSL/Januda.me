import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Eye } from "lucide-react";
import Image from "next/image";
import ViewTracker from "./ViewTracker";
import StructuredData from "@/app/components/StructuredData";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "https://publication-w5v8.onrender.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kjanuda.netlify.app/";

const STATIC_EXT = /\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|json|txt|xml|pdf)$/i;

async function getPost(slug: string) {
  if (!slug) return null;
  try {
    const res = await fetch(`${API_URL}/posts/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const text = await res.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.log("FETCH ERROR:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || STATIC_EXT.test(slug)) return { title: "Post Not Found" };

  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const description = post.content?.replace(/<[^>]*>/g, "").slice(0, 155) || "";
  const ogImage = post.image || post.profileImage || "";

  return {
    title: `${post.title} | Publications`,
    description,
    keywords: post.tags?.join(", ") || "",
    authors: [{ name: post.author, url: `https://medium.com/@${post.author}` }],
    alternates: {
      canonical: post.link,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `${SITE_URL}/publications/${slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [`https://medium.com/@${post.author}`],
      tags: post.tags || [],
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ogImage ? [{ url: ogImage, alt: post.title }] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug || STATIC_EXT.test(slug)) return notFound();

  const post = await getPost(slug);
  if (!post) return notFound();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const stripInlineColors = (html: string) =>
    html.replace(/style="([^"]*)"/gi, (_match, styles) => {
      const cleaned = styles.replace(/color\s*:\s*[^;]+;?/gi, "color: #000000;");
      return `style="${cleaned}"`;
    });

  return (
    <main className="min-h-screen bg-[#f8f8f6]">
      <StructuredData post={post} />
      <ViewTracker postId={post._id} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <a href="/" className="hover:text-gray-700 transition-colors">Home</a>
          <span>/</span>
          <a href="/publications" className="hover:text-gray-700 transition-colors">Publications</a>
          <span>/</span>
          <span className="text-gray-600 line-clamp-1">{post.title}</span>
        </nav>

        <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

          {/* Featured Image */}
          {post.image && (
            <div className="relative h-64 sm:h-80">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          <div className="p-6 sm:p-10">

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span>·</span>
              <span>{post.readTime || "5 min read"}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {post.views || 0} views
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-100">
              {post.profileImage ? (
                <Image
                  src={post.profileImage}
                  alt={post.author}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                  {post.author?.charAt(0)}
                </div>
              )}
              <div>
                <div className="font-semibold text-gray-900 text-sm">
                  {post.author || "Unknown"}
                </div>
                <div className="text-xs text-gray-400">
                  {formatDate(post.publishedAt)}
                </div>
              </div>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs text-gray-400 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-full transition-colors"
              >
                Read on Medium ↗
              </a>
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-7">
                {post.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div
              className="
                prose prose-base max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:text-black prose-p:leading-[1.85] prose-p:my-5
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:my-6 prose-img:w-full
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-li:text-black prose-li:my-1.5
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500
                prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1.5
                prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
                font-[Georgia,serif]
              "
              style={{ color: "#000000" }}
              dangerouslySetInnerHTML={{
                __html: stripInlineColors(post.content || "<p>No content</p>"),
              }}
            />

            {/* Syndication notice */}
            <div className="mt-10 pt-6 border-t border-gray-100 text-xs text-gray-400 text-center">
              Originally published on{" "}
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Medium
              </a>
              {" "}by {post.author}.
            </div>

          </div>
        </article>
      </div>
    </main>
  );
}