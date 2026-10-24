import { Link } from "react-router-dom";
import { useI18n } from "../i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="wordmark wordmark-foot">
            <span className="wordmark-mack">MACK</span>
            <span className="wordmark-and">&amp; CO.</span>
          </p>
          <p className="footer-blurb">{t.footer.blurb}</p>
        </div>
        <nav className="footer-nav">
          <Link to="/shop">{t.nav.shop}</Link>
          <Link to="/subscribe">{t.nav.subscribe}</Link>
          <Link to="/cart">{t.nav.cart}</Link>
        </nav>
      </div>
      <p className="footer-demo">{t.footer.demo}</p>
      <p className="footer-rights">{t.footer.rights}</p>
    </footer>
  );
}
