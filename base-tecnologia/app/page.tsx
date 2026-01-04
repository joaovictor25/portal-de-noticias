'use client'
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Sidebar } from './components/Sidebar';
import { ArticleCard } from './components/ArticleCard';
import { Footer } from './components/Footer';
import { ArticlePage } from './components/ArticlePage';
import { CategoryPage } from './components/CategoryPage';
import { AboutPage } from './components/AboutPage';
import { Post, WPCategory } from './types';
import { wpApi } from './services/api';

type View = 'home' | 'article' | 'category' | 'search' | 'about';

const TICKER_CACHE_KEY = 'techpulse_ticker_cache';
const CACHE_DURATION = 5 * 60 * 60 * 1000;

export default function Page() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [posts, setPosts] = useState<Post[]>([]);
  const [tickerPosts, setTickerPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<WPCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        const [fetchedPosts, fetchedCats] = await Promise.all([
          wpApi.getPosts('per_page=12'),
          wpApi.getCategories()
        ]);
        setPosts(fetchedPosts);
        setCategories(fetchedCats);
        
        const cached = localStorage.getItem(TICKER_CACHE_KEY);
        const now = Date.now();
        
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (now - timestamp < CACHE_DURATION) {
            setTickerPosts(data);
          } else {
            fetchAndCacheTicker();
          }
        } else {
          fetchAndCacheTicker();
        }
      } catch (error) {
        console.error("Pulse Network Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAndCacheTicker = async () => {
      try {
        const recent = await wpApi.getPosts('per_page=5');
        setTickerPosts(recent);
        localStorage.setItem(TICKER_CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: recent
        }));
      } catch (e) {
        console.error("Failed to fetch ticker posts", e);
      }
    };

    initApp();
  }, []);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = async (category: WPCategory) => {
    setIsLoading(true);
    setCurrentView('category');
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const catPosts = await wpApi.getPostsByCategory(category.id);
      setPosts(catPosts);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    setSearchQuery(query);
    setCurrentView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const results = await wpApi.searchPosts(query);
      setPosts(results);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = async () => {
    setCurrentView('home');
    setSelectedPost(null);
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (posts.length < 12) {
      setIsLoading(true);
      try {
        const homePosts = await wpApi.getPosts('per_page=12');
        setPosts(homePosts);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600/20">
      <Header 
        onCategorySelect={handleCategoryClick} 
        onHomeClick={handleBackToHome}
        onSearch={handleSearch}
        categories={categories}
        tickerPosts={tickerPosts}
      />
      
      <main className="pb-24">
        {currentView === 'article' && selectedPost && (
          <ArticlePage post={selectedPost} onBack={handleBackToHome} />
        )}

        {currentView === 'category' && selectedCategory && (
          <CategoryPage 
            title={selectedCategory.name} 
            posts={posts} 
            onPostClick={handlePostClick}
            onBack={handleBackToHome}
            isLoading={isLoading}
          />
        )}

        {currentView === 'search' && (
          <CategoryPage 
            title={`Busca: ${searchQuery}`} 
            posts={posts} 
            onPostClick={handlePostClick}
            onBack={handleBackToHome}
            isLoading={isLoading}
          />
        )}

        {currentView === 'about' && <AboutPage onBack={handleBackToHome} />}

        {currentView === 'home' && (
          <>
            <HeroSection 
              posts={posts.length > 0 ? posts.slice(0, 5) : []} 
              onPostSelect={handlePostClick}
            />

            <div className="max-w-7xl mx-auto px-4 mt-16 md:mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-8 space-y-20">
                  <section>
                    <div className="flex items-center gap-6 mb-12">
                      <div className="bg-[#2563EB] w-1.5 h-8 skew-x-[-15deg]"></div>
                      <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-slate-900">
                        Últimas <span className="text-[#2563EB]">Notícias</span>
                      </h2>
                      <div className="h-[1px] bg-slate-100 grow"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                      {posts.length > 0 ? (
                        posts.map(post => (
                          <div key={post.id} onClick={() => handlePostClick(post)}>
                            <ArticleCard post={post} variant="grid" />
                          </div>
                        ))
                      ) : (
                        [1,2,3,4].map(i => (
                          <div key={i} className="aspect-video bg-slate-50 rounded-xl animate-pulse"></div>
                        ))
                      )}
                    </div>
                  </section>
                </div>

                <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
                  <Sidebar 
                    categories={categories} 
                    onCategorySelect={handleCategoryClick} 
                    posts={tickerPosts} 
                    onPostClick={handlePostClick}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer 
        onNavigate={navigateTo} 
        categories={categories}
        onCategorySelect={handleCategoryClick}
      />
    </div>
  );
};