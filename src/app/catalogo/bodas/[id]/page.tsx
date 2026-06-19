// app/catalogo/bodas/[id]/page.tsx
'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Sparkles, Star } from 'lucide-react';

interface ProductoBoda {
  id: string;
  name: string;
  precio: string;
  desc: string;
  img: string;
  composicion: string;
}

const detallesInventario: Record<string, ProductoBoda> = {
  'rosas-lino': {
    id: 'rosas-lino',
    name: 'Vela Rosas Blancas & Lino',
    precio: '$18.500 COP',
    desc: 'Sutil, limpio y profundamente romántico. Esta obra artesanal está formulada exclusivamente para bodas, vertida delicadamente a mano para evocar una atmósfera de pureza total y frescura textil en las mesas de tus invitados.',
    img: 'https://i.pinimg.com/736x/e3/58/7a/e3587a95434f3cf426c7580fce00af7f.jpg',
    composicion: 'Cera de soja biodegradable de combustión lenta, pabilo de algodón puro, infusión concentrada de pétalos de rosa blanca y lino húmedo.'
  },
  'cuarzo-blanco': {
    id: 'cuarzo-blanco',
    name: 'Vela Cuarzo Blanco Escultural',
    precio: '$21.000 COP',
    desc: 'Una joya escultural tallada geométricamente a mano. Coronada en la parte superior con incrustaciones de cuarzo blanco genuino que refractan la luz de la llama de forma majestuosa.',
    img: 'https://i.pinimg.com/736x/5b/85/b8/5b85b8604c9eec06a013527e9f6c95dc.jpg',
    composicion: 'Cera vegetal rígida de alta fidelidad, fragmentos facetados de cuarzo blanco natural, esencias botánicas libres de ftalatos.'
  }
};

interface Props {
  params: Promise<{ id: string }>;
}

export default function DetalleProductoBoda({ params }: Props) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const [producto, setProducto] = useState<ProductoBoda | null>(null);
  const [cantidad, setCantidad] = useState('30-50');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (detallesInventario[productId]) {
      setProducto(detallesInventario[productId]);
    }
  }, [productId]);

  const dispatchPedidoPersonalizado = (name: string, precio: string) => {
    const message = encodeURIComponent(`Hola tabera, quiero realizar una cotización para mi boda del producto: "${name}" (${precio}/u) para un volumen estimado de unas ${cantidad} unidades.`);
    window.open(`https://wa.me/573123592141?text=${message}`, '_blank');
  };

  if (!isMounted) return <div className="min-h-screen bg-[#FAF8F5]" />;

  if (!producto) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center">
        <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Referencia de Bodas no encontrada</span>
        <Link href="/catalogo/bodas" className="text-xs uppercase font-black underline mt-4 text-[#2C2927]">Regresar al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2927] font-sans antialiased flex flex-col justify-between">
      
      {/* Top Header */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/catalogo/bodas" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-[#2C2927] transition-all">
          <ArrowLeft className="w-4 h-4" /> Catálogo Bodas
        </Link>
        <span className="font-sans text-base font-black uppercase tracking-[0.2em]">tabera</span>
      </header>

      {/* Contenedor Editorial de Detalle */}
      <main className="max-w-5xl w-full mx-auto px-4 md:px-6 py-6 my-auto">
        <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[500px] md:min-h-[580px]">
          
          {/* Columna Izquierda: Imagen Completa */}
          <div className="relative h-72 md:h-full md:col-span-6 bg-neutral-100">
            <Image src={producto.img} alt={producto.name} fill priority sizes="(max-width: 1024px) 100vw, 500px" className="object-cover object-center" />
          </div>

          {/* Columna Derecha: Datos, Descripción y Cantidad */}
          <div className="p-6 md:p-12 md:col-span-6 flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              <div className="flex gap-0.5 text-[#C5A880]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#2C2927] leading-none">{producto.name}</h1>
                <div className="text-xl font-black text-[#C5A880] pt-1">{producto.precio} <span className="text-[10px] text-neutral-400 font-medium lowercase">/ valor unitario</span></div>
              </div>

              <p className="text-xs md:text-sm text-neutral-500 font-medium leading-relaxed">{producto.desc}</p>
              
              {/* Caja de Composición Botánica */}
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-neutral-100 space-y-1">
                <span className="text-[9px] font-black tracking-widest text-[#96a89c] uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Ficha de Elaboración
                </span>
                <p className="text-[11px] text-neutral-600 font-medium leading-normal">{producto.composicion}</p>
              </div>

              {/* Selector Estético de Cantidad por Volumen */}
              <div className="space-y-2 pt-1">
                <span className="text-[9px] font-black tracking-widest text-neutral-400 uppercase block">Volumen aproximado de tu boda:</span>
                <div className="grid grid-cols-3 gap-2 bg-[#FAF8F5] p-1.5 rounded-full border border-neutral-100">
                  {['12-30', '31-70', 'Más de 70'].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setCantidad(vol)}
                      className={`py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${cantidad === vol ? 'bg-[#2C2927] text-white shadow-sm' : 'text-neutral-400'}`}
                    >
                      {vol} uds
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Final Redondo */}
            <div className="pt-2">
              <button 
                onClick={() => dispatchPedidoPersonalizado(producto.name, producto.precio)}
                className="w-full bg-[#2C2927] text-white text-[11px] tracking-[0.2em] uppercase font-black py-4.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#C5A880] transition-all shadow-lg active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Cotizar lote para mi Boda
              </button>
            </div>

          </div>
        </div>
      </main>

      <footer className="w-full text-center py-6 text-neutral-400 text-[9px] tracking-widest font-mono font-bold uppercase">
        © 2026 TABERA — ARTISAN STUDIO.
      </footer>

    </div>
  );
}