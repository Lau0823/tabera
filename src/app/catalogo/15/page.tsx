'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Sparkles } from 'lucide-react';

const productos15 = [
  { id: 1, name: 'Vainilla & Ámbar Dulce', precio: '$18.500', img: 'https://i.pinimg.com/736x/42/2f/e8/422fe8a66e4851aadc50ece515174990.jpg', tag: 'Juvenil' },
  { id: 2, name: 'Cuarzo Rosa Escultural', precio: '$21.000', img: 'https://i.pinimg.com/736x/f4/6c/82/f46c823a617370331576d93e96f1b80d.jpg', tag: 'Deseado' },
];

export default function Catalogo15() {
  const contactar = (prod: string) => window.open(`https://wa.me/573123592141?text=Hola tabera, quiero información de la vela ${prod} para mis 15 años.`, '_blank');

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2927] font-sans">
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-[#2C2927] transition-all"><ArrowLeft className="w-4 h-4"/> Volver</Link>
        <span className="font-sans text-xl font-black uppercase tracking-[0.3em]">tabera</span>
        <div className="w-10 h-10 rounded-full border-2 border-[#C5A880] flex items-center justify-center text-[#C5A880]"><Sparkles className="w-5 h-5"/></div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-16 space-y-2">
          <span className="font-serif italic text-3xl text-[#96a89c] block lowercase">mis quince años</span>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight text-[#C5A880]">Destellos de Luz</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {productos15.map((p) => (
            <div key={p.id} className="space-y-6">
              <div className="relative h-[65vh] rounded-[40px] overflow-hidden border border-neutral-100 shadow-xl">
                <Image src={p.img} alt={p.name} fill className="object-cover" />
              </div>
              <div className="flex justify-between items-center px-4">
                <div>
                  <h3 className="text-2xl font-black uppercase">{p.name}</h3>
                  <p className="text-[#C5A880] font-black text-xl">{p.precio}</p>
                </div>
                <button onClick={() => contactar(p.name)} className="bg-[#2C2927] text-white py-4 px-8 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#d8d8f6] hover:text-[#2C2927] transition-all">Cotizar</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}