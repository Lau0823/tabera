'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Roboto_Condensed, Fraunces } from 'next/font/google';

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

const IMAGENES_BANNER = [
  "/osito.png",
  "/flores.png",
  "/velas de colores.png"
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
    }, 5000);
    return () => clearInterval(intervalFotos);
  }, [splash, imagenActiva]);

  const cotizar = () => {
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent('Hola, deseo cotizar.')}`, '_blank');
  };

  return (
    <main className={`relative w-full h-[100dvh] overflow-hidden bg-black text-white ${robotoCondensed.className}`}>

      {/* BANNER LIMPIO CON IMÁGENES AL 100% */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Capa de respaldo fija */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={IMAGENES_BANNER[imagenAnterior]}
            alt="Fondo respaldo"
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Capa activa con transición */}
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
                alt={`Banner tabera ${index + 1}`}
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* 1. SPLASH: CARD EN GLASS CON "Hola" */}
      {splash && (
        <div
          onClick={() => { setDesvanecer(true); setTimeout(() => setSplash(false), 500); }}
          className={`fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/20 backdrop-blur-xs transition-opacity duration-700 cursor-pointer ${
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

      {/* 2. LOGO "tabera" + TEXTO GIGANTE DIRECTO SIN CARD GLASS */}
      <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none text-center px-4 w-full max-w-4xl">
        
        {/* Logo "tabera" grande y limpio */}
        <h1 className="text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-[0.25em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] leading-none">
          tabera
        </h1>

        {/* Texto debajo sin caja, letras grandes con jerarquía */}
        <div className="mt-3 sm:mt-5 flex flex-col items-center gap-0.5 sm:gap-1.5">
          <span className="text-sm sm:text-xl md:text-2xl font-bold uppercase tracking-[0.35em] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Encuentra
          </span>
          <span className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)] leading-tight">
            TODO LO QUE NECESITAS
          </span>
        </div>

      </div>

      {/* 3. TRES RAYITAS (MENÚ HAMBURGUESA) */}
      <header className="fixed top-0 right-0 z-40 p-6 sm:p-8">
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="w-12 h-12 rounded-full bg-black/25 hover:bg-black/45 backdrop-blur-xl border border-white/30 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg"
          aria-label="Menú"
        >
          <span className="w-5 h-[2px] bg-white rounded-full" />
          <span className="w-5 h-[2px] bg-white rounded-full" />
          <span className="w-5 h-[2px] bg-white rounded-full" />
        </button>
      </header>

      {/* 4. PARTE INFERIOR: BOTÓN COTIZAR + INDICADORES */}
      <section className="relative z-30 w-full h-full flex flex-col justify-end items-center pb-10 sm:pb-14 px-4 pointer-events-none">
        
        {/* Botón Cotizar */}
        <button
          onClick={cotizar}
          className="pointer-events-auto px-12 py-4 sm:px-14 sm:py-4.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-2xl border border-white/50 text-white text-base sm:text-lg font-black uppercase tracking-[0.25em] shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          Cotizar
        </button>

        {/* Indicadores de carrusel */}
        <div className="pointer-events-auto flex gap-2 mt-4">
          {IMAGENES_BANNER.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setImagenAnterior(imagenActiva);
                setImagenActiva(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === imagenActiva ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ver foto ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 5. MENÚ LATERAL */}
      {menuAbierto && (
        <div 
          onClick={() => setMenuAbierto(false)} 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-72 h-full bg-black/75 backdrop-blur-2xl border-l border-white/20 p-8 flex flex-col justify-center gap-6"
          >
            <button 
              onClick={() => setMenuAbierto(false)} 
              className="text-left text-3xl font-black uppercase tracking-wider text-white hover:opacity-75 transition-opacity"
            >
              Inicio
            </button>
            <button 
              onClick={cotizar} 
              className="text-left text-3xl font-black uppercase tracking-wider text-white hover:opacity-75 transition-opacity"
            >
              Cotizar
            </button>
          </div>
        </div>
      )}

    </main>
  );
}