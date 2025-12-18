import styles from "./SupplierGrid.module.css";
import SupplierCard from "./SupplierCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function SupplierList({ title }) {
  return (
    <section className={styles.section}>
      <div className="appContainer">
        {/* Header */}
        <div className={styles.header}>
          <h3>{title}</h3>
          <span>View All (22)</span>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <SupplierCard key={i} />
            ))}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <ChevronLeftIcon />
          <span className={styles.active}>1</span>
          <span>2</span>
          <span>3</span>
          <ChevronRightIcon />
        </div>
      </div>
    </section>
  );
}
