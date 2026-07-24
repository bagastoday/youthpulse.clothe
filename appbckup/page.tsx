"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ShoppingBag, X, Plus, Minus, Eye, Check, Star, Mail, ArrowRight,
  Trash2, Lock, ChevronDown, Zap, Shield, Target, Flame,
  Search, Heart, Menu, TrendingUp, Package, Truck, ExternalLink,
  Link, MessageCircle, Play, ChevronRight, Filter, ChevronUp,
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
    name: "HELLFIRE GRAPHIC HOODIE",
    price: 449000,
    originalPrice: 529000,
    category: "hoodies",
    image: "/hoodie_black.png",
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
    name: "SIGNATURE VECTOR WHITE TEE",
    price: 249000,
    category: "tshirts",
    image: "/tshirt_white.png",
    sizes: ["S", "M", "L", "XL"],
    description: "Kaos streetwear berpotongan oversize dari bahan Cotton Combed 24s reactive ultra-soft. Grafis sablon plastisol premium dengan presisi tinggi.",
    badge: "LIMITED DROP",
    rating: 4.8,
    sold: 198,
    colors: ["#f5f5f5", "#1a1a1a", "#c0a060"],
    isNew: true,
  },
  {
    id: "p3",
    name: "VANDALISM VARSITY JACKET",
    price: 699000,
    originalPrice: 799000,
    category: "jackets",
    image: "/jacket_varsity.png",
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
    name: "PULSE LIFESTYLE TOTE BAG",
    price: 129000,
    category: "accessories",
    image: "/lookbook_streetwear.png",
    sizes: ["One Size"],
    description: "Tote bag kanvas premium dengan ketahanan ekstra, zipper YKK kokoh, kompartemen laptop 14 inch, dan sablon grafis reflektif 3M.",
    badge: "NEW ARRIVAL",
    rating: 4.7,
    sold: 145,
    isNew: true,
  },
];

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
    color: "#f43f5e",
  },
  {
    name: "Aisha Maharani",
    role: "Fashion Content Creator",
    text: "Desainnya beneran original dan standout. Setiap kali pakai varsity jacket dari YouthPulse, pasti ditanya \"beli dimana?\". Quality-nya premium banget.",
    rating: 5,
    avatar: "AM",
    color: "#8b5cf6",
  },
  {
    name: "Dimas Ardiansyah",
    role: "Urban Culture Blogger",
    text: "Baru pertama kali nemu brand lokal yang konsepnya sekuat ini. Packaging-nya rapi, materialnya juara, dan desain vektornya tajam. Langsung repeat order!",
    rating: 5,
    avatar: "DA",
    color: "#f97316",
  },
];

// ============================================================
// HELPERS
// ============================================================
const formatPrice = (p: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

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
    setTimeout(() => { setIsCheckoutLoading(false); setIsCheckoutSuccess(true); }, 1600);
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
    <div className="min-h-screen bg-[#05050a] text-[#fafafa] relative overflow-x-hidden selection:bg-rose-600/40 selection:text-white bg-grid-pattern"
      onMouseMove={handleMouseMove}>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Cursor Glow */}
      <div className="cursor-glow hidden lg:block"
        style={{ left: mousePos.x, top: mousePos.y, opacity: mousePos.x > 0 ? 0.7 : 0 }} />

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.1) 0%, transparent 70%)', top: '-8%', left: '-5%', transform: `translateY(${scrollY * 0.08}px)` }} />
        <div className="absolute w-[400px] h-[400px] rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)', top: '40%', right: '-8%', animationDelay: '-5s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', bottom: '5%', left: '25%', animationDelay: '-10s' }} />
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
          background: scrollY > 30 ? 'rgba(5,5,10,0.96)' : 'rgba(5,5,10,0.75)',
          backdropFilter: 'blur(28px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: scrollY > 30 ? '0 4px 40px rgba(0,0,0,0.5)' : 'none',
        }}>

        {/* Top row: Logo + Search + Icons */}
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer flex-shrink-0 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-9 h-9 flex items-center justify-center font-black text-base text-white transition-transform duration-300 group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg,#f43f5e,#f97316)', clipPath: 'polygon(0 0,100% 0,100% 72%,72% 100%,0 100%)' }}>
              Y
            </div>
            <div className="leading-none">
              <div className="text-[17px] font-black tracking-tighter">
                YOUTH<span className="text-gradient-rose">PULSE</span><span className="text-zinc-600 text-sm">.clo</span>
              </div>
            </div>
          </div>

          {/* Category nav (desktop) */}
          <ul className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {categories.map(({ key, label }) => (
              <li key={key}>
                <button
                  onClick={() => { setActiveCategory(key); document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 rounded-none relative group"
                  style={{
                    color: activeCategory === key ? 'white' : 'rgba(161,161,170,1)',
                  }}>
                  {label}
                  <span className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
                    style={{ background: activeCategory === key ? 'linear-gradient(90deg,#f43f5e,#f97316)' : 'transparent' }} />
                </button>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 px-3 py-2 border border-rose-500/30" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <Search size={14} className="text-zinc-400 flex-shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Cari produk..."
                    className="bg-transparent text-xs text-white placeholder-zinc-600 outline-none w-36"
                    onBlur={() => { if (!searchQuery) setIsSearchOpen(false); }}
                    onKeyDown={e => { if (e.key === 'Escape') { setIsSearchOpen(false); setSearchQuery(''); } }}
                  />
                  <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="text-zinc-500 hover:text-white cursor-pointer">
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setIsSearchOpen(true); setTimeout(() => searchRef.current?.focus(), 100); }}
                  className="w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-300 hover:text-rose-400"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
                  aria-label="Search">
                  <Search size={15} className="text-zinc-400" />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => {}}
              className="relative w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-300 hover:text-rose-400"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
              aria-label="Wishlist">
              <Heart size={15} className={wishlist.length > 0 ? "fill-rose-500 text-rose-500" : "text-zinc-400"} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-[9px] font-black text-white rounded-full"
                  style={{ background: 'linear-gradient(135deg,#f43f5e,#f97316)' }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 h-9 cursor-pointer transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg,#f43f5e,#f97316)',
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
                <span className="hidden sm:flex min-w-5 h-5 items-center justify-center text-[10px] font-black text-rose-700 rounded-full px-1" style={{ background: 'rgba(255,255,255,0.9)' }}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 lg:hidden flex items-center justify-center cursor-pointer"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
              aria-label="Menu">
              <Menu size={15} className="text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-5 pb-4 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex flex-wrap gap-2">
              {categories.map(({ key, label, icon }) => (
                <button key={key} onClick={() => { setActiveCategory(key); setIsMobileMenuOpen(false); document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all"
                  style={{
                    background: activeCategory === key ? 'linear-gradient(135deg,#f43f5e,#f97316)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: activeCategory === key ? 'white' : 'rgba(161,161,170,1)',
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
        <div className="max-w-7xl mx-auto px-5 pt-8 pb-0 grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-[80vh]">

          {/* LEFT: Brand copy + CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center py-10 lg:py-16 pr-0 lg:pr-10 order-2 lg:order-1">

            {/* Brand badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 self-start"
              style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.22)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[9px] font-black tracking-[0.3em] text-rose-400 uppercase">EST. 2026 · NEW DROP LIVE</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-4">
              <span className="block text-white">Premium</span>
              <span className="block text-gradient-hero" style={{ fontSize: '110%' }}>Streetwear</span>
              <span className="block text-white">Indonesia.</span>
            </h1>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-md font-light">
              Koleksi eksklusif untuk jiwa yang berani tampil beda. Material premium pilihan, desain vektor presisi tinggi, dan edisi terbatas yang membuatmu tampil unik.
            </p>

            {/* Quick stats — animated counter */}
            <div ref={statsReveal.ref}
              className={`flex gap-6 mb-8 pb-8 scroll-reveal ${statsReveal.revealed ? 'revealed' : ''}`}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', animationDelay: '0.1s' }}>
              {[
                { val: `${(customerCount / 1000).toFixed(1)}K+`, lbl: 'Customer' },
                { val: `${(ratingCount / 10).toFixed(1)}★`, lbl: 'Rating' },
                { val: '100%', lbl: 'Premium' }
              ].map(({ val, lbl }) => (
                <div key={lbl}>
                  <div className="text-xl font-black text-gradient-gold">{val}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">{lbl}</div>
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
                  <span className="text-rose-500">{icon}</span> {text}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Featured product showcase */}
          <div className="lg:col-span-7 relative order-1 lg:order-2 flex items-end" style={{ minHeight: '400px' }}>

            {/* Decorative background shape */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-[90%]"
                style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.04) 0%, rgba(139,92,246,0.05) 50%, rgba(245,158,11,0.03) 100%)', border: '1px solid rgba(255,255,255,0.04)' }} />
              {/* Decorative circles */}
              <div className="absolute top-[15%] right-[15%] w-56 h-56 rounded-full opacity-10"
                style={{ border: '1px solid rgba(244,63,94,0.5)' }} />
              <div className="absolute top-[20%] right-[20%] w-72 h-72 rounded-full opacity-5"
                style={{ border: '1px dashed rgba(139,92,246,0.6)' }} />
              {/* Glow */}
              <div className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)' }} />
            </div>

            {/* Featured product image — large, centered */}
            <div className="relative z-10 w-full h-full flex items-end justify-center pb-0">
              {/* Badge top */}
              <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                <span className="text-[9px] font-black tracking-[0.2em] px-3 py-1.5 uppercase text-white animate-glow-pulse"
                  style={{ background: 'linear-gradient(90deg,#f43f5e,#f97316)' }}>
                  🔥 BEST SELLER
                </span>
                <span className="text-[9px] font-black tracking-[0.2em] px-3 py-1.5 uppercase glass-dark border border-white/10 text-zinc-300">
                  ONLY {featuredProduct.sold}+ SOLD
                </span>
              </div>

              {/* Price tag top-right */}
              <div className="absolute top-6 right-6 z-20 text-right">
                <div className="text-[10px] text-zinc-500 line-through">{featuredProduct.originalPrice && formatPrice(featuredProduct.originalPrice)}</div>
                <div className="text-2xl font-black text-gradient-fire">{formatPrice(featuredProduct.price)}</div>
                <div className="inline-block text-[9px] font-black text-white px-2 py-0.5 mt-1"
                  style={{ background: 'rgba(244,63,94,0.8)' }}>
                  HEMAT {featuredProduct.discount}%
                </div>
              </div>

              {/* Product Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="object-contain transition-transform duration-700 ease-out"
                style={{
                  maxHeight: '75vh',
                  maxWidth: '100%',
                  filter: 'drop-shadow(0 40px 80px rgba(244,63,94,0.2)) drop-shadow(0 0 120px rgba(139,92,246,0.1))',
                  transform: 'scale(1.05)',
                }}
              />

              {/* Bottom info card */}
              <div className="absolute bottom-0 left-6 right-6 z-20 p-5 flex items-end justify-between gap-4"
                style={{ background: 'linear-gradient(to top, rgba(5,5,10,0.95) 0%, rgba(5,5,10,0.5) 60%, transparent 100%)' }}>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-rose-400 mb-1">Featured Drop 01</div>
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-white leading-tight">
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
      <section className="relative z-10 py-8 px-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(8,8,16,0.8)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Flame size={20} className="text-rose-500 animate-pulse" />
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-rose-400">DROP 02 · APOCALYPTIC VECTOR</div>
              <div className="text-sm font-bold text-white">Hanya tersedia untuk member terdaftar</div>
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
                style={accent ? { borderColor: 'rgba(244,63,94,0.3)', boxShadow: '0 0 16px rgba(244,63,94,0.1)' } : {}}>
                <span className={`text-xl font-black tabular-nums ${accent ? 'text-gradient-rose' : 'text-white'}`}>
                  {String(val).padStart(2, '0')}
                </span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-600 mt-0.5">{lbl}</span>
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
              <div className="w-5 h-px" style={{ background: 'linear-gradient(90deg,#f43f5e,transparent)' }} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-400">KOLEKSI TERSEDIA</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Drop 01 <span className="text-gradient-fire">· Live Now</span>
            </h2>
            <p className="text-zinc-600 text-xs mt-1">{filtered.length} produk ditemukan{searchQuery && ` untuk "${searchQuery}"`}</p>
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 mr-2 text-zinc-500">
              <Filter size={12} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Filter:</span>
            </div>
            {categories.map(({ key, label, icon }) => (
              <button key={key} onClick={() => setActiveCategory(key)}
                className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all duration-300"
                style={{
                  background: activeCategory === key ? 'linear-gradient(135deg,#f43f5e,#f97316)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid ' + (activeCategory === key ? 'transparent' : 'rgba(255,255,255,0.08)'),
                  color: activeCategory === key ? 'white' : 'rgba(161,161,170,1)',
                  boxShadow: activeCategory === key ? '0 4px 20px rgba(244,63,94,0.25)' : 'none',
                }}>
                {icon}{label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="text-zinc-800 mx-auto mb-4" />
            <p className="text-zinc-500 font-bold text-sm">Produk tidak ditemukan</p>
            <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} className="mt-4 text-xs text-rose-400 font-bold hover:underline cursor-pointer">Reset filter</button>
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
                <div className="relative aspect-[4/5] overflow-hidden" style={{ background: 'linear-gradient(135deg,#0e0e1c,#080812)' }}>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {product.badge && (
                      <span className="text-[8px] font-black tracking-[0.18em] px-2.5 py-1.5 uppercase text-white"
                        style={{ background: product.isNew ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(90deg,#f43f5e,#f97316)' }}>
                        {product.badge}
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-[8px] font-black tracking-wider px-2 py-1 text-white" style={{ background: 'rgba(139,92,246,0.85)' }}>
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-300"
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                    aria-label="Wishlist">
                    <Heart size={13}
                      className={wishlist.includes(product.id) ? "fill-rose-500 text-rose-500" : "text-zinc-400"} />
                  </button>

                  {/* Sold count */}
                  <div className="absolute top-12 right-3 z-10 glass-dark px-2 py-1 border border-white/5">
                    <span className="text-[9px] font-bold text-zinc-500">{product.sold} terjual</span>
                  </div>

                  {/* Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 ease-out"
                    style={{
                      transform: hoveredProduct === product.id ? 'scale(1.09)' : 'scale(1)',
                      filter: hoveredProduct === product.id ? 'brightness(0.65)' : 'brightness(0.95)',
                    }} />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end gap-2 p-4 transition-all duration-400"
                    style={{
                      background: 'linear-gradient(to top,rgba(5,5,10,0.92) 0%,rgba(5,5,10,0.2) 55%,transparent)',
                      opacity: hoveredProduct === product.id ? 1 : 0,
                    }}>
                    <button onClick={() => openQuickView(product)}
                      className="w-full py-2.5 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all glass-dark"
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                      <Eye size={12} /> Quick View
                    </button>
                    <button onClick={() => addToCart(product, product.sizes[0])}
                      className="btn-primary w-full py-2.5 text-[10px] tracking-widest flex items-center justify-center gap-2 cursor-pointer">
                      <ShoppingBag size={12} /> Tambah ke Keranjang
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col gap-2 flex-grow" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-600">{product.category}</span>
                    <StarRating rating={product.rating} size={9} />
                  </div>

                  <h4 className="font-extrabold text-[13px] leading-tight text-white group-hover:text-rose-300 transition-colors duration-300">
                    {product.name}
                  </h4>

                  {/* Size chips */}
                  <div className="flex gap-1 flex-wrap">
                    {product.sizes.slice(0, 4).map(s => (
                      <span key={s} className="text-[8px] font-bold px-1.5 py-0.5 text-zinc-600 border border-zinc-800 uppercase">{s}</span>
                    ))}
                  </div>

                  <div className="flex items-end justify-between mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <div>
                      <div className="font-black text-sm text-white">{formatPrice(product.price)}</div>
                      {product.originalPrice && (
                        <div className="text-[10px] text-zinc-600 line-through">{formatPrice(product.originalPrice)}</div>
                      )}
                    </div>
                    {/* Mobile add to cart */}
                    <div className="flex gap-1.5 md:hidden">
                      <button onClick={() => openQuickView(product)} className="p-2 glass-dark border border-white/5 cursor-pointer">
                        <Eye size={12} className="text-zinc-400" />
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
      <section id="lookbook" className="relative py-20 z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg,#05050a 0%,#090814 50%,#05050a 100%)' }}>
        <div className="divider-gradient" />
        <div className="max-w-7xl mx-auto px-5 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={lookbookReveal.ref}
            className={`order-2 lg:order-1 scroll-reveal-left ${lookbookReveal.revealed ? 'revealed' : ''}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px" style={{ background: 'linear-gradient(90deg,#f43f5e,transparent)' }} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-400">LIFESTYLE LOOKBOOK</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-5 leading-[1.0]">
              Menerobos<br /><span className="text-gradient-fire">Batas</span><br />Urban Culture.
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-7 max-w-lg font-light">
              Pakaian adalah medium ekspresi diri. Kami merekam distorsi perkotaan dan menyerap energi dinamis jalanan untuk diterjemahkan ke dalam kain bertekstur dan desain kontras yang berbicara keras.
            </p>
            <a href="#katalog"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-xs font-black tracking-widest cursor-pointer"
              style={{ clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
              Lihat Koleksi Drop 01 <ArrowRight size={14} />
            </a>
          </div>
          <div ref={lookbookImgReveal.ref}
            className={`order-1 lg:order-2 relative group scroll-reveal-right ${lookbookImgReveal.revealed ? 'revealed' : ''}`}>
            <div className="absolute inset-0 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none"
              style={{ border: '1px solid rgba(244,63,94,0.18)', top: '14px', left: '14px', right: '-14px', bottom: '-14px' }} />
            <div className="relative overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)', aspectRatio: '16/10' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lookbook_streetwear.png" alt="YouthPulse Lookbook"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'saturate(0.7) contrast(1.1)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(5,5,10,0.8) 0%,transparent 60%)' }} />
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                <div>
                  <div className="text-[8px] font-black uppercase tracking-[0.2em] text-rose-400 mb-1">Featured</div>
                  <div className="font-extrabold text-sm text-white uppercase">Pulse Mechanical Balaclava</div>
                </div>
                <button onClick={() => document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-9 h-9 flex items-center justify-center cursor-pointer"
                  style={{ background: 'linear-gradient(135deg,#f43f5e,#f97316)' }}>
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
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-400 block mb-3">FILOSOFI KUALITAS</span>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            Mengapa <span className="text-gradient-hero">YOUTHPULSE</span>?
          </h3>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 stagger-children ${valuesReveal.revealed ? 'revealed' : ''}`}>
          {[
            { icon: <Zap size={24} className="text-amber-400" />, title: 'Desain Vektor Presisi', desc: 'Grafis HD/4K ultra sharp — sablon plastisol premium yang tidak pernah blur bahkan setelah ratusan kali cuci.', glow: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.18)' },
            { icon: <Shield size={24} className="text-violet-400" />, title: 'Material Tangguh', desc: 'Cotton Combed 24s hingga Heavy Fleece 375gsm — dipilih secara ketat untuk kenyamanan dan ketahanan jangka panjang.', glow: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.18)' },
            { icon: <Target size={24} className="text-rose-400" />, title: 'Edisi Terbatas', desc: 'Setiap desain diproduksi dalam jumlah terbatas. Originalitas terjamin — tidak ada dua orang berpakaian identik.', glow: 'rgba(244,63,94,0.12)', border: 'rgba(244,63,94,0.18)' },
          ].map(({ icon, title, desc, glow, border }) => (
            <div key={title} className="glass-card group p-8 flex flex-col items-center text-center cursor-default">
              <div className="w-14 h-14 flex items-center justify-center mb-5 transition-all duration-400 group-hover:scale-110"
                style={{ background: glow, border: `1px solid ${border}`, boxShadow: `0 0 20px ${glow}` }}>
                {icon}
              </div>
              <h4 className="text-sm font-black uppercase tracking-tight text-white mb-3">{title}</h4>
              <p className="text-zinc-500 text-xs leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================
          TESTIMONIALS — NEW SECTION
      ================================================ */}
      <section className="py-20 px-5 z-10 relative" style={{ background: 'linear-gradient(180deg,#05050a 0%,#080814 50%,#05050a 100%)' }}>
        <div className="divider-gradient mb-16" />
        <div className="max-w-7xl mx-auto">
          <div ref={testimonialReveal.ref}
            className={`text-center mb-14 scroll-reveal ${testimonialReveal.revealed ? 'revealed' : ''}`}>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <Sparkles size={12} className="text-violet-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-violet-400">APA KATA MEREKA</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Customer <span className="text-gradient-fire">Reviews</span>
            </h3>
            <p className="text-zinc-600 text-xs mt-2 max-w-md mx-auto">Testimoni asli dari customer yang sudah merasakan kualitas YouthPulse</p>
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
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-light italic">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                    <div className="avatar-ring">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white"
                        style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>
                        {t.avatar}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{t.name}</div>
                      <div className="text-[10px] text-zinc-600 font-medium">{t.role}</div>
                    </div>
                    <Verified size={14} className="text-rose-400 ml-auto" />
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
          style={{ background: 'linear-gradient(135deg,rgba(18,10,30,0.92),rgba(10,8,20,0.96))', border: '1px solid rgba(244,63,94,0.14)', backdropFilter: 'blur(24px)' }}>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-rose-500/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-rose-500/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-rose-500/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-rose-500/40" />
          <div className="relative z-10 p-10 md:p-14 text-center">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}>
              <Mail size={11} className="text-rose-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-rose-400">Early Access Member</span>
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
              Akses Awal <span className="text-gradient-fire">Drop 02</span>
            </h3>
            <p className="text-zinc-400 text-sm font-light mb-8 max-w-md mx-auto">Daftar sekarang dan dapatkan notifikasi 24 jam sebelum publik, kode diskon eksklusif, dan gratis ongkir.</p>
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 py-4 max-w-sm mx-auto" style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.22)' }}>
                <Check size={15} className="text-emerald-400" />
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Berhasil! Cek email Anda.</span>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda..." required
                  className="flex-grow text-xs px-5 py-4 text-white placeholder-zinc-600 focus:outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(244,63,94,0.4)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
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
      <footer className="relative z-10 pt-14 pb-8 px-5" style={{ background: 'rgba(3,3,8,0.98)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto">

          {/* Instagram Feed Preview */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Camera size={16} className="text-rose-400" />
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-rose-400 block">Follow Us On Instagram</span>
                  <span className="text-sm font-bold text-white">@youthpulse.clo</span>
                </div>
              </div>
              <button className="btn-ghost px-4 py-2 text-[10px] font-bold tracking-widest flex items-center gap-2 cursor-pointer">
                <ExternalLink size={11} /> Follow
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { img: '/hoodie_black.png', caption: 'Hellfire Hoodie' },
                { img: '/tshirt_white.png', caption: 'Signature Tee' },
                { img: '/jacket_varsity.png', caption: 'Varsity Jacket' },
                { img: '/lookbook_streetwear.png', caption: 'Lookbook SS26' },
              ].map(({ img, caption }, i) => (
                <div key={i} className="instagram-grid-item group cursor-pointer"
                  style={{ border: '1px solid rgba(255,255,255,0.05)', background: '#0a0a14' }}>
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
                  style={{ background: 'linear-gradient(135deg,#f43f5e,#f97316)', clipPath: 'polygon(0 0,100% 0,100% 72%,72% 100%,0 100%)' }}>Y</div>
                <div>
                  <div className="text-base font-black tracking-tighter">YOUTH<span className="text-gradient-rose">PULSE</span><span className="text-zinc-700">.clo</span></div>
                  <div className="text-[8px] font-bold tracking-[0.3em] text-zinc-700 uppercase">Est. 2026 · Indonesia</div>
                </div>
              </div>
              <p className="text-zinc-700 text-xs leading-relaxed max-w-xs">Streetwear independen asal Indonesia — seni visual tajam, material premium, orisinalitas tanpa kompromi.</p>
              <div className="flex gap-2.5 mt-5">
                {[
                  { icon: <Link size={14} />, label: 'Instagram' },
                  { icon: <MessageCircle size={14} />, label: 'Twitter' },
                  { icon: <Play size={14} />, label: 'YouTube' },
                ].map(({ icon, label }) => (
                  <button key={label} aria-label={label}
                    className="w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(161,161,170,1)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#f43f5e,#f97316)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(161,161,170,1)'; }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <h5 className="text-[9px] font-black uppercase tracking-[0.25em] text-white mb-4">Navigasi</h5>
              <ul className="space-y-2.5">
                {[{ href: '#katalog', label: 'Katalog Produk' }, { href: '#filosofi', label: 'Filosofi' }, { href: '#lookbook', label: 'Lookbook' }, { href: '#newsletter', label: 'Early Access' }].map(({ href, label }) => (
                  <li key={href}><a href={href} className="text-xs text-zinc-700 hover:text-rose-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-rose-500 group-hover:w-3 transition-all duration-300" />{label}
                  </a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <h5 className="text-[9px] font-black uppercase tracking-[0.25em] text-white mb-4">Hubungi Kami</h5>
              <ul className="space-y-2.5 text-xs text-zinc-700">
                <li>📧 contact@youthpulse.clo</li>
                <li>📱 +62 821-2345-6789</li>
                <li>📸 @youthpulse.clo</li>
                <li className="text-zinc-800 text-[10px] mt-3">Senin–Jumat · 09.00–17.00 WIB</li>
              </ul>
            </div>
          </div>
          <div className="divider-gradient mb-5" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-zinc-800 text-[10px]">© 2026 YouthPulse.clo · All Rights Reserved.</p>
            <div className="flex gap-5 text-[10px] text-zinc-800">
              {['Syarat & Ketentuan', 'Kebijakan Privasi', 'FAQ'].map(l => (
                <span key={l} className="hover:text-zinc-500 cursor-pointer transition-colors">{l}</span>
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
          <div className="absolute inset-0 transition-opacity cart-overlay-enter" style={{ background: 'rgba(0,0,0,0.75)' }} onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md flex flex-col shadow-2xl cart-drawer-enter" style={{ background: '#070710', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="p-5 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3">
                  <ShoppingBag size={17} className="text-rose-400" />
                  <h4 className="font-black text-sm uppercase tracking-widest">Keranjang ({totalItems})</h4>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 flex items-center justify-center cursor-pointer" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }} aria-label="Close">
                  <X size={14} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-5">
                {isCheckoutSuccess ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
                    <div className="w-20 h-20 flex items-center justify-center mb-5 animate-glow-pulse" style={{ background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.3)' }}>
                      <Check size={30} className="text-rose-400" />
                    </div>
                    <h5 className="font-black text-lg uppercase tracking-tight mb-2">Order Diterima!</h5>
                    <p className="text-zinc-500 text-xs leading-relaxed mb-7 max-w-xs">Tim kami akan menghubungi Anda melalui WhatsApp / Email untuk konfirmasi pengiriman.</p>
                    <button onClick={resetCart} className="btn-primary w-full py-3.5 text-xs font-black tracking-widest cursor-pointer">Kembali Belanja</button>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <ShoppingBag size={48} className="text-zinc-800 mb-4" />
                    <h5 className="font-bold text-zinc-600 text-sm mb-2 uppercase">Keranjang Kosong</h5>
                    <p className="text-xs text-zinc-700 max-w-[190px] leading-relaxed mb-5">Temukan koleksi premium kami dan mulai belanja.</p>
                    <button onClick={() => setIsCartOpen(false)} className="btn-ghost px-5 py-3 text-xs font-bold cursor-pointer">Jelajahi Produk</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item, idx) => (
                      <div key={`${item.product.id}-${item.size}-${idx}`} className="flex gap-3.5 p-4 glass-card">
                        <div className="w-16 h-20 flex-shrink-0 overflow-hidden" style={{ background: '#0a0a14', border: '1px solid rgba(255,255,255,0.05)' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow flex flex-col justify-between">
                          <div className="flex justify-between gap-2">
                            <h6 className="font-bold text-xs text-white uppercase tracking-tight leading-tight line-clamp-2">{item.product.name}</h6>
                            <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-zinc-700 hover:text-rose-500 cursor-pointer flex-shrink-0"><Trash2 size={12} /></button>
                          </div>
                          <span className="text-[9px] font-bold text-zinc-700 uppercase">Ukuran: {item.size}</span>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                              <button onClick={() => updateQty(item.product.id, item.size, -1)} className="px-2 py-1 text-zinc-500 hover:text-white cursor-pointer"><Minus size={10} /></button>
                              <span className="px-3 text-xs font-black">{item.quantity}</span>
                              <button onClick={() => updateQty(item.product.id, item.size, 1)} className="px-2 py-1 text-zinc-500 hover:text-white cursor-pointer"><Plus size={10} /></button>
                            </div>
                            <span className="text-xs font-black">{formatPrice(item.product.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {!isCheckoutSuccess && cart.length > 0 && (
                <div className="p-5 space-y-3.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(5,5,10,0.8)' }}>
                  <div className="flex justify-between text-xs text-zinc-600"><span>Pengiriman</span><span className="text-emerald-400 font-bold">GRATIS</span></div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold uppercase text-zinc-500">Total</span>
                    <span className="text-xl font-black text-gradient-fire">{formatPrice(totalPrice)}</span>
                  </div>
                  <button onClick={handleCheckout} disabled={isCheckoutLoading}
                    className="btn-primary w-full py-4 text-xs font-black tracking-widest flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60">
                    {isCheckoutLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Memproses...</> : <><Lock size={12} /> Checkout Aman</>}
                  </button>
                  <p className="text-[9px] text-center text-zinc-800">Enkripsi SSL 256-bit · Pembayaran aman & terverifikasi</p>
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
          <div className="absolute inset-0 modal-overlay-enter" style={{ background: 'rgba(0,0,0,0.87)' }} onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 modal-enter"
            style={{ background: 'linear-gradient(135deg,#0e0e1a,#09090f)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <button onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }} aria-label="Close">
              <X size={14} />
            </button>
            <div className="md:w-[46%] aspect-square md:aspect-[4/5] overflow-hidden relative flex-shrink-0" style={{ background: '#09091a' }}>
              {selectedProduct.badge && (
                <span className="absolute top-4 left-4 z-10 text-white text-[8px] font-black tracking-[0.2em] px-3 py-1.5 uppercase"
                  style={{ background: 'linear-gradient(90deg,#f43f5e,#f97316)' }}>{selectedProduct.badge}</span>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow p-7 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-400 block mb-1.5">{selectedProduct.category}</span>
                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2 leading-tight">{selectedProduct.name}</h4>
                <div className="flex items-center gap-3 mb-4">
                  <StarRating rating={selectedProduct.rating} />
                  <span className="text-[10px] text-zinc-600">({selectedProduct.sold} terjual)</span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed mb-5">{selectedProduct.description}</p>
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-2xl font-black text-white">{formatPrice(selectedProduct.price)}</span>
                  {selectedProduct.originalPrice && <span className="text-sm text-zinc-700 line-through">{formatPrice(selectedProduct.originalPrice)}</span>}
                </div>
                <div className="mb-5">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 block mb-2.5">Pilih Ukuran</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map(sz => (
                      <button key={sz} onClick={() => setSelectedSize(sz)}
                        className="px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all duration-300"
                        style={{
                          background: selectedSize === sz ? 'linear-gradient(135deg,#f43f5e,#f97316)' : 'rgba(255,255,255,0.04)',
                          border: '1px solid ' + (selectedSize === sz ? 'transparent' : 'rgba(255,255,255,0.08)'),
                          color: selectedSize === sz ? 'white' : 'rgba(161,161,170,1)',
                          boxShadow: selectedSize === sz ? '0 4px 16px rgba(244,63,94,0.3)' : 'none',
                        }}>{sz}</button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Jumlah</span>
                  <div className="flex items-center" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                    <button onClick={() => setQuickViewQty(q => Math.max(1, q - 1))} className="px-3 py-2 text-zinc-500 hover:text-white cursor-pointer"><Minus size={12} /></button>
                    <span className="px-4 text-sm font-black">{quickViewQty}</span>
                    <button onClick={() => setQuickViewQty(q => q + 1)} className="px-3 py-2 text-zinc-500 hover:text-white cursor-pointer"><Plus size={12} /></button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { toggleWishlist(selectedProduct.id); }}
                  className="w-12 h-12 flex items-center justify-center cursor-pointer transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                  <Heart size={16} className={wishlist.includes(selectedProduct.id) ? "fill-rose-500 text-rose-500" : "text-zinc-400"} />
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