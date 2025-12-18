import styles from "./SupplierCategories.module.css";

const categories = [
  "PHOTOGRAPHER / VIDEOGRAPHER",
  "DECORATORS",
  "VENUE PLANNERS",
  "CHOREOGRAPHERS",
  "DESIGNERS",
  "MAKEUP ARTIST",
  "BAR SERVICES",
];

export default function SupplierCategories() {
  return (
    <section className={styles.section}>
      <div className="appContainer">
        <h3 className={styles.title}>Suppliers Categories</h3>

        <div className={styles.grid}>
          {categories.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.circle}></div>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
