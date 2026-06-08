// TENHO HP — MORE
// Tries to fetch the latest 3 posts from https://note.com/tenho_ai via the public
// RSS feed (through a CORS proxy). Falls back to a curated set so the section
// always renders if the proxy is unavailable.

const NOTE_URL = 'https://note.com/tenho_ai';
const NOTE_RSS = 'https://note.com/tenho_ai/rss';

// Curated fallback — replace with real links once available.
const FALLBACK_ITEMS = [
  {
    date: '2025.11',
    category: 'AWARD',
    title: '「素形材産業経営賞」経済産業省 製造産業局長賞を、オーテック×TENHOの共創プロジェクトで受賞。',
    link: NOTE_URL,
    art: 'circuit',
  },
  {
    date: '2025.09',
    category: 'CASE STUDY',
    title: '製造業向けAI内製化支援、約2年間で経費削減1億円・事業創出1,500万円を達成。',
    link: NOTE_URL,
    art: 'orbit',
  },
  {
    date: '2025.07',
    category: 'INTERNAL',
    title: 'AI Coworkプロジェクト最新版。議事録から次アクションまでをAIが自動生成する社内運用レポート。',
    link: NOTE_URL,
    art: 'grid',
  },
];

function fmtDate(d) {
  try {
    const date = new Date(d);
    if (isNaN(date)) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    return y + '.' + m;
  } catch (e) { return ''; }
}

function pickArt(i) {
  return ['orbit', 'circuit', 'grid'][i % 3];
}

function ThumbArt({ kind, image }) {
  if (image) {
    return (
      <div
        className="more-thumb-img"
        style={{ backgroundImage: image ? 'url("' + image + '")' : undefined }}
      />
    );
  }
  if (kind === 'orbit') {
    return (
      <div className="more-thumb-art">
      <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="g-orbit" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#BEDCFF" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#BEDCFF" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="34" fill="url(#g-orbit)"/>
        <ellipse cx="0" cy="0" rx="38" ry="22" fill="none" stroke="#0E0E0E" strokeWidth="0.4"/>
        <ellipse cx="0" cy="0" rx="28" ry="16" fill="none" stroke="#0E0E0E" strokeWidth="0.3" transform="rotate(28)"/>
        <ellipse cx="0" cy="0" rx="44" ry="26" fill="none" stroke="#76736B" strokeWidth="0.25" strokeDasharray="1.2 2"/>
        <circle cx="0" cy="0" r="4" fill="#0E0E0E"/>
        <circle cx="32" cy="-8" r="1.6" fill="#0E0E0E"/>
        <circle cx="-26" cy="12" r="1.2" fill="#6FA8DC"/>
      </svg>
      </div>
    );
  }
  if (kind === 'circuit') {
    return (
      <div className="more-thumb-art">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <g fill="none" stroke="#0E0E0E" strokeWidth="0.4">
          <path d="M10 20 L30 20 L30 40 L60 40 L60 20 L90 20"/>
          <path d="M10 50 L25 50 L25 70 L55 70 L55 50 L75 50 L75 30 L90 30"/>
          <path d="M10 80 L40 80 L40 60 L80 60 L80 80 L90 80"/>
        </g>
        <g fill="#0E0E0E">
          <circle cx="30" cy="20" r="1.8"/>
          <circle cx="60" cy="40" r="1.8"/>
          <circle cx="25" cy="70" r="1.8"/>
          <circle cx="75" cy="30" r="1.8"/>
          <circle cx="40" cy="80" r="1.8"/>
          <circle cx="80" cy="60" r="1.8"/>
        </g>
        <g fill="#6FA8DC">
          <circle cx="90" cy="20" r="1.6"/>
          <circle cx="90" cy="30" r="1.6"/>
          <circle cx="90" cy="80" r="1.6"/>
        </g>
        <rect x="48" y="46" width="16" height="10" fill="none" stroke="#0E0E0E" strokeWidth="0.5" rx="0.5"/>
      </svg>
      </div>
    );
  }
  return (
    <div className="more-thumb-art">
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="pg" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0 L0 0 L0 10" fill="none" stroke="#D8D3C8" strokeWidth="0.3"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#pg)"/>
      <g>
        <rect x="20" y="20" width="20" height="20" fill="#0E0E0E" opacity="0.85"/>
        <rect x="42" y="20" width="14" height="14" fill="none" stroke="#0E0E0E" strokeWidth="0.4"/>
        <rect x="42" y="36" width="14" height="14" fill="#BEDCFF" opacity="0.7"/>
        <rect x="58" y="20" width="22" height="6" fill="none" stroke="#0E0E0E" strokeWidth="0.4"/>
        <rect x="58" y="28" width="22" height="22" fill="none" stroke="#76736B" strokeWidth="0.3"/>
        <rect x="20" y="42" width="20" height="6" fill="none" stroke="#0E0E0E" strokeWidth="0.4"/>
        <rect x="20" y="50" width="36" height="20" fill="none" stroke="#0E0E0E" strokeWidth="0.4"/>
        <rect x="58" y="52" width="22" height="18" fill="#0E0E0E"/>
        <rect x="20" y="72" width="60" height="8" fill="none" stroke="#76736B" strokeWidth="0.3"/>
      </g>
    </svg>
    </div>
  );
}

// CORS proxies tried in order — first to return usable RSS wins.
const PROXIES = [
  (u) => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u),
  (u) => 'https://corsproxy.io/?url=' + encodeURIComponent(u),
  (u) => 'https://thingproxy.freeboard.io/fetch/' + u,
];

function normalizeImageUrl(url) {
  if (!url) return url;
  const cleaned = url.trim();
  const hasWidth = /(?:\?|&)width=\d+/i.test(cleaned);
  if (hasWidth) {
    return cleaned.replace(/([?&])width=\d+/i, '$1width=520');
  }
  return cleaned + (cleaned.includes('?') ? '&width=520' : '?width=520');
}

function parseSrcset(srcset) {
  if (!srcset) return null;
  const parts = srcset.split(',').map((part) => part.trim()).filter(Boolean);
  if (!parts.length) return null;
  const first = parts[0].split(/\s+/)[0];
  return first || null;
}

function getImageSrcFromElement(image) {
  return image.getAttribute('src')
    || image.getAttribute('data-src')
    || image.getAttribute('data-original')
    || image.getAttribute('data-lazy-src')
    || image.getAttribute('data-srcset') && parseSrcset(image.getAttribute('data-srcset'))
    || image.getAttribute('srcset') && parseSrcset(image.getAttribute('srcset'))
    || null;
}

function getFirstImageFromHtml(html) {
  if (!html) return null;
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const image = doc.querySelector('img');
    if (image) return getImageSrcFromElement(image);
    const figureImage = doc.querySelector('figure img');
    if (figureImage) return getImageSrcFromElement(figureImage);
    return null;
  } catch (e) {
    return null;
  }
}

async function fetchOgImageFromPage(url) {
  for (const build of PROXIES) {
    try {
      const res = await fetch(build(url));
      if (!res.ok) continue;
      const text = await res.text();
      const doc = new DOMParser().parseFromString(text, 'text/html');
      const meta = doc.querySelector('meta[property="og:image"]')
        || doc.querySelector('meta[name="og:image"]')
        || doc.querySelector('meta[name="twitter:image"]');
      const image = meta?.getAttribute('content')?.trim();
      if (image) return normalizeImageUrl(image);
    } catch (e) {
      // try next proxy
    }
  }
  return null;
}

let SITE_FALLBACK = null;
async function fetchSiteFallback() {
  if (SITE_FALLBACK) return SITE_FALLBACK;
  try {
    for (const build of PROXIES) {
      try {
        const res = await fetch(build(NOTE_URL));
        if (!res.ok) continue;
        const text = await res.text();
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const metaImage = doc.querySelector('meta[property="og:image"]')
          || doc.querySelector('meta[name="og:image"]')
          || doc.querySelector('meta[name="twitter:image"]');
        const metaTitle = doc.querySelector('meta[property="og:title"]')
          || doc.querySelector('meta[name="og:title"]')
          || doc.querySelector('meta[name="twitter:title"]');
        const image = metaImage?.getAttribute('content')?.trim() || null;
        const title = metaTitle?.getAttribute('content')?.trim() || (doc.querySelector('title') && doc.querySelector('title').textContent.trim()) || null;
        SITE_FALLBACK = { image: image ? normalizeImageUrl(image) : null, title };
        return SITE_FALLBACK;
      } catch (e) { /* next proxy */ }
    }
  } catch (e) { /* ignore */ }
  SITE_FALLBACK = { image: null, title: null };
  return SITE_FALLBACK;
}

function extractImage(node) {
  const encodedNode = node.getElementsByTagName('content:encoded')[0];
  const html = (encodedNode && encodedNode.textContent)
    || (node.querySelector('description') && node.querySelector('description').textContent)
    || '';
  const firstImg = getFirstImageFromHtml(html);
  if (firstImg) {
    return normalizeImageUrl(firstImg);
  }

  // fallback: media:thumbnail / media:content url attribute or text content
  const media = node.getElementsByTagName('media:thumbnail')[0]
             || node.getElementsByTagName('media:content')[0];
  if (media) {
    const url = media.getAttribute('url') || media.textContent?.trim();
    if (url) return normalizeImageUrl(url);
  }

  // enclosure
  const enc = node.getElementsByTagName('enclosure')[0];
  if (enc && enc.getAttribute('url')) return normalizeImageUrl(enc.getAttribute('url'));
  return null;
}

async function fetchNoteRss() {
  for (const build of PROXIES) {
    try {
      const res = await fetch(build(NOTE_RSS));
      if (!res.ok) continue;
      const text = await res.text();
      if (!text || text.indexOf('<item') === -1) continue;
      const doc = new DOMParser().parseFromString(text, 'text/xml');
      const nodes = Array.from(doc.querySelectorAll('item')).slice(0, 3);
      if (!nodes.length) continue;
      const siteFallback = await fetchSiteFallback();
      const items = [];
      for (const [i, n] of nodes.entries()) {
        let title = (n.querySelector('title')?.textContent || '').trim();
        const link = (n.querySelector('link')?.textContent || '').trim() || NOTE_URL;
        const pub = (n.querySelector('pubDate')?.textContent || '').trim();
        let image = extractImage(n);
        if (!image) {
          image = await fetchOgImageFromPage(link);
        }
        if (!image && siteFallback && siteFallback.image) {
          image = siteFallback.image;
        }
        if ((!title || title.length === 0) && siteFallback && siteFallback.title) {
          title = siteFallback.title;
        }
        items.push({
          date: fmtDate(pub),
          category: 'NOTE',
          title,
          link,
          image,
          art: pickArt(i),
        });
      }
      return items;
    } catch (e) { /* try next proxy */ }
  }
  return null;
}

function More() {
  const [items, setItems] = React.useState(FALLBACK_ITEMS);

  React.useEffect(() => {
    let mounted = true;
    fetchNoteRss().then((parsed) => {
      if (mounted && parsed && parsed.length) setItems(parsed);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <section id="more" data-screen-label="07 MORE">
      <div className="shell">
        <div className="section-index">07 / 09 — MORE</div>

        <div className="section-head">
          <div className="head-left">
            <span className="eyebrow reveal">RECENT NOTES</span>
            <div className="head-en reveal" data-delay="1">
              Case
            </div>
          </div>
          <div className="head-jp is-serif reveal" data-delay="2">
            実践事例や最新情報を、<br/>
            <span className="em">発信</span>しています。
          </div>
        </div>

        <div className="more-grid">
          {items.map((m, i) => (
            <a
              key={i}
              href={m.link || NOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="more-card reveal"
              data-delay={i + 1}
            >
              <div className="more-thumb">
                <ThumbArt kind={m.art} image={m.image} />
              </div>
              <div className="more-body">
                <div className="more-meta">
                  {m.date ? <span>{m.date}</span> : null}
                  {m.date ? <span>·</span> : null}
                  <span>{m.category || 'NOTE'}</span>
                </div>
                <div className="more-title">{m.title}</div>
                <div className="more-tag">READ <span>↗</span></div>
              </div>
            </a>
          ))}
        </div>

        <div className="more-cta reveal" data-delay="4">
          <a href={NOTE_URL} target="_blank" rel="noopener noreferrer">
            さらに事例を見る <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

window.More = More;
