"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ShoppingBag, X, Plus, Minus, Eye, Check, Star, Mail, ArrowRight,
  Trash2, ChevronDown, Zap, Shield, Target, Flame,
  Search, Heart, Menu, TrendingUp, Package, Truck, ExternalLink,
  Link, MessageCircle, ChevronRight, Filter, ChevronUp,
  Award, Sparkles, Quote, Camera, Verified, CreditCard, RefreshCcw
} from 'lucide-react';

// ============================================================
// INTERFACES
// ============================================================
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  sizes: string[];
  description: string;
  badge?: string;
  rating: number;
  sold: number;
  colors?: string[];
  isNew?: boolean;
  discount?: number;
}

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

// ============================================================
// PRODUCTS DATA
// ============================================================
const products: Product[] = [
  {
    id: "p1",
    name: "New Balance 530 White Black",
    price: 1399000,
    originalPrice: 1799000,
    category: "hoodies",
    image: "/nb.jpg",
    sizes: ["S", "M", "L", "XL"],
    description: "Hoodie premium dengan bahan Heavy Cotton Fleece 375 gsm. Sablon discharge dengan grafis vektor detail tinggi bertema Hellfire. Didesain oversize dengan double-lined hood yang kokoh, nyaman, dan tahan lama untuk gaya jalanan harian.",
    badge: "BEST SELLER",
    rating: 5.0,
    sold: 312,
    colors: ["#1a1a1a", "#2d1515", "#15152d"],
    discount: 15,
  },
  {
    id: "p2",
    name: "Kappa Black",
    price: 249000,
    category: "jacket",
    image: "/kappa.png",
    sizes: ["S", "M", "L", "XL"],
    description: "Pacarmu kopros",
    badge: "LIMITED DROP",
    rating: 4.8,
    sold: 198,
    colors: ["#f5f5f5", "#1a1a1a", "#c0a060"],
    isNew: true,
  },
  {
    id: "p3",
    name: "Stone Island Black Navy",
    price: 699000,
    originalPrice: 799000,
    category: "jackets",
    image: "/si.png",
    sizes: ["M", "L", "XL"],
    description: "Varsity jacket premium dengan paduan bahan Wool premium pada badan dan kulit sintetis berkualitas tinggi pada lengan. Bordir chenille patch bergaya gothic.",
    badge: "EXCLUSIVE",
    rating: 4.9,
    sold: 87,
    colors: ["#1a1215", "#0d1a0d"],
    discount: 13,
  },
  {
    id: "p4",
    name: "Adidas Spezial KRIUKK",
    price: 129000,
    category: "accessories",
    image: "/spzl.jpg",
    sizes: ["One Size"],
    description: "Tote bag kanvas premium dengan ketahanan ekstra, zipper YKK kokoh, kompartemen laptop 14 inch, dan sablon grafis reflektif 3M.",
    badge: "NEW ARRIVAL",
    rating: 4.7,
    sold: 145,
    isNew: true,
  },
    {
    id: "p5",
    name: "CP Company Black",
    price: 129000,
    category: "accessories",
    image: "/cp.png",
    sizes: ["One Size"],
    description: "Tote bag kanvas premium dengan ketahanan ekstra, zipper YKK kokoh, kompartemen laptop 14 inch, dan sablon grafis reflektif 3M.",
    badge: "NEW ARRIVAL",
    rating: 4.7,
    sold: 145,
    isNew: true,
  },
    {
    id: "p6",
    name: "Adidas Spezial KRIUKK",
    price: 129000,
    category: "accessories",
    image: "/spzl.jpg",
    sizes: ["One Size"],
    description: "Tote bag kanvas premium dengan ketahanan ekstra, zipper YKK kokoh, kompartemen laptop 14 inch, dan sablon grafis reflektif 3M.",
    badge: "NEW ARRIVAL",
    rating: 4.7,
    sold: 145,
    isNew: true,
  },
    {
    id: "p7",
    name: "Adidas Spezial KRIUKK",
    price: 129000,
    category: "accessories",
    image: "/spzl.jpg",
    sizes: ["One Size"],
    description: "Tote bag kanvas premium dengan ketahanan ekstra, zipper YKK kokoh, kompartemen laptop 14 inch, dan sablon grafis reflektif 3M.",
    badge: "NEW ARRIVAL",
    rating: 4.7,
    sold: 145,
    isNew: true,
  },
    {
    id: "p8",
    name: "Adidas Spezial KRIUKK",
    price: 129000,
    category: "accessories",
    image: "/spzl.jpg",
    sizes: ["One Size"],
    description: "Tote bag kanvas premium dengan ketahanan ekstra, zipper YKK kokoh, kompartemen laptop 14 inch, dan sablon grafis reflektif 3M.",
    badge: "NEW ARRIVAL",
    rating: 4.7,
    sold: 145,
    isNew: true,
  },
    {
    id: "p9",
    name: "Adidas Spezial KRIUKK",
    price: 129000,
    category: "accessories",
    image: "/spzl.jpg",
    sizes: ["One Size"],
    description: "Tote bag kanvas premium dengan ketahanan ekstra, zipper YKK kokoh, kompartemen laptop 14 inch, dan sablon grafis reflektif 3M.",
    badge: "NEW ARRIVAL",
    rating: 4.7,
    sold: 145,
    isNew: true,
  },
    {
    id: "p10",
    name: "Adidas Spezial KRIUKK",
    price: 129000,
    category: "accessories",
    image: "/spzl.jpg",
    sizes: ["One Size"],
    description: "Tote bag kanvas premium dengan ketahanan ekstra, zipper YKK kokoh, kompartemen laptop 14 inch, dan sablon grafis reflektif 3M.",
    badge: "NEW ARRIVAL",
    rating: 4.7,
    sold: 145,
    isNew: true,
  },  
    {
    id: "p11",
    name: "Adidas Spezial KRIUKK",
    price: 129000,
    category: "accessories",
    image: "/spzl.jpg",
    sizes: ["One Size"],
    description: "Tote bag kanvas premium dengan ketahanan ekstra, zipper YKK kokoh, kompartemen laptop 14 inch, dan sablon grafis reflektif 3M.",
    badge: "NEW ARRIVAL",
    rating: 4.7,
    sold: 145,
    isNew: true,
  },
    {
    id: "p12",
    name: "Adidas Spezial KRIUKK",
    price: 129000,
    category: "accessories",
    image: "/spzl.jpg",
    sizes: ["One Size"],
    description: "Tote bag kanvas premium dengan ketahanan ekstra, zipper YKK kokoh, kompartemen laptop 14 inch, dan sablon grafis reflektif 3M.",
    badge: "NEW ARRIVAL",
    rating: 4.7,
    sold: 145,
    isNew: true,
  },
];

// ============================================================
// ORDER CHANNELS — no backend, order langsung via WhatsApp / Shopee
// ============================================================
// TODO: Ganti dengan nomor WhatsApp bisnis asli.
// Format: kode negara TANPA "+" atau "0" di depan, contoh Indonesia -> 62812xxxxxxx
const WHATSAPP_NUMBER = "6281234567890";
// TODO: Ganti dengan URL halaman toko Shopee asli.
const SHOPEE_STORE_URL = "https://shopee.co.id/youthpulse.clo";

const categories = [
  { key: "all", label: "Semua", icon: <TrendingUp size={13} /> },
  { key: "hoodies", label: "Hoodies", icon: <Flame size={13} /> },
  { key: "tshirts", label: "T-Shirts", icon: <Package size={13} /> },
  { key: "jackets", label: "Jackets", icon: <Shield size={13} /> },
  { key: "accessories", label: "Accessories", icon: <Zap size={13} /> },
];

const testimonials = [
  {
    name: "Rizky Pratama",
    role: "Streetwear Enthusiast",
    text: "Hoodie Hellfire-nya gila sih. Bahan fleece-nya tebel banget, sablon nggak luntur meski udah dicuci berkali-kali. Worth every rupiah!",
    rating: 5,
    avatar: "RP",
    color: "#c88a3e",
  },
  {
    name: "Aisha Maharani",
    role: "Fashion Content Creator",
    text: "Desainnya beneran original dan standout. Setiap kali pakai varsity jacket dari YouthPulse, pasti ditanya \"beli dimana?\". Quality-nya premium banget.",
    rating: 5,
    avatar: "AM",
    color: "#9aa5b1",
  },
  {
    name: "Dimas Ardiansyah",
    role: "Urban Culture Blogger",
    text: "Baru pertama kali nemu brand lokal yang konsepnya sekuat ini. Packaging-nya rapi, materialnya juara, dan desain vektornya tajam. Langsung repeat order!",
    rating: 5,
    avatar: "DA",
    color: "#8f5a22",
  },
];

// ============================================================
// HELPERS
// ============================================================
const formatPrice = (p: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

function buildWhatsappOrderUrl(items: CartItem[], total: number, phone: string) {
  const lines = items.map(
    (item, idx) =>
      `${idx + 1}. ${item.product.name} (Size: ${item.size}) x${item.quantity} — ${formatPrice(item.product.price * item.quantity)}`
  );
  const message = [
    "Halo YouthPulse.clo! Saya mau order:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "Mohon info ketersediaan stok & cara pembayarannya ya. Terima kasih!",
  ].join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function StarRating({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={size}
          className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-zinc-700 text-zinc-700"} />
      ))}
      <span className="text-[10px] text-zinc-400 font-semibold ml-1">{rating}</span>
    </div>
  );
}

// ============================================================
// SCROLL REVEAL HOOK
// ============================================================
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, revealed };
}

// ============================================================
// COUNTER ANIMATION HOOK
// ============================================================
function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return value;
}

// ============================================================
// PARTICLES COMPONENT
// ============================================================
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${12 + Math.random() * 18}s`,
      size: 1.5 + Math.random() * 2.5,
      startY: `${70 + Math.random() * 30}vh`,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <div key={p.id} className="particle"
          style={{
            left: p.left,
            top: p.startY,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }} />
      ))}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function YouthPulsePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quickViewQty, setQuickViewQty] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 0, minutes: 0, seconds: 0 });
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Scroll reveal refs
  const catalogReveal = useScrollReveal(0.1);
  const lookbookReveal = useScrollReveal(0.15);
  const lookbookImgReveal = useScrollReveal(0.15);
  const valuesReveal = useScrollReveal(0.1);
  const testimonialReveal = useScrollReveal(0.1);
  const newsletterReveal = useScrollReveal(0.15);
  const statsReveal = useScrollReveal(0.4);

  // Counter animations
  const customerCount = useCountUp(2500, 2000, statsReveal.revealed);
  const ratingCount = useCountUp(49, 1600, statsReveal.revealed);

  // Countdown
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 14);
    const timer = setInterval(() => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll
  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Cursor glow on hero
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  // Cart
  const totalItems = cart.reduce((a, i) => a + i.quantity, 0);
  const totalPrice = cart.reduce((a, i) => a + i.product.price * i.quantity, 0);

  const addToCart = (product: Product, size: string, qty = 1) => {
    const s = size || product.sizes[0];
    const idx = cart.findIndex(i => i.product.id === product.id && i.size === s);
    if (idx > -1) {
      const u = [...cart]; u[idx].quantity += qty; setCart(u);
    } else {
      setCart([...cart, { product, size: s, quantity: qty }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) =>
    setCart(cart.filter(i => !(i.product.id === id && i.size === size)));

  const updateQty = (id: string, size: string, d: number) =>
    setCart(cart.map(i =>
      i.product.id === id && i.size === size
        ? { ...i, quantity: Math.max(1, i.quantity + d) } : i));

  const handleCheckout = () => {
    setIsCheckoutLoading(true);
    const waUrl = buildWhatsappOrderUrl(cart, totalPrice, WHATSAPP_NUMBER);
    setTimeout(() => {
      setIsCheckoutLoading(false);
      setIsCheckoutSuccess(true);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 900);
  };

  const resetCart = () => { setCart([]); setIsCheckoutSuccess(false); setIsCartOpen(false); };

  const openQuickView = (p: Product) => {
    setSelectedProduct(p);
    setSelectedSize(p.sizes[0]);
    setQuickViewQty(1);
  };

  const toggleWishlist = (id: string) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const filtered = (activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory))
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const featuredProduct = products[0];

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-x-hidden selection:bg-amber-600/40 selection:text-white bg-grid-pattern"
      onMouseMove={handleMouseMove}>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Cursor Glow */}
      <div className="cursor-glow hidden lg:block"
        style={{ left: mousePos.x, top: mousePos.y, opacity: mousePos.x > 0 ? 0.7 : 0 }} />

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(200, 138, 62,0.1) 0%, transparent 70%)', top: '-8%', left: '-5%', transform: `translateY(${scrollY * 0.08}px)` }} />
        <div className="absolute w-[400px] h-[400px] rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(154, 165, 177,0.09) 0%, transparent 70%)', top: '40%', right: '-8%', animationDelay: '-5s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(232, 193, 121,0.06) 0%, transparent 70%)', bottom: '5%', left: '25%', animationDelay: '-10s' }} />
      </div>

      {/* ================================================
          TICKER
      ================================================ */}
      <div className="ticker-bg text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase overflow-hidden py-2.5 select-none relative z-50">
        <div className="animate-marquee whitespace-nowrap flex gap-16">
          {["✦ FREE SHIPPING ORDERS ABOVE RP 500K", "✦ DROP 02 · APOCALYPTIC VECTOR · 14 HARI LAGI", "✦ YOUTHPULSE.CLO · PREMIUM STREETWEAR INDONESIA", "✦ COD TERSEDIA · PEMBAYARAN AMAN & TERENKRIPSI", "✦ FREE SHIPPING ORDERS ABOVE RP 500K", "✦ DROP 02 · APOCALYPTIC VECTOR · 14 HARI LAGI"].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* ================================================
          NAVBAR
      ================================================ */}
      <nav className="sticky top-0 z-40 transition-all duration-500"
        style={{
          background: scrollY > 30 ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(28px) saturate(180%)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          boxShadow: scrollY > 30 ? '0 4px 40px rgba(0,0,0,0.04)' : 'none',
        }}>

        {/* Top row: Logo + Search + Icons */}
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer flex-shrink-0 group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="YouthPulse Logo"
          className="h-28 w-28 object-contain transition-transform duration-300 group-hover:scale-110"
        />
        <div className="leading-none">
          <div className="font-display text-[17px] font-black tracking-tighter">
            YOUTH<span className="text-gradient-rose">PULSE</span><span className="text-zinc-400 text-sm"></span>
          </div>
        </div>
      </div>

          {/* Category nav (desktop) */}
          <ul className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {categories.map(({ key, label }) => (
              <li key={key}>
                <button
                  onClick={() => { setActiveCategory(key); document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 rounded-none relative group ${activeCategory === key ? 'text-[var(--foreground)]' : 'text-zinc-500 hover:text-[var(--foreground)]'}`}>
                  {label}
                  <span className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
                    style={{ background: activeCategory === key ? 'linear-gradient(90deg,#c88a3e,#8f5a22)' : 'transparent' }} />
                </button>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 px-3 py-2 border border-amber-500/30" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <Search size={14} className="text-zinc-400 flex-shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Cari produk..."
                    className="bg-transparent text-xs text-[var(--foreground)] placeholder-zinc-400 outline-none w-36"
                    onBlur={() => { if (!searchQuery) setIsSearchOpen(false); }}
                    onKeyDown={e => { if (e.key === 'Escape') { setIsSearchOpen(false); setSearchQuery(''); } }}
                  />
                  <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="text-zinc-400 hover:text-zinc-950 transition-colors duration-300 cursor-pointer">
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setIsSearchOpen(true); setTimeout(() => searchRef.current?.focus(), 100); }}
                  className="w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-300 text-zinc-500 hover:text-amber-500 hover:bg-zinc-100 hover:border-zinc-300"
                  style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}
                  aria-label="Search">
                  <Search size={15} className="text-inherit" />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => { }}
              className={`relative w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-zinc-100 hover:border-zinc-300 ${wishlist.length > 0 ? 'text-amber-500' : 'text-zinc-500 hover:text-amber-500'}`}
              style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}
              aria-label="Wishlist">
              <Heart size={15} className={wishlist.length > 0 ? "fill-current" : "text-inherit"} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-[9px] font-black text-white rounded-full"
                  style={{ background: 'linear-gradient(135deg,#c88a3e,#8f5a22)' }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 h-9 cursor-pointer transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg,#c88a3e,#8f5a22)',
                border: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              aria-label="Cart">
              <ShoppingBag size={14} className="text-white" />
              <span className="text-[11px] font-black text-white hidden sm:block">
                {totalItems > 0 ? `${totalItems} Item` : 'Keranjang'}
              </span>
              {totalItems > 0 && (
                <span className="hidden sm:flex min-w-5 h-5 items-center justify-center text-[10px] font-black text-amber-700 rounded-full px-1" style={{ background: 'rgba(255,255,255,0.9)' }}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 lg:hidden flex items-center justify-center cursor-pointer transition-all duration-300 text-zinc-500 hover:text-amber-500 hover:bg-zinc-100 hover:border-zinc-300"
              style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}
              aria-label="Menu">
              <Menu size={15} className="text-inherit" />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-5 pb-4 pt-2" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="flex flex-wrap gap-2">
              {categories.map(({ key, label, icon }) => (
                <button key={key} onClick={() => { setActiveCategory(key); setIsMobileMenuOpen(false); document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all"
                  style={{
                    background: activeCategory === key ? 'linear-gradient(135deg,#c88a3e,#8f5a22)' : 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    color: activeCategory === key ? 'white' : 'var(--foreground)',
                  }}>
                  {icon}{label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ================================================
          HERO SECTION — Store Style
      ================================================ */}
      <section ref={heroRef} className="relative z-10 overflow-hidden" style={{ minHeight: '88vh' }}>

        {/* Hero grid */}
        <div className="max-w-7xl mx-auto px-5 pt-8 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-[80vh]">

          {/* LEFT: Brand copy + CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center py-10 lg:py-16 pr-0 lg:pr-10 order-2 lg:order-1 min-w-0">

            {/* Brand badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 self-start"
              style={{ background: 'rgba(200, 138, 62,0.08)', border: '1px solid rgba(200, 138, 62,0.22)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[9px] font-label tracking-[0.3em] text-amber-400 uppercase">EST. 2026 · NEW DROP LIVE</span>
            </div>

            <h1
  className="font-display font-black uppercase leading-[0.9] tracking-tight mb-4"
  style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)' }}
>
  <span className="block text-[var(--foreground)]">Premium</span>
  <span className="block text-gradient-hero">Original</span>
  <span className="block text-[var(--foreground)]">100%</span>
</h1>

            <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-8 max-w-md font-light">
              Koleksi eksklusif untuk jiwa yang berani tampil beda. Material premium pilihan, desain vektor presisi tinggi, dan edisi terbatas yang membuatmu tampil unik.
            </p>

            {/* Quick stats — animated counter */}
            <div ref={statsReveal.ref}
              className={`flex gap-6 mb-8 pb-8 scroll-reveal ${statsReveal.revealed ? 'revealed' : ''}`}
              style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', animationDelay: '0.1s' }}>
              {[
                { val: `${(customerCount / 1000).toFixed(1)}K+`, lbl: 'Customer' },
                { val: `${(ratingCount / 10).toFixed(1)}★`, lbl: 'Rating' },
                { val: '100%', lbl: 'Premium' }
              ].map(({ val, lbl }) => (
                <div key={lbl}>
                  <div className="text-xl font-black text-gradient-gold">{val}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{lbl}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#katalog"
                className="btn-primary px-8 py-4 text-xs font-black tracking-widest flex items-center justify-center gap-2.5"
                style={{ clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
                Belanja Sekarang <ArrowRight size={14} />
              </a>
              <button
                onClick={() => openQuickView(featuredProduct)}
                className="btn-ghost px-8 py-4 text-xs font-black tracking-widest flex items-center justify-center gap-2.5"
                style={{ clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
                <Eye size={14} /> Preview Produk
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { icon: <Truck size={12} />, text: 'Free Ongkir > 500K' },
                { icon: <Shield size={12} />, text: 'Material Garansi' },
                { icon: <Package size={12} />, text: 'Stok Terbatas' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-500">
                  <span className="text-amber-500">{icon}</span> {text}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Featured product showcase */}
          <div className="lg:col-span-7 relative order-1 lg:order-2 overflow-hidden rounded-[2rem]"
            style={{ boxShadow: '0 20px 60px -20px rgba(0,0,0,0.2)' }}>

            {/* Gambar full-bleed sebagai background panel */}
            <div className="absolute inset-0">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover"
                style={{
                  // Fade tepi kiri & atas biar foto meleleh ke background, bukan kotak keras
                  maskImage: 'linear-gradient(to right, transparent 0%, black 12%)',
                  WebkitMaskImage: '-webkit-linear-gradient(left, transparent 0%, black 12%)',
                }}
              />
              {/* Tint warna brand tipis biar foto (abu-abu studio) menyatu ke palet cream/bronze, bukan terasa "foto asing" */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(135deg, rgba(200,138,62,0.22) 0%, rgba(143,90,34,0.06) 45%, transparent 75%)',
                mixBlendMode: 'multiply',
              }} />
              {/* Vignette lembut di tepi kiri, biar transisi ke sisi teks lebih halus */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(to right, var(--background) 0%, transparent 12%)',
              }} />
              {/* Overlay gradient biar teks/badge tetap kebaca */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 35%, transparent 60%)'
              }} />
            </div>

            {/* Konten di atas gambar (badge, harga, info produk) */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-6" style={{ minHeight: '80vh' }}>
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-label tracking-[0.2em] px-3 py-1.5 uppercase text-white rounded-full shadow-md animate-glow-pulse"
                    style={{ background: 'linear-gradient(90deg,#c88a3e,#8f5a22)' }}>
                    🔥 BEST SELLER
                  </span>
                  <span className="text-[9px] font-label tracking-[0.2em] px-3 py-1.5 uppercase rounded-full shadow-md text-white"
                    style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                    ONLY {featuredProduct.sold}+ SOLD
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/70 line-through">{featuredProduct.originalPrice && formatPrice(featuredProduct.originalPrice)}</div>
                  <div className="text-2xl font-black text-white">{formatPrice(featuredProduct.price)}</div>
                  <div className="inline-block text-[9px] font-black text-white px-2 py-0.5 mt-1 rounded-full"
                    style={{ background: 'rgba(200, 138, 62,0.9)' }}>
                    HEMAT {featuredProduct.discount}%
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-[9px] font-label uppercase tracking-[0.2em] text-amber-300 mb-1">Featured Drop 01</div>
                  <h3 className="font-display text-lg md:text-xl font-black uppercase tracking-tight text-white leading-tight">
                    {featuredProduct.name}
                  </h3>
                  <StarRating rating={featuredProduct.rating} />
                </div>
                <button
                  onClick={() => addToCart(featuredProduct, featuredProduct.sizes[0])}
                  className="btn-primary flex-shrink-0 px-5 py-3 text-[10px] font-black tracking-widest flex items-center gap-2 cursor-pointer whitespace-nowrap">
                  <ShoppingBag size={13} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 animate-float z-10 pointer-events-none">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-500">Scroll</span>
          <ChevronDown size={13} className="text-zinc-500" />
        </div>
      </section>

      {/* ================================================
          TRUST STRIP — Marquee
      ================================================ */}
      <section className="trust-strip py-5 z-10 relative overflow-hidden">
        <div className="trust-marquee whitespace-nowrap flex items-center gap-14">
          {[
            { icon: <Verified size={14} />, text: 'ORIGINAL 100%' },
            { icon: <CreditCard size={14} />, text: 'SECURE PAYMENT' },
            { icon: <Truck size={14} />, text: 'FREE SHIPPING >500K' },
            { icon: <RefreshCcw size={14} />, text: 'EASY RETURN 7 HARI' },
            { icon: <Shield size={14} />, text: 'GARANSI MATERIAL' },
            { icon: <Award size={14} />, text: 'PREMIUM QUALITY' },
            { icon: <Verified size={14} />, text: 'ORIGINAL 100%' },
            { icon: <CreditCard size={14} />, text: 'SECURE PAYMENT' },
            { icon: <Truck size={14} />, text: 'FREE SHIPPING >500K' },
            { icon: <RefreshCcw size={14} />, text: 'EASY RETURN 7 HARI' },
            { icon: <Shield size={14} />, text: 'GARANSI MATERIAL' },
            { icon: <Award size={14} />, text: 'PREMIUM QUALITY' },
          ].map(({ icon, text }, i) => (
            <div key={i} className="flex items-center gap-2.5 flex-shrink-0 select-none">
              <span className="text-zinc-700">{icon}</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================
          MINI BANNER STRIP — Flash countdown
      ================================================ */}
      <section className="relative z-10 py-8 px-5" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(247,245,240,0.85)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Flame size={20} className="text-amber-500 animate-pulse" />
            <div>
              <div className="text-[10px] font-label uppercase tracking-[0.25em] text-amber-500">DROP 02 · APOCALYPTIC VECTOR</div>
              <div className="text-sm font-bold text-[var(--foreground)]">Hanya tersedia untuk member terdaftar</div>
            </div>
          </div>
          <div className="flex gap-3 select-none">
            {[
              { val: timeLeft.days, lbl: 'Hari' },
              { val: timeLeft.hours, lbl: 'Jam' },
              { val: timeLeft.minutes, lbl: 'Menit' },
              { val: timeLeft.seconds, lbl: 'Detik', accent: true },
            ].map(({ val, lbl, accent }) => (
              <div key={lbl} className="glass-card flex flex-col items-center w-16 py-3"
                style={accent ? { borderColor: 'rgba(200, 138, 62,0.3)', boxShadow: '0 0 16px rgba(200, 138, 62,0.08)' } : {}}>
                <span className={`text-xl font-black tabular-nums ${accent ? 'text-gradient-rose' : 'text-[var(--foreground)]'}`}>
                  {String(val).padStart(2, '0')}
                </span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 mt-0.5">{lbl}</span>
              </div>
            ))}
          </div>
          <a href="#newsletter" className="btn-primary px-6 py-3 text-[10px] font-black tracking-widest flex items-center gap-2 whitespace-nowrap cursor-pointer">
            Daftar Early Access <ArrowRight size={13} />
          </a>
        </div>
      </section>

      {/* ================================================
          CATALOG — Product Grid
      ================================================ */}
      <section id="katalog" className="py-20 px-5 max-w-7xl mx-auto scroll-mt-20 z-10 relative">

        {/* Section header with scroll reveal */}
        <div ref={catalogReveal.ref}
          className={`flex flex-col md:flex-row md:items-center justify-between mb-10 gap-5 scroll-reveal ${catalogReveal.revealed ? 'revealed' : ''}`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-px" style={{ background: 'linear-gradient(90deg,#c88a3e,transparent)' }} />
              <span className="text-[9px] font-label uppercase tracking-[0.3em] text-amber-500">STOK TERSEDIA</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight">
              FORSALE <span className="text-gradient-fire">· Live Now</span>
            </h2>
            <p className="text-zinc-500 text-xs mt-1">{filtered.length} produk ditemukan{searchQuery && ` untuk "${searchQuery}"`}</p>
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 mr-2 text-zinc-400">
              <Filter size={12} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Filter:</span>
            </div>
            {categories.map(({ key, label, icon }) => (
              <button key={key} onClick={() => setActiveCategory(key)}
                className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all duration-300"
                style={{
                  background: activeCategory === key ? 'linear-gradient(135deg,#c88a3e,#8f5a22)' : 'rgba(0,0,0,0.03)',
                  border: '1px solid ' + (activeCategory === key ? 'transparent' : 'rgba(0,0,0,0.06)'),
                  color: activeCategory === key ? 'white' : 'rgba(115,115,125,1)',
                  boxShadow: activeCategory === key ? '0 4px 20px rgba(200, 138, 62,0.15)' : 'none',
                }}>
                {icon}{label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-400 font-bold text-sm">Produk tidak ditemukan</p>
            <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} className="mt-4 text-xs text-amber-500 font-bold hover:underline cursor-pointer">Reset filter</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <div key={product.id}
                className="glass-card shimmer-hover group flex flex-col overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{ animationDelay: `${i * 0.07}s` }}>

                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden" style={{ background: 'linear-gradient(135deg,#fbfaf7,#f4f3ef)' }}>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {product.badge && (
                      <span className="text-[8px] font-label tracking-[0.18em] px-2.5 py-1.5 uppercase text-white"
                        style={{ background: product.isNew ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(90deg,#c88a3e,#8f5a22)' }}>
                        {product.badge}
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-[8px] font-black tracking-wider px-2 py-1 text-white" style={{ background: 'rgba(154, 165, 177,0.85)' }}>
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.05)' }}
                    aria-label="Wishlist">
                    <Heart size={13}
                      className={wishlist.includes(product.id) ? "fill-amber-500 text-amber-500" : "text-zinc-400"} />
                  </button>

                  {/* Sold count */}
                  <div className="absolute top-12 right-3 z-10 glass-dark px-2 py-1 border border-black/5">
                    <span className="text-[9px] font-bold text-zinc-500">{product.sold} terjual</span>
                  </div>

                  {/* Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 ease-out"
                    style={{
                      transform: hoveredProduct === product.id ? 'scale(1.09)' : 'scale(1)',
                      filter: hoveredProduct === product.id ? 'brightness(0.85)' : 'brightness(0.95)',
                    }} />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end gap-2 p-4 transition-all duration-400"
                    style={{
                      background: 'linear-gradient(to top,rgba(255,255,255,0.95) 0%,rgba(255,255,255,0.3) 55%,transparent)',
                      opacity: hoveredProduct === product.id ? 1 : 0,
                    }}>
                    <button onClick={() => openQuickView(product)}
                      className="w-full py-2.5 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all glass-dark text-[var(--foreground)] hover:bg-white hover:text-amber-700 hover:border-amber-500/30"
                      style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                      <Eye size={12} /> Quick View
                    </button>
                    <button onClick={() => addToCart(product, product.sizes[0])}
                      className="btn-primary w-full py-2.5 text-[10px] tracking-widest flex items-center justify-center gap-2 cursor-pointer">
                      <ShoppingBag size={12} /> Tambah ke Keranjang
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col gap-2 flex-grow" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-label uppercase tracking-[0.18em] text-zinc-400">{product.category}</span>
                    <StarRating rating={product.rating} size={9} />
                  </div>

                  <h4 className="font-extrabold text-[13px] leading-tight text-[var(--foreground)] group-hover:text-amber-700 transition-colors duration-300">
                    {product.name}
                  </h4>

                  {/* Size chips */}
                  <div className="flex gap-1 flex-wrap">
                    {product.sizes.slice(0, 4).map(s => (
                      <span key={s} className="text-[8px] font-bold px-1.5 py-0.5 text-zinc-500 border border-zinc-200 uppercase">{s}</span>
                    ))}
                  </div>

                  <div className="flex items-end justify-between mt-auto pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div>
                      <div className="font-black text-sm text-[var(--foreground)]">{formatPrice(product.price)}</div>
                      {product.originalPrice && (
                        <div className="text-[10px] text-zinc-400 line-through">{formatPrice(product.originalPrice)}</div>
                      )}
                    </div>
                    {/* Mobile add to cart */}
                    <div className="flex gap-1.5 md:hidden">
                      <button onClick={() => openQuickView(product)} className="p-2 glass-dark border border-black/5 cursor-pointer text-zinc-700">
                        <Eye size={12} className="text-zinc-500" />
                      </button>
                      <button onClick={() => addToCart(product, product.sizes[0])} className="p-2 btn-primary cursor-pointer">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================================================
          LOOKBOOK BANNER
      ================================================ */}
      <section id="lookbook" className="relative py-20 z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg,#fbfaf7 0%,#f5f3ef 50%,#fbfaf7 100%)' }}>
        <div className="divider-gradient" />
        <div className="max-w-7xl mx-auto px-5 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={lookbookReveal.ref}
            className={`order-2 lg:order-1 scroll-reveal-left ${lookbookReveal.revealed ? 'revealed' : ''}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px" style={{ background: 'linear-gradient(90deg,#c88a3e,transparent)' }} />
              <span className="text-[9px] font-label uppercase tracking-[0.3em] text-amber-500">LIFESTYLE LOOKBOOK</span>
            </div>
            <h3 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight mb-5 leading-[1.0] text-[var(--foreground)]">
              GUARANTE 100%<br /><span className="text-gradient-fire">ORIGINAL</span><br />KRIUK.
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed mb-7 max-w-lg font-light">
              Pakaian adalah medium ekspresi diri. Kami merekam distorsi perkotaan dan menyerap energi dinamis jalanan untuk diterjemahkan ke dalam kain bertekstur dan desain kontras yang berbicara keras.
            </p>
            <a href="#katalog"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-xs font-black tracking-widest cursor-pointer"
              style={{ clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
              Cek Stok? WhatsApp <ArrowRight size={14} />
            </a>
          </div>
          <div ref={lookbookImgReveal.ref}
            className={`order-1 lg:order-2 relative group scroll-reveal-right ${lookbookImgReveal.revealed ? 'revealed' : ''}`}>
            <div className="absolute inset-0 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none"
              style={{ border: '1px solid rgba(200, 138, 62,0.18)', top: '14px', left: '14px', right: '-14px', bottom: '-14px' }} />
            <div className="relative overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.06)', aspectRatio: '16/10' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/spzl.jpg" alt="YouthPulse Lookbook"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'saturate(0.7) contrast(1.1)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 60%)' }} />
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                <div>
                  <div className="text-[8px] font-label uppercase tracking-[0.2em] text-amber-400 mb-1">Featured</div>
                  <div className="font-extrabold text-sm text-white uppercase">Pulse Mechanical Balaclava</div>
                </div>
                <button onClick={() => document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-9 h-9 flex items-center justify-center cursor-pointer"
                  style={{ background: 'linear-gradient(135deg,#c88a3e,#8f5a22)' }}>
                  <ExternalLink size={14} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="divider-gradient mt-16" />
      </section>

      {/* ================================================
          BRAND VALUES
      ================================================ */}
      <section id="filosofi" className="py-20 px-5 max-w-7xl mx-auto z-10 relative">
        <div ref={valuesReveal.ref}
          className={`text-center mb-12 scroll-reveal ${valuesReveal.revealed ? 'revealed' : ''}`}>
          <span className="text-[9px] font-label uppercase tracking-[0.3em] text-amber-500 block mb-3">FILOSOFI KUALITAS</span>
          <h3 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">
            Mengapa KRIUK <span className="text-gradient-hero">YOUTHPULSE</span>?
          </h3>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 stagger-children ${valuesReveal.revealed ? 'revealed' : ''}`}>
          {[
            { icon: <Zap size={24} className="text-amber-500" />, title: 'Desain Vektor Presisi', desc: 'Grafis HD/4K ultra sharp — sablon plastisol premium yang tidak pernah blur bahkan setelah ratusan kali cuci.', glow: 'rgba(232, 193, 121,0.08)', border: 'rgba(232, 193, 121,0.15)' },
            { icon: <Shield size={24} className="text-slate-500" />, title: 'Material Tangguh', desc: 'Cotton Combed 24s hingga Heavy Fleece 375gsm — dipilih secara ketat untuk kenyamanan dan ketahanan jangka panjang.', glow: 'rgba(154, 165, 177,0.08)', border: 'rgba(154, 165, 177,0.15)' },
            { icon: <Target size={24} className="text-amber-500" />, title: 'Edisi Terbatas', desc: 'Setiap desain diproduksi dalam jumlah terbatas. Originalitas terjamin — tidak ada dua orang berpakaian identik.', glow: 'rgba(200, 138, 62,0.08)', border: 'rgba(200, 138, 62,0.15)' },
          ].map(({ icon, title, desc, glow, border }) => (
            <div key={title} className="glass-card group p-8 flex flex-col items-center text-center cursor-default">
              <div className="w-14 h-14 flex items-center justify-center mb-5 transition-all duration-400 group-hover:scale-110"
                style={{ background: glow, border: `1px solid ${border}`, boxShadow: `0 0 20px ${glow}` }}>
                {icon}
              </div>
              <h4 className="text-sm font-black uppercase tracking-tight text-[var(--foreground)] mb-3">{title}</h4>
              <p className="text-zinc-500 text-xs leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================
          TESTIMONIALS — NEW SECTION
      ================================================ */}
      <section className="py-20 px-5 z-10 relative" style={{ background: 'linear-gradient(180deg,#fbfaf7 0%,#faf9f6 50%,#fbfaf7 100%)' }}>
        <div className="divider-gradient mb-16" />
        <div className="max-w-7xl mx-auto">
          <div ref={testimonialReveal.ref}
            className={`text-center mb-14 scroll-reveal ${testimonialReveal.revealed ? 'revealed' : ''}`}>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2"
              style={{ background: 'rgba(154, 165, 177,0.08)', border: '1px solid rgba(154, 165, 177,0.2)' }}>
              <Sparkles size={12} className="text-slate-500" />
              <span className="text-[9px] font-label uppercase tracking-[0.3em] text-slate-500">APA KATA MEREKA</span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">
              Customer <span className="text-gradient-fire">Reviews</span>
            </h3>
            <p className="text-zinc-500 text-xs mt-2 max-w-md mx-auto">Testimoni asli dari customer yang sudah merasakan kualitas YouthPulse</p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children ${testimonialReveal.revealed ? 'revealed' : ''}`}>
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card p-7 relative">
                <div className="quote-mark">&ldquo;</div>
                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={13} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6 font-light italic">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '16px' }}>
                    <div className="avatar-ring">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white"
                        style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>
                        {t.avatar}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--foreground)]">{t.name}</div>
                      <div className="text-[10px] text-zinc-500 font-medium">{t.role}</div>
                    </div>
                    <Verified size={14} className="text-amber-500 ml-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="divider-gradient mt-16" />
      </section>

      {/* ================================================
          NEWSLETTER
      ================================================ */}
      <section id="newsletter" className="py-16 px-5 z-10 relative scroll-mt-20">
        <div ref={newsletterReveal.ref}
          className={`max-w-4xl mx-auto relative overflow-hidden scroll-reveal-scale ${newsletterReveal.revealed ? 'revealed' : ''}`}
          style={{ background: 'linear-gradient(135deg,rgba(247,245,240,0.95),rgba(240,238,233,0.98))', border: '1px solid rgba(200, 138, 62,0.2)', backdropFilter: 'blur(24px)' }}>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-500/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-500/40" />
          <div className="relative z-10 p-10 md:p-14 text-center">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2" style={{ background: 'rgba(200, 138, 62,0.08)', border: '1px solid rgba(200, 138, 62,0.2)' }}>
              <Mail size={11} className="text-amber-500" />
              <span className="text-[9px] font-label uppercase tracking-[0.25em] text-amber-500">Early Access Member</span>
            </div>
            <h3 className="font-display text-3xl font-black uppercase tracking-tight mb-2 text-[var(--foreground)]">
              Akses Awal <span className="text-gradient-fire">Drop 02</span>
            </h3>
            <p className="text-zinc-500 text-sm font-light mb-8 max-w-md mx-auto">Daftar sekarang dan dapatkan notifikasi 24 jam sebelum publik, kode diskon eksklusif, dan gratis ongkir.</p>
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 py-4 max-w-sm mx-auto" style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.22)' }}>
                <Check size={15} className="text-emerald-500" />
                <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider">Berhasil! Cek email Anda.</span>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda..." required
                  className="flex-grow text-xs px-5 py-4 text-zinc-900 placeholder-zinc-400 focus:outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.08)' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(200, 138, 62,0.4)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)')} />
                <button type="submit" className="btn-primary px-8 py-4 text-xs font-black tracking-widest flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                  Daftar Sekarang <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ================================================
          FOOTER
      ================================================ */}
      <footer className="relative z-10 pt-14 pb-8 px-5" style={{ background: 'rgba(245,243,238,0.98)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="max-w-7xl mx-auto">

          {/* Instagram Feed Preview */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Camera size={16} className="text-amber-500" />
                <div>
                  <span className="text-[9px] font-label uppercase tracking-[0.25em] text-amber-500 block">Follow Us On Instagram</span>
                  <span className="text-sm font-bold text-[var(--foreground)]">@youthpulse.clo</span>
                </div>
              </div>
              <button className="btn-ghost px-4 py-2 text-[10px] font-bold tracking-widest flex items-center gap-2 cursor-pointer">
                <ExternalLink size={11} /> Follow
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { img: '/spzl.jpg', caption: 'Hellfire Hoodie' },
                { img: '/nb.jpg', caption: 'Signature Tee' },
                { img: '/ng480.png', caption: 'Varsity Jacket' },
                { img: '/nb wehite.jpg', caption: 'Lookbook SS26' },
              ].map(({ img, caption }, i) => (
                <div key={i} className="instagram-grid-item group cursor-pointer"
                  style={{ border: '1px solid rgba(0,0,0,0.05)', background: '#fbfaf7' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={caption} className="w-full h-full object-cover transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-bold text-white">{caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="divider-gradient mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 flex items-center justify-center font-black text-lg text-white"
                  style={{ background: 'linear-gradient(135deg,#c88a3e,#8f5a22)', clipPath: 'polygon(0 0,100% 0,100% 72%,72% 100%,0 100%)' }}>Y</div>
                <div>
                  <div className="font-display text-base font-black tracking-tighter">YOUTH<span className="text-gradient-rose">PULSE</span><span className="text-zinc-500">.clo</span></div>
                  <div className="text-[8px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Est. 2026 · Indonesia</div>
                </div>
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed max-w-xs">Streetwear independen asal Indonesia — seni visual tajam, material premium, orisinalitas tanpa kompromi.</p>
              <div className="flex gap-2.5 mt-5">
                {[
                  { icon: <Link size={14} />, label: 'Instagram', href: 'https://instagram.com/youthpulse.clo' },
                  { icon: <MessageCircle size={14} />, label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}` },
                  { icon: <ShoppingBag size={14} />, label: 'Shopee', href: SHOPEE_STORE_URL },
                ].map(({ icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-300"
                    style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', color: 'rgba(115,115,125,1)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#c88a3e,#8f5a22)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = 'rgba(115,115,125,1)'; }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <h5 className="text-[9px] font-label uppercase tracking-[0.25em] text-[var(--foreground)] mb-4">Navigasi</h5>
              <ul className="space-y-2.5">
                {[{ href: '#katalog', label: 'Katalog Produk' }, { href: '#filosofi', label: 'Filosofi' }, { href: '#lookbook', label: 'Lookbook' }, { href: '#newsletter', label: 'Early Access' }].map(({ href, label }) => (
                  <li key={href}><a href={href} className="text-xs text-zinc-600 hover:text-amber-700 transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-amber-500 group-hover:w-3 transition-all duration-300" />{label}
                  </a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <h5 className="text-[9px] font-label uppercase tracking-[0.25em] text-[var(--foreground)] mb-4">Hubungi Kami</h5>
              <ul className="space-y-2.5 text-xs text-zinc-600">
                <li>contact@youthpulse.clo</li>
                <li>+62 821-2345-6789</li>
                <li>@youthpulse.clo</li>
                <li className="text-zinc-500 text-[10px] mt-3">Senin–Jumat · 09.00–17.00 WIB</li>
              </ul>
            </div>
          </div>
          <div className="divider-gradient mb-5" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-zinc-500 text-[10px]">© 2026 YouthPulse.clo · All Rights Reserved.</p>
            <div className="flex gap-5 text-[10px] text-zinc-500">
              {['Syarat & Ketentuan', 'Kebijakan Privasi', 'FAQ'].map(l => (
                <span key={l} className="hover:text-zinc-700 cursor-pointer transition-colors">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ================================================
          BACK TO TOP BUTTON
      ================================================ */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn-back-to-top"
          aria-label="Back to top">
          <ChevronUp size={20} className="text-white" />
        </button>
      )}

      {/* ================================================
          CART DRAWER — with slide animation
      ================================================ */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 transition-opacity cart-overlay-enter" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md flex flex-col shadow-2xl cart-drawer-enter" style={{ background: 'var(--background)', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="p-5 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-3">
                  <ShoppingBag size={17} className="text-amber-500" />
                  <h4 className="font-black text-sm uppercase tracking-widest text-[var(--foreground)]">Keranjang ({totalItems})</h4>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 flex items-center justify-center cursor-pointer text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-300 transition-all duration-300" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }} aria-label="Close">
                  <X size={14} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-5">
                {isCheckoutSuccess ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
                    <div className="w-20 h-20 flex items-center justify-center mb-5 animate-glow-pulse" style={{ background: 'rgba(200, 138, 62,0.07)', border: '1px solid rgba(200, 138, 62,0.3)' }}>
                      <Check size={30} className="text-amber-500" />
                    </div>
                    <h5 className="font-black text-lg uppercase tracking-tight mb-2 text-[var(--foreground)]">Chat WhatsApp Dibuka!</h5>
                    <p className="text-zinc-500 text-xs leading-relaxed mb-7 max-w-xs">Kalau tab WhatsApp belum otomatis terbuka, cek popup blocker browser Anda. Tim kami akan segera membalas untuk konfirmasi pesanan.</p>
                    <button onClick={resetCart} className="btn-primary w-full py-3.5 text-xs font-black tracking-widest cursor-pointer">Kembali Belanja</button>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <ShoppingBag size={48} className="text-zinc-300 mb-4" />
                    <h5 className="font-bold text-zinc-400 text-sm mb-2 uppercase">Keranjang Kosong</h5>
                    <p className="text-xs text-zinc-500 max-w-[190px] leading-relaxed mb-5">Temukan koleksi premium kami dan mulai belanja.</p>
                    <button onClick={() => setIsCartOpen(false)} className="btn-ghost px-5 py-3 text-xs font-bold cursor-pointer">Jelajahi Produk</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item, idx) => (
                      <div key={`${item.product.id}-${item.size}-${idx}`} className="flex gap-3.5 p-4 glass-card">
                        <div className="w-16 h-20 flex-shrink-0 overflow-hidden" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow flex flex-col justify-between">
                          <div className="flex justify-between gap-2">
                            <h6 className="font-bold text-xs text-[var(--foreground)] uppercase tracking-tight leading-tight line-clamp-2">{item.product.name}</h6>
                            <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-zinc-400 hover:text-amber-700 cursor-pointer flex-shrink-0"><Trash2 size={12} /></button>
                          </div>
                          <span className="text-[9px] font-bold text-zinc-400 uppercase">Ukuran: {item.size}</span>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                              <button onClick={() => updateQty(item.product.id, item.size, -1)} className="px-2 py-1 text-zinc-400 hover:text-zinc-900 cursor-pointer"><Minus size={10} /></button>
                              <span className="px-3 text-xs font-black text-[var(--foreground)]">{item.quantity}</span>
                              <button onClick={() => updateQty(item.product.id, item.size, 1)} className="px-2 py-1 text-zinc-400 hover:text-zinc-900 cursor-pointer"><Plus size={10} /></button>
                            </div>
                            <span className="text-xs font-black text-[var(--foreground)]">{formatPrice(item.product.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {!isCheckoutSuccess && cart.length > 0 && (
                <div className="p-5 space-y-3.5" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: 'rgba(247,245,240,0.85)' }}>
                  <div className="flex justify-between text-xs text-zinc-500"><span>Pengiriman</span><span className="text-emerald-500 font-bold">GRATIS</span></div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold uppercase text-zinc-400">Total</span>
                    <span className="text-xl font-black text-gradient-fire">{formatPrice(totalPrice)}</span>
                  </div>
                  <button onClick={handleCheckout} disabled={isCheckoutLoading}
                    className="btn-primary w-full py-4 text-xs font-black tracking-widest flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60">
                    {isCheckoutLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Menyiapkan Chat...</> : <><MessageCircle size={13} /> Order via WhatsApp</>}
                  </button>
                  <a href={SHOPEE_STORE_URL} target="_blank" rel="noopener noreferrer"
                    className="btn-ghost w-full py-3.5 text-xs font-black tracking-widest flex items-center justify-center gap-2.5">
                    <ExternalLink size={12} /> Beli di Shopee
                  </a>
                  <p className="text-[9px] text-center text-zinc-500">Order diproses manual via chat WhatsApp / Shopee, bukan pembayaran otomatis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================
          QUICK VIEW MODAL — with scale animation
      ================================================ */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 modal-overlay-enter" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 modal-enter"
            style={{ background: 'linear-gradient(135deg,#ffffff,#fbfaf7)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <button onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center cursor-pointer text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-300 transition-all duration-300"
              style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }} aria-label="Close">
              <X size={14} />
            </button>
            <div className="md:w-[46%] aspect-square md:aspect-[4/5] overflow-hidden relative flex-shrink-0" style={{ background: 'linear-gradient(135deg,#fbfaf7,#f4f3ef)' }}>
              {selectedProduct.badge && (
                <span className="absolute top-4 left-4 z-10 text-white text-[8px] font-label tracking-[0.2em] px-3 py-1.5 uppercase"
                  style={{ background: 'linear-gradient(90deg,#c88a3e,#8f5a22)' }}>{selectedProduct.badge}</span>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow p-7 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-label uppercase tracking-[0.3em] text-amber-500 block mb-1.5">{selectedProduct.category}</span>
                <h4 className="font-display text-xl font-black uppercase tracking-tight text-[var(--foreground)] mb-2 leading-tight">{selectedProduct.name}</h4>
                <div className="flex items-center gap-3 mb-4">
                  <StarRating rating={selectedProduct.rating} />
                  <span className="text-[10px] text-zinc-400">({selectedProduct.sold} terjual)</span>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed mb-5">{selectedProduct.description}</p>
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-2xl font-black text-[var(--foreground)]">{formatPrice(selectedProduct.price)}</span>
                  {selectedProduct.originalPrice && <span className="text-sm text-zinc-400 line-through">{formatPrice(selectedProduct.originalPrice)}</span>}
                </div>
                
                <div className="mb-5">
                  <span className="text-[9px] font-label uppercase tracking-[0.2em] text-zinc-400 block mb-2.5">Pilih Ukuran</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map(sz => (
                      <button key={sz} onClick={() => setSelectedSize(sz)}
                        className="px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all duration-300"
                        style={{
                          background: selectedSize === sz ? 'linear-gradient(135deg,#c88a3e,#8f5a22)' : 'rgba(0,0,0,0.03)',
                          border: '1px solid ' + (selectedSize === sz ? 'transparent' : 'rgba(0,0,0,0.06)'),
                          color: selectedSize === sz ? 'white' : 'rgba(115,115,125,1)',
                          boxShadow: selectedSize === sz ? '0 4px 16px rgba(200, 138, 62,0.3)' : 'none',
                        }}>{sz}</button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[9px] font-label uppercase tracking-[0.2em] text-zinc-400">Jumlah</span>
                  <div className="flex items-center text-[var(--foreground)]" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                    <button onClick={() => setQuickViewQty(q => Math.max(1, q - 1))} className="px-3 py-2 text-zinc-500 hover:text-[var(--foreground)] hover:bg-zinc-100 transition-all duration-300 cursor-pointer"><Minus size={12} /></button>
                    <span className="px-4 text-sm font-black">{quickViewQty}</span>
                    <button onClick={() => setQuickViewQty(q => q + 1)} className="px-3 py-2 text-zinc-500 hover:text-[var(--foreground)] hover:bg-zinc-100 transition-all duration-300 cursor-pointer"><Plus size={12} /></button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { toggleWishlist(selectedProduct.id); }}
                  className={`w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-zinc-100 hover:border-zinc-300 ${wishlist.includes(selectedProduct.id) ? 'text-amber-500' : 'text-zinc-500 hover:text-amber-500'}`}
                  style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}>
                  <Heart size={16} className={wishlist.includes(selectedProduct.id) ? "fill-current" : "text-inherit"} />
                </button>
                <button
                  onClick={() => { addToCart(selectedProduct, selectedSize, quickViewQty); setSelectedProduct(null); }}
                  className="btn-primary flex-grow h-12 text-xs font-black tracking-widest flex items-center justify-center gap-2.5 cursor-pointer">
                  <ShoppingBag size={14} /> Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}