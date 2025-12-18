import styles from "./WhatWeOffer.module.css";

export default function WhatWeOffer() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Row 1 */}
        <div className={styles.row}>
          <div className={styles.imageBox}></div>

          <div className={styles.textBox}>
            <h3>What We Offer?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className={`${styles.row} ${styles.reverse}`}>
             <div className={styles.imageBox}></div>
          <div className={styles.textBox}>
            <h3>Who We Are?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </p>
          </div>

         
        </div>

      </div>
    </section>
  );
}
