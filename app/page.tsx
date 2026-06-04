'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Menu, X } from 'lucide-react';
import Image from 'next/image';

function SectionTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-semibold tracking-wide mb-4" style={{ color: light ? '#FFFFFF' : '#52412F' }}>
        {children}
      </h2>
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-12" style={{ backgroundColor: '#D4A96A' }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#D4A96A' }} />
        <div className="h-px w-12" style={{ backgroundColor: '#D4A96A' }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 bg-white z-50"
        style={{ borderBottom: '1px solid #E8DDD4' }}
      >
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <Image
            src="/nav-logo.png"
            alt="이수진영어 내신코치"
            width={160}
            height={52}
            className="object-contain"
            priority
          />
          <button
            className="p-2 rounded-lg transition-colors hover:bg-stone-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
          >
            <Menu className="w-5 h-5" style={{ color: '#52412F' }} />
          </button>
        </div>
        {/* 스크롤 진행 바 */}
        <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: '#E8DDD4' }}>
          <div
            className="h-full transition-all duration-75"
            style={{ width: `${scrollProgress}%`, backgroundColor: '#D4A96A' }}
          />
        </div>
      </nav>

      {/* 슬라이드 메뉴 오버레이 */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setMenuOpen(false)} />
      )}

      {/* 슬라이드 패널 */}
      <div
        className="fixed top-0 right-0 h-full w-64 z-50 shadow-2xl flex flex-col pt-20 px-8 gap-6 transition-transform duration-300"
        style={{
          backgroundColor: '#FAF6F1',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <button
          className="absolute top-5 right-5 p-2 rounded-lg hover:bg-stone-200 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          <X className="w-5 h-5" style={{ color: '#52412F' }} />
        </button>
        <div className="border-y py-4" style={{ borderColor: '#52412F40' }}>
          <a href="/blog" onClick={() => setMenuOpen(false)} className="text-lg font-medium transition-opacity hover:opacity-60" style={{ color: '#52412F' }}>블로그</a>
        </div>
      </div>

      {/* Hero Section */}
      <section
        className="px-6 relative overflow-hidden flex flex-col"
        style={{ backgroundColor: '#FAF6F1', minHeight: '70vh' }}
      >
        <div className="h-[90px] flex-shrink-0" />
        <div className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto text-center relative z-10 py-10 md:py-16 px-4 w-full">
          <div className="mb-8 md:mb-10 flex justify-center">
            <Image
              src="/nav-logo.png"
              alt="이수진영어 내신코치"
              width={520}
              height={170}
              className="object-contain w-full max-w-lg"
            />
          </div>
          <p className="text-lg md:text-2xl mb-4 md:mb-6 font-semibold italic leading-snug" style={{ color: '#D4A96A' }}>
            북일고 영어의 압도적 1위,<br className="md:hidden" /> 이수진이 결과로 증명합니다.
          </p>
          <p className="text-sm md:text-lg mb-10 md:mb-12 leading-loose max-w-2xl mx-auto font-normal" style={{ color: '#52412F', opacity: 0.75 }}>
            24년차 베테랑(북일고 10년) 전문가가 만들어가는<br />
            체계적이고 차별화된 프리미엄 영어교육
          </p>
          <button
            className="px-8 md:px-12 py-3 md:py-4 font-semibold tracking-widest text-sm transition-all hover:bg-transparent border cursor-pointer"
            style={{
              backgroundColor: '#D4A96A',
              color: '#FFFFFF',
              borderColor: '#D4A96A',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = '#D4A96A';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4A96A';
              (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
            }}
          >
            수강 신청 문의하기
          </button>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-28 px-6" style={{ backgroundColor: '#52412F' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle light>왜 이수진 영어인가</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl p-12"
                style={{
                  minHeight: '300px',
                  backgroundColor: '#FFFFFF',
                  borderTop: '3px solid #D4A96A',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={e => {
                  const overlay = e.currentTarget.querySelector('.shine-overlay') as HTMLElement;
                  if (overlay) {
                    overlay.style.animation = 'none';
                    void overlay.offsetHeight;
                    overlay.style.animation = 'glass-shine 1.5s ease forwards';
                  }
                }}
              >
                <div
                  className="shine-overlay absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)',
                    transform: 'translateX(-100%) skewX(-15deg)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-28 px-6" style={{ backgroundColor: '#FAF6F1' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle>학원 관리 시스템</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className="p-10 rounded-xl transition-all duration-300 hover:-translate-y-3"
                style={{
                  backgroundColor: '#FFFFFF',
                  minHeight: '300px',
                  borderTop: '3px solid #D4A96A',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 24px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(212,169,106,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Section 2 */}
      <section className="py-28 px-6" style={{ backgroundColor: '#52412F', minHeight: '500px' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle light>내용구상중</SectionTitle>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6" style={{ backgroundColor: '#FAF6F1' }}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle>문의하기</SectionTitle>
          <p className="text-center -mt-8 mb-16 tracking-wider text-sm font-medium" style={{ color: '#D4A96A' }}>
            언제든 편하게 연락주세요
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="p-10 rounded-xl"
              style={{
                backgroundColor: '#FFFFFF',
                borderTop: '3px solid #D4A96A',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              }}
            >
              <h3 className="text-xl font-semibold tracking-wide mb-8" style={{ color: '#52412F' }}>연락처</h3>
              <div className="space-y-6">
                {[
                  { icon: <Phone className="w-5 h-5" style={{ color: '#FFFFFF' }} />, label: '전화', value: '02-1234-5678' },
                  { icon: <Mail className="w-5 h-5" style={{ color: '#FFFFFF' }} />, label: '이메일', value: 'info@leesujin.com' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#52412F' }}>
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 tracking-widest mb-0.5">{label}</p>
                      <p className="font-medium" style={{ color: '#52412F' }}>{value}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#52412F' }}>
                    <Clock className="w-5 h-5" style={{ color: '#FFFFFF' }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 tracking-widest mb-0.5">운영시간</p>
                    <p className="font-medium" style={{ color: '#52412F' }}>평일 10:00 - 21:00</p>
                    <p className="text-sm text-gray-500">토요일 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-10 rounded-xl"
              style={{
                backgroundColor: '#FFFFFF',
                borderTop: '3px solid #D4A96A',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              }}
            >
              <h3 className="text-xl font-semibold tracking-wide mb-8" style={{ color: '#52412F' }}>오시는 길</h3>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#52412F' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#FFFFFF' }} />
                </div>
              </div>
              <div className="h-48 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FAF6F1' }}>
                <MapPin className="w-14 h-14" style={{ color: '#D4A96A' }} />
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              className="px-14 py-4 font-medium tracking-widest text-sm border transition-all cursor-pointer"
              style={{ backgroundColor: '#D4A96A', color: '#FFFFFF', borderColor: '#D4A96A' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = '#D4A96A';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D4A96A';
                (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
              }}
            >
              수강 상담 신청하기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ backgroundColor: '#D4A96A' }} />
            <h3 className="text-lg font-semibold tracking-widest" style={{ color: '#52412F' }}>이수진 영어</h3>
            <div className="h-px w-16" style={{ backgroundColor: '#D4A96A' }} />
          </div>
          <p className="text-gray-500 text-sm tracking-wide">Tel: 02-1234-5678 &nbsp;|&nbsp; Email: info@leesujin.com</p>
          <p className="text-gray-300 mt-4 text-xs tracking-widest">© 2026 이수진 영어. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
