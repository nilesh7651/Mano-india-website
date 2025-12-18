

import styles from "./AboutIntro.module.css";

export default function AboutIntro() {
  return (
    <section className={styles.section}>
      <div className="appContainer">
        {/* About content */}
        <div className={styles.aboutGrid}>
          <div className={styles.text}>
            <h3>About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className={styles.image}></div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div>
            <h4>10,000</h4>
            <span>Wedding Vendors</span>
          </div>

          <div>
            <h4>20,000</h4>
            <span>Annual Weddings</span>
          </div>

          <div>
            <h4>1,000</h4>
            <span>Wedding Venues</span>
          </div>

          <div>
            <h4>1.5 M</h4>
            <span>Monthly Followers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
