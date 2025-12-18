import styles from "./SupplierCard.module.css";

export default function SupplierCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>

      <h4>LOREM IPSUM</h4>
      <strong>ABU DHABI</strong>

      <p>★★★★★ 5 (22)</p>
    </div>
  );
}
