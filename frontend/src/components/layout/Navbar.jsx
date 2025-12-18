import styles from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      {/* Left */}
      <div className={styles.brand}>Company Name</div>

      {/* Center */}
      <nav className={styles.menu}>
        <NavLink to="/" className={styles.link}>Home</NavLink>
         <NavLink to="/venue" className={styles.link}>Venue</NavLink>
        <NavLink to="/suppliers" className ={styles.link}>Suppliers</NavLink>
        <NavLink to ="/about" className={styles.link}>About</NavLink>
        <NavLink to ="/media" className={styles.link}>Media</NavLink>
        <NavLink to ="/contact" className={styles.link}>Contact Us</NavLink>
        <span className={styles.searchicon}>
          <SearchIcon />
        </span>
      </nav>

      

      {/* Right */}
      <div className={styles.rightSection}>
        {/* Language selector */}
        

        {/* Auth */}
        <div className={styles.auth}>
          <button className={styles.loginbtn}>LOGIN</button>
          <button className={styles.signup}>SIGNUP</button>
        </div>
      </div>
    </header>
  );
}
