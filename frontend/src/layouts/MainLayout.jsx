import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
