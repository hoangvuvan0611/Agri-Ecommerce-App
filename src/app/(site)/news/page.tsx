'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: 'Building Killer Robots Game Sehavior iOS With Fuzzy',
    excerpt: 'Mô tả ngắn về bài viết...',
    image: '/images/blog/blog-1.jpg',
    category: 'BRANDING',
    date: '12/04/2024',
    slug: 'building-killer-robots'
  },
  {
    id: 2,
    title: 'Make Em Shine How To Use Illustrations To Elicits',
    excerpt: 'Mô tả ngắn về bài viết...',
    image: '/images/blog/blog-2.jpg', 
    category: 'FASHION',
    date: '12/04/2024',
    slug: 'make-em-shine'
  },
  {
    id: 3,
    title: 'Just Keep Scrolling How To Design Lengthy Lengthy',
    excerpt: 'Mô tả ngắn về bài viết...',
    image: '/images/blog/blog-3.jpg',
    category: 'LIFESTYLE',
    date: '12/04/2024',
    slug: 'just-keep-scrolling'
  }
];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = ['BRANDING', 'FASHION', 'LIFESTYLE', 'MUSIC', 'TRAVEL'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Banner Section */}
      <div className='relative w-full h-[100px] mb-4 rounded-2xl overflow-hidden'>
        <Image
          src={`/images/organic-breadcrumb.png`}
          alt={"Organic Farm"}
          fill
          className='object-cover object-center rounded-2xl'
          priority
          quality={100}
        />
        {/* Overlay với breadcrumb */}
        <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
          <div className='text-white space-y-2 text-center'>
            <div className='flex items-center gap-2 text-sm'>
              <Link href="/" className='hover:text-green-400 transition-colors'>
                Trang chủ
              </Link>
              <span>›</span>
              <Link href="/news" className='text-lime-400 transition-colors'>
                Tin tức
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Search */}
          <div>
            <h2 className="text-lg font-bold mb-4">Tìm kiếm</h2>
            <div className="relative">
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-bold mb-4">Chuyên mục</h2>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start ${!selectedCategory ? 'bg-lime-50 text-lime-600' : ''}`}
                onClick={() => setSelectedCategory('')}
              >
                Tất cả
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className={`w-full justify-start ${selectedCategory === category ? 'bg-lime-50 text-lime-600' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h2 className="text-lg font-bold mb-4">Bài viết mới nhất</h2>
            <div className="space-y-4">
              {posts.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/news/${post.slug}`} className="flex gap-4 group">
                  <div className="relative w-20 h-20">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium group-hover:text-lime-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/news/${post.slug}`} className="group">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold group-hover:text-lime-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}