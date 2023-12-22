import { LinkOutlined } from '@ant-design/icons';
import './footerstyle.css';

function Footer() {
  return (
    <div className="appFooter">
      <div className="footer__content">
        <div className="footer__top-section">
          <p className="footer__title"><h2>CENTRALISED MANAGEMENT TRACKING SYSTEM</h2></p>
          <div className="footer__links">
            <p>Contact us at 
              <a href="mailto:helpdesk@mas.gov.sg" className="footer-link"><span>&nbsp;</span>helpdesk@mas.gov.sg</a>
            </p>
          </div>
        </div>
        <div className="footer__bottom-section">
          <div className="footer__links">
            <a className="footer__link" href="https://www.mas.gov.sg/privacy-statement" target="_blank" rel="noreferrer"><LinkOutlined />Privacy Statement
            </a>
            <a className="footer__link" href="https://www.mas.gov.sg/terms-of-use" target="_blank" rel="noreferrer"><LinkOutlined />Terms of Use
            </a>
            <a className="footer__link" href="https://www.mas.gov.sg/rate-this-website" target="_blank" rel="noreferrer"><LinkOutlined />Rate this Website
            </a>
            <a className="footer__link" href="https://www.reach.gov.sg/" target="_blank" rel="noreferrer"><LinkOutlined />Reach
            </a>
          </div>
          <div className="footer__watermark">
            <p>© 2023 Government of Singapore</p>
            <p>Last Updated 11 Jan 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;