import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="theme-root bg-[var(--bg-page)] min-h-screen transition-colors duration-500">
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <Gallery />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
