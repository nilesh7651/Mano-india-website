import styles from "./Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top section */}
      <div className={styles.top}>
        {/* Company */}
        <div>
          <h3>Company Logo</h3>
          <p className={styles.subTitle}>Social Media</p>
          <div className={styles.socials}>
            <FacebookIcon />
            <TwitterIcon />
            <LinkedInIcon />
            <InstagramIcon />
          </div>
        </div>

        {/* Venues */}
        <div>
          <h4>Venues</h4>
          <ul>
            <li>Abu Dhabi</li>
            <li>Al Ain</li>
            <li>Ajman</li>
            <li>Dubai</li>
            <li>Fujairah</li>
            <li>Ras Al Khaimah</li>
          </ul>
        </div>

        {/* Suppliers */}
        <div>
          <h4>Suppliers</h4>
          <ul>
            <li>Photographers</li>
            <li>Decorators</li>
            <li>Venues Planner</li>
            <li>Choreographers</li>
            <li>Designers</li>
            <li>Makeup Artists</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4>Newsletter</h4>
          <p className={styles.newsText}>
            Subscribe To Get Latest Media Updates
          </p>
          <button className={styles.chatBtn}>Live Chat</button>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
       © 2025 All Rights Reserved  <span>  Man-O India</span>
      </div>
    </footer>
  );
}
