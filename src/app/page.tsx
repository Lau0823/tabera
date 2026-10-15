'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Roboto_Condensed, Fraunces } from 'next/font/google';
import { ChevronLeft, ChevronRight, Sparkles, Flame, ShieldCheck } from 'lucide-react';

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  display: 'swap',
});

const fuenteHoliday = Fraunces({
  subsets: ['latin'],
  weight: ['900'],
  display: 'swap',
});

const NUMERO_WHATSAPP = '573123592141';

// Tus imágenes exactas del banner
const IMAGENES_BANNER = [
  "/velas2.png",
  "/matrimonio.png",
  "/banner.png"
];

// Círculos interactivos de categorías
const CIRCULOS_CATEGORIAS = [
  {
    id: 1,
    titulo: 'Bodas',
    ruta: '/catalogo/bodas',
    img: '/matri.png',
  },
  {
    id: 2,
    titulo: '15 Años',
    ruta: '/catalogo/15-anos',
    img: '/15.png',
  },
  {
    id: 3,
    titulo: 'Baby Shower',
    ruta: '/catalogo/baby-shower',
    img: '/babyshower.png',
  },
  {
    id: 4,
    titulo: 'Verano',
    ruta: '/catalogo/verano',
    img: '/vernano.png',
  },
  {
    id: 5,
    titulo: 'Línea Pet',
    ruta: '/catalogo/linea-pet',
    img: '/pet.png',
  }
];

// PRODUCTOS PARA "MOMENTOS ESPECIALES" (Fondo personalizable, foto superior y textos naturales debajo)
const PRODUCTOS_MOMENTOS = [
  {
    id: 'Recordatorios de Boda',
    titulo: 'Matrimonios',
    tag: 'Cítrica Radiante',
    desc: 'Aroma fresco de frutos soleados y flores dulces para llenar de vida tus celebraciones.',
    img: 'https://i.pinimg.com/736x/ce/70/59/ce70594b4ff520dfd9eeffc0266d5b0f.jpg',
    bgFondo: 'from-[#FF8CA3] to-[#FFB7C5]', // Fondo degradado detrás de la card
  },
  {
    id: 'momento-2',
    titulo: 'Baby Shower',
    tag: 'Floral Femenina',
    desc: 'Champagne rosé y toques de peonía en frasco de cristal puro para fechas inolvidables.',
    img: 'https://i.pinimg.com/1200x/01/fe/9c/01fe9cba6091e0704503149768b4713f.jpg',
    bgFondo: 'from-[#FF7A97] to-[#FFA8BA]', // Fondo personalizable
  },
  {
    id: 'momento-3',
    titulo: '15 años',
    tag: 'Lavanda & Vainilla',
    desc: 'Calma serena y relajación profunda. La aliada ideal para atesorar momentos de paz.',
    img: 'https://i.pinimg.com/736x/ee/6f/b3/ee6fb37c826de6642506fcc492814bca.jpg',
    bgFondo: 'from-[#E86B85] to-[#FF9DB1]', // Fondo personalizable
  }
];

export default function HomeVelas() {
  const [splash, setSplash] = useState(true);
  const [desvanecer, setDesvanecer] = useState(false);
  const [texto, setTexto] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);
  
  const [imagenActiva, setImagenActiva] = useState(0);
  const [imagenAnterior, setImagenAnterior] = useState(0);

  // Máquina de escribir para "Hola"
  useEffect(() => {
    const palabra = 'Hola';
    let i = 0;

    const interval = setInterval(() => {
      if (i <= palabra.length) {
        setTexto(palabra.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setDesvanecer(true), 1200);
        setTimeout(() => setSplash(false), 2000);
      }
    }, 220);

    return () => clearInterval(interval);
  }, []);

  // Rotación del banner sin pantallas negras
  useEffect(() => {
    if (splash) return;
    const intervalFotos = setInterval(() => {
      setImagenAnterior(imagenActiva);
      setImagenActiva((prev) => (prev + 1) % IMAGENES_BANNER.length);
    }, 5500);
    return () => clearInterval(intervalFotos);
  }, [splash, imagenActiva]);

  // Controles de navegación manual en el banner
  const retrocederFoto = () => {
    setImagenAnterior(imagenActiva);
    setImagenActiva((prev) => (prev === 0 ? IMAGENES_BANNER.length - 1 : prev - 1));
  };

  const avanzarFoto = () => {
    setImagenAnterior(imagenActiva);
    setImagenActiva((prev) => (prev + 1) % IMAGENES_BANNER.length);
  };

  const cotizar = (asunto = 'general') => {
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(`Hola tabera, deseo cotizar sobre: ${asunto}`)}`, '_blank');
  };

  return (
    <main className={`relative w-full min-h-screen overflow-x-hidden bg-white text-stone-700 ${robotoCondensed.className}`}>

      {/* ========================================================
          1. SPLASH: CARD EN GLASS CON "Hola"
          ======================================================== */}
      {splash && (
        <div
          onClick={() => { setDesvanecer(true); setTimeout(() => setSplash(false), 500); }}
          className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-xs transition-opacity duration-700 cursor-pointer ${
            desvanecer ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="px-14 py-12 sm:px-24 sm:py-20 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
            <h1 className={`${fuenteHoliday.className} text-7xl sm:text-9xl md:text-[10rem] font-black text-white tracking-normal drop-shadow-md leading-none`}>
              {texto}
              <span className="inline-block w-1.5 sm:w-2.5 h-16 sm:h-24 ml-2 bg-white animate-pulse align-middle" />
            </h1>
          </div>
        </div>
      )}

      {/* ========================================================
          2. HEADER / TRES RAYITAS (MENÚ HAMBURGUESA)
          ======================================================== */}
      <header className="fixed top-0 right-0 z-40 p-6 sm:p-8 pointer-events-none">
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-xl border border-white/30 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg"
          aria-label="Abrir Menú"
        >
          <span className="w-5 h-[2px] bg-white rounded-full" />
          <span className="w-5 h-[2px] bg-white rounded-full" />
          <span className="w-5 h-[2px] bg-white rounded-full" />
        </button>
      </header>

      {/* ========================================================
          3. BANNER PRINCIPAL FULL SCREEN
          ======================================================== */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-black text-white">
        
        {/* Carrusel continuo sin cortes negros */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={IMAGENES_BANNER[imagenAnterior]}
              alt="Fondo anterior"
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>

          {IMAGENES_BANNER.map((src, index) => {
            const estaActiva = index === imagenActiva;
            return (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  estaActiva ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={src}
                  alt={`Banner ${index + 1}`}
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* LOGO "tabera" + TEXTO GIGANTE EN LA PARTE SUPERIOR */}
        <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none text-center px-4 w-full max-w-4xl">
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-[0.25em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] leading-none">
            tabera
          </h1>

          <div className="mt-2 sm:mt-4 flex flex-col items-center gap-0.5">
            <span className="text-sm sm:text-lg md:text-xl font-bold uppercase tracking-[0.35em] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Encuentra
            </span>
            <span className="text-2xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)] leading-tight">
              TODO LO QUE NECESITAS
            </span>
          </div>
        </div>

        {/* BOTONES ANTERIOR Y SIGUIENTE EN GLASS */}
        <button
          onClick={retrocederFoto}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-2xl border border-white/40 text-white flex items-center justify-center transition-all active:scale-90 shadow-xl cursor-pointer"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={avanzarFoto}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-2xl border border-white/40 text-white flex items-center justify-center transition-all active:scale-90 shadow-xl cursor-pointer"
          aria-label="Siguiente foto"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* PARTE INFERIOR: BOTÓN ROSADO CON LETRAS EN VERDE LIMÓN */}
        <div className="relative z-30 w-full h-full flex flex-col justify-end items-center pb-12 sm:pb-16 px-4 pointer-events-none">
          <button
            onClick={() => cotizar('Banner Principal')}
            className="pointer-events-auto px-14 py-4.5 rounded-full bg-[#FF9DB1] hover:bg-[#ff859d] text-[#D8FF38] text-lg sm:text-xl font-black uppercase tracking-[0.2em] shadow-[0_12px_35px_rgba(255,157,177,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#FF9DB1]/60"
          >
            Cotizar
          </button>

          {/* Indicadores de fotos */}
          <div className="pointer-events-auto flex gap-2 mt-4">
            {IMAGENES_BANNER.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setImagenAnterior(imagenActiva);
                  setImagenActiva(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  i === imagenActiva ? 'w-8 bg-[#D8FF38]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Ver foto ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </section>

      {/* ========================================================
          4. SECCIÓN DE BOTONES CIRCULARES COMPACTOS (NO SE SALEN)
          ======================================================== */}
      <section className="w-full bg-[#FFFBFB] py-8 sm:py-12 px-4 sm:px-6 border-b border-stone-100 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#FF9DB1] font-bold font-mono">
              [ COLECCIONES ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-stone-700/90">
              Explora por Ocasión
            </h2>
          </div>

          {/* Fila de círculos compactos */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8 py-2">
            {CIRCULOS_CATEGORIAS.map((cat) => (
              <Link
                key={cat.id}
                href={cat.ruta}
                className="group flex flex-col items-center gap-2 cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden p-1 bg-[#FF9DB1]/20 border-2 border-[#FF9DB1] group-hover:border-[#D8FF38] group-hover:shadow-[0_8px_20px_rgba(255,157,177,0.35)] transition-all duration-300">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                    <Image
                      src={cat.img}
                      alt={cat.titulo}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-600 group-hover:text-[#FF9DB1] transition-colors">
                  {cat.titulo}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. SECCIÓN EN BLANCO CON TEXTO DESVANECIDO
          ======================================================== */}
      <section className="w-full py-16 sm:py-24 px-6 bg-white text-center border-b border-stone-100">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="text-xs uppercase tracking-[0.35em] text-[#FF9DB1] font-bold font-mono">
        
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-stone-700 leading-tight">
            Diseñadas para perdurar en la memoria.
          </h2>
          <p className="text-base sm:text-xl text-stone-500 font-normal leading-relaxed">
            Cada vela es vertida pacientemente de forma artesanal con cera vegetal pura y pabilos de algodón sin plomo, logrando una combustión pausada, silenciosa y libre de toxinas.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => cotizar('Conocer más')}
              className="px-9 py-3.5 rounded-full bg-[#FF9DB1] hover:bg-[#ff859d] text-[#D8FF38] text-xs sm:text-sm font-black uppercase tracking-[0.2em] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Mas acerca nosotros
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. SECCIÓN "MOMENTOS ESPECIALES" (SIN CARD GLASS):
          - Imagen del producto (arriba)
          - Información colocada de forma natural en la parte inferior
          ======================================================== */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-8 bg-[#FF9DB1] text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D8FF38] font-bold font-mono">
              [ COLECCIÓN EXCLUSIVA ]
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white drop-shadow-sm">
              Momentos Especiales
            </h2>
          </div>

          {/* Grid de productos con la información abajo de la foto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
            {PRODUCTOS_MOMENTOS.map((prod) => (
              <div 
                key={prod.id}
                className="group relative rounded-[2.5rem] p-4 flex flex-col transition-all duration-500 hover:-translate-y-2"
              >
                {/* Fondo sutil degradado detrás para enmarcar la card */}
                <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-b ${prod.bgFondo} opacity-90 shadow-2xl transition-transform duration-500 group-hover:scale-105 pointer-events-none`} />

                {/* Contenido general */}
                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* FOTO SUPERIOR COMPLETA */}
                  <div className="relative w-full h-80 sm:h-96 rounded-[1.8rem] overflow-hidden bg-white/20 shadow-lg mb-6">
                    <Image
                      src={prod.img}
                      alt={prod.titulo}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* INFORMACIÓN DEL PRODUCTO (COLOCADA DEBAJO DE LA FOTO NATURALMENTE) */}
                  <div className="flex-1 flex flex-col justify-between text-left px-2">
                    
                    <div className="space-y-3 mb-6">
                      <div className="inline-block">
                        <span className="px-3.5 py-1 rounded-full bg-black/30 text-[10px] font-black uppercase tracking-widest text-[#D8FF38]">
                          {prod.tag}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                        {prod.titulo}
                      </h3>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                        {prod.desc}
                      </p>
                    </div>

                    {/* Botón cotizar rosado/limón */}
                    <button
                      onClick={() => cotizar(`Vela momento: ${prod.titulo}`)}
                      className="w-full py-4 rounded-full bg-[#FF9DB1] hover:bg-white text-[#D8FF38] hover:text-[#FF9DB1] text-xs font-black uppercase tracking-[0.2em] shadow-md transition-all cursor-pointer border border-[#D8FF38]/50 active:scale-95"
                    >
                      Cotizar Modelo
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          7. SECCIÓN CON IMAGEN DESCRIPTIVA DEL PRODUCTO
          ======================================================== */}
      <section className="w-full py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Imagen del producto */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md h-[480px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-stone-100">
              <Image
                src="/Ilustraciones.png"
                alt="Detalle vela artesanal"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          {/* Descripción técnica y suave */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <span className="text-xs uppercase tracking-[0.3em] text-[#FF9DB1] font-bold font-mono">
              [ ANATOMÍA DE LA VELA ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-700 leading-tight">
              Luz pura sin artificios ni residuos negros.
            </h2>
            <p className="text-base sm:text-lg text-stone-500 leading-relaxed font-normal">
              Nuestros recipientes de vidrio son reutilizables y las fragancias se infunden con aceites esenciales botánicos de alta difusión que aromatizan el ambiente incluso apagadas.
            </p>

            <div className="space-y-3 pt-2 text-stone-600 font-medium">
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-[#FF9DB1]" />
                <span>45 a 55 horas de combustión homogénea</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#FF9DB1]" />
                <span>Libre de parafinas, ftalatos y químicos pesados</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#FF9DB1]" />
                <span>Empaque con lazo de algodón listo para regalo</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => cotizar('Personalización y medidas')}
                className="px-10 py-3.5 rounded-full bg-[#FF9DB1] hover:bg-[#ff859d] text-[#D8FF38] text-xs font-black uppercase tracking-[0.2em] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Personalizar Pedido
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          8. BANNER FULL SCREEN PARA VIDEO
          ======================================================== */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-black flex items-center justify-center text-center px-6">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        >
          <source src="/WhatsApp Video 2026-06-11 at 16.54.48.mp4" type="video/mp4" />
        </video>

        {/* Mensaje y Botón central */}
        <div className="relative z-10 max-w-2xl space-y-6">
          <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-white drop-shadow-lg leading-tight">
            TABERA by DANIELA FORERO
          </h2>
          <p className="text-lg sm:text-2xl text-white/90 leading-relaxed font-normal drop-shadow-md">
         
          </p>
          <div>
            <button
              onClick={() => cotizar('Video banner - Cotización directa')}
              className="px-12 py-4 rounded-full bg-[#FF9DB1] hover:bg-white text-[#D8FF38] hover:text-[#FF9DB1] text-xs sm:text-sm font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#D8FF38]/40"
            >
              Pedir Asesoría por WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. MENÚ LATERAL DRAWER
          ======================================================== */}
      {menuAbierto && (
        <div 
          onClick={() => setMenuAbierto(false)} 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-80 h-full bg-white p-8 flex flex-col justify-between shadow-2xl"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-2xl font-black uppercase tracking-wider text-stone-700">tabera</span>
                <button onClick={() => setMenuAbierto(false)} className="text-xl font-bold text-stone-500">✕</button>
              </div>
              
              <nav className="flex flex-col gap-4 text-left">
                {CIRCULOS_CATEGORIAS.map((c) => (
                  <Link
                    key={c.id}
                    href={c.ruta}
                    onClick={() => setMenuAbierto(false)}
                    className="text-base font-bold uppercase text-stone-600 hover:text-[#FF9DB1] transition-colors"
                  >
                    {c.titulo}
                  </Link>
                ))}
              </nav>
            </div>

            <button
              onClick={() => { setMenuAbierto(false); cotizar('Menú'); }}
              className="w-full py-3.5 rounded-full bg-[#FF9DB1] text-[#D8FF38] font-black text-xs uppercase tracking-widest shadow-md"
            >
              Cotizar por WhatsApp
            </button>
          </div>
        </div>
      )}

    </main>
  );
}