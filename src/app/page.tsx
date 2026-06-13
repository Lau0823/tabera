// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Heart, Star, Sparkles, ChevronDown, ChevronLeft, ChevronRight, Menu, X, Play } from 'lucide-react';

const bannerImages = [
  "https://i.pinimg.com/736x/c6/d0/0a/c6d00abed2345b530962f85540249b5d.jpg",
  "https://i.pinimg.com/736x/e3/58/7a/e3587a95434f3cf426c7580fce00af7f.jpg",
  "https://i.pinimg.com/736x/42/2f/e8/422fe8a66e4851aadc50ece515174990.jpg",
  "https://i.pinimg.com/1200x/21/5b/2a/215b2a9ae12ed3f5b2c4213668889f9f.jpg"
];

const categoriasRutas = [
  { name: 'Bodas', tag: 'Tu Gran Día', path: '/catalogo/bodas', img: 'https://i.pinimg.com/736x/5b/85/b8/5b85b8604c9eec06a013527e9f6c95dc.jpg' },
  { name: '15 Años', tag: 'Tus Dulces 15', path: '/catalogo/15', img: 'https://i.pinimg.com/736x/f4/6c/82/f46c823a617370331576d93e96f1b80d.jpg' },
  { name: 'Baby Shower', tag: 'La Bienvenida', path: '/catalogo/babys', img: 'https://i.pinimg.com/736x/fd/ab/42/fdab42f7a6abf9ab93e958fe234218b6.jpg' },
  { name: 'Línea Pet', tag: 'Huellas Eternas', path: '/catalogo/lineapet', img: 'https://i.pinimg.com/736x/9b/54/8f/9b548f576188e8d2d18a28ada05c7d46.jpg' }
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

const planesData = [
  {
    id: 'gold',
    name: 'Esencia Gold',
    volumen: '12 a 30 unidades',
    precio: '$18.500 COP / u',
    img: 'https://i.pinimg.com/736x/c6/d0/0a/c6d00abed2345b530962f85540249b5d.jpg',
    beneficios: [
      'Velas en envase de vidrio estándar premium',
      'Etiqueta personalizada con diseño básico floral',
      'Esencias botánicas de línea (Rosas o Lavanda)',
      'Empaque individual en bolsa de organza cristal'
    ]
  },
  {
    id: 'platinum',
    name: 'Esencia Platinum',
    volumen: '31 a 70 unidades',
    precio: '$16.000 COP / u',
    img: 'https://i.pinimg.com/736x/cd/e3/69/cde369f90899dfa24f7a30d7c5d2e65c.jpg',
    beneficios: [
      'Envases de vidrio italiano texturizado o moldes orgánicos',
      'Tags personalizados impresos en papel texturizado de algodón',
      'Acceso completo a toda la carta de esencias exclusivas',
      'Capa superior decorativa con destellos de pan de oro',
      'Empaque premium en saquitos de lino con lazo'
    ]
  },
  {
    id: 'diamond',
    name: 'Esencia Diamond',
    volumen: 'Más de 70 unidades',
    precio: '$14.500 COP / u',
    img: 'https://i.pinimg.com/736x/f3/b9/da/f3b9da103b80b59c1c1bc703e1bc1578.jpg',
    beneficios: [
      'Piezas de diseño escultural y moldes artísticos',
      'Diseño de identidad gráfica premium para tu fecha',
      'Fragancia botánica fina de autor a tu medida',
      'Incrustaciones de cuarzos facetados naturales',
      'Cajas rígidas de lujo con estampado de foil dorado',
      'Envío prioritario nacional asegurado incluido'
    ]
  }
];

const testimonios = [
  { nombre: "Camila & Alejandro", evento: "Boda", texto: "Las velas de tabera fueron el éxito de nuestro matrimonio. Los invitados quedaron enamorados de las esencias de Rosas y el pan de oro.", avatar: "https://i.pinimg.com/736x/cd/e3/69/cde369f90899dfa24f7a30d7c5d2e65c.jpg" },
  { nombre: "Mariana Valencia", evento: "Mis 15 Años", texto: "Buscaba algo diferente y muy fino para mis recordatorios. Las velas con el cuarzo rosa combinaron hermoso con mi mesa principal.", avatar: "https://i.pinimg.com/736x/42/2f/e8/422fe8a66e4851aadc50ece515174990.jpg" },
  { nombre: "Andrea Londoño", evento: "Baby Shower", texto: "La atención personalizada de la diseñadora fue espectacular y las etiquetas de algodón venían perfectas. Volveré a mandar a hacer sin duda.", avatar: "https://i.pinimg.com/736x/e3/58/7a/e3587a95434f3cf426c7580fce00af7f.jpg" }
];

export default function Home() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeAroma, setActiveAroma] = useState(0);
  const [activePlan, setActivePlan] = useState('platinum');
  const [activeTestimonio, setActiveTestimonio] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const dispatchWhatsApp = (subject: string) => {
    const message = encodeURIComponent(`Hola tabera, me interesa recibir información y cotizar los recordatorios para mi evento sobre: "${subject}".`);
    window.open(`https://wa.me/573123592141?text=${message}`, '_blank');
  };

  const scrollToNextSection = (index: number) => {
    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll('section');
    if (sections && sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-[#FAF8F5]" />;
  }

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#FAF8F5] text-[#2C2927] antialiased font-sans selection:bg-[#d8d8f6]"
    >
      
      {/* 🍔 MENÚ HAMBURGUESA FLOTANTE */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 right-6 z-40 bg-black/20 backdrop-blur-md text-white p-3.5 rounded-full border border-white/10 shadow-lg hover:bg-[#d8d8f6] hover:text-[#2C2927] transition-all active:scale-95"
        aria-label="Abrir Menú"
      >
        <Menu className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* 🌸 INTERFAZ FULL-SCREEN DEL MENÚ */}
      <div className={`fixed inset-0 w-screen h-screen bg-[#d8d8f6] text-[#2C2927] z-50 flex flex-col justify-between p-8 md:p-12 transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex justify-between items-center h-16 border-b border-[#2C2927]/10">
          <span className="font-sans text-lg font-black uppercase tracking-[0.2em] text-[#2C2927]">tabera</span>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="bg-[#2C2927] text-white p-3 rounded-full shadow-md active:scale-95"
            aria-label="Cerrar Menú"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="flex flex-col space-y-5 my-auto text-left pl-4 max-w-xl">
          <span className="text-[10px] tracking-[0.4em] text-[#2C2927]/60 uppercase font-black font-mono">[ NAVEGACIÓN ]</span>
          
          <button 
            onClick={() => { setIsMenuOpen(false); scrollToNextSection(0); }} 
            className="font-sans text-4xl md:text-5xl font-black uppercase text-left tracking-tight text-[#2C2927] hover:text-white transition-colors"
          >
            Inicio
          </button>

          <div className="h-[1px] bg-[#2C2927]/10 my-2" />
          <span className="text-[10px] tracking-[0.4em] text-[#2C2927]/60 uppercase font-black font-mono">[ ¿QUÉ MOMENTO VAS A CELEBRAR? ]</span>

          {categoriasRutas.map((cat, i) => (
            <Link
              key={i}
              href={cat.path}
              className="group flex justify-between items-center text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-sans text-2xl md:text-3xl font-black uppercase text-[#2C2927] group-hover:text-white transition-colors">
                {cat.name}
              </span>
              <ArrowUpRight className="w-5 h-5 text-[#2C2927]/40 group-hover:text-white transition-colors" />
            </Link>
          ))}
        </div>

        <div className="w-full pt-4">
          <button 
            onClick={() => { setIsMenuOpen(false); dispatchWhatsApp('Contacto Directo Menú'); }}
            className="w-full block text-center bg-[#2C2927] text-white text-xs tracking-[0.25em] uppercase font-black py-4.5 rounded-full shadow-sm"
          >
            Conversar por WhatsApp
          </button>
        </div>
      </div>

      {/* SECTION 1: HERO BANNER LIMPIO SÓLO CON IMÁGENES */}
      <section className="w-full h-screen flex flex-col justify-between p-6 md:p-12 relative overflow-hidden bg-neutral-900 snap-start shrink-0">
        {bannerImages.map((src, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeBanner ? 'opacity-65' : 'opacity-0'}`}
          >
            <Image src={src} alt="Velas exclusivas para recordatorios" fill priority={index === 0} sizes="100vw" className="object-cover object-center" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/15" />
        
        <div className="flex justify-between items-center w-full relative z-10 text-white">
          <span className="font-sans text-xs font-black tracking-[0.3em] uppercase">tabera</span>
          <span className="text-[10px] tracking-widest font-mono uppercase bg-black/25 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 mr-14 md:mr-0">[ AGENDA 2026 ]</span>
        </div>

        <div className="my-auto text-center relative z-10 max-w-4xl mx-auto space-y-2">
          <span className="font-serif italic text-5xl md:text-9xl text-[#d8d8f6] tracking-wide block lowercase select-none drop-shadow-xs">
            recuerdos de luz
          </span>
          <h1 className="font-sans text-3xl md:text-7xl font-black tracking-tight uppercase leading-none text-white drop-shadow-md">
            VELAS DE ALTA GAMA
          </h1>
          
          <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4 max-w-xs mx-auto">
            <button 
              onClick={() => dispatchWhatsApp('Asesoría General Banner')}
              className="bg-[#C5A880] text-white font-black text-[11px] tracking-[0.25em] uppercase px-8 py-4.5 rounded-full shadow-lg hover:bg-white hover:text-[#2C2927] transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Cotizar
            </button>
          </div>
        </div>

        <div className="w-full flex justify-between items-end relative z-10 pb-4">
          <div className="flex gap-2">
            {bannerImages.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full bg-white transition-all duration-500 ${i === activeBanner ? 'w-8' : 'w-2 opacity-40'}`} />
            ))}
          </div>
          <button onClick={() => scrollToNextSection(1)} className="text-[9px] tracking-widest text-white/70 font-mono uppercase flex items-center gap-1">
            Descubrir <ChevronDown className="w-3 h-3 animate-bounce" />
          </button>
        </div>
      </section>

      {/* 🌸 NUEVA SECTION 2: FRASE LINDA EN CURSIVA EDITORIAL */}
      <section className="w-full h-screen flex flex-col justify-center items-center bg-[#FAF8F5] snap-start shrink-0 p-8 text-center border-b border-[#2C2927]/5 relative">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.4em] text-neutral-400 font-mono uppercase">
          [ la filosofía tabera ]
        </div>
        <div className="max-w-3xl space-y-6">
        
          <p className="font-serif italic text-3xl md:text-6xl text-[#2C2927] leading-tight tracking-wide px-4">
            "Que cada uno de tus invitados se lleve a casa un destello de tu historia, envuelto en aromas que perduran en el alma."
          </p>
          <div className="h-8 w-[1px] bg-[#C5A880] mx-auto mt-6" />
        </div>
        <button 
          onClick={() => scrollToNextSection(2)}
          className="absolute bottom-12 left-1/2 -translate-y-1/2 uppercase tracking-widest text-[9px] font-black text-neutral-400 flex flex-col items-center gap-1"
        >
          <span>Explorar Categorías</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </section>

      {/* SECTIONS 3, 4, 5, 6: CATEGORÍAS INMERSIVAS SNAP FULL-SCREEN */}
      {categoriasRutas.map((cat, idx) => (
        <section 
          key={idx}
          className="w-full h-screen flex flex-col justify-between p-8 md:p-16 relative overflow-hidden bg-neutral-900 snap-start shrink-0"
        >
          <div className="absolute inset-0">
            <Image src={cat.img} alt={cat.name} fill sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
          </div>

          <div className="relative z-10 flex justify-between items-center text-white">
            <span className="text-white/60 font-mono text-sm font-bold">0{idx + 1} / 04</span>
            <span className="text-[10px] text-[#2C2927] font-black tracking-widest uppercase bg-[#d8d8f6] px-4 py-1.5 rounded-full shadow-sm">{cat.tag}</span>
          </div>

          <div className="relative z-10 text-white max-w-4xl space-y-4">
            <span className="text-xs md:text-sm text-neutral-300 font-mono tracking-widest uppercase block">Descubre los recordatorios ideales para</span>
            <h2 className="font-sans text-5xl md:text-8xl font-black uppercase tracking-tight text-[#C5A880] drop-shadow-sm leading-none">
              {cat.name}
            </h2>
            <div className="pt-2">
              <Link 
                href={cat.path}
                className="inline-flex items-center gap-3 bg-white text-[#2C2927] text-xs font-black tracking-[0.2em] uppercase px-8 py-4.5 rounded-full shadow-lg hover:bg-[#d8d8f6] transition-all duration-300"
              >
                VER MODELOS PARA ESTA FECHA
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-end text-white/50 text-[10px] font-mono">
            <span>DISEÑOS BOTÁNICOS PERSONALIZADOS</span>
            <button onClick={() => scrollToNextSection(idx + 3)} className="flex flex-col items-center text-white/80 uppercase tracking-widest text-[9px] font-bold">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </section>
      ))}

      {/* SECTION 7: NUESTROS AROMAS */}
      <section className="w-full h-screen flex flex-col justify-center items-center bg-white snap-start shrink-0 p-6 relative overflow-hidden">
        <div className="max-w-4xl w-full mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-1">
            <span className="font-serif italic text-3xl text-[#96a89c] block lowercase">alquimia</span>
            <h2 className="font-sans text-3xl md:text-5xl font-black uppercase tracking-tight text-[#C5A880]">Carta de Esencias</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {aromas.map((aroma) => {
              const isSelected = activeAroma === aroma.id;
              return (
                <button
                  key={aroma.id}
                  onClick={() => setActiveAroma(aroma.id)}
                  className={`px-5 py-3.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all border flex items-center gap-2 ${aroma.btnColor} ${aroma.textColor} ${isSelected ? 'ring-2 ring-[#2C2927] scale-102 shadow-md font-black' : 'opacity-65'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-white inline-block border border-black/10" />
                  {aroma.name}
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[300px] md:min-h-[350px] rounded-3xl overflow-hidden shadow-xl border border-neutral-100 p-8 md:p-12 flex flex-col justify-center items-center text-center text-white bg-neutral-900">
            <Image src={aromas[activeAroma].img} alt={aromas[activeAroma].name} fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover object-center transition-all duration-700" />
            <div className="absolute inset-0 bg-black/65 backdrop-blur-xs" />

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

      {/* SECTION 8: PROCESO ARTESANAL DETRÁS DE LAS VELAS */}
      <section className="w-full h-screen flex flex-col justify-between bg-neutral-950 snap-start shrink-0 relative overflow-hidden text-white p-6 md:p-12">
        <div className="absolute inset-0 z-0 opacity-40">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/WhatsApp Video 2026-06-11 at 16.54.48.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-0" />

        <div className="relative z-10 flex justify-between items-center w-full">
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase">[ ARTESANÍA EN CERA ]</span>
          <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Play className="w-4 h-4 fill-current text-[#C5A880]" />
          </div>
        </div>

        <div className="relative z-10 max-w-xl space-y-3 mt-auto mb-12">
          <span className="font-serif italic text-3xl text-[#d8d8f6] block lowercase">Hecho a mano</span>
          <h3 className="font-sans text-4xl font-black uppercase tracking-tight text-[#C5A880]">Curaduría Orgánica</h3>
          <p className="text-xs md:text-sm text-neutral-300 font-medium leading-relaxed tracking-wide">
            Cada vela es vertida individualmente a mano utilizando cera de soja 100% biodegradable y pabilos de algodón puro. Un proceso lento enfocado en lograr una combustión limpia y una difusión aromática perfecta.
          </p>
        </div>
      </section>

      {/* SECTION 9: SECCIÓN DE PLANES CON CARD DE GRAN ESCALA (LIBRE DE CORTES) */}
      <section className="w-full min-h-screen md:h-screen flex flex-col justify-center items-center bg-[#C5A880] snap-start shrink-0 p-4 md:p-8 relative overflow-hidden">
        <div className="max-w-4xl w-full mx-auto space-y-4 md:space-y-6 relative z-10">
          
          <div className="text-center space-y-0.5">
            <span className="font-serif italic text-2xl md:text-3xl text-white block lowercase">presupuesto</span>
            <h2 className="font-sans text-2xl md:text-4xl font-black uppercase tracking-tight text-[#2C2927]">Opciones por Cantidad</h2>
          </div>

          {/* Filtros Circulares */}
          <div className="flex justify-center bg-white/20 backdrop-blur-md p-1 rounded-full max-w-xs md:max-w-md mx-auto shadow-sm border border-white/20">
            {planesData.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`flex-1 text-center py-2.5 md:py-3.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-wider transition-all ${activePlan === plan.id ? 'bg-[#2C2927] text-white shadow-sm' : 'text-[#2C2927]/70 font-bold'}`}
              >
                {plan.id}
              </button>
            ))}
          </div>

          {/* Tarjeta Monumental */}
          {planesData.filter(p => p.id === activePlan).map((plan) => (
            <div key={plan.id} className="w-full max-w-3xl mx-auto space-y-5 animate-fadeIn">
              
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[340px] md:min-h-[420px] transition-all duration-300">
                <div className="relative h-56 md:h-full md:col-span-5 bg-neutral-100">
                  <Image 
                    src={plan.img} 
                    alt={plan.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 400px" 
                    className="object-cover object-center" 
                  />
                </div>

                <div className="p-6 md:p-10 md:col-span-7 flex flex-col justify-center space-y-5">
                  <div className="flex justify-between items-baseline border-b border-neutral-100 pb-3">
                    <div>
                      <span className="text-[10px] font-black tracking-widest text-[#96a89c] uppercase block">{plan.volumen}</span>
                      <h4 className="font-sans text-xl md:text-2xl font-black uppercase text-[#2C2927] mt-0.5">{plan.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-base md:text-xl font-black text-[#C5A880]">{plan.precio}</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2.5 text-xs font-medium text-neutral-600 text-left">
                    {plan.beneficios.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-snug">
                        <span className="text-[#96a89c] text-sm shrink-0">✦</span> <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botón Circular Debajo */}
              <div className="w-full">
                <button 
                  onClick={() => dispatchWhatsApp(`Inversión ${plan.name}`)}
                  className="w-full bg-[#2C2927] text-white text-[11px] tracking-[0.2em] uppercase font-black py-4.5 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:text-[#2C2927] transition-all shadow-xl active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Elegir esta opción para mi evento
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: CARRUSEL DE TESTIMONIOS */}
      <section className="w-full h-screen flex flex-col justify-center items-center bg-[#C5A880]/90 snap-start shrink-0 p-6 relative overflow-hidden">
        <div className="max-w-3xl w-full mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-1">
            <span className="font-serif italic text-white block lowercase">experiencias</span>
            <h2 className="font-sans text-3xl md:text-5xl font-black uppercase tracking-tight text-[#2C2927]">Historias Compartidas</h2>
          </div>

          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-2xl mx-auto space-y-6">
            
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#d8d8f6] shadow-sm">
                <Image src={testimonios[activeTestimonio].avatar} alt={testimonios[activeTestimonio].nombre} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex justify-center gap-0.5 text-[#C5A880]">
                {[...Array(5)].map((_, index) => <Star key={index} className="w-3.5 h-3.5 fill-current" />)}
              </div>
            </div>

            <p className="text-xs md:text-sm text-neutral-600 font-medium italic leading-relaxed max-w-xl mx-auto">
              "{testimonios[activeTestimonio].texto}"
            </p>

            <div className="pt-2 border-t border-neutral-200/60 flex justify-between items-center max-w-xs mx-auto">
              <span className="font-sans text-xs font-black uppercase text-[#2C2927]">{testimonios[activeTestimonio].nombre}</span>
              <span className="bg-[#d8d8f6] text-[#2C2927] text-[8px] font-black uppercase px-2.5 py-1 rounded-full">{testimonios[activeTestimonio].evento}</span>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between pointer-events-none">
              <button 
                onClick={() => setActiveTestimonio(activeTestimonio === 0 ? testimonios.length - 1 : activeTestimonio - 1)}
                className="bg-[#2C2927] text-white p-2.5 rounded-full shadow-md pointer-events-auto transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTestimonio(activeTestimonio === testimonios.length - 1 ? 0 : activeTestimonio + 1)}
                className="bg-[#2C2927] text-white p-2.5 rounded-full shadow-md pointer-events-auto transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: FOOTER */}
      <footer className="w-full h-screen flex flex-col justify-center items-center bg-[#C5A880] text-[#2C2927] snap-start shrink-0 p-6 text-center text-[10px] tracking-widest relative">
        <div className="space-y-6 max-w-md relative z-10">
          <div className="flex justify-center mb-2">
            <Heart className="w-8 h-8 fill-current text-white animate-pulse" />
          </div>
          <span className="font-sans text-4xl font-black uppercase tracking-widest block text-white">tabera</span>
          <p className="text-[#2C2927]/90 font-medium text-xs tracking-wide leading-relaxed">
            Diseño botánico premium y curaduría visual exclusiva para inmortalizar tus eventos más hermosos a través de la luz de nuestras velas.
          </p>
          <div className="pt-8 text-[#2C2927]/50 text-[9px] border-t border-white/20 max-w-xs mx-auto font-bold font-mono">
            &copy; 2026 TABERA. TODOS LOS DERECHOS RESERVADOS.
          </div>
        </div>
      </footer>

    </div>
  );
}