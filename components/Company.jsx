// TENHO HP — Company
// Real company info from tenho7.jp. Statement + business/products/network rows removed.

const COMPANY_ROWS = [
  { k: 'Company',        jp: '会社名',     v: '株式会社 TENHO（TENHO inc.）' },
  { k: 'Founded',        jp: '設立',       v: '2023年5月' },
  { k: 'Representative', jp: '代表者',     v: '田村 允（代表取締役）' },
  { k: 'Capital',        jp: '資本金',     v: '1,000万円' },
  { k: 'Address',        jp: '所在地',     v: '〒150-0045　東京都渋谷区神泉町10-10 アシジ神泉ビル10F' },
  { k: 'Business',       jp: '事業内容',   v: '生成AI導入支援・研修事業 ／ AIアプリケーション開発' },
];

function Company() {
  return (
    <section id="company" data-screen-label="09 Company">
      <div className="shell">
        <div className="section-index">09 / 09 — COMPANY</div>

        <div className="section-head section-head--solo">
          <div className="head-left">
            <span className="eyebrow reveal">ABOUT TENHO</span>
            <div className="head-en reveal" data-delay="1">
              Company
            </div>
          </div>
        </div>

        <table className="company-table reveal" data-delay="2">
          <tbody>
            {COMPANY_ROWS.map((r) => (
              <tr key={r.k}>
                <th>
                  {r.k}
                  <span className="jp">{r.jp}</span>
                </th>
                <td>{r.v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="company-footer">
          <div className="brand">
            <img src="assets/TENHO-logo-black.png" alt="TENHO" />
            <p>Manufacturing × AI × Future</p>
          </div>
          <div className="copyright">
            © TENHO inc. All Rights Reserved.
          </div>
        </div>
      </div>
    </section>
  );
}

window.Company = Company;
