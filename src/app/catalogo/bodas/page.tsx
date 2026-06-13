'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Star, Sparkles, ArrowUpRight } from 'lucide-react';

const productosBodas = [
  { id: 1, name: 'Rosas Blancas & Lino', precio: '$18.500', img: 'https://i.pinimg.com/736x/e3/58/7a/e3587a95434f3cf426c7580fce00af7f.jpg', tag: 'Bestseller' },
  { id: 2, name: 'Cuarzo Blanco Escultural', precio: '$21.000', img: 'https://i.pinimg.com/736x/5b/85/b8/5b85b8604c9eec06a013527e9f6c95dc.jpg', tag: 'Lujo' },
];

export default function CatalogoBodas() {
  const contactar = (prod: string) => window.open(`https://wa.me/573123592141?text=Hola tabera, me interesa la referencia ${prod} para mi boda.`, '_blank');

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2927] font-sans selection:bg-[#C5A880]/30">
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-neutral-100">
        <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-[#2C2927] transition-all"><ArrowLeft className="w-4 h-4"/> Inicio</Link>
        <span className="font-sans text-xl font-black uppercase tracking-[0.3em]">tabera</span>
        <div className="w-10 h-10 rounded-full bg-[#C5A880] flex items-center justify-center text-white"><Sparkles className="w-5 h-5"/></div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-16 space-y-2">
          <span className="font-serif italic text-3xl text-[#96a89c] block lowercase">catálogo de bodas</span>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight text-[#C5A880]">Unión & Elegancia</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {productosBodas.map((p) => (
            <div key={p.id} className="group space-y-6">
              <div className="relative h-[70vh] rounded-[40px] overflow-hidden shadow-2xl">
                <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest">{p.tag}</div>
              </div>
              <div className="flex justify-between items-end px-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black uppercase tracking-tight">{p.name}</h3>
                  <p className="text-[#C5A880] font-black text-xl">{p.precio} <span className="text-xs text-neutral-400 font-medium lowercase">/ u</span></p>
                </div>
                <button onClick={() => contactar(p.name)} className="bg-[#2C2927] text-white p-5 rounded-full hover:bg-[#C5A880] transition-all shadow-xl active:scale-90"><MessageCircle className="w-6 h-6"/></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}