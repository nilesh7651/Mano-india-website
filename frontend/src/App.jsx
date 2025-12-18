import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Venue from "./pages/Venue";
import Suppliers from "./pages/Suppliers";
import About from "./pages/About";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Layout>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/suppliers" element= {<Suppliers /> } />
          <Route path="/Contact" element={<Contact /> } />
          <Route path="/Media" element={<Media /> } />
          <Route path="/About" element={<About /> } />
        </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
