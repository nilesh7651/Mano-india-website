import SuppliersHero from "../components/suppliers/SuppliersHero";
import SupplierCategories from "../components/suppliers/SupplierCategories";
import SupplierGrid from "../components/suppliers/SupplierGrid";
import Highlight from "../components/home/Highlight";

export default function Suppliers() {
  return (
    <>
      <SuppliersHero />

      <SupplierCategories />

      <SupplierGrid
        title="Popular Photographers / Videographers"
        count={120}
      />

      <SupplierGrid
        title="Trending Designers"
        count={120}
      />

      <SupplierGrid
        title="Trending Choreographers"
        count={120}
      />

      <Highlight />
    </>
  );
}
