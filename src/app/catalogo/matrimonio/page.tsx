// app/catalogo/matrimonio/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, MessageCircle, ArrowLeft, } from 'lucide-react';

const weddingProducts = [
  {
    id: 101,
    code: "MAT-01",
    title: "Vela Amore — Vidrio Italiano",
    price: "$18.500 COP",
    description: "Vertida delicadamente a mano en envase de vidrio italiano texturizado con sutiles destellos de pan de oro auténtico. Diseñada para evocar memorias eternas en tus invitados de boda.",
    notes: "Aroma: Rosas Blancas & Lino Orgánico. Compra mínima: 12 unidades.",
    image: "https://i.pinimg.com/736x/f3/b9/da/f3b9da103b80b59c1c1bc703e1bc1578.jpg"
  },
  {
    id: 102,
    code: "MAT-02",
    title: "Vela Eternal — Edición Cera Pura",
    price: "$21.000 COP",
    description: "Una pieza minimalista y escultórica de alta costura nupcial. Elaborada con pabilo de madera que emite un relajante crujido al encenderse.",
    notes: "Aroma: Azahar de Naranjo & Sándalo. Compra mínima: 12 unidades.",
    image: "https://i.pinimg.com/736x/cd/e3/69/cde369f90899dfa24f7a30d7c5d2e65c.jpg"
  }
];

// Fotos específicas para el banner exclusivo de bodas
const weddingBannerImages = [
  "https://i.pinimg.com/736x/e3/58/7a/e3587a95434f3cf426c7580fce00af7f.jpg",
  "https://i.pinimg.com/736x/cd/e3/69/cde369f90899dfa24f7a30d7c5d2e65c.jpg"
];

export default function MatrimonioPage() {
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  const dispatchWhatsApp = (title: string) => {
    const message = encodeURIComponent(`Hola tabera.co, me interesa cotizar los recordatorios de Matrimonio del modelo "${title}". ¿Me darías más información de tiempos y precios por volumen?`);
    window.open(`https://wa.me/573000000000?text=${message}`, '_blank');
  };

  return (
    <div className="bg-[#FAF8F5] text-[#2C2927] min-h-screen antialiased selection:bg-[#d8d8f6]">
      
      {/* Nav de Retorno */}
      <nav className="sticky top-0 bg-[#FAF8F5]/80 backdrop-blur-md z-50 px-6 py-4 border-b border-[#2C2927]/5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-[#96a89c] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al Home
        </Link>
        <span className="font-sans text-xs font-black tracking-[0.3em] uppercase">tabera.co</span>
      </nav>

      {/* BANNER PROPIO DE LA CATEGORÍA MATRIMONIO */}
      <header className="w-full bg-[#d8d8f6]/30 border-b border-[#2C2927]/5 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-left">
            <span className="text-[#96a89c] font-mono text-[10px] tracking-[0.3em] uppercase block">[ UNIÓN & ELEGANCIA ]</span>
            <h2 className="font-sans text-3xl md:text-5xl font-black uppercase tracking-tight text-[#2C2927]">Matrimonios</h2>
            <p className="text-xs text-neutral-500 max-w-sm font-medium tracking-wide">Recuerdos aromáticos de lujo diseñados para perdurar en el corazón de tus invitados.</p>
          </div>
          
          {/* Grid de imágenes complementarias del banner de Matrimonios */}
          <div className="flex gap-4 h-32 md:h-40 shrink-0 select-none">
            {weddingBannerImages.map((img, i) => (
              <div key={i} className="relative w-28 md:w-36 h-full rounded-xl overflow-hidden shadow-sm">
                <Image src={img} alt="Boda banner tabera" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Grid de Productos con Apertura Interactiva al Hacer Click */}
      <main className="py-16 px-4 md:px-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weddingProducts.map((product) => {
            const isExpanded = expandedProduct === product.id;

            return (
              <div 
                key={product.id} 
                className={`bg-white border border-[#2C2927]/5 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${isExpanded ? 'ring-2 ring-[#d8d8f6]' : ''}`}
              >
                <div 
                  onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                  className="cursor-pointer relative h-[360px] w-full group overflow-hidden"
                >
                  <Image src={product.image} alt={product.title} fill className="object-cover transition-transform duration-700 group-hover:scale-102" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                    <div>
                      <span className="text-[9px] font-mono opacity-70 block">{product.code}</span>
                      <h3 className="font-sans text-xl font-black uppercase tracking-tight mt-0.5">{product.title}</h3>
                    </div>
                    <div className="bg-white text-[#2C2927] px-3 py-1.5 rounded-xl font-black text-xs shadow-md">
                      {product.price}
                    </div>
                  </div>
                </div>

                {/* Contenido Expandible de la Card */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden border-t border-[#2C2927]/5 bg-[#FAF8F5]/60 ${isExpanded ? 'max-h-[320px] opacity-100 p-6' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] font-black tracking-widest text-[#96a89c] uppercase block">[ Notas de la Pieza ]</span>
                      <p className="text-xs text-neutral-600 mt-1 leading-relaxed font-medium">{product.description}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-neutral-100">
                      <p className="text-[11px] text-[#2C2927] font-semibold tracking-wide">✨ {product.notes}</p>
                    </div>
                    <button 
                      onClick={() => dispatchWhatsApp(product.title)}
                      className="w-full bg-[#2C2927] text-white text-[10px] tracking-[0.2em] uppercase font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#d8d8f6] hover:text-[#2C2927] transition-all shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" /> Cotizar por WhatsApp
                    </button>
                  </div>
                </div>

                {!isExpanded && (
                  <div onClick={() => setExpandedProduct(product.id)} className="w-full text-center py-2.5 bg-neutral-50 hover:bg-neutral-100/70 text-[9px] font-bold uppercase tracking-widest text-neutral-400 cursor-pointer transition-colors">
                    Toca para ver detalles y aromas
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer Minimalista de la Categoría */}
      <footer className="bg-[#2C2927] text-[#FAF8F5] py-12 text-center text-[10px] tracking-widest border-t border-[#2C2927]/5">
        <span className="font-sans text-xl font-black uppercase tracking-widest block text-white mb-2">tabera.co</span>
        <div className="flex justify-center gap-4 text-[#d8d8f6]">

        </div>
      </footer>
    </div>
  );
}