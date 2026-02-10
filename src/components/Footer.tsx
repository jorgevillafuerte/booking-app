import { useI18n } from '../i18n/I18nContext.tsx'
import './Footer.css'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="footer">
      <span className="footer__branding">
        {t.common.poweredBy} <strong className="footer__brand-name">MEITRE</strong>
      </span>
      <a href="#" className="footer__privacy-link">
        {t.common.privacyPolicy}
      </a>
    </footer>
  )
}
