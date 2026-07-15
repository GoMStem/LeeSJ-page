import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

function getPosts(): PostMeta[] {
  const postsDir = path.join(process.cwd(), 'content/daily');
  if (!fs.existsSync(postsDir)) return [];

  return fs
    .readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '');
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        excerpt: data.excerpt || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const metadata = {
  title: 'Daily Posting | 이수진 영어',
  description: '북일고 영어 내신 대비 전략과 공부법을 공유합니다.',
};

export default function PostsPage() {
  const posts = getPosts();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF6F1' }}>
      <nav
        className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50"
        style={{ borderTop: '2px solid #D4A96A', borderBottom: '1px solid #E8DDD4' }}
      >
        <div className="max-w-6xl mx-auto px-8 py-5">
          <Link href="/" className="text-xl font-bold transition-opacity hover:opacity-70" style={{ color: '#52412F' }}>
            이수진 영어
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-lg border transition-opacity hover:opacity-60"
          style={{ color: '#52412F', borderColor: '#52412F' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">돌아가기</span>
        </Link>

        <h1 className="text-4xl font-bold mb-2" style={{ color: '#52412F' }}>Daily Posting</h1>
        <p className="text-sm mb-4 tracking-wide" style={{ color: '#D4A96A' }}>북일고 영어 내신 정보 & 학습 전략</p>
        <div className="h-px w-16 mb-14" style={{ backgroundColor: '#D4A96A' }} />

        {posts.length === 0 ? (
          <p className="text-sm" style={{ color: 'rgba(82,65,47,0.45)' }}>아직 작성된 글이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <Link key={post.slug} href={`/daily/${post.slug}`} className="block group">
                <div
                  className="p-7 rounded-xl bg-white transition-shadow group-hover:shadow-md"
                  style={{ border: '1px solid #E8DDD4' }}
                >
                  <p className="text-xs tracking-widest mb-2" style={{ color: '#D4A96A' }}>{post.date}</p>
                  <h2
                    className="text-lg font-semibold mb-2 transition-opacity group-hover:opacity-70"
                    style={{ color: '#52412F' }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(82,65,47,0.6)' }}>
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
