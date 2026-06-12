// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Heart, Star, Sparkles, ChevronDown } from 'lucide-react';

const bannerImages = [
  "https://i.pinimg.com/736x/c6/d0/0a/c6d00abed2345b530962f85540249b5d.jpg",
  "https://i.pinimg.com/736x/e3/58/7a/e3587a95434f3cf426c7580fce00af7f.jpg",
  "https://i.pinimg.com/736x/42/2f/e8/422fe8a66e4851aadc50ece515174990.jpg"
];

const categoriasRutas = [
  { name: 'Matrimonios', tag: 'Unión & Elegancia', path: '/catalogo/matrimonio', img: 'https://i.pinimg.com/736x/e3/58/7a/e3587a95434f3cf426c7580fce00af7f.jpg' },
  { name: '15 Años', tag: 'Destellos Juveniles', path: '/catalogo/15-anos', img: 'https://i.pinimg.com/736x/42/2f/e8/422fe8a66e4851aadc50ece515174990.jpg' },
  { name: 'Baby Shower', tag: 'Nuevos Comienzos', path: '/catalogo/baby-shower', img: 'https://i.pinimg.com/736x/cd/e3/69/cde369f90899dfa24f7a30d7c5d2e65c.jpg' },
  { name: 'Línea Pet', tag: 'Huellas en el Alma', path: '/catalogo/pet', img: 'https://i.pinimg.com/736x/c6/d0/0a/c6d00abed2345b530962f85540249b5d.jpg' }
];

const aromas = [
  { 
    id: 0, 
    name: 'Rosas Blancas & Lino', 
    desc: 'Sutil, limpio y profundamente romántico. Diseñado para evocar pureza y frescura en celebraciones nupciales.', 
    img: 'https://i.pinimg.com/736x/e3/58/7a/e3587a95434f3cf426c7580fce00af7f.jpg',
    btnColor: 'bg-[#F5E1E1]', 
    textColor: 'text-[#614A4A]' 
  },
  { 
    id: 1, 
    name: 'Vainilla & Ámbar Dulce', 
    desc: 'Cálido, festivo, magnético y encantador. Aporta una atmósfera dulce, brillante e ideal para fiestas de 15 años.', 
    img: 'https://i.pinimg.com/736x/42/2f/e8/422fe8a66e4851aadc50ece515174990.jpg',
    btnColor: 'bg-[#F3EAD3]', 
    textColor: 'text-[#5C523A]' 
  },
  { 
    id: 2, 
    name: 'Lavanda Francesa', 
    desc: 'Relajante, tierno, nostálgico y puro. El favorito indiscutible para armonizar la bienvenida en un Baby Shower.', 
    img: 'https://i.pinimg.com/736x/cd/e3/69/cde369f90899dfa24f7a30d7c5d2e65c.jpg',
    btnColor: 'bg-[#d8d8f6]', 
    textColor: 'text-[#444466]' 
  },
  { 
    id: 3, 
    name: 'Verbena & Manzanilla', 
    desc: 'Fresco, cítrico, botánico y libre de alérgenos pesados. Formulado especialmente para cuidar la tranquilidad de las mascotas del hogar.', 
    img: 'https://i.pinimg.com/736x/c6/d0/0a/c6d00abed2345b530962f85540249b5d.jpg',
    btnColor: 'bg-[#D2E4D6]', 
    textColor: 'text-[#384E3F]' 
  }
];

const testimonios = [
  { nombre: "Camila & Alejandro", evento: "Boda", texto: "Las velas de tabera.co fueron el éxito de nuestro matrimonio. Los invitados quedaron enamorados del aroma a Rosas y el empaque es precioso." },
  { nombre: "Mariana V.", evento: "Mis 15 Años", texto: "Buscaba algo diferente para mis recordatorios. Las velas con el cuarzo rosa combinaron perfecto con mi fiesta y huelen delicioso." },
  { nombre: "Andrea L.", evento: "Baby Shower", texto: "La atención fue hermosa y las etiquetas personalizadas venían impecables. Súper recomendados para momentos especiales." }
];

export default function Home() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeAroma, setActiveAroma] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isMounted]);

  const dispatchGeneralWhatsApp = () => {
    const message = encodeURIComponent("Hola tabera.co, estoy planeando un evento y me encantaría recibir asesoría de precios y aromas para mis recordatorios.");
    window.open(`https://wa.me/573000000000?text=${message}`, '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-[#FAF8F5]" />;
  }

  return (
    <div className="bg-[#FAF8F5] text-[#2C2927] antialiased min-h-screen font-sans selection:bg-[#d8d8f6]">
      
      {/* 1. HERO BANNER FULL SCREEN */}
      <section className="w-full h-screen flex flex-col justify-between p-6 md:p-12 relative overflow-hidden bg-neutral-900">
        {bannerImages.map((src, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeBanner ? 'opacity-60' : 'opacity-0'}`}
          >
            <Image src={src} alt="Velas exclusivas para recordatorios" fill priority={index === 0} sizes="100vw" className="object-cover object-center" />
          </div>
        ))}
        <div className="absolute inset-0 bg-[#2C2927]/10" />
        
        <div className="flex justify-between items-center w-full relative z-10 text-white">
          <span className="font-sans text-xs font-black tracking-[0.3em] uppercase">tabera</span>
          <span className="text-[10px] tracking-widest font-mono uppercase bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">[ BOOKING 2026 ]</span>
        </div>

        <div className="my-auto text-center relative z-10 max-w-4xl mx-auto">
          <span className="font-serif italic text-4xl md:text-9xl text-[#d8d8f6] tracking-wide block lowercase select-none drop-shadow-sm">
            recuerdos de luz
          </span>
          <h1 className="font-sans text-3xl md:text-7xl font-black tracking-tight uppercase leading-none mt-1 text-white drop-shadow-md">
            VELAS DE ALTA GAMA
          </h1>
          
          <button 
            onClick={() => scrollToSection('categorias-seccion')}
            className="text-white/90 text-[10px] tracking-[0.25em] font-bold uppercase mt-12 bg-black/30 inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 group hover:bg-[#d8d8f6] hover:text-[#2C2927] transition-all duration-300"
          >
            Explorar Ocasiones
            <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-[#2C2927]" />
          </button>
        </div>

        <div className="w-full flex justify-between items-end relative z-10 pb-4">
          <div className="flex gap-2">
            {bannerImages.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full bg-white transition-all duration-500 ${i === activeBanner ? 'w-8' : 'w-2 opacity-40'}`} 
              />
            ))}
          </div>
          <span className="text-[9px] tracking-widest text-white/50 font-mono">[ SCROLL TO DISCOVER ]</span>
        </div>
      </section>

      {/* 2. NUESTRAS CATEGORÍAS EN ALTA RESOLUCIÓN */}
      <section id="categorias-seccion" className="bg-white">
        <div className="text-center py-20 bg-[#FAF8F5] border-b border-[#2C2927]/5 px-6">
          <span className="font-serif italic text-3xl text-[#96a89c] block lowercase">colecciones</span>
          <h2 className="font-sans text-2xl md:text-5xl font-black uppercase tracking-tight -mt-3 text-[#C5A880]">Recordatorios por Ocasión</h2>
          <p className="text-neutral-500 text-xs font-semibold uppercase tracking-widest mt-2">Piezas de alta costura diseñadas para cada tipo de historia</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {categoriasRutas.map((cat, idx) => (
            <Link 
              key={idx}
              href={cat.path}
              className="relative h-[80vh] lg:h-screen flex flex-col justify-between p-8 md:p-16 overflow-hidden group border border-[#2C2927]/5"
            >
              <div className="absolute inset-0">
                <Image src={cat.img} alt={cat.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
              </div>

              <div className="relative z-10 text-right text-white/60 font-mono text-sm font-bold">
                0{idx + 1} /
              </div>

              <div className="relative z-10 text-white mt-auto space-y-3">
                <div>
                  <span className="text-[10px] text-[#2C2927] font-black tracking-widest uppercase bg-[#d8d8f6] px-3 py-1 rounded-full inline-block">
                    {cat.tag}
                  </span>
                  <h3 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tight text-[#C5A880] mt-2 drop-shadow-sm">
                    {cat.name}
                  </h3>
                </div>
                
                <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase border-b-2 border-[#d8d8f6] pb-1 group-hover:text-[#d8d8f6] group-hover:border-white transition-all">
                  Ver Modelos Disponibles <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. NUESTROS AROMAS CON DESPLIEGUE VISUAL */}
      <section className="py-28 bg-white border-y border-[#2C2927]/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-serif italic text-3xl text-[#96a89c] block lowercase">alquimia</span>
            <h2 className="font-sans text-2xl md:text-5xl font-black uppercase tracking-tight -mt-3 text-[#C5A880]">Carta de Esencias</h2>
            <p className="text-neutral-500 text-xs font-semibold uppercase tracking-widest mt-2">Selecciona una fragancia para ver su composición visual</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {aromas.map((aroma) => {
              const isSelected = activeAroma === aroma.id;
              return (
                <button
                  key={aroma.id}
                  onClick={() => setActiveAroma(aroma.id)}
                  className={`px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border flex items-center gap-2 ${aroma.btnColor} ${aroma.textColor} ${isSelected ? 'ring-2 ring-[#2C2927] scale-102 shadow-md font-black' : 'opacity-65 hover:opacity-100'}`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white inline-block border border-black/10" />
                  {aroma.name}
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[280px] rounded-2xl overflow-hidden shadow-md border border-neutral-100 p-8 md:p-12 flex flex-col justify-center items-center text-center text-white bg-neutral-900">
            <Image src={aromas[activeAroma].img} alt={aromas[activeAroma].name} fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover object-center transition-all duration-1000" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

            <div className="relative z-10 space-y-3 max-w-xl">
              <div className="inline-flex p-3 rounded-full bg-white/10 border border-white/20 text-[#d8d8f6] mb-1">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <h4 className="font-sans text-2xl font-black uppercase tracking-tight text-[#C5A880]">
                {aromas[activeAroma].name}
              </h4>
              <p className="text-xs md:text-sm text-neutral-200 font-medium leading-relaxed tracking-wide">
                {aromas[activeAroma].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN GUÍA DE PRECIOS */}
      <section className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-12">
            <span className="font-serif italic text-3xl text-[#96a89c] block lowercase">cotizaciones</span>
            <h2 className="font-sans text-2xl md:text-5xl font-black uppercase tracking-tight -mt-3 text-[#C5A880]">Tarifas Transparentes</h2>
          </div>

          <div className="bg-[#FAF8F5] border border-[#2C2927]/5 rounded-3xl p-8 md:p-12 shadow-sm max-w-2xl mx-auto space-y-6">
            <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
              <span className="text-left font-sans text-sm font-black uppercase">Rango de Precios Base:</span>
              <span className="font-sans text-xl font-black text-[#C5A880]">$14.500 — $21.000 COP</span>
            </div>
            
            <ul className="text-left space-y-3 text-xs font-medium text-neutral-600">
              <li className="flex items-center gap-2">🌸 <strong className="text-[#2C2927]">Compra mínima:</strong> Desde 12 unidades por referencia.</li>
              <li className="flex items-center gap-2">✨ <strong className="text-[#2C2927]">Diseño incluido:</strong> Personalización de etiquetas de algodón y empaques sin costo adicional.</li>
              <li className="flex items-center gap-2">📦 <strong className="text-[#2C2927]">Descuentos por volumen:</strong> Tarifas especiales para pedidos mayores a 50 unidades.</li>
            </ul>

            <div className="pt-4">
              <button onClick={dispatchGeneralWhatsApp} className="w-full bg-[#2C2927] text-white text-xs tracking-[0.2em] uppercase font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#d8d8f6] hover:text-[#2C2927] transition-all shadow-md">
                <MessageCircle className="w-5 h-5 fill-current" /> Cotizar Mi Evento por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIOS */}
      <section className="py-28 bg-[#96a89c]/10 border-t border-[#2C2927]/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-serif italic text-3xl text-[#96a89c] block lowercase">testimonios</span>
            <h2 className="font-sans text-2xl md:text-5xl font-black uppercase tracking-tight -mt-3 text-[#C5A880]">Clientes Felices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonios.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex gap-1 text-[#d8d8f6] mb-4">
                    {[...Array(5)].map((_, index) => <Star key={index} className="w-4 h-4 fill-current text-[#C5A880]" />)}
                  </div>
                  <p className="text-xs text-neutral-600 font-medium italic leading-relaxed">"{t.texto}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-between items-center">
                  <span className="font-sans text-sm font-black uppercase text-[#2C2927]">{t.nombre}</span>
                  <span className="bg-[#d8d8f6]/40 text-[#2C2927] text-[9px] font-black uppercase px-2.5 py-1 rounded-full">{t.evento}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-[#2C2927] text-[#FAF8F5] py-12 text-center text-[10px] tracking-widest">
        <div className="space-y-4 px-6">
          <span className="font-sans text-xl font-black uppercase tracking-widest block text-[#C5A880]">tabera.co</span>
          <p className="opacity-60 font-medium">Diseño botánico exclusivo para tus eventos más hermosos.</p>
          <div className="text-neutral-500 pt-4 text-[9px] border-t border-neutral-800 max-w-xs mx-auto">
            &copy; 2026 TABERA.CO. TODOS LOS DERECHOS RESERVADOS.
          </div>
        </div>
      </footer>

    </div>
  );
}