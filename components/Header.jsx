// TENHO HP — Header
// Sticky nav with scroll-spy. Active section gets a pale blue underline.

const NAV_ITEMS = [
  { id: 'top',       num: '01', label: 'TOP' },
  { id: 'vision',    num: '02', label: 'Vision' },
  { id: 'how',       num: '03', label: 'HOW' },
  { id: 'why-now',   num: '04', label: 'Why NOW' },
  { id: 'why-tenho', num: '05', label: 'Why TENHO' },
  { id: 'what',      num: '06', label: 'WHAT' },
  { id: 'more',      num: '07', label: 'MORE' },
  { id: 'contact',   num: '08', label: 'Contact' },
  { id: 'company',   num: '09', label: 'Company' },
];

function Header({ activeId, scrolled }) {
  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className={"site-header " + (scrolled ? 'scrolled' : '')}>
      <div className="site-header-inner">
        <a
          className="site-logo"
          href="#top"
          onClick={(e) => handleClick(e, 'top')}
          aria-label="TENHO"
        >
          <img src="assets/TENHO-logo-black.png" alt="TENHO" />
        </a>
        <nav className="site-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={'#' + item.id}
              className={activeId === item.id ? 'is-active' : ''}
              onClick={(e) => handleClick(e, item.id)}
              data-comment-anchor={'nav-' + item.id}
            >
              <span className="nav-num">{item.num}</span>
              {item.label}
              <span className="nav-underline" aria-hidden="true"></span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

window.Header = Header;
window.NAV_ITEMS = NAV_ITEMS;
