'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';

type FeedbackAnswer = { tags: string[]; subtitle: string; content: string };
type FeedbackItem = { q: string; answers: FeedbackAnswer[] };

const FEEDBACK_ITEMS: FeedbackItem[] = [
  {
    q: '이수진 수업은요..',
    answers: [
      {
        tags: ['#성적향상', '#효율적인학습'],
        subtitle: '4등급에서 1등급으로 성적 상승, 타 학원과 확실히 다른 체계적인 수업',
        content: '이수진 선생님 수업을 처음 들었는데 4등급에서 1등급으로 올랐습니다! 다른 학원들과 달리 수업에 체계가 잡혀 있어서, 선생님이 이끄시는 대로만 잘 따라가면 시험 기간에 영어에 많은 시간을 투자하지 않고도 좋은 성적을 기대할 수 있습니다.',
      },
      {
        tags: ['#북일고내신', '#독보적자료'],
        subtitle: '북일고 내신 완벽 분석, 자료를 다 풀면 1등급이 안 나오는 게 이상할 정도입니다.',
        content: '학교 선생님의 출제 스타일에 맞춰 비슷한 문제를 많이 만들어주십니다. 북일고 영어 내신 문제와 비슷한 유사 문제가 너무 많아서, 주시는 자료를 다 풀면 1등급이 안 나오는 게 이상할 정도로 퀄리티가 좋습니다. 특히 지문 분석을 워낙 잘 해주셔서 강의를 한 번만 들어도 거의 다 이해할 수 있습니다!',
      },
      {
        tags: ['#강의력', '#실시간질문답변'],
        subtitle: '높은 문제 적중률과 명쾌한 설명, 질문에 대한 꼼꼼한 즉각 답변까지',
        content: '풍부한 문제와 높은 적중률 덕분에 추천하고 싶은 수업입니다. 이해하기 어렵고 복잡한 내용도 여러 예시를 들어 쉽게 설명해 주시고, 타 수업에 비해 지문의 내용을 더 명확하고 직접적으로 이해할 수 있습니다. 무엇보다 질문을 했을 때 바로바로 꼼꼼하게 답변해 주시는 점이 정말 좋습니다!',
      },
      {
        tags: ['#학생중심', '#감동적인밀착관리'],
        subtitle: '"영어의 GOAT" 학생을 위해 이정도로 헌신하시는 선생님은 처음입니다.',
        content: '한 해 동안 4번의 영어 시험을 보며 1학기 중간고사를 제외하고 모두 1등급을 받았습니다. 이수진 선생님은 그 어떤 분보다도 학생을 위해 열심히 노력해 주십니다! 다른 학원도 다녀봤지만, 사소하게 느껴질 수 있는 내용들도 반톡으로 계속 챙겨주시고, 특별히 부탁드리지 않았는데도 시험 기간에 필요한 자료를 먼저 올려주시는 분은 없었습니다. 다음에도 꼭 다시 수강할 생각이고 주변에도 선생님의 수업을 추천하고 싶습니다.',
      },
    ],
  },
  {
    q: '다음에도 이수진 수업을 듣거나 추천할 예정이라면 그 이유는?',
    answers: [
      {
        tags: ['#적중률최고', '#서술형시험적중'],
        subtitle: '무작정 암기하지 않는 수업, 높은 적중률과 서술형 기출 완벽 대비',
        content: '무작정 암기하는 것이 아니라 글의 전체적인 윤곽을 먼저 보여주십니다. 무엇보다 문제 적중률이 정말 높고, 시험에 나올 만한 서술형 부분을 정확히 집어 주신 게 내신 대비에 큰 도움이 되었습니다. 시험 족집게 수업이라 부르고 싶을 만큼 서술형 기출 출제가 다수 되었습니다.',
      },
      {
        tags: ['#10분컷답변', '#무한자료제공'],
        subtitle: '평균 질문 답변 시간 10분 미만, 학생을 위해 아낌없이 지원해 주시는 선생님',
        content: '질문을 많이 해도 항상 빠르게 답변해 주시고, 저희가 필요로 하는 자료는 언제든 다 만들어서 제공해 주십니다. 평균 질문 답변 시간이 10분이 넘어가지 않을 정도입니다. 항상 학생들에게 뭐 하나라도 더 알려주시려는 진심 어린 마음이 느껴져서 정말 감사했습니다.',
      },
      {
        tags: ['#내신과모의고사', '#동시합격'],
        subtitle: '학교 수업과의 시너지 효과, 내신은 물론 모의고사까지 한 번에 대비',
        content: '학교에서 한 번, 학원에서 한 번 집중해서 듣기만 해도 내용이 잘 기억나서 혼자 공부할 때 무척 편했습니다. 수업 때 중요한 부분을 명확히 설명해 주시는데, 내신뿐만 아니라 모의고사에서 자주 나오는 단어까지 함께 연계해서 설명해 주시니 모의고사 대비에도 큰 도움이 됩니다. 내 등급을 책임져 주는 수업입니다.',
      },
      {
        tags: ['#체계적인교재', '#자연스러운지문암기'],
        subtitle: '필기부터 단어·문제까지 한 권으로 끝나는 독보적인 퀄리티의 자료',
        content: '자료의 퀄리티가 정말 좋습니다. 내신을 대비할 때 정리된 필기와 단어, 문제가 한 권의 교재에 모두 깔끔하게 정리되어 있어서 정말 편하게 공부할 수 있었습니다. 교재를 통해 영어를 공부하며 빈칸을 채우다 보니, 자연스럽게 지문을 많이 보게 되었고 덕분에 문장까지 저절로 외워져서 효율적이었습니다.',
      },
    ],
  },
];

type GradeEntry = { rank: number; exams: string[] };

const GRADE_TABS = [
  { label: '북일고1 (2025)' },
  { label: '북일고2 (2025)' },
  { label: '북일고3 (2025)' },
  { label: '2026 중간고사' },
];

const GRADE_DATA: GradeEntry[][] = [
  [
    { rank: 2,  exams: ['중간', '종합'] },
    { rank: 3,  exams: ['기말'] },
    { rank: 4,  exams: ['중간'] },
    { rank: 5,  exams: ['기말'] },
    { rank: 6,  exams: ['중간', '종합'] },
    { rank: 8,  exams: ['중간', '종합'] },
    { rank: 10, exams: ['기말', '종합'] },
    { rank: 11, exams: ['중간'] },
    { rank: 12, exams: ['종합'] },
    { rank: 13, exams: ['기말'] },
    { rank: 15, exams: ['기말×2', '종합'] },
    { rank: 17, exams: ['기말'] },
    { rank: 20, exams: ['중간', '종합'] },
    { rank: 22, exams: ['기말', '종합'] },
    { rank: 23, exams: ['중간', '기말×2'] },
    { rank: 24, exams: ['중간'] },
    { rank: 25, exams: ['중간', '기말', '종합'] },
    { rank: 26, exams: ['종합'] },
    { rank: 27, exams: ['기말'] },
    { rank: 28, exams: ['기말×2'] },
    { rank: 30, exams: ['종합'] },
    { rank: 31, exams: ['기말', '종합'] },
    { rank: 33, exams: ['종합'] },
    { rank: 34, exams: ['종합'] },
    { rank: 35, exams: ['중간', '기말×2'] },
    { rank: 36, exams: ['기말', '종합'] },
  ],
  [
    { rank: 1,  exams: ['기말'] },
    { rank: 2,  exams: ['중간', '기말', '종합'] },
    { rank: 3,  exams: ['종합'] },
    { rank: 6,  exams: ['기말'] },
    { rank: 8,  exams: ['종합'] },
    { rank: 9,  exams: ['종합'] },
    { rank: 10, exams: ['기말'] },
    { rank: 11, exams: ['중간'] },
    { rank: 12, exams: ['기말'] },
    { rank: 13, exams: ['중간', '종합'] },
  ],
  [
    { rank: 1,  exams: ['중간'] },
    { rank: 2,  exams: ['기말'] },
    { rank: 4,  exams: ['중간'] },
    { rank: 5,  exams: ['종합'] },
    { rank: 7,  exams: ['종합'] },
    { rank: 8,  exams: ['중간', '기말'] },
    { rank: 9,  exams: ['종합'] },
    { rank: 11, exams: ['기말'] },
    { rank: 12, exams: ['종합'] },
  ],
  [
    { rank: 5, exams: ['고1'] },
    { rank: 1, exams: ['고2'] },
    { rank: 2, exams: ['고2'] },
    { rank: 4, exams: ['고2'] },
    { rank: 5, exams: ['고2'] },
    { rank: 2, exams: ['고3'] },
    { rank: 4, exams: ['고3'] },
    { rank: 5, exams: ['고3'] },
  ],
];

function GradeScrollCard() {
  const [activeTab, setActiveTab] = useState(0);
  const list = GRADE_DATA[activeTab];

  return (
    <div
      className="p-6 rounded-xl h-full"
      style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,169,106,0.25)' }}
    >
      {/* 탭 */}
      <div className="flex flex-wrap gap-2 mb-5">
        {GRADE_TABS.map(({ label }, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: activeTab === i ? 'rgba(212,169,106,0.2)' : 'transparent',
              color: activeTab === i ? '#D4A96A' : 'rgba(255,255,255,0.35)',
              border: activeTab === i ? '1px solid rgba(212,169,106,0.4)' : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="flex items-center justify-center" style={{ height: '260px' }}>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>준비 중입니다.</p>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-xl" style={{ height: '260px' }}>
          <div
            className="absolute top-0 left-0 right-0 h-10 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(58,44,30,0.5) 10%, transparent)' }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-10 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(58,44,30,0.5) 10%, transparent)' }}
          />
          <div key={activeTab} style={{ animation: `scroll-up ${list.length * 1.55}s linear infinite` }}>
            {[...list, ...list].map(({ rank, exams }, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: '1px solid rgba(212,169,106,0.1)' }}
              >
                <span className="text-sm font-bold tracking-wide" style={{ color: '#D4A96A' }}>
                  전교 {rank}등
                </span>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {exams.map(exam => (
                    <span
                      key={exam}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 'rgba(212,169,106,0.1)',
                        color: 'rgba(255,255,255,0.6)',
                        border: '1px solid rgba(212,169,106,0.2)',
                      }}
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GradeStatCard() {
  const r = 38;
  const cx = 55;
  const cy = 55;
  const circ = 2 * Math.PI * r;
  const lsArc = (19 / 36) * circ;
  const otherArc = (17 / 36) * circ;

  return (
    <div
      className="p-8 rounded-xl"
      style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,169,106,0.25)' }}
    >
      <p className="text-xs font-medium tracking-widest mb-1.5" style={{ color: 'rgba(212,169,106,0.65)' }}>
        2025년 1등급 36명 기준
      </p>
      <p className="text-sm font-semibold mb-6 break-keep leading-snug" style={{ color: '#FFFFFF' }}>
        북일고 1학년 1등급 점유율
      </p>

      <div className="flex flex-col items-center mb-5">
        <svg width="120" height="120" viewBox="0 0 110 110">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="11" />
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="11"
            strokeDasharray={`${otherArc} ${circ}`}
            strokeDashoffset={-lsArc}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="#D4A96A"
            strokeWidth="11"
            strokeDasharray={`${lsArc} ${circ}`}
            strokeDashoffset={0}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
          <text x={cx} y={cy - 5} textAnchor="middle" fill="#D4A96A" fontSize="17" fontWeight="700">
            19명
          </text>
          <text x={cx} y={cy + 9} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">
            이수진 수강생
          </text>
        </svg>

        <div className="flex items-center gap-5 mt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4A96A' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>이수진 19명</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.18)' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>그 외 17명</span>
          </div>
        </div>
      </div>

      <div className="h-px mb-4" style={{ backgroundColor: 'rgba(212,169,106,0.2)' }} />

      <p className="text-xs tracking-widest mb-3 font-medium" style={{ color: 'rgba(212,169,106,0.8)' }}>
        2학기 흐름
      </p>
      <div className="flex items-end justify-center gap-3">
        <div className="text-center">
          <p className="text-base font-semibold" style={{ color: 'rgba(212,169,106,0.75)' }}>14명</p>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>중간</p>
        </div>
        <span className="text-xs mb-5" style={{ color: 'rgba(212,169,106,0.5)' }}>›</span>
        <div className="text-center">
          <p className="text-base font-semibold" style={{ color: 'rgba(212,169,106,0.75)' }}>17명</p>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>기말</p>
        </div>
        <span className="text-xs mb-5" style={{ color: 'rgba(212,169,106,0.5)' }}>›</span>
        <div className="text-center">
          <div className="flex items-baseline gap-1 justify-center">
            <p className="text-xl font-bold" style={{ color: '#D4A96A' }}>19명</p>
            <span className="text-xs" style={{ color: 'rgba(212,169,106,0.6)' }}>절반이상</span>
          </div>
          <p className="text-xs mt-0.5 break-keep" style={{ color: '#D4A96A' }}>2학기 종합</p>
        </div>
      </div>
    </div>
  );
}

function FeedbackSection() {
  const [activeQ, setActiveQ] = useState(0);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const switchQ = (qi: number) => {
    setActiveQ(qi);
    setExpanded(new Set());
  };

  const toggle = (i: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const current = FEEDBACK_ITEMS[activeQ];

  return (
    <section className="py-16 md:py-28 px-6" style={{ backgroundColor: '#52412F' }}>
      <div className="max-w-5xl mx-auto">
        <SectionTitle light>수강생의 목소리</SectionTitle>
        <p className="text-center -mt-8 mb-12 text-sm tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>
          직접 수업을 들은 학생들의 솔직한 후기입니다.
        </p>

        {/* 질문 선택 탭 */}
        <div className="grid grid-cols-2 gap-3 mb-8 md:mb-12">
          {FEEDBACK_ITEMS.map(({ q }, qi) => (
            <button
              key={qi}
              onClick={() => switchQ(qi)}
              className="text-left px-6 py-5 rounded-xl transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: activeQ === qi ? 'rgba(212,169,106,0.18)' : 'rgba(255,255,255,0.04)',
                border: activeQ === qi ? '1px solid rgba(212,169,106,0.5)' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <p
                className="text-xs tracking-widest mb-2 font-medium"
                style={{ color: activeQ === qi ? '#D4A96A' : 'rgba(212,169,106,0.4)' }}
              >
                Q{qi + 1}
              </p>
              <p
                className="text-sm font-medium leading-snug break-keep"
                style={{ color: activeQ === qi ? '#FFFFFF' : 'rgba(255,255,255,0.35)' }}
              >
                {q}
              </p>
            </button>
          ))}
        </div>

        {/* 답변 리스트 */}
        <div>
          {current.answers.map(({ tags, subtitle, content }, i) => (
            <div key={i}>
              <div
                className="h-px"
                style={{ backgroundColor: 'rgba(212,169,106,0.2)' }}
              />
              <div
                onClick={() => toggle(i)}
                className="py-6 cursor-pointer group"
              >
                {/* 해시태그 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs font-medium tracking-wide px-2.5 py-0.5 rounded-full"
                      style={{
                        color: '#D4A96A',
                        border: '1px solid rgba(212,169,106,0.35)',
                        backgroundColor: 'rgba(212,169,106,0.1)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* 부제 + 화살표 */}
                <div className="flex items-start justify-between gap-6">
                  <p className="text-sm md:text-base font-semibold leading-snug break-keep" style={{ color: '#FFFFFF' }}>
                    {subtitle}
                  </p>
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-300"
                    style={{
                      color: '#D4A96A',
                      transform: expanded.has(i) ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </div>
                {/* 본문 */}
                {expanded.has(i) && (
                  <p className="mt-4 text-sm leading-loose break-keep" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {content}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className="h-px" style={{ backgroundColor: 'rgba(212,169,106,0.2)' }} />
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="text-center mb-10 md:mb-16 fade-up">
      <h2 className="text-4xl font-semibold tracking-[0.12em] mb-5" style={{ color: light ? '#FFFFFF' : '#52412F' }}>
        {children}
      </h2>
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-20" style={{ backgroundColor: '#D4A96A', opacity: 0.7 }} />
        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#D4A96A' }} />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D4A96A' }} />
        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#D4A96A' }} />
        <div className="h-px w-20" style={{ backgroundColor: '#D4A96A', opacity: 0.7 }} />
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

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    return () => { window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 bg-white z-50 transition-shadow duration-300"
        style={{
          borderTop: '2px solid #D4A96A',
          borderBottom: '1px solid #E8DDD4',
          boxShadow: scrollProgress > 0 ? '0 4px 24px rgba(82,65,47,0.09)' : 'none',
        }}
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
        <div className="border-t pt-4" style={{ borderColor: '#52412F40' }}>
          <a href="/blog" onClick={() => setMenuOpen(false)} className="text-lg font-medium transition-opacity hover:opacity-60" style={{ color: '#52412F' }}>블로그</a>
        </div>
        <div className="border-y py-4" style={{ borderColor: '#52412F40' }}>
          <a href="/daily" onClick={() => setMenuOpen(false)} className="text-lg font-medium transition-opacity hover:opacity-60" style={{ color: '#52412F' }}>Daily Posting</a>
        </div>
      </div>

      {/* Hero Section */}
      <section
        className="px-6 relative overflow-hidden flex flex-col"
        style={{ background: 'radial-gradient(ellipse at 50% 20%, #F2E8D9 0%, #FAF6F1 65%)', minHeight: '88vh' }}
      >
        <div className="h-[90px] flex-shrink-0" />
        <div className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto text-center relative z-10 pt-8 pb-16 md:py-24 px-4 w-full">
          <div className="mb-6 md:mb-8 flex justify-center hero-a1">
            <Image
              src="/nav-logo.png"
              alt="이수진영어 내신코치"
              width={520}
              height={170}
              className="object-contain w-full max-w-lg"
              style={{ filter: 'drop-shadow(0 4px 18px rgba(82,65,47,0.13))' }}
            />
          </div>
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <div className="h-px w-16" style={{ backgroundColor: '#D4A96A', opacity: 0.5 }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#D4A96A' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#D4A96A' }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#D4A96A' }} />
            <div className="h-px w-16" style={{ backgroundColor: '#D4A96A', opacity: 0.5 }} />
          </div>
          <p className="text-lg md:text-2xl mb-4 md:mb-6 font-semibold italic leading-snug hero-a2" style={{ color: '#D4A96A' }}>
            북일고 영어의 압도적 1위,<br className="md:hidden" /> 이수진이 결과로 증명합니다.
          </p>
          <p className="text-sm md:text-lg mb-10 md:mb-12 leading-loose max-w-2xl mx-auto font-normal tracking-wide hero-a3" style={{ color: '#52412F', opacity: 0.7 }}>
            24년차 베테랑(북일고 10년) 전문가가 만들어가는<br />
            체계적이고 차별화된 프리미엄 영어교육
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfX4hDN36OIeCV5_3qlqzUJb3xOjXUYL0AjG_B0N57ScyZmsQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 md:px-12 py-3 md:py-4 font-semibold tracking-widest text-sm transition-all hover:bg-transparent border cursor-pointer hero-a4"
            style={{
              backgroundColor: '#D4A96A',
              color: '#FFFFFF',
              borderColor: '#D4A96A',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.color = '#D4A96A';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#D4A96A';
              (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
            }}
          >
            수강 신청 문의하기
          </a>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="pt-20 pb-16 md:py-28 px-6" style={{ backgroundColor: '#52412F' }}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle light>왜 이수진 영어인가</SectionTitle>

          {/* Sub 1: 최상위권이 선택하는 이유 — 메인 */}
          <div className="mb-10 md:mb-20">
            <div className="text-center mb-8 md:mb-12 fade-up">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8" style={{ backgroundColor: '#D4A96A', opacity: 0.5 }} />
                <p className="text-base font-semibold tracking-widest" style={{ color: '#D4A96A' }}>최상위권이 선택하는 이유</p>
                <div className="h-px w-8" style={{ backgroundColor: '#D4A96A', opacity: 0.5 }} />
              </div>
              <p className="text-2xl md:text-3xl font-semibold tracking-wide break-keep" style={{ color: '#FFFFFF' }}>
                압도적인 결과로 증명합니다.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start fade-up" style={{ transitionDelay: '0.15s' }}>
              <GradeStatCard />
              <div className="md:col-span-2">
                <GradeScrollCard />
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="h-px mb-10 md:mb-20" style={{ backgroundColor: 'rgba(212,169,106,0.2)' }} />

          {/* Sub 2 */}
          <div className="mb-10 md:mb-20 max-w-2xl fade-up">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4A96A' }} />
              <p className="text-sm font-medium tracking-wide" style={{ color: '#D4A96A' }}>점수는 우연이 아닌 시스템입니다.</p>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold leading-snug break-keep mb-6" style={{ color: '#FFFFFF' }}>
              점수를 넘어 실력을 만듭니다.
            </h3>
            <p className="text-sm md:text-base leading-loose break-keep" style={{ color: 'rgba(255,255,255,0.65)' }}>
              내신 출제 경향 분석부터 서술형·변형문제 대비까지.<br />
              학생 개개인의 약점을 진단&amp;보완하여, 실제 시험에서 점수로 연결되는 학습 전략을 제공합니다.
            </p>
          </div>

          {/* 구분선 */}
          <div className="h-px mb-10 md:mb-20" style={{ backgroundColor: 'rgba(212,169,106,0.2)' }} />

          {/* Sub 3 */}
          <div className="max-w-2xl fade-up">
            <div className="flex items-start gap-2 mb-5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: '#D4A96A' }} />
              <p className="text-sm font-medium tracking-wide leading-relaxed" style={{ color: '#D4A96A' }}>
                상위권을 유지하는 학생도,<br />
                상위권을 목표로하는 학생도.
              </p>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold leading-snug break-keep mb-6" style={{ color: '#FFFFFF' }}>
              함께 성장하는 영어
            </h3>
            <p className="text-sm md:text-base leading-loose break-keep" style={{ color: 'rgba(255,255,255,0.65)' }}>
              단순히 문제를 많이 푸는 수업이 아니라 영어를 이해하고 적용하는 힘을 기릅니다.<br />
              학생과 함께 목표를 세우고, 결과를 만들어갑니다.
            </p>
          </div>

        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 md:py-28 px-6" style={{ backgroundColor: '#FAF6F1' }}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle>학원 관리 시스템</SectionTitle>
          <div>
            {[
              {
                subtitle: '매주 새롭게 제작되는 맞춤형 학습 콘텐츠',
                title: '직접 제작하는 주간 학습 교재',
                desc: '출제 경향과 학생들의 학습 상황을 반영하여 직접 제작한 교재를 제공합니다. 단순한 문제 풀이가 아닌, 시험에 필요한 핵심 내용을 체계적으로 학습할 수 있도록 설계합니다.',
              },
              {
                subtitle: '질문을 미루지 않는 즉각적인 피드백',
                title: '실시간 질의응답 관리',
                desc: '학생들의 질문에 직접 답변하며 학습 공백을 최소화합니다. 작은 의문도 바로 해결하여 이해를 완성하고, 혼자 고민하는 시간을 줄여 학습 효율을 높입니다.',
              },
              {
                subtitle: '이수진 영어만의 자체 제작 학습 플랫폼',
                title: '독자 개발 학습 시스템',
                desc: '단어·구문 암기를 위한 전용 웹앱과 핵심 내용을 압축한 핸디북을 제공합니다. 다른 학원에서는 경험할 수 없는 자체 개발 학습 시스템으로 반복 학습과 암기를 효과적으로 관리합니다.',
              },
              {
                subtitle: '끝까지 책임지는 밀착 학습 관리',
                title: '1:1 학습 관리 및 소통',
                desc: '학생과 직접 소통하며 진도, 과제, 학습 습관을 지속적으로 점검합니다. 단순히 수업만 하는 것이 아니라 목표 달성까지 함께 관리하는 책임형 학습 시스템을 운영합니다.',
              },
            ].map(({ subtitle, title, desc }, i) => (
              <div key={title} className="fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                {i > 0 && (
                  <div className="h-px" style={{ backgroundColor: '#D4A96A', opacity: 0.2 }} />
                )}
                <div className="grid md:grid-cols-5 gap-4 md:gap-16 py-8 md:py-12">
                  <div className="md:col-span-2 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4A96A' }} />
                      <p className="text-sm font-medium tracking-wide break-keep" style={{ color: '#D4A96A' }}>
                        {subtitle}
                      </p>
                    </div>
                    <h3 className="text-xl font-semibold tracking-wide leading-snug break-keep" style={{ color: '#52412F' }}>
                      {title}
                    </h3>
                  </div>
                  <div className="md:col-span-3 flex items-center">
                    <p className="text-sm md:text-base leading-loose tracking-wide break-keep" style={{ color: '#52412F', opacity: 0.7 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <FeedbackSection />

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-28 px-6" style={{ backgroundColor: '#FAF6F1' }}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle>문의하기</SectionTitle>
          <p className="text-center -mt-8 mb-16 tracking-wider text-sm font-medium fade-up" style={{ color: '#D4A96A' }}>
            언제든 편하게 연락주세요
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="p-10 rounded-xl fade-up"
              style={{
                backgroundColor: '#FFFFFF',
                borderTop: '3px solid #D4A96A',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                transitionDelay: '0.1s',
              }}
            >
              <h3 className="text-xl font-semibold tracking-wide mb-8" style={{ color: '#52412F' }}>연락처</h3>
              <div className="space-y-6">
                {[
                  { icon: <Phone className="w-5 h-5" style={{ color: '#FFFFFF' }} />, label: '전화', value: '010 - 8909 - 8942' },
                  { icon: <Mail className="w-5 h-5" style={{ color: '#FFFFFF' }} />, label: '이메일', value: 'jirolub48@naver.com' },
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
                    <p className="text-xs text-gray-400 tracking-widest mb-0.5">상담시간</p>
                    <p className="font-medium" style={{ color: '#52412F' }}>평일 10:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-10 rounded-xl fade-up"
              style={{
                backgroundColor: '#FFFFFF',
                borderTop: '3px solid #D4A96A',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                transitionDelay: '0.2s',
              }}
            >
              <h3 className="text-xl font-semibold tracking-wide mb-8" style={{ color: '#52412F' }}>오시는 길</h3>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#52412F' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#FFFFFF' }} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 tracking-widest mb-0.5">주소</p>
                  <p className="font-medium leading-relaxed" style={{ color: '#52412F' }}>
                    충남 천안시 북일로 70,<br />신부힐스테이트 109동 202호
                  </p>
                </div>
              </div>
              <iframe
                src="https://maps.google.com/maps?q=충남+천안시+북일로+70+신부힐스테이트&output=embed&z=16&hl=ko"
                className="w-full rounded-xl"
                style={{ height: '200px', border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="text-center mt-16">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfX4hDN36OIeCV5_3qlqzUJb3xOjXUYL0AjG_B0N57ScyZmsQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-14 py-4 font-medium tracking-widest text-sm border transition-all cursor-pointer"
              style={{ backgroundColor: '#D4A96A', color: '#FFFFFF', borderColor: '#D4A96A' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.color = '#D4A96A';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#D4A96A';
                (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
              }}
            >
              수강 상담 신청하기
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E8DDD4' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-5">
            <Image
              src="/nav-logo.png"
              alt="이수진영어 내신코치"
              width={160}
              height={52}
              className="object-contain opacity-80"
            />
          </div>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12" style={{ backgroundColor: '#D4A96A', opacity: 0.5 }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#D4A96A', opacity: 0.5 }} />
            <div className="h-px w-12" style={{ backgroundColor: '#D4A96A', opacity: 0.5 }} />
          </div>
          <p className="text-gray-400 text-sm tracking-wide">Tel: 010-8909-8942 &nbsp;|&nbsp; Email: jirolub48@naver.com</p>
          <p className="text-gray-300 mt-4 text-xs tracking-widest">© 2026 이수진 영어. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
