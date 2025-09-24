"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Clock, ExternalLink, User, Loader2, AlertCircle } from 'lucide-react';

const IBMInsightsBlog = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('both'); // 'hardcoded', 'database', 'both'
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'available', 'unavailable'

  // Static blog posts (fallback data)
  const staticBlogPosts = [
    {
      id: 1,
      title: "Transforming Healthcare IT: Key Insights and Digital Innovation Strategies",
      writeDate: "2025-09-18",
      category: "healthcare",
      author: "Dr. Sarah Chen",
      authorTitle: "Healthcare IT Director",
      readTime: "5 min read",
      description: "Discover the latest healthcare IT innovations and digital transformation strategies that are reshaping patient care delivery and operational efficiency in modern healthcare systems. Learn how leading organizations are implementing breakthrough solutions to improve patient outcomes and streamline operations.",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.ibm.com/blog/healthcare-digital-transformation",
      tags: ["healthcare", "digital-transformation", "IT", "patient-care"],
      featured: true
    },
    {
      id: 2,
      title: "The Future of AI-Powered Customer Experience: Trends and Implementation",
      writeDate: "2025-09-15",
      category: "ai",
      author: "Michael Rodriguez",
      authorTitle: "AI Research Lead",
      readTime: "7 min read",
      description: "Explore how artificial intelligence is revolutionizing customer experience across industries. Discover practical insights from IBM Watson implementations and learn about AI-driven solutions that deliver measurable business results and enhance customer satisfaction.",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.ibm.com/blog/ai-customer-experience",
      tags: ["artificial-intelligence", "customer-experience", "watson", "AI"],
      featured: false
    },
    {
      id: 3,
      title: "Cloud Infrastructure Modernization: Best Practices and Strategic Approaches",
      writeDate: "2025-09-12",
      category: "cloud",
      author: "Jennifer Park",
      authorTitle: "Cloud Solutions Architect",
      readTime: "8 min read",
      description: "Learn best practices for modernizing legacy infrastructure using IBM Cloud solutions. Explore hybrid cloud strategies, containerization technologies, and step-by-step guidance for successful cloud transformation that drives business agility and cost optimization.",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.ibm.com/blog/cloud-modernization",
      tags: ["cloud", "infrastructure", "modernization", "containers", "hybrid-cloud"],
      featured: true
    },
    {
      id: 4,
      title: "Cybersecurity in the Age of Remote Work: Protecting Your Digital Assets",
      writeDate: "2025-09-10",
      category: "security",
      author: "David Kim",
      authorTitle: "Cybersecurity Specialist",
      readTime: "6 min read",
      description: "Navigate the complex cybersecurity landscape of remote work environments. Learn about advanced threat detection, zero-trust security models, and how IBM Security solutions help organizations maintain robust protection across distributed workforces.",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.ibm.com/blog/cybersecurity-remote-work",
      tags: ["cybersecurity", "remote-work", "zero-trust", "threat-detection"],
      featured: false
    },
    {
      id: 5,
      title: "Data Analytics Revolution: Unlocking Business Intelligence with IBM Watson",
      writeDate: "2025-09-08",
      category: "data",
      author: "Lisa Thompson",
      authorTitle: "Data Science Manager",
      readTime: "9 min read",
      description: "Harness the power of advanced data analytics to drive informed business decisions. Explore machine learning algorithms, predictive analytics, and real-time data processing capabilities that transform raw data into actionable business intelligence.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.ibm.com/blog/data-analytics-watson",
      tags: ["data-analytics", "machine-learning", "business-intelligence", "watson"],
      featured: true
    },
    {
      id: 6,
      title: "Quantum Computing Breakthroughs: The Next Frontier in Technology",
      writeDate: "2025-09-05",
      category: "quantum",
      author: "Dr. Robert Chen",
      authorTitle: "Quantum Research Director",
      readTime: "10 min read",
      description: "Discover the latest breakthroughs in quantum computing and their potential impact on industries ranging from finance to pharmaceuticals. Learn about quantum algorithms, error correction, and IBM's quantum roadmap for the next decade.",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.ibm.com/blog/quantum-computing",
      tags: ["quantum-computing", "research", "algorithms", "technology"],
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', color: 'gray' },
    { id: 'healthcare', name: 'Healthcare IT', color: 'red' },
    { id: 'ai', name: 'Artificial Intelligence', color: 'purple' },
    { id: 'cloud', name: 'Cloud Infrastructure', color: 'cyan' },
    { id: 'security', name: 'Cybersecurity', color: 'orange' },
    { id: 'data', name: 'Data Analytics', color: 'green' },
    { id: 'quantum', name: 'Quantum Computing', color: 'indigo' }
  ];

  // Common API endpoints to test
  const possibleEndpoints = [
    '/api',
    '/api/blogs',
    '/api/posts',
    '/blogs',
    '/posts',
    '/'
  ];

  // Check API availability by testing multiple endpoints
  const checkApiAvailability = async () => {
    console.log('Testing API endpoints...');
    
    for (const endpoint of possibleEndpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`https://blogme-1-mh0u.onrender.com${endpoint}`, {
          method: 'HEAD',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log(`Endpoint ${endpoint}: ${response.status}`);
        
        if (response.ok) {
          console.log(`✅ Found working endpoint: ${endpoint}`);
          setApiStatus('available');
          return endpoint; // Return the working endpoint
        }
      } catch (err) {
        console.log(`❌ Endpoint ${endpoint} failed: ${err.message}`);
      }
    }
    
    console.warn('No working API endpoints found');
    setApiStatus('unavailable');
    return null;
  };

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      setError(null);
      
      let finalPosts = [];
      let dbPosts = [];
      
      // Always include hardcoded posts if dataSource allows
      if (dataSource === 'hardcoded' || dataSource === 'both') {
        finalPosts = [...staticBlogPosts];
      }
      
      // Try to fetch from database if dataSource allows
      if (dataSource === 'database' || dataSource === 'both') {
        // First check if API is available and get the working endpoint
        const workingEndpoint = await checkApiAvailability();
        
        if (workingEndpoint) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            // Try GET request to the working endpoint
            const response = await fetch(`https://blogme-1-mh0u.onrender.com${workingEndpoint}`, {
              method: 'GET',
              signal: controller.signal,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
              throw new Error(`API returned ${response.status}: ${response.statusText}`);
            }
            
            const contentType = response.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
              data = await response.json();
            } else {
              // If it's not JSON, try to parse as text and see what we get
              const textData = await response.text();
              console.log('Non-JSON response:', textData);
              
              // Try to parse as JSON anyway in case content-type is wrong
              try {
                data = JSON.parse(textData);
              } catch {
                throw new Error(`Expected JSON response but got: ${contentType || 'unknown content type'}`);
              }
            }
            
            console.log('API Response:', data);
            
            // Handle different response formats
            let postsArray = [];
            if (Array.isArray(data)) {
              postsArray = data;
            } else if (data && Array.isArray(data.posts)) {
              postsArray = data.posts;
            } else if (data && Array.isArray(data.data)) {
              postsArray = data.data;
            } else if (data && typeof data === 'object') {
              // If it's a single post object, wrap it in an array
              postsArray = [data];
            } else {
              throw new Error('Invalid data format received from API');
            }
            
            // Transform API data to match our component structure if needed
            const transformedPosts = postsArray.map((post, index) => ({
              ...post,
              // Ensure required fields exist
              id: post.id || `db_${Date.now()}_${index}`,
              writeDate: post.writeDate || post.created_at || new Date().toISOString().split('T')[0],
              readTime: post.readTime || `${Math.ceil(Math.random() * 10 + 3)} min read`,
              imageUrl: post.imageUrl || `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=250&fit=crop`,
              moreInfoLink: post.moreInfoLink || '#',
              tags: post.tags || [],
              featured: post.featured || false,
              source: 'database' // Add source identifier
            }));

            dbPosts = transformedPosts;
            
            // Sort database posts by date (newest first)
            dbPosts.sort((a, b) => new Date(b.writeDate) - new Date(a.writeDate));
            
          } catch (err) {
            console.error('Error fetching blog posts:', err);
            let errorMessage = 'Failed to load data from database';
            
            if (err.name === 'AbortError') {
              errorMessage = 'Request timed out - API server may be slow or unavailable';
            } else if (err.message.includes('404')) {
              errorMessage = 'API endpoint not found (404) - service may be unavailable';
            } else if (err.message.includes('500')) {
              errorMessage = 'Server error (500) - database may be temporarily unavailable';
            } else if (err.message.includes('Failed to fetch')) {
              errorMessage = 'Network error - unable to connect to API server';
            } else {
              errorMessage = err.message;
            }
            
            setError(errorMessage);
            setApiStatus('unavailable');
            
            // If we're in database-only mode and there's an error, show empty state
            if (dataSource === 'database') {
              finalPosts = [];
            }
          }
        } else {
          setError('API server is not responding - endpoint may be unavailable');
          if (dataSource === 'database') {
            finalPosts = [];
          }
        }
      }
      
      // Combine posts based on data source
      if (dataSource === 'both') {
        // Put newest DB post first, then hardcoded posts, then remaining DB posts
        if (dbPosts.length > 0) {
          const newestDbPost = { ...dbPosts[0], featured: true, isLatest: true };
          const remainingDbPosts = dbPosts.slice(1).map(post => ({ ...post, source: 'database' }));
          const hardcodedPosts = staticBlogPosts.map(post => ({ ...post, source: 'hardcoded' }));
          
          finalPosts = [newestDbPost, ...hardcodedPosts, ...remainingDbPosts];
        } else {
          // If no DB posts, just use hardcoded
          finalPosts = staticBlogPosts.map(post => ({ ...post, source: 'hardcoded' }));
        }
      } else if (dataSource === 'database') {
        if (dbPosts.length > 0) {
          dbPosts[0].featured = true;
          dbPosts[0].isLatest = true;
          finalPosts = dbPosts.map(post => ({ ...post, source: 'database' }));
        } else {
          finalPosts = [];
        }
      }
      
      setBlogPosts(finalPosts);
      setLoading(false);
    };

    fetchBlogPosts();
  }, [dataSource]);

  const getCategoryColor = (category) => {
    const colors = {
      healthcare: 'text-red-600 bg-red-50 border-red-200',
      ai: 'text-purple-600 bg-purple-50 border-purple-200',
      cloud: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      security: 'text-orange-600 bg-orange-50 border-orange-200',
      data: 'text-green-600 bg-green-50 border-green-200',
      quantum: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    };
    return colors[category] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getFilterColor = (category, isSelected) => {
    const colors = {
      all: isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      healthcare: isSelected ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100',
      ai: isSelected ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      cloud: isSelected ? 'bg-cyan-600 text-white' : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
      security: isSelected ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100',
      data: isSelected ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100',
      quantum: isSelected ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const retryApiConnection = () => {
    setError(null);
    setApiStatus('checking');
    // Trigger re-fetch by toggling dataSource briefly
    const currentDataSource = dataSource;
    setDataSource('hardcoded');
    setTimeout(() => setDataSource(currentDataSource), 100);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading blog posts...</p>
          {apiStatus === 'checking' && (
            <p className="text-sm text-gray-500 mt-2">Checking API availability...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="mb-12 text-center">
         
          

          
          {/* Error Display with Retry */}
          {error && dataSource !== 'hardcoded' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <div className="font-medium mb-1">Database Connection Error</div>
                  <div className="text-red-700 mb-3">{error}</div>
                  {dataSource === 'both' && (
                    <div className="text-red-600 mb-3">Showing hardcoded content only.</div>
                  )}
                  <button
                    onClick={retryApiConnection}
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                  >
                    Retry Connection
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter Bar */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${getFilterColor(category.id, selectedCategory === category.id)}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing {paginatedPosts.length} of {filteredPosts.length} articles
            {selectedCategory !== 'all' && ` in ${categories.find(cat => cat.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedPosts.map((post, index) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
              {/* Featured/Source Badges */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                {post.featured && (
                  <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {post.isLatest ? 'LATEST' : 'FEATURED'}
                  </span>
                )}
                
                {/* Source Badge */}
                <span className={`text-white text-xs font-bold px-2 py-1 rounded-full ${
                  post.source === 'database' ? 'bg-green-600' : 'bg-blue-600'
                }`}>
                  {post.source === 'database' ? 'DB' : 'STATIC'}
                </span>
              </div>

              {/* New Post Badge for latest DB post */}
              {post.isLatest && post.source === 'database' && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    NEW FROM DB
                  </span>
                </div>
              )}

              {/* Post Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop`;
                  }}
                />
                <div className="absolute bottom-4 left-4">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border backdrop-blur-sm ${getCategoryColor(post.category)}`}>
                    {categories.find(cat => cat.id === post.category)?.name || post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Publish Date and Read Time */}
                <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{formatDate(post.writeDate)}</span>
                  </div>
                  <span className="font-medium text-blue-600">{post.readTime}</span>
                </div>

                {/* Blog Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h2>

                {/* Author Info */}
                {post.author && (
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <User className="h-4 w-4 mr-2" />
                    <div>
                      <span className="font-medium">{post.author}</span>
                      {post.authorTitle && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{post.authorTitle}</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Brief Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read More Link */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <a 
                    href={post.moreInfoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group/link"
                  >
                    <span className="mr-2">Read Full Article</span>
                    <ExternalLink className="h-4 w-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                  
                  <ArrowUpRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {paginatedPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">
              {dataSource === 'database' && error ? 
                'Database is currently unavailable. Try switching to "Hardcoded Only" or "Both Sources".' :
                'Try selecting a different category or check back later for new content.'
              }
            </p>
            {dataSource === 'database' && error && (
              <button
                onClick={retryApiConnection}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry Database Connection
              </button>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {paginatedPosts.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Items Per Page */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 text-sm font-medium">Articles per page:</span>
              <div className="relative">
                <select 
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              <span className="text-gray-600 text-sm">
                {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filteredPosts.length)} of {filteredPosts.length} articles
              </span>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <select 
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Array.from({ length: Math.ceil(filteredPosts.length / itemsPerPage) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              <span className="text-gray-600 text-sm">
                of {Math.ceil(filteredPosts.length / itemsPerPage)} pages
              </span>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>
                <button 
                  onClick={() => setCurrentPage(Math.min(Math.ceil(filteredPosts.length / itemsPerPage), currentPage + 1))}
                  disabled={currentPage === Math.ceil(filteredPosts.length / itemsPerPage)}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IBMInsightsBlog;