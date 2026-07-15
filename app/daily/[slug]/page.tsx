import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const postsDir = path.join(process.cwd(), 'content/daily');

function resolveFile(slug: string) {
  const decoded = decodeURIComponent(slug).normalize('NFC');
  const direct = path.join(postsDir, `${decoded}.md`);
  if (fs.existsSync(direct)) return direct;
  // fallback: NFC-normalized comparison across directory
  if (!fs.existsSync(postsDir)) return null;
  const target = `${decoded}.md`;
  const match = fs.readdirSync(postsDir).find(f => f.normalize('NFC') === target);
  return match ? path.join(postsDir, match) : null;
}

export async function generateStaticParams() {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => ({ slug: f.replace('.md', '').normalize('NFC') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const filePath = resolveFile(slug);
  if (!filePath) return {};
  const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
  return {
    title: `${data.title} | 이수진 영어`,
    description: data.excerpt || '',
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = resolveFile(slug);
  if (!filePath) notFound();

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const html = marked.parse(content) as string;

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
          href="/daily"
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-lg border transition-opacity hover:opacity-60"
          style={{ color: '#52412F', borderColor: '#52412F' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">목록으로</span>
        </Link>

        <article>
          <p className="text-xs tracking-widest mb-3" style={{ color: '#D4A96A' }}>{data.date}</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-snug" style={{ color: '#52412F' }}>
            {data.title}
          </h1>
          <div className="h-px mb-10" style={{ backgroundColor: '#E8DDD4' }} />
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </div>
  );
}
