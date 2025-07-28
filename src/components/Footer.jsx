import styles from './Footer.module.css';
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <div>
    <div className={styles.waveTop}>
  <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path
      fill="#3949ab"
      d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,181.3C672,171,768,117,864,117.3C960,117,1056,171,1152,165.3C1248,160,1344,96,1392,64L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    />
  </svg>
</div>

    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.section}>
          <h3>Contact Us</h3>
          <p><FaEnvelope /> dailygrace@example.com</p>
          <p><FaPhoneAlt /> +91 98765 43210</p>
        </div>

        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/testimonies">Testimonies</a></li>
            <li><a href="/rosary">Rosary</a></li>
            <li><a href="/journey">Journey</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Stay Updated</h3>
          <form className={styles.newsletter}>
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
          <div className={styles.socials}>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Daily Grace. All rights reserved.</p>
      </div>
    </footer>
    </div>
  );
}
