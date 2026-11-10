/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  ChevronRight,
  ExternalLink,
  Smartphone,
  Sun,
  Moon,
  Phone,
  CreditCard,
  Banknote,
  ArrowLeftRight,
  Star,
  Instagram,
  LayoutGrid,
  Search,
  ShoppingBag,
  Plus,
  X,
} from 'lucide-react';

import storeLogoImg from './assets/images/store_logo_phones_1794317878884.jpg';
import celularesImg from './assets/images/celulares_iphone_android_1794317881922.jpg';
import acessoriosImg from './assets/images/acessorios_premium_1794317882506.jpg';
import assistenciaImg from './assets/images/assistencia_tecnica_1794317885034.jpg';
import gamesImg from './assets/images/games_eletronicos_1794317883725.jpg';

type ThemeMode = 'dark' | 'light';
const THEME_STORAGE_KEY = 'energy-stor3-theme';

interface StoreLocation {
  name: string;
  neighborhood: string;
  mapsUrl: string;
}

interface ServiceHighlightItem {
  badge?: string;
  name: string;
  desc: string;
  img: string;
}

interface CatalogProduct {
  id: string;
  badge?: string;
  category: string;
  name: string;
  desc: string;
  price: number;
  installments: string;
  img: string;
}

const STORE_CONFIG = {
  whatsappNumber: '5567993174612',
  instagramUrl: 'https://www.instagram.com/',
  googleReviewUrl: 'https://maps.google.com/?cid=2634707571364447676',
  locations: [
    {
      name: 'Loja 01 · Rua José Paulino, 30',
      neighborhood: 'Como chegar · Bom Retiro',
      mapsUrl: 'https://maps.google.com/?cid=2634707571364447676',
    },
    {
      name: 'Loja 02 · Rua da Graça, 275',
      neighborhood: 'Como chegar · Bom Retiro',
      mapsUrl: 'https://maps.google.com/?cid=13075959349120651331',
    },
    {
      name: 'Loja 03 · Rua Três Rios, 208',
      neighborhood: 'Como chegar · Bom Retiro',
      mapsUrl: 'https://maps.google.com/?cid=11105222543249429476',
    },
  ] as StoreLocation[],
  highlights: [
    {
      badge: 'MAIS VENDIDOS',
      name: 'Celulares iPhone e Android',
      desc: 'Aparelhos novos e seminovos revisados com garantia.',
      img: celularesImg,
    },
    {
      badge: 'OFERTA',
      name: 'Fones e AirPods',
      desc: 'Fones Bluetooth, AirPods, caixas de som e áudio premium.',
      img: acessoriosImg,
    },
    {
      badge: 'DESTAQUE',
      name: 'Smartwatch',
      desc: 'Relógios inteligentes, pulseiras e acessórios conectáveis.',
      img: gamesImg,
    },
    {
      badge: 'ESPECIALIDADE',
      name: 'Assistência Técnica',
      desc: 'Troca de tela, bateria, conector e reparos em placa.',
      img: assistenciaImg,
    },
  ] as ServiceHighlightItem[],
  catalogProducts: [
    {
      id: 'iphone-17-pro-max',
      badge: 'LANÇAMENTO',
      category: 'Celulares',
      name: 'iPhone 17 Pro Max 256 GB',
      desc: 'Lacrado, 1 ano de garantia Apple',
      price: 11499.0,
      installments: 'ou 12x de R$ 958,25',
      img: celularesImg,
    },
    {
      id: 'galaxy-s25-ultra',
      badge: 'MAIS VENDIDO',
      category: 'Celulares',
      name: 'Samsung Galaxy S25 Ultra 256 GB',
      desc: 'Câmera de 200 MP e S Pen',
      price: 7999.0,
      installments: 'ou 12x de R$ 666,58',
      img: storeLogoImg,
    },
    {
      id: 'redmi-note-14-pro',
      badge: 'OFERTA',
      category: 'Celulares',
      name: 'Xiaomi Redmi Note 14 Pro 256 GB',
      desc: '8 GB de RAM, tela AMOLED 120 Hz',
      price: 2199.0,
      installments: 'ou 12x de R$ 183,25',
      img: celularesImg,
    },
    {
      id: 'airpods-pro-3',
      badge: 'NOVO',
      category: 'Fones de ouvido',
      name: 'AirPods Pro 3',
      desc: 'Cancelamento de ruído ativo',
      price: 1899.0,
      installments: 'ou 12x de R$ 158,25',
      img: acessoriosImg,
    },
    {
      id: 'kit-capinha-magsafe',
      badge: 'REVENDA',
      category: 'Capinhas',
      name: 'Capinha MagSafe + Película 3D',
      desc: 'Proteção anti-impacto premium',
      price: 149.9,
      installments: 'ou 6x de R$ 24,98',
      img: acessoriosImg,
    },
    {
      id: 'troca-tela-bateria',
      badge: 'GARANTIA',
      category: 'Assistência',
      name: 'Manutenção & Troca de Tela',
      desc: 'Peças selecionadas e diagnóstico rápido',
      price: 299.0,
      installments: 'ou 6x de R$ 49,83',
      img: assistenciaImg,
    },
  ] as CatalogProduct[],
};

function WhatsAppSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.359 5.016L2 22l5.156-1.359c1.484.813 3.172 1.25 4.875 1.25 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.531.078-1.203.109-1.953-.125-.453-.141-1.047-.344-1.797-.672-3.156-1.359-5.219-4.547-5.375-4.766-.156-.203-1.281-1.703-1.281-3.25s.813-2.313 1.094-2.625c.297-.313.641-.391.859-.391.219 0 .422.016.609.016.203.016.469-.078.734.563.281.672.953 2.313 1.031 2.484.094.172.141.375.031.578-.109.219-.172.344-.328.531-.172.188-.359.422-.516.563-.172.172-.344.359-.156.688.188.328.844 1.391 1.813 2.25 1.25 1.109 2.297 1.453 2.625 1.625.328.156.516.141.703-.078.188-.219.813-.953 1.031-1.281.219-.328.438-.266.734-.156.297.109 1.891.891 2.219 1.047.328.172.547.25.625.391.078.141.078.813-.172 1.516z" />
    </svg>
  );
}

function EnergyStor3Logo({ size = 'lg' }: { size?: 'lg' | 'md' }) {
  const dimensions = size === 'lg' ? 'w-28 h-28' : 'w-20 h-20';
  const boltSize = size === 'lg' ? 'w-11 h-11' : 'w-8 h-8';
  const titleSize = size === 'lg' ? 'text-xs' : 'text-[10px]';
  const subSize = size === 'lg' ? 'text-[8px]' : 'text-[7px]';

  return (
    <div
      className={`${dimensions} mx-auto rounded-full border-[3px] border-white bg-black shadow-2xl flex flex-col items-center justify-center select-none relative overflow-hidden`}
    >
      {/* Bolt Emblem */}
      <svg
        viewBox="0 0 64 76"
        className={`${boltSize} mb-1`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="energyBoltGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff7b00" />
            <stop offset="60%" stopColor="#ff3d00" />
            <stop offset="100%" stopColor="#e91e63" />
          </linearGradient>
        </defs>
        <rect
          x="12"
          y="6"
          width="40"
          height="58"
          rx="4"
          stroke="url(#energyBoltGrad)"
          strokeWidth="3.5"
        />
        <path
          d="M14 22L48 6L34 35H50L14 64L26 36H14V22Z"
          fill="url(#energyBoltGrad)"
        />
      </svg>
      <span
        className={`${titleSize} font-black tracking-[0.2em] text-white leading-none`}
      >
        ENERGY
      </span>
      <span
        className={`${subSize} font-semibold tracking-[0.28em] text-slate-400 mt-0.5 leading-none`}
      >
        STOR3
      </span>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-1.5">
      <h2 className="text-lg font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
        {title}
      </h2>
      <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#ff5500] to-[#7c2d12]" />
      {subtitle && (
        <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function HighlightCard({
  item,
  whatsappNumber,
}: {
  item: ServiceHighlightItem;
  whatsappNumber: string;
}) {
  const [imgError, setImgError] = useState(false);
  const msg = encodeURIComponent(
    `Olá! Vim pelo site da Energy Stor3 e quero saber o preço de: ${item.name}`
  );

  return (
    <article className="rounded-3xl bg-white dark:bg-[#12131f] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg overflow-hidden flex flex-col justify-between transition-colors">
      <div>
        <div className="relative bg-slate-100 dark:bg-slate-900">
          {item.badge && (
            <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#ff5500] to-[#d93800] text-white font-extrabold text-[9px] uppercase tracking-wider shadow">
              {item.badge}
            </span>
          )}
          {!imgError ? (
            <img
              src={item.img}
              alt={item.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center p-3 text-center">
              <Smartphone className="w-7 h-7 text-orange-500 mb-1.5" />
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {item.name}
              </span>
            </div>
          )}
        </div>
        <div className="p-3.5 space-y-1">
          <b className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 block">
            {item.name}
          </b>
          <small className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 block">
            {item.desc}
          </small>
        </div>
      </div>
      <div className="p-3.5 pt-1">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${msg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-2.5 px-3 text-center rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#ff5500] to-[#b43400] hover:from-[#ff661a] hover:to-[#c83e00] text-white shadow-md shadow-orange-950/40 transition"
        >
          Verificar preço
        </a>
      </div>
    </article>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // Fallback to dark mode
    }
    return 'dark';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tudo');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const categories = [
    { name: 'Tudo', img: null },
    { name: 'Celulares', img: celularesImg },
    { name: 'Fones de ouvido', img: acessoriosImg },
    { name: 'Capinhas', img: storeLogoImg },
    { name: 'Assistência', img: assistenciaImg },
  ];

  const filteredCatalog = useMemo(() => {
    return STORE_CONFIG.catalogProducts.filter((prod) => {
      const matchesCat =
        selectedCategory === 'Tudo' || prod.category === selectedCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartWhatsAppUrl = useMemo(() => {
    const lines = Object.entries(cart)
      .map(([id, qty]) => {
        const prod = STORE_CONFIG.catalogProducts.find((p) => p.id === id);
        if (!prod) return null;
        return `• ${qty}x ${prod.name} (R$ ${prod.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`;
      })
      .filter(Boolean);

    const text =
      lines.length > 0
        ? `Olá! Vim pelo catálogo da Energy Stor3 e gostaria de fazer o pedido:\n\n${lines.join('\n')}`
        : 'Olá! Vim pelo site da Energy Stor3 e quero atendimento.';

    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }, [cart]);

  return (
    <div className="bg-slate-100 dark:bg-[#08090f] text-slate-900 dark:text-slate-100 min-h-screen selection:bg-orange-500 selection:text-white transition-colors duration-200">
      {/* Container Principal Mobile-First */}
      <main className="max-w-md mx-auto bg-white dark:bg-[#0b0c14] min-h-screen border-x border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden transition-colors duration-200">
        {/* 1. HERO / CABEÇALHO COM IMAGEM DE FUNDO */}
        <header className="relative pt-10 pb-8 px-6 text-center overflow-hidden">
          {/* Imagem de Fundo com Scrim Escuro */}
          <div className="absolute inset-0 z-0">
            <img
              src={storeLogoImg}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 filter brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/65 to-[#0b0c14]" />
          </div>

          {/* Seletor de Tema (Dark / Light) */}
          <div className="absolute top-4 right-4 z-20">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark'
                  ? 'Mudar para o modo claro'
                  : 'Mudar para o modo escuro'
              }
              title={
                theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'
              }
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-sm transition cursor-pointer whitespace-nowrap"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-orange-400" />
                  <span>Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-orange-300" />
                  <span>Escuro</span>
                </>
              )}
            </button>
          </div>

          {/* Conteúdo do Hero */}
          <div className="relative z-10">
            <div className="mb-4">
              <EnergyStor3Logo size="lg" />
            </div>

            <h1
              id="store-name"
              className="text-2xl font-extrabold tracking-wide uppercase text-white"
            >
              ENERGY STOR3
            </h1>
            <p
              id="store-slogan"
              className="text-xs uppercase tracking-[0.14em] text-slate-200 mt-2 leading-relaxed max-w-xs mx-auto"
            >
              Eletrônicos, acessórios e assistência técnica. Quase 10 anos de
              mercado.
            </p>

            {/* Especialidades */}
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] uppercase tracking-[0.12em] text-slate-200 mt-4 font-medium">
              <span>Celulares</span>
              <span className="text-slate-400">•</span>
              <span>Acessórios</span>
              <span className="text-slate-400">•</span>
              <span>Assistência técnica</span>
              <span className="text-slate-400">•</span>
              <span>Atacado</span>
            </div>

            {/* Cidade */}
            <div className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-sm text-white">
              <MapPin className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              <span>São Paulo/SP</span>
            </div>
          </div>
        </header>

        {/* 2. LETREIRO ANIMADO (MARQUEE LARANJA) */}
        <div className="bg-gradient-to-r from-[#ff5500] via-[#e04800] to-[#ff5500] text-white py-2.5 overflow-hidden border-y border-orange-400/30 font-extrabold text-xs tracking-[0.15em] uppercase">
          <div className="animate-marquee flex items-center gap-5">
            <span>CELULARES · ACESSÓRIOS · GAMES</span>
            <span>★</span>
            <span>ASSISTÊNCIA TÉCNICA ESPECIALIZADA</span>
            <span>★</span>
            <span>CELULARES · ACESSÓRIOS · GAMES</span>
            <span>★</span>
            <span>ASSISTÊNCIA TÉCNICA ESPECIALIZADA</span>
            <span>★</span>
            <span>CELULARES · ACESSÓRIOS · GAMES</span>
            <span>★</span>
            <span>ASSISTÊNCIA TÉCNICA ESPECIALIZADA</span>
            <span>★</span>
          </div>
        </div>

        {/* 3. LINKS DE NAVEGAÇÃO RÁPIDA & LOJAS */}
        <section className="p-5 space-y-3.5" aria-label="Links">
          {/* CTA 1: Comprar pelo WhatsApp */}
          <a
            href="https://wa.me/5567993174612?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Energy%20Stor3%20e%20quero%20saber%20os%20produtos%20e%20pre%C3%A7os."
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden flex items-center justify-between p-4 rounded-3xl bg-gradient-to-r from-[#ff5500] via-[#d9460f] to-[#9a3412] text-white shadow-xl shadow-orange-950/50 hover:scale-[1.01] transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <WhatsAppSvg className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Atendimento rápido
                </span>
                <b className="block text-base font-bold leading-tight">
                  Comprar pelo WhatsApp
                </b>
                <small className="text-orange-100 text-xs block mt-0.5">
                  Atendimento rápido · varejo e atacado
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/90 shrink-0" />
          </a>

          {/* CTA 2: Assistência Técnica */}
          <a
            href="https://wa.me/5567993174612?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Energy%20Stor3%20e%20quero%20um%20or%C3%A7amento%20de%20assist%C3%AAncia%20t%C3%A9cnica."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 dark:bg-[#141624] hover:bg-slate-100 dark:hover:bg-[#191c2e] border border-slate-200 dark:border-white/10 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff5500] to-[#b43400] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md shadow-orange-950/40">
                <WhatsAppSvg className="w-6 h-6" />
              </div>
              <div>
                <b className="block text-sm font-bold text-slate-900 dark:text-white">
                  Assistência técnica
                </b>
                <small className="text-slate-600 dark:text-slate-400 text-xs">
                  Orçamento de conserto pelo WhatsApp
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </a>

          {/* Lojas Físicas */}
          <div id="stores-links" className="space-y-3.5">
            {STORE_CONFIG.locations.map((loc) => (
              <a
                key={loc.name}
                href={loc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 dark:bg-[#141624] hover:bg-slate-100 dark:hover:bg-[#191c2e] border border-slate-200 dark:border-white/10 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ff5500] to-[#b43400] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md shadow-orange-950/40">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <b className="block text-sm font-bold text-slate-900 dark:text-white">
                      {loc.name}
                    </b>
                    <small className="text-slate-600 dark:text-slate-400 text-xs">
                      {loc.neighborhood}
                    </small>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
              </a>
            ))}
          </div>

          {/* CTA 3: Atacado e Varejo */}
          <a
            href="https://wa.me/5567993174612?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Energy%20Stor3%20e%20quero%20condi%C3%A7%C3%B5es%20de%20atacado%20e%20varejo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 dark:bg-[#141624] hover:bg-slate-100 dark:hover:bg-[#191c2e] border border-slate-200 dark:border-white/10 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff5500] to-[#b43400] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md shadow-orange-950/40">
                <WhatsAppSvg className="w-6 h-6" />
              </div>
              <div>
                <b className="block text-sm font-bold text-slate-900 dark:text-white">
                  Atacado e varejo
                </b>
                <small className="text-slate-600 dark:text-slate-400 text-xs">
                  Condições para revenda e para você
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </a>
        </section>

        {/* 4. SEÇÃO DE VÍDEO ("VEJA NA PRÁTICA") */}
        <section className="px-5 py-5 space-y-4">
          <SectionHeading title="Veja na prática" />

          <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-black shadow-xl aspect-[9/16] max-h-[540px] mx-auto">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/8jO83El71ow"
              title="Energy Stor3 Vídeo - Top 10 iPhones para 2026"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="text-center">
            <a
              href="https://www.youtube.com/watch?v=8jO83El71ow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition"
            >
              Assistir no YouTube
            </a>
          </div>
        </section>

        {/* 5. VITRINE DE PRODUTOS E SERVIÇOS (COTAÇÃO DIRETA) */}
        <section className="px-5 py-4 space-y-4">
          <SectionHeading
            title="Destaques e Serviços"
            subtitle="Toque em Verificar preço e fale com a gente pelo WhatsApp."
          />

          <div id="products-grid" className="grid grid-cols-2 gap-3.5">
            {STORE_CONFIG.highlights.map((item) => (
              <HighlightCard
                key={item.name}
                item={item}
                whatsappNumber={STORE_CONFIG.whatsappNumber}
              />
            ))}
          </div>
        </section>

        {/* 6. CATÁLOGO INTERATIVO ("NOSSOS PRODUTOS") */}
        <section id="catalogo" className="px-5 py-6 space-y-4">
          <SectionHeading
            title="Nossos Produtos"
            subtitle="Escolha os produtos, toque em Adicionar e envie o pedido pelo WhatsApp."
          />

          {/* Busca no catálogo */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar no catálogo"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-[#141624] border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          {/* Categorias em Círculos */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const active = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
                >
                  <div
                    className={`w-16 h-16 rounded-full p-0.5 transition ${
                      active
                        ? 'bg-gradient-to-tr from-[#ff5500] to-orange-400 shadow-md shadow-orange-500/30'
                        : 'bg-slate-200 dark:bg-white/15'
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-[#181b2c] flex items-center justify-center">
                      {cat.img ? (
                        <img
                          src={cat.img}
                          alt={cat.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <LayoutGrid
                          className={`w-6 h-6 ${
                            active
                              ? 'text-[#ff5500]'
                              : 'text-slate-500 dark:text-slate-300'
                          }`}
                        />
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-medium whitespace-nowrap ${
                      active
                        ? 'text-[#ff5500] font-bold'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Exibindo {filteredCatalog.length} produtos
          </div>

          {/* Grid de Produtos do Catálogo */}
          <div className="grid grid-cols-2 gap-3.5">
            {filteredCatalog.map((prod) => {
              const qtyInCart = cart[prod.id] || 0;
              return (
                <article
                  key={prod.id}
                  className="rounded-3xl bg-white dark:bg-[#12131f] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative bg-black">
                      {prod.badge && (
                        <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-[9px] uppercase tracking-wider shadow">
                          {prod.badge}
                        </span>
                      )}
                      <img
                        src={prod.img}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-40 object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3.5 space-y-1.5">
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {prod.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        {prod.desc}
                      </p>
                      {prod.badge && (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 text-[9px] font-bold uppercase tracking-wider">
                          {prod.badge}
                        </span>
                      )}
                      <div className="pt-1">
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                          R${' '}
                          {prod.price.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 tabular-nums">
                          {prod.installments}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 pt-0">
                    <button
                      type="button"
                      onClick={() => addToCart(prod.id)}
                      className="w-full py-2.5 px-3 text-center rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#ff5500] to-[#b43400] hover:from-[#ff661a] hover:to-[#c83e00] text-white shadow-md shadow-orange-950/40 transition cursor-pointer whitespace-nowrap"
                    >
                      {qtyInCart > 0
                        ? `Adicionado (${qtyInCart})`
                        : 'Adicionar'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 7. SOBRE + ESPECIALIDADES + FAQ */}
        <section className="px-5 py-5 space-y-4">
          <SectionHeading title="Sobre Energy Stor3" />
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Com quase 10 anos de atuação em São Paulo, a <b>Energy Stor3</b> é
            referência no Bom Retiro em celulares (iPhone e Android),
            acessórios, games e assistência técnica especializada. Atendemos no
            varejo e no atacado com agilidade e garantia.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
            Perguntas frequentes
          </h3>
          <div className="space-y-2 text-xs">
            <details className="bg-slate-50 dark:bg-[#141624] border border-slate-200 dark:border-white/10 rounded-2xl p-3.5">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                Onde ficam as lojas da Energy Stor3?
              </summary>
              <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Contamos com 3 unidades no Bom Retiro (São Paulo/SP): Rua José
                Paulino, 30 (Loja 01), Rua da Graça, 275 (Loja 02) e Rua Três
                Rios, 208 (Loja 03).
              </p>
            </details>
            <details className="bg-slate-50 dark:bg-[#141624] border border-slate-200 dark:border-white/10 rounded-2xl p-3.5">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                Como faço orçamento de assistência técnica?
              </summary>
              <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Basta tocar no botão &quot;Assistência técnica&quot; aqui no
                site e informar o modelo do aparelho e o defeito pelo WhatsApp.
              </p>
            </details>
            <details className="bg-slate-50 dark:bg-[#141624] border border-slate-200 dark:border-white/10 rounded-2xl p-3.5">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                Vocês vendem no atacado para revendedores?
              </summary>
              <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Sim! Temos tabela e condições especiais para lojistas e
                revendedores. Chame no botão &quot;Atacado e varejo&quot;.
              </p>
            </details>
          </div>
        </section>

        {/* 8. RODAPÉ COMPLETO CONFORME FOTO EM ANEXO */}
        <footer className="relative mt-6 px-5 pt-10 pb-28 text-center bg-slate-900 dark:bg-[#07070c] text-white border-t border-white/10 overflow-hidden">
          {/* Brilho radial sutil no topo direito */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-purple-700/20 blur-3xl" />

          <div className="relative z-10 space-y-5">
            {/* Logo Circular */}
            <EnergyStor3Logo size="md" />

            {/* Nome e Slogan */}
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-white">Energy Stor3</h2>
              <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                Eletrônicos, acessórios e assistência técnica. Quase 10 anos de
                mercado.
              </p>
            </div>

            {/* Card de Endereços das 3 Lojas */}
            <div className="space-y-3 text-left">
              <a
                href="https://maps.google.com/?cid=2634707571364447676"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#1a1c26]/90 hover:bg-[#222533] border border-white/10 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-slate-200 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-100 leading-relaxed">
                  Loja 01: Rua José Paulino, 30 · Loja 02: Rua da Graça, 275 ·
                  Loja 03: Rua Três Rios, 208 - Bom Retiro · São Paulo
                </span>
              </a>

              {/* Card de Telefone */}
              <a
                href="tel:+5567993174612"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#1a1c26]/90 hover:bg-[#222533] border border-white/10 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-slate-200 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-white tabular-nums">
                  +55 (67) 99317-4612
                </span>
              </a>
            </div>

            {/* Formas de Pagamento com Ícones */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-200 font-medium">
                <span className="inline-flex items-center gap-1">
                  <span className="text-slate-400">❖</span> Pix
                </span>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" /> Crédito
                </span>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" /> Débito
                </span>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center gap-1">
                  <Banknote className="w-3.5 h-3.5 text-slate-400" /> Dinheiro
                </span>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center gap-1">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />{' '}
                  Transf.
                </span>
              </div>

              {/* Faixa Parcelamento com linhas laterais */}
              <div className="flex items-center justify-center gap-3">
                <span className="h-px flex-1 bg-white/15" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300 whitespace-nowrap">
                  Parcelamos em até 12x no cartão
                </span>
                <span className="h-px flex-1 bg-white/15" />
              </div>
            </div>

            {/* Botões Instagram & Avaliar no Google */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-full bg-[#1a1c26] hover:bg-[#242736] border border-white/15 text-xs font-semibold text-white transition"
              >
                <span className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 flex items-center justify-center">
                  <Instagram className="w-3.5 h-3.5 text-white" />
                </span>
                <span>Instagram</span>
              </a>

              <a
                href={STORE_CONFIG.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#1a1c26] hover:bg-[#242736] border border-white/15 text-xs font-semibold text-white transition"
              >
                <Star className="w-4 h-4 text-slate-200" />
                <span>Avaliar no Google</span>
              </a>
            </div>

            {/* Linha Divisória */}
            <div className="border-t border-white/10 pt-5 space-y-4">
              {/* Ícones Sociais Circulares */}
              <div className="flex items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Energy%20Stor3%20e%20quero%20atendimento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-[#141622] hover:bg-[#1e2133] border border-white/15 flex items-center justify-center text-slate-200 transition"
                >
                  <WhatsAppSvg className="w-4 h-4" />
                </a>
                <a
                  href={STORE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-[#141622] hover:bg-[#1e2133] border border-white/15 flex items-center justify-center text-slate-200 transition"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

              {/* Créditos Nour Sistemas */}
              <div className="space-y-1 text-xs text-slate-400">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 text-slate-950 font-extrabold text-[10px] flex items-center justify-center">
                    J
                  </span>
                  <span>
                    Site criado por{' '}
                    <b className="text-slate-200">Jonathan da Nour Sistemas</b>
                  </span>
                </div>
                <p>
                  <a
                    href="mailto:biosite@noursistemas.com.br"
                    className="hover:text-white transition"
                  >
                    biosite@noursistemas.com.br
                  </a>
                </p>
                <p className="text-[11px] text-slate-400 pt-0.5">
                  Termos de uso e privacidade
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* MODAL DO PEDIDO / CARRINHO */}
      {isCartModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#141624] border border-slate-200 dark:border-white/15 p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#ff5500]" />
                Seu Pedido ({totalCartItems})
              </h3>
              <button
                type="button"
                onClick={() => setIsCartModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {totalCartItems === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 py-4 text-center">
                Toque em &quot;Adicionar&quot; nos produtos do catálogo para
                montar seu pedido.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {Object.entries(cart).map(([id, qty]) => {
                  const prod = STORE_CONFIG.catalogProducts.find(
                    (p) => p.id === id
                  );
                  if (!prod) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10"
                    >
                      <div className="pr-2">
                        <b className="text-xs text-slate-900 dark:text-white block">
                          {prod.name}
                        </b>
                        <span className="text-[11px] text-orange-500 font-semibold tabular-nums">
                          R${' '}
                          {(prod.price * qty).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => removeFromCart(id)}
                          className="w-7 h-7 rounded-full bg-slate-200 dark:bg-white/10 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold tabular-nums w-4 text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(id)}
                          className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <a
              href={cartWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 text-center rounded-full bg-gradient-to-r from-[#ff5500] to-[#b43400] text-white font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Enviar pedido pelo WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* 10. BOTÕES FLUTUANTES (CATÁLOGO + WHATSAPP) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center bg-white/95 dark:bg-white/95 p-1 rounded-full shadow-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => {
            if (totalCartItems > 0) {
              setIsCartModalOpen(true);
            } else {
              document
                .getElementById('catalogo')
                ?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          aria-label="Ir para o catálogo"
          className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#ff5500] to-[#7c2d12] text-white flex items-center justify-center transition hover:scale-105 cursor-pointer"
        >
          <LayoutGrid className="w-5 h-5" />
          {totalCartItems > 0 && (
            <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </button>

        <a
          href="https://wa.me/5567993174612?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Energy%20Stor3%20e%20quero%20atendimento."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chamar no WhatsApp"
          className="ml-1 w-12 h-12 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white flex items-center justify-center shadow-lg transition hover:scale-105"
        >
          <WhatsAppSvg className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
