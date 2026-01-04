import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    // Changed bg-white to bg-black and added text-gray-200 for default light text
    <div className="flex flex-col min-h-screen bg-black text-gray-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
}
