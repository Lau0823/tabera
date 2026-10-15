'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Roboto_Condensed, Source_Code_Pro } from 'next/font/google';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  Flame, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

// Tipografía para Títulos (como estaba antes)
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  display: 'swap',
});

// Tipografía para el cuerpo del texto, precios, tags y botones
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const NUMERO_WHATSAPP = '573123592141';

// Imágenes del Banner Principal
const IMAGENES_BANNER = [
  "/banner.png",
  "/velas2.png",
  "/matrimonio.png",
  "/banner.png"
];

// 1. LAS 3 CATEGORÍAS EN CÍRCULOS
const CIRCULOS_CATEGORIAS = [
  { id: 1, titulo: 'Bodas', ruta: '/catalogo/bodas', img: '/matri.png' },
  { id: 2, titulo: '15 Años', ruta: '/catalogo/15-anos', img: '/15.png' },
  { id: 3, titulo: 'Baby Shower', ruta: '/catalogo/baby-shower', img: '/babyshower.png' }
];

// 2. PRODUCTOS PARA EL CARRUSEL RODANTE (SIN FONDO / SIN CARD)
const DIEZ_PRODUCTOS_CARRUSEL = [
  { id: 1, titulo: 'Vela Baby Shower', precio: '$9.000 COP', img: '/carruselbg.png' },
  { id: 2, titulo: 'Recordatorio Pet', precio: '$8.000 COP', img: '/perrito.png' },
  { id: 3, titulo: 'Edición 15 Años Rosé', precio: '$7.000 COP', img: '/margarita.png' },
  { id: 4, titulo: 'Vela Baby Shower', precio: '9.000 COP', img: '/perrito.png' },
  { id: 5, titulo: 'Vela Cera Soya Botánica', precio: '8.000 COP', img: '/carruselbg.png' },
  { id: 6, titulo: 'Aroma Vainilla Tostada', precio: '$9.000 COP', img: '/margarita.png' },
  { id: 7, titulo: 'Mini Velas Recuerdos (x10)', precio: '$8.000 COP', img: '/carruselbg.png' },
  { id: 8, titulo: 'Vela Baby Shower', precio: '$7.000 COP', img: '/perrito.png' },
  { id: 9, titulo: 'Recordatorio Primera Comunión', precio: '$8.000 COP', img: '/margarita.png' },
  { id: 10, titulo: 'Vela Baby Shower', precio: '$8.000 COP', img: '/perrito.png' }
];

// 3. LAS 3 CARDS DE PRODUCTO CON PRECIO Y MATERIALES
const TRES_PRODUCTOS_DESTACADOS = [
  {
    id: 'prod-destacado-1',
    titulo: 'Vela Nupcial & Lino',
    precio: '$38.000 COP',
    materiales: 'Cera 100% de soja vegetal, pabilo de algodón orgánico, esencia floral blanca y envase de vidrio reutilizable.',
    img: '/image-removebg-preview (8).png',
  },
  {
    id: 'prod-destacado-2',
    titulo: 'Baby Cloud Dulce',
    precio: '$32.000 COP',
    materiales: 'Cera de soja hipoalergénica, aceites naturales de vainilla francesa y lazo de algodón artesanal.',
    img: '/image-removebg-preview (6).png',
  },
  {
    id: 'prod-destacado-3',
    titulo: 'Sweet Amber 15',
    precio: '$35.000 COP',
    materiales: 'Cera pura botánica, mecha de madera con crepitar suave, ámbar tostado y destellos botánicos secos.',
    img: '/image-removebg-preview (5).png',
  }
];

export default function HomeVelas() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [imagenAnterior, setImagenAnterior] = useState(0);

  const carruselRef = useRef<HTMLDivElement>(null);
  const animacionRef = useRef<number | null>(null);
  const [enPausa, setEnPausa] = useState(false);

  // Estado para la máquina de escribir del banner de video
  const [textoVideo, setTextoVideo] = useState('');

  // Rotación suave del banner principal
  useEffect(() => {
    const intervalFotos = setInterval(() => {
      setImagenAnterior(imagenActiva);
      setImagenActiva((prev) => (prev + 1) % IMAGENES_BANNER.length);
    }, 5500);
    return () => clearInterval(intervalFotos);
  }, [imagenActiva]);

  // Máquina de escribir continua para "TABERA BY DANIELA FORERO"
  useEffect(() => {
    const frase = 'TABERA BY DANIELA FORERO';
    let index = 0;
    let borrando = false;

    const interval = setInterval(() => {
      if (!borrando) {
        setTextoVideo(frase.slice(0, index + 1));
        index++;
        if (index === frase.length) {
          borrando = true;
          clearInterval(interval);
          setTimeout(() => {
            const reanudar = setInterval(() => {
              if (borrando) {
                setTextoVideo(frase.slice(0, index - 1));
                index--;
                if (index === 0) {
                  borrando = false;
                }
              } else {
                setTextoVideo(frase.slice(0, index + 1));
                index++;
                if (index === frase.length) {
                  borrando = true;
                }
              }
            }, 80);
          }, 2000);
        }
      }
    }, 110);

    return () => clearInterval(interval);
  }, []);

  // Desplazamiento fluido continuo del carrusel
  useEffect(() => {
    const velocidadPixelesPorFrame = 2.2;

    const animar = () => {
      if (carruselRef.current && !enPausa) {
        const contenedor = carruselRef.current;
        contenedor.scrollLeft += velocidadPixelesPorFrame;

        if (contenedor.scrollLeft >= contenedor.scrollWidth / 2) {
          contenedor.scrollLeft = 0;
        }
      }
      animacionRef.current = requestAnimationFrame(animar);
    };

    animacionRef.current = requestAnimationFrame(animar);

    return () => {
      if (animacionRef.current) cancelAnimationFrame(animacionRef.current);
    };
  }, [enPausa]);

  const retrocederFoto = () => {
    setImagenAnterior(imagenActiva);
    setImagenActiva((prev) => (prev === 0 ? IMAGENES_BANNER.length - 1 : prev - 1));
  };

  const avanzarFoto = () => {
    setImagenAnterior(imagenActiva);
    setImagenActiva((prev) => (prev + 1) % IMAGENES_BANNER.length);
  };

  const agregarAlCarritoWhatsApp = (producto: string, precio: string) => {
    const mensaje = `Hola tabera, deseo ordenar para mi carrito de compras el producto: "${producto}" (${precio}).`;
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  const moverCarrusel = (direccion: 'izq' | 'der') => {
    if (carruselRef.current) {
      const desplazamiento = direccion === 'izq' ? -350 : 350;
      carruselRef.current.scrollBy({ left: desplazamiento, behavior: 'smooth' });
    }
  };

  return (
    <main className={`relative w-full min-h-screen overflow-x-hidden bg-white text-stone-700 ${sourceCodePro.className}`}>

      {/* ========================================================
          HEADER: MENÚ HAMBURGUESA
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
          1. BANNER PRINCIPAL FULL SCREEN
          ======================================================== */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-black text-white">
        
        {/* Fondo del carrusel */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={IMAGENES_BANNER[imagenAnterior]}
              alt="Fondo previo"
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

        {/* Logo "tabera" + Texto superior (con Roboto Condensed en títulos) */}
        <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none text-center px-4 w-full max-w-4xl">
          <h1 className={`${robotoCondensed.className} text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-[0.25em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] leading-none`}>
            tabera
          </h1>
          <div className="mt-2 sm:mt-4 flex flex-col items-center gap-0.5">
            <span className={`${sourceCodePro.className} text-xs sm:text-base md:text-lg font-semibold uppercase tracking-[0.35em] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}>
              Encuentra
            </span>
            <span className={`${robotoCondensed.className} text-2xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)] leading-tight`}>
              TODO LO QUE NECESITAS
            </span>
          </div>
        </div>

        {/* Controles de navegación manual en Glass */}
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

        {/* Botón inferior: Raspberry Rose con texto Sunset */}
        <div className="relative z-30 w-full h-full flex flex-col justify-end items-center pb-12 sm:pb-16 px-4 pointer-events-none">
          <button
            onClick={() => agregarAlCarritoWhatsApp('Cotización General', 'Banner')}
            className={`${sourceCodePro.className} pointer-events-auto px-14 py-4.5 rounded-full bg-[#C43670] hover:bg-[#aa2a5f] text-[#F3CC97] text-base sm:text-lg font-bold uppercase tracking-[0.2em] shadow-[0_12px_35px_rgba(196,54,112,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#F3CC97]/40`}
          >
            Cotizar
          </button>

          {/* Indicadores */}
          <div className="pointer-events-auto flex gap-2 mt-4">
            {IMAGENES_BANNER.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setImagenAnterior(imagenActiva);
                  setImagenActiva(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  i === imagenActiva ? 'w-8 bg-[#F3CC97]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Ver foto ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </section>

      {/* ========================================================
          2. SECCIÓN: 3 CÍRCULOS DE CATEGORÍAS
          ======================================================== */}
      <section className="w-full bg-[#FFFBFB] py-10 sm:py-14 px-4 sm:px-6 border-b border-stone-100 overflow-hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-6 sm:gap-14 md:gap-20">
          {CIRCULOS_CATEGORIAS.map((cat) => (
            <Link
              key={cat.id}
              href={cat.ruta}
              className="group flex flex-col items-center gap-2.5 cursor-pointer transition-transform hover:-translate-y-1.5"
            >
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1.5 bg-[#C43670]/15 border-2 border-[#C43670] group-hover:border-[#F3CC97] group-hover:shadow-[0_10px_25px_rgba(196,54,112,0.35)] transition-all duration-300">
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

              <span className={`${robotoCondensed.className} text-base sm:text-lg font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#C43670] transition-colors`}>
                {cat.titulo}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. SECCIÓN: IMAGEN DESCRIPTIVA DEL PRODUCTO
          ======================================================== */}
      <section className="w-full py-16 sm:py-24 px-6 bg-white border-b border-stone-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md h-[460px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-stone-100">
              <Image
                src="/Ilustraciones.png"
                alt="Detalle vela artesanal"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-left">
            <span className={`${sourceCodePro.className} text-xs uppercase tracking-[0.3em] text-[#C43670] font-bold`}>

            </span>
            <h2 className={`${robotoCondensed.className} text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-700 leading-tight`}>
              Luz pura sin artificios ni residuos negros.   </h2>
            <p className={`${sourceCodePro.className} text-sm sm:text-base text-stone-500 leading-relaxed font-normal`}>
              Nuestros recipientes de vidrio son reutilizables y las fragancias se infunden con aceites esenciales botánicos de alta difusión que aromatizan el ambiente incluso apagadas.
            </p>

        

            <div className="pt-3">
              <button
                onClick={() => agregarAlCarritoWhatsApp('Personalización de Vela', 'A consultar')}
                className={`${sourceCodePro.className} px-10 py-3.5 rounded-full bg-[#C43670] hover:bg-[#aa2a5f] text-[#F3CC97] text-xs font-bold uppercase tracking-[0.2em] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#F3CC97]/40`}
              >
                Personalizar Pedido
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          4. CARRUSEL RODANTE CONTINUO HORIZONTAL (RÁPIDO Y FLUIDO)
          ======================================================== */}
      <section 
        className="relative w-full py-10 sm:py-14 bg-[#FFFBFB] border-b border-stone-100 overflow-hidden"
        onMouseEnter={() => setEnPausa(true)}
        onMouseLeave={() => setEnPausa(false)}
      >
        {/* Controles de flechas minimalistas flotantes */}
        <button
          onClick={() => moverCarrusel('izq')}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-[#C43670] text-stone-800 hover:text-[#F3CC97] border border-stone-200/60 shadow-md flex items-center justify-center transition-all active:scale-90 cursor-pointer backdrop-blur-xs"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={() => moverCarrusel('der')}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-[#C43670] text-stone-800 hover:text-[#F3CC97] border border-stone-200/60 shadow-md flex items-center justify-center transition-all active:scale-90 cursor-pointer backdrop-blur-xs"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Tira continua sin fin */}
        <div 
          ref={carruselRef}
          className="flex items-center gap-8 sm:gap-12 overflow-x-hidden select-none py-2"
        >
          {[...DIEZ_PRODUCTOS_CARRUSEL, ...DIEZ_PRODUCTOS_CARRUSEL].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex flex-col items-center text-center shrink-0 w-36 sm:w-44 group cursor-pointer transition-transform hover:-translate-y-1 duration-300"
              onClick={() => agregarAlCarritoWhatsApp(item.titulo, item.precio)}
            >
              <div className="relative w-36 h-48 sm:w-44 sm:h-56 flex items-center justify-center mb-2">
                <Image
                  src={item.img}
                  alt={item.titulo}
                  fill
                  unoptimized
                  className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h4 className={`${robotoCondensed.className} text-sm sm:text-base font-bold uppercase text-stone-700 tracking-wider line-clamp-1`}>
                {item.titulo}
              </h4>
              <p className={`${sourceCodePro.className} text-xs sm:text-sm font-semibold text-[#C43670] mt-0.5`}>
                {item.precio}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  agregarAlCarritoWhatsApp(item.titulo, item.precio);
                }}
                className={`${sourceCodePro.className} mt-2 px-4 py-1.5 rounded-full bg-[#C43670] hover:bg-[#aa2a5f] text-[#F3CC97] text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-1 active:scale-95`}
              >
                <ShoppingCart className="w-3 h-3" />
                <span>Pedir</span>
              </button>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================
          5. SECCIÓN: 3 CARDS DE PRODUCTO CON PRECIO, MATERIALES Y BOTÓN CARRITO
          ======================================================== */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {TRES_PRODUCTOS_DESTACADOS.map((prod) => (
            <div 
              key={prod.id}
              className="flex flex-col justify-between rounded-3xl p-5 border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Imagen del producto */}
              <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-stone-100 mb-5">
                <Image
                  src={prod.img}
                  alt={prod.titulo}
                  fill
                  unoptimized
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Información, Precio y Materiales */}
              <div className="space-y-3 text-left mb-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className={`${robotoCondensed.className} text-2xl font-black uppercase tracking-tight text-stone-700`}>
                    {prod.titulo}
                  </h3>
                  <span className={`${sourceCodePro.className} text-base font-bold text-[#C43670]`}>
                    {prod.precio}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                  <span className={`${sourceCodePro.className} text-[10px] font-bold uppercase tracking-wider text-[#C43670] block`}>
                    Materiales & Composición:
                  </span>
                  <p className={`${sourceCodePro.className} text-xs sm:text-sm text-stone-600 leading-relaxed`}>
                    {prod.materiales}
                  </p>
                </div>
              </div>

              {/* Botón Carrito de Compras (Redirige a WhatsApp) */}
              <button
                onClick={() => agregarAlCarritoWhatsApp(prod.titulo, prod.precio)}
                className={`${sourceCodePro.className} w-full py-3.5 rounded-full bg-[#C43670] hover:bg-[#aa2a5f] text-[#F3CC97] text-xs font-bold uppercase tracking-[0.2em] shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-[#F3CC97]/40 flex items-center justify-center gap-2`}
              >
                <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                <span>Añadir al Carrito</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          6. BANNER DE VIDEO FULL SCREEN CON MÁQUINA DE ESCRIBIR
          ======================================================== */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-black flex items-center justify-center text-center px-6">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        >
          <source src="/WhatsApp Video 2026-06-11 at 16.54.48.mp4" type="video/mp4" />
        </video>

        {/* Capa de contraste cinematográfica */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Título en Roboto Condensed con efecto máquina de escribir */}
        <div className="relative z-10 max-w-4xl px-4 flex items-center justify-center">
          <h2 className={`${robotoCondensed.className} text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.18em] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] leading-tight`}>
            {textoVideo}
            <span className="inline-block w-1.5 sm:w-2.5 h-8 sm:h-16 ml-2 bg-[#F3CC97] animate-pulse align-middle" />
          </h2>
        </div>
      </section>

      {/* ========================================================
          7. FOOTER EDITORIAL (BG RASPBERRY ROSE #C43670 + LETRA SUNSET #F3CC97)
          ======================================================== */}
      <footer className="w-full bg-[#C43670] text-[#F3CC97] py-12 px-6 border-t border-[#F3CC97]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          <div className="space-y-1">
            <h3 className={`${robotoCondensed.className} text-2xl font-black uppercase tracking-[0.2em] text-[#F3CC97]`}>
              tabera
            </h3>
            <p className={`${sourceCodePro.className} text-xs text-[#F3CC97]/80`}>
              Velas artesanales de cera vegetal botánica.
            </p>
          </div>

          <div className={`${sourceCodePro.className} text-xs text-[#F3CC97]/90 tracking-wider`}>
            Hecho por{' '}
            <span className="font-bold uppercase text-[#F3CC97] tracking-widest hover:underline transition-all">
              Sí Forever Studio
            </span>
          </div>

          <div className={`${sourceCodePro.className} text-[11px] text-[#F3CC97]/75`}>
            © {new Date().getFullYear()} Tabera. Todos los derechos reservados.
          </div>

        </div>
      </footer>

      {/* ========================================================
          MENÚ LATERAL DRAWER
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
                <span className={`${robotoCondensed.className} text-2xl font-black uppercase tracking-wider text-stone-700`}>tabera</span>
                <button onClick={() => setMenuAbierto(false)} className="text-xl font-bold text-stone-500">✕</button>
              </div>
              
              <nav className="flex flex-col gap-4 text-left">
                {CIRCULOS_CATEGORIAS.map((c) => (
                  <Link
                    key={c.id}
                    href={c.ruta}
                    onClick={() => setMenuAbierto(false)}
                    className={`${robotoCondensed.className} text-base font-bold uppercase text-stone-600 hover:text-[#C43670] transition-colors`}
                  >
                    {c.titulo}
                  </Link>
                ))}
              </nav>
            </div>

            <button
              onClick={() => { setMenuAbierto(false); agregarAlCarritoWhatsApp('Consulta General', 'Menú'); }}
              className={`${sourceCodePro.className} w-full py-3.5 rounded-full bg-[#C43670] hover:bg-[#aa2a5f] text-[#F3CC97] font-bold text-xs uppercase tracking-widest shadow-[0_8px_20px_rgba(196,54,112,0.35)] transition-all cursor-pointer border border-[#F3CC97]/40`}
            >
              Cotizar por WhatsApp
            </button>
          </div>
        </div>
      )}

    </main>
  );
}