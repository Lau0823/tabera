// app/catalogo/bodas/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Sparkles, Heart } from 'lucide-react';

// 🌟 Lista con las referencias de Bodas y sus dos escalas de precios (Imágenes originales conservadas)
const productosBodas = [
  { id: 'rosas-lino', name: 'Rosas Blancas & Lino', precioBase: '$12.500', precioMayor: '$10.000', img: '/WhatsApp Image 2026-06-05 at 17.53.06.jpeg', tag: 'Colección Nupcial' },
  { id: 'vela-corazon', name: 'Vela corazon', precioBase: '$8.600', precioMayor: '$7.000', img: '/WhatsApp Image 2026-06-05 at 20.15.04 - copia.jpeg', tag: 'Edición de Lujo' },
  { id: 'margaritas', name: 'Margaritas', precioBase: '$8.000', precioMayor: '$6.000', img: '/WhatsApp Image 2026-06-05 at 19.25.32 - copia.jpeg', tag: 'Colección Nupcial' },
  { id: 'jasmin-velvet', name: 'Jazmín Velvet & Vainilla', precioBase: '$14.000', precioMayor: '$12.000', img: '/WhatsApp Image 2026-06-05 at 19.28.01.jpeg', tag: 'Colección Nupcial' },
  { id: 'citric-blossom', name: 'Flor de Azahar & Verbena', precioBase: '$25.000', precioMayor: '$21.000', img: '/WhatsApp Image 2026-06-05 at 19.13.13 - copia.jpeg', tag: 'Frescura Botánica' },
  { id: 'amber-glow', name: 'Ámbar Intenso & Oud', precioBase: '$13.500', precioMayor: '$11.000', img: '/WhatsApp Image 2026-06-17 at 21.23.02 - copia.jpeg', tag: 'Edición de Lujo' },
  { id: 'lavanda-botanica', name: 'Lavanda Francesa & Té Blanco', precioBase: '$14.000', precioMayor: '$11.800', img: '/WhatsApp Image 2026-06-05 at 20.10.55 - copia.jpeg', tag: 'Colección Nupcial' },
  { id: 'minimal-sculpt', name: 'Cubo Burbuja Escultural', precioBase: '$14.500', precioMayor: '$12.000', img: '/WhatsApp Image 2026-06-05 at 19.30.33 - copia.jpeg', tag: 'Línea Minimalista' },
  { id: 'peonia-suede', name: 'Peonías & Gamuza Suave', precioBase: '$17.000', precioMayor: '$15.000', img: '/WhatsApp Image 2026-06-05 at 19.12.08 - copia.jpeg', tag: 'Colección Nupcial' },
  { id: 'miel-tabaco', name: 'Miel Orgánica & Tabaco Dulce', precioBase: '$23.000', precioMayor: '$21.000', img: '/WhatsApp Image 2026-06-17 at 08.44.58 - copia.jpeg', tag: 'Edición de Lujo' },
  { id: 'eucalipto-mint', name: 'rosa, Herbal & Menta', precioBase: '$38.000', precioMayor: '$35.000', img: '/WhatsApp Image 2026-06-17 at 09.31.47 - copia.jpeg', tag: 'Frescura Botánica' },
];

export default function CatalogoBodas() {
  const dispatchCarritoWhatsApp = (nombreProducto: string, pBase: string, pMayor: string) => {
    const message = encodeURIComponent(`Hola tabera, quiero cotizar la vela de bodas: "${nombreProducto}". Me interesa personalizarla con nuestro aroma de elección, los nombres o iniciales de la pareja en la etiqueta, y revisar la escala de precios (${pBase} para menos de 50 uds / ${pMayor} para más de 50 uds).`);
    window.open(`https://wa.me/573123592141?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2927] font-sans antialiased selection:bg-[#d8d8f6]">
      
      {/* Navbar Minimalista */}
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-neutral-200/60">
        <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-[#2C2927] transition-all">
          <ArrowLeft className="w-4 h-4"/> Volver al Inicio
        </Link>
        <span className="font-sans text-xl font-black uppercase tracking-[0.3em]">tabera</span>
        <div className="w-10 h-10 rounded-full bg-[#C5A880] flex items-center justify-center text-white shadow-sm">
          <Sparkles className="w-5 h-5"/>
        </div>
      </header>

      {/* Título de la Sección */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-12">
        <div className="space-y-8 text-left">
          <div className="space-y-2">
            <span className="font-serif italic text-3xl text-[#96a89c] block lowercase">atelier nupcial</span>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight text-[#C5A880]">Bodas de Ensueño</h1>
          </div>

          {/* Tarjeta de Personalización */}
          <div className="p-6 md:p-8 rounded-[32px] bg-white border border-[#C5A880]/30 max-w-3xl flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm">
            <div className="p-3.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] shrink-0">
              <Heart className="w-6 h-6 fill-current text-[#C5A880]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C5A880]">Atelier de Personalización</h4>
              <p className="text-xs md:text-sm text-neutral-600 font-medium leading-relaxed">
                Haz tus recordatorios verdaderamente memorables. En cualquiera de nuestras referencias de boda puedes <strong className="text-[#2C2927] font-bold">escoger tu aroma preferido</strong> y personalizar el diseño con el <strong className="text-[#2C2927] font-bold">nombre o las iniciales</strong> de la pareja.
              </p>
            </div>
          </div>
        </div>

        {/* Rejilla de Visualización Responsiva */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {productosBodas.map((p) => (
            <div key={p.id} className="group space-y-6 flex flex-col justify-between">
              
              {/* Fotografía de Escala Editorial */}
              <div className="relative h-[55vh] md:h-[65vh] rounded-[40px] overflow-hidden shadow-xl border border-neutral-100 bg-white">
                <Image 
                  src={p.img} 
                  alt={p.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                  className="object-cover transition-transform duration-1000 group-hover:scale-102" 
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xs text-[#2C2927]">
                  {p.tag}
                </div>
              </div>

              {/* Contenedor de Textos, Precios Escalonados y Carrito */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4">
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#2C2927]">{p.name}</h3>
                  
                  {/* Escala de Precios Tarifa Base vs Mayorista */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono font-bold">
                    <div className="text-neutral-500">
                      &lt; 50 uds: <span className="text-[#2C2927] font-sans text-sm font-black">{p.precioBase}</span>
                    </div>
                    <div className="text-[#96a89c]">
                      &ge; 50 uds: <span className="text-[#C5A880] font-sans text-sm font-black">{p.precioMayor}</span>
                    </div>
                  </div>
                </div>

                {/* Botón Único Redondo de Carrito (Checkout directo a WhatsApp) */}
                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={() => dispatchCarritoWhatsApp(p.name, p.precioBase, p.precioMayor)}
                    className="bg-[#2C2927] text-white p-4 rounded-full hover:bg-[#C5A880] transition-all shadow-md active:scale-90 flex items-center justify-center w-12 h-12"
                    aria-label="Añadir al Carrito y Cotizar"
                  >
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}