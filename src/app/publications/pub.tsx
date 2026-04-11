"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import {
  Clock,
  User,
  Eye,
  ExternalLink,
  ChevronDown,
  Link as LinkIcon,
  X,
  Menu,
  BookOpen,
} from "lucide-react";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("janudakodi");
  const [authors, setAuthors] = useState<string[]>([]);
  const [authorProfiles, setAuthorProfiles] = useState<Record<string, string>>({});
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [mediumUsername, setMediumUsername] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    api.get("/posts").then((res) => {
      setPosts(res.data);
      const uniqueAuthors = [
        ...new Set(res.data.map((post: any) => post.author)),
      ] as string[];
      setAuthors(uniqueAuthors);
      const profiles: Record<string, string> = {};
      res.data.forEach((post: any) => {
        if (post.author && post.profileImage && !profiles[post.author]) {
          profiles[post.author] = post.profileImage;
        }
      });
      setAuthorProfiles(profiles);
      if (!uniqueAuthors.includes("janudakodi") && uniqueAuthors.length > 0) {
        setSelectedAuthor(uniqueAuthors[0]);
      }
    });
  };

  const filteredPosts = posts.filter((post) => post.author === selectedAuthor);
  const totalViews = filteredPosts.reduce((sum, p) => sum + (p.views || 0), 0);

  const handleAuthorChange = (author: string) => {
    setSelectedAuthor(author);
    setShowAuthorDropdown(false);
    setMobileMenuOpen(false);
  };

  const connectMedium = async () => {
    if (!mediumUsername.trim()) {
      alert("Please enter a Medium username");
      return;
    }
    setConnecting(true);
    try {
      await api.post("/users/connect-medium", {
        username: mediumUsername.trim(),
      });
      alert("✅ Connected successfully! Your posts will be synced in a few seconds...");
      setShowConnectModal(false);
      setMediumUsername("");
      setTimeout(() => loadPosts(), 5000);
    } catch {
      alert("❌ Error connecting to Medium. Please check the username and try again.");
    }
    setConnecting(false);
  };

  const extractFirstImage = (htmlContent: string): string | null => {
    if (!htmlContent) return null;
    const match = htmlContent.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Healthcare IT": "bg-pink-50 text-pink-700 border border-pink-200",
      "Artificial Intelligence": "bg-violet-50 text-violet-700 border border-violet-200",
      "Cloud Infrastructure": "bg-sky-50 text-sky-700 border border-sky-200",
      Technology: "bg-blue-50 text-blue-700 border border-blue-200",
      Business: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      default: "bg-gray-50 text-gray-600 border border-gray-200",
    };
    return colors[category] || colors.default;
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

  return (
    <main className="min-h-screen bg-[#f8f8f6]">
      {/* ── Header ── */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              Publications
            </h1>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setShowConnectModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                <LinkIcon className="w-4 h-4" />
                Connect Medium
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowAuthorDropdown(!showAuthorDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-sm font-medium text-gray-800"
                >
                  <User className="w-4 h-4 text-gray-500" />
                  {selectedAuthor}
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${showAuthorDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showAuthorDropdown && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                    <div className="py-1 max-h-72 overflow-y-auto">
                      {authors.map((author) => (
                        <button
                          key={author}
                          onClick={() => handleAuthorChange(author)}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                            selectedAuthor === author
                              ? "text-blue-600 font-medium"
                              : "text-gray-800"
                          }`}
                        >
                          <span className="truncate">{author}</span>
                          {selectedAuthor === author && (
                            <span className="text-blue-500 ml-2 text-xs">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pb-3 border-t pt-3 space-y-2">
              <button
                onClick={() => {
                  setShowConnectModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium"
              >
                <LinkIcon className="w-4 h-4" />
                Connect Medium
              </button>
              <div className="text-xs font-medium text-gray-500 px-1 pt-1">Select Author</div>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {authors.map((author) => (
                  <button
                    key={author}
                    onClick={() => handleAuthorChange(author)}
                    className={`w-full px-3 py-2.5 text-left rounded-lg text-sm flex items-center justify-between ${
                      selectedAuthor === author
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <span className="truncate">{author}</span>
                    {selectedAuthor === author && (
                      <span className="text-blue-500 text-xs ml-2">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Author Card ── */}
          <div className="mt-4 flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center gap-3">
              {authorProfiles[selectedAuthor] ? (
                <img
                  src={authorProfiles[selectedAuthor]}
                  alt={selectedAuthor}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-lg flex-shrink-0">
                  {selectedAuthor.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="font-semibold text-gray-900 text-sm">{selectedAuthor}</div>
                <div className="text-xs text-gray-500">Medium author</div>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 leading-none">
                  {filteredPosts.length}
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">
                  Publications
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 leading-none">
                  {totalViews >= 1000
                    ? `${(totalViews / 1000).toFixed(1)}k`
                    : totalViews}
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">
                  Total Views
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-base">
              No publications found for{" "}
              <span className="font-semibold text-gray-800">{selectedAuthor}</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {filteredPosts.map((post) => {
              const contentImage = extractFirstImage(post.content);
              const displayImage = post.image || contentImage;

              return (
                <a
                  key={post._id}
                  href={`/publications/${post.slug}`}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-gray-200" />
                      </div>
                    )}
                    {post.category && (
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}
                      >
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(post.createdAt || Date.now())}
                      </span>
                      <span>·</span>
                      <span>{post.readTime || "5 min read"}</span>
                    </div>

                    <h2 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1 mb-4">
                      {post.description || stripHtml(post.content).slice(0, 160) + "..."}
                    </p>

                    {/* Tags */}
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{post.views || 0} views</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:gap-1.5 transition-all">
                        Read More
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Connect Medium Modal ── */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-7 relative">
            <button
              onClick={() => setShowConnectModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Connect Medium</h2>
              <p className="text-sm text-gray-500">
                Enter your username to sync publications
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Medium Username
                </label>
                <input
                  type="text"
                  placeholder="e.g. janudakodi"
                  value={mediumUsername}
                  onChange={(e) => setMediumUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && connectMedium()}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm text-gray-900 placeholder-gray-400"
                />
              </div>

              <button
                onClick={connectMedium}
                disabled={connecting}
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {connecting ? "Connecting..." : "Connect & Sync Posts"}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Posts sync automatically after connecting
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for dropdown */}
      {showAuthorDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowAuthorDropdown(false)}
        />
      )}
    </main>
  );
}