import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Servicios from '@/sections/Servicios';
import Proceso from '@/sections/Proceso';
import Portfolio from '@/sections/Portfolio';
import Testimonios from '@/sections/Testimonios';
import Precios from '@/sections/Precios';
import FAQ from '@/sections/FAQ';
import Contacto from '@/sections/Contacto';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#FFFCF5]">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Servicios />
        <Proceso />
        <Portfolio />
        <Testimonios />
        <Precios />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
