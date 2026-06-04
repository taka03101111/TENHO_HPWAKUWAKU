// TENHO HP — WHAT (no images; text-only cards, larger readable type,
// AI Cowork & シナプスAI link out to their landing pages)

const WHAT_ICONS = {
  internalize: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="13" r="6"/>
      <path d="M8 33c0-6 5.4-10 12-10s12 4 12 10"/>
    </svg>
  ),
  cowork: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="5"/>
      <circle cx="27" cy="16" r="4"/>
      <path d="M5 32c0-5 4-8.5 9-8.5s9 3.5 9 8.5"/>
      <path d="M24.5 23.5c4 0 7.5 3 7.5 8"/>
    </svg>
  ),
  synapse: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="3.2"/>
      <circle cx="9" cy="11" r="2.4"/>
      <circle cx="31" cy="11" r="2.4"/>
      <circle cx="10" cy="30" r="2.4"/>
      <circle cx="30" cy="30" r="2.4"/>
      <path d="M11 12.5 L17.4 18 M29 12.5 L22.6 18 M11.6 28.5 L17.6 22 M28.4 28.5 L22.4 22"/>
    </svg>
  ),
  densho: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 5 L33 10 V20 C33 28 27 33 20 35 C13 33 7 28 7 20 V10 Z"/>
      <path d="M15 20 l4 4 l7 -8"/>
    </svg>
  ),
};

const WHAT_PILLARS = [
  {
    num: '01',
    en: 'Academy',
    variant: 'academy',
    sub: ['人を起点に、', 'AI活用を社内に定着させる。'],
    items: [
      {
        icon: 'internalize',
        name: '生成AI内製化支援',
        desc: '現場の課題を起点に、AI活用を“自分たちで回せる”体制をつくる。',
        tags: ['伴走', '内製化', '研修'],
      },
      {
        icon: 'cowork',
        name: 'AI Cowork',
        desc: '実践型プロジェクトで、アイデアを形にし、成果へつなげる。',
        tags: ['実装', 'エージェント', '働き方'],
        link: 'https://tenho7.jp/aicowork-lp/',
      },
    ],
  },
  {
    num: '02',
    en: 'Technology',
    variant: 'tech',
    sub: ['製品で、現場のAI活用を', 'ダイレクトに加速させる。'],
    items: [
      {
        icon: 'synapse',
        name: 'シナプスAI',
        desc: '企業向け生成AIプラットフォーム。社内文書検索からマルチモーダル対応まで。',
        tags: ['プラットフォーム', 'マルチモーダル', 'RAG'],
        link: 'https://tenho7.jp/synapse-lp/',
      },
      {
        icon: 'densho',
        name: 'DENSHO AI',
        desc: '保全業務に特化したAI。属人化を解消し、誰でも対応できる現場へ。',
        tags: ['保全', '技能継承', 'チャット'],
      },
    ],
  },
];

function WhatService({ it }) {
  const inner = (
    <React.Fragment>
      <div className="what2-service__icon">{WHAT_ICONS[it.icon]}</div>
      <div className="what2-service__name">
        {it.name}
        {it.link ? <span className="what2-service__arr">↗</span> : null}
      </div>
      <div className="what2-service__desc">{it.desc}</div>
      <div className="what2-service__tags">
        {it.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
      </div>
    </React.Fragment>
  );

  if (it.link) {
    return (
      <a className="what2-service is-link" href={it.link} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return <div className="what2-service">{inner}</div>;
}

function What() {
  return (
    <section id="what" data-screen-label="06 WHAT">
      <div className="shell">
        <div className="section-index">06 / 09 — WHAT</div>

        <div className="what2-head">
          <div className="what2-head__title">
            <span className="eyebrow reveal">WHAT WE DO</span>
            <div className="head-en reveal" data-delay="1">What</div>
          </div>
          <div className="what2-head__copy reveal" data-delay="2">
            <div className="head-jp is-serif">
              2つの軸で、<br/>
              <span className="em">現場のAI活用</span>を支える。
            </div>
            <p className="what2-head__sub">
              人を育て、仕組みをつくる。それが、TENHOのアプローチです。
            </p>
          </div>
        </div>

        <div className="what2-grid">
          {WHAT_PILLARS.map((p, pi) => (
            <div className="what2-card reveal" data-variant={p.variant} data-delay={pi + 1} key={p.en}>
              <div className="what2-cardhead">
                <div className="what2-cardhead__num">{p.num}</div>
                <div className="what2-cardhead__name">
                  <span className="brand">TENHO</span>
                  <span className="big">{p.en}</span>
                </div>
                <div className="what2-cardhead__sub">
                  {p.sub.map((s, i) => <span key={i}>{s}<br/></span>)}
                </div>
              </div>

              <div className="what2-services">
                {p.items.map((it) => <WhatService it={it} key={it.name} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.What = What;
