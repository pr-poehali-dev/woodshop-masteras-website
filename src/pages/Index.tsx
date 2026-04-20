import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_LIVING = "https://cdn.poehali.dev/projects/3fc68a78-3d8c-43b1-90a7-27015701c170/files/6cd48931-6435-41cd-aec4-b1f939c3c18f.jpg";
const IMG_KITCHEN = "https://cdn.poehali.dev/projects/3fc68a78-3d8c-43b1-90a7-27015701c170/files/19d8120c-77a1-4446-bc5f-0f7fad51edc6.jpg";
const IMG_BATH = "https://cdn.poehali.dev/projects/3fc68a78-3d8c-43b1-90a7-27015701c170/files/28301c45-26af-4101-b6c4-32069ea0efa9.jpg";

const FILTERS = ["Все", "Интерьер", "Кухни", "Ванные", "Офисы", "Балконы"];

const PROJECTS = [
  { id: 1, title: "Квартира на Арбате", type: "Интерьер", area: "120 м²", img: IMG_LIVING, year: "2024", tag: "Современный" },
  { id: 2, title: "Кухня-студия", type: "Кухни", area: "35 м²", img: IMG_KITCHEN, year: "2024", tag: "Минимализм" },
  { id: 3, title: "Ванная люкс", type: "Ванные", area: "18 м²", img: IMG_BATH, year: "2023", tag: "Премиум" },
  { id: 4, title: "Пентхаус центр", type: "Интерьер", area: "240 м²", img: IMG_LIVING, year: "2023", tag: "Лофт" },
  { id: 5, title: "Семейная кухня", type: "Кухни", area: "28 м²", img: IMG_KITCHEN, year: "2024", tag: "Скандинав" },
  { id: 6, title: "Мастер-ванная", type: "Ванные", area: "22 м²", img: IMG_BATH, year: "2024", tag: "Ар-деко" },
];

const SERVICES = [
  { icon: "Pencil", title: "Дизайн-проект", desc: "Полный проект интерьера с 3D-визуализацией, планировками и спецификациями материалов", price: "от 3 500 ₽/м²" },
  { icon: "Hammer", title: "Ремонт под ключ", desc: "Комплексный ремонт с полным циклом работ — от демонтажа до финишной отделки", price: "от 8 000 ₽/м²" },
  { icon: "Layers", title: "Авторский надзор", desc: "Контроль строительных работ, соответствие проекту и согласование решений на месте", price: "от 25 000 ₽/мес" },
  { icon: "Package", title: "Комплектация", desc: "Подбор и закупка мебели, материалов, освещения с доставкой и размещением", price: "10% от бюджета" },
  { icon: "Ruler", title: "Замер и консультация", desc: "Профессиональный замер помещения и консультация по планировке и материалам", price: "Бесплатно" },
  { icon: "Star", title: "Дизайн кухни", desc: "Специализированный проект кухонного пространства с эргономичным решением", price: "от 45 000 ₽" },
];

const PROCESS = [
  { num: "01", title: "Встреча и замер", desc: "Бесплатный выезд, обсуждение ожиданий, замер помещения и фотофиксация" },
  { num: "02", title: "Концепция", desc: "Разработка планировочных решений, стилистики, настроения будущего интерьера" },
  { num: "03", title: "Проектирование", desc: "Детальные чертежи, 3D-визуализация, спецификации всех материалов и мебели" },
  { num: "04", title: "Реализация", desc: "Строительные работы с авторским надзором и еженедельной фотоотчётностью" },
  { num: "05", title: "Сдача объекта", desc: "Итоговая фотосессия, устранение замечаний, гарантия на все виды работ" },
];

const REVIEWS = [
  { name: "Анна Морозова", role: "Собственник квартиры", text: "Сделали ремонт в двушке за 3 месяца. Всё чётко по смете, без сюрпризов. Дизайн превзошёл все ожидания!", rating: 5 },
  { name: "Дмитрий Карпов", role: "Владелец офиса", text: "Офис 200 м² реализовали с нуля. Команда профессионалов, всегда на связи. Рекомендую без оговорок.", rating: 5 },
  { name: "Елена Соколова", role: "Клиент мастерской", text: "Кухня мечты за разумные деньги. Учли все пожелания, предложили интересные решения по зонированию.", rating: 5 },
];

const STATS = [
  { value: "320+", label: "Проектов сдано" },
  { value: "8 лет", label: "На рынке" },
  { value: "98%", label: "Клиентов довольны" },
  { value: "47 дней", label: "Средний срок ремонта" },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const NAV_ITEMS: Record<string, string> = {
  hero: "Главная",
  portfolio: "Портфолио",
  services: "Услуги",
  process: "Процесс",
  about: "О нас",
  reviews: "Отзывы",
  contacts: "Контакты",
};

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const filtered = activeFilter === "Все" ? PROJECTS : PROJECTS.filter(p => p.type === activeFilter);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-golos overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0A0A]/95 backdrop-blur border-b border-[#222]" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/3fc68a78-3d8c-43b1-90a7-27015701c170/bucket/acef5a9c-f72a-4801-8678-dbf2fb2f1d39.jpg"
              alt="Мастерская"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-oswald text-2xl font-bold tracking-wider">
              МАС<span style={{ color: "var(--neon)" }}>ТЕР</span>СКАЯ
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            {Object.keys(NAV_ITEMS).map((s) => (
              <button key={s} onClick={() => scrollTo(s)} className="hover:text-white transition-colors uppercase tracking-wider text-xs" style={{ "--hover-color": "var(--neon)" } as React.CSSProperties}>
                {NAV_ITEMS[s]}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:block font-bold font-oswald px-6 py-2.5 text-sm tracking-widest uppercase transition-colors text-[#0A0A0A]"
            style={{ backgroundColor: "var(--neon)" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "white")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--neon)")}
          >
            Связаться
          </button>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#111] border-t border-[#222] px-6 py-6 flex flex-col gap-4">
            {Object.keys(NAV_ITEMS).map((s) => (
              <button key={s} onClick={() => scrollTo(s)} className="text-left text-white/70 font-oswald uppercase tracking-widest text-sm" style={{ transition: "color 0.2s" }}>
                {NAV_ITEMS[s]}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_LIVING} alt="hero" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        </div>

        {/* Vertical accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: "var(--neon)" }} />

        {/* Decorative text */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 font-oswald text-[200px] font-black leading-none select-none hidden lg:block" style={{ color: "rgba(232,255,0,0.05)" }}>
          МАС
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div style={{ animation: "fade-in 0.8s ease-out forwards", opacity: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ backgroundColor: "var(--neon)" }} />
              <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon)" }}>Дизайн · Ремонт · Интерьер</span>
            </div>
            <h1 className="font-oswald font-black leading-none mb-6">
              <span className="block text-5xl md:text-7xl lg:text-9xl text-white">СОЗДАЁМ</span>
              <span className="block text-5xl md:text-7xl lg:text-9xl" style={{ color: "var(--neon)" }}>ПРОСТРАНСТВА</span>
              <span className="block text-5xl md:text-7xl lg:text-9xl" style={{ WebkitTextStroke: "1px var(--neon)", color: "transparent" }}>МЕЧТЫ</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mb-10 leading-relaxed">
              Профессиональная мастерская интерьеров. Дизайн-проект, ремонт под ключ и авторский надзор в Москве.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("contacts")}
                className="font-oswald font-black px-10 py-4 text-sm tracking-widest uppercase transition-all hover:scale-105 text-[#0A0A0A]"
                style={{ backgroundColor: "var(--neon)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "white")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--neon)")}
              >
                Получить расчёт
              </button>
              <button
                onClick={() => scrollTo("portfolio")}
                className="border border-white/30 text-white font-oswald font-black px-10 py-4 text-sm tracking-widest uppercase transition-all"
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--neon)"; e.currentTarget.style.color = "var(--neon)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "white"; }}
              >
                Смотреть работы
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#222] pt-10">
            {STATS.map((s, i) => (
              <div key={i} style={{ animation: `fade-in 0.6s ease-out ${300 + i * 100}ms forwards`, opacity: 0 }}>
                <div className="font-oswald text-3xl md:text-4xl font-black" style={{ color: "var(--neon)" }}>{s.value}</div>
                <div className="text-white/40 text-xs uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-3 overflow-hidden" style={{ backgroundColor: "var(--neon)" }}>
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
          {Array(10).fill("ДИЗАЙН · РЕМОНТ · ИНТЕРЬЕР · ПРОЕКТИРОВАНИЕ · АВТОРСКИЙ НАДЗОР · КУХНИ · ВАННЫЕ · ОФИСЫ · ").map((t, i) => (
            <span key={i} className="font-oswald font-black text-[#0A0A0A] text-sm tracking-widest">{t}</span>
          ))}
        </div>
      </div>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
        <AnimSection>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--neon)" }} />
            <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon)" }}>Наши работы</span>
          </div>
          <h2 className="font-oswald font-black text-4xl md:text-6xl mb-12">ПОРТФОЛИО</h2>
        </AnimSection>

        {/* Filters */}
        <AnimSection delay={100}>
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="font-oswald px-5 py-2 text-xs tracking-widest uppercase transition-all"
                style={activeFilter === f
                  ? { backgroundColor: "var(--neon)", color: "#0A0A0A", fontWeight: 900 }
                  : { border: "1px solid #333", color: "rgba(255,255,255,0.5)" }
                }
                onMouseEnter={e => { if (activeFilter !== f) { e.currentTarget.style.borderColor = "var(--neon)"; e.currentTarget.style.color = "var(--neon)"; } }}
                onMouseLeave={e => { if (activeFilter !== f) { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; } }}
              >
                {f}
              </button>
            ))}
          </div>
        </AnimSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <AnimSection key={p.id} delay={i * 80} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-[#111] aspect-[4/3]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-70" />
                <div className="absolute inset-0 transition-all duration-300" style={{ backgroundColor: "rgba(10,10,10,0)" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(10,10,10,0.4)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(10,10,10,0)")}
                />
                {/* Tag */}
                <div className="absolute top-4 left-4 font-oswald font-bold text-xs px-3 py-1 uppercase tracking-wider text-[#0A0A0A]" style={{ backgroundColor: "var(--neon)" }}>
                  {p.tag}
                </div>
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-oswald font-bold text-xl mb-1">{p.title}</div>
                  <div className="flex items-center justify-between text-white/50 text-xs">
                    <span>{p.type}</span>
                    <span>{p.area} · {p.year}</span>
                  </div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ backgroundColor: "var(--neon-orange)" }} />
              <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon-orange)" }}>Что мы делаем</span>
            </div>
            <h2 className="font-oswald font-black text-4xl md:text-6xl mb-16">УСЛУГИ</h2>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#222]">
            {SERVICES.map((s, i) => (
              <AnimSection key={i} delay={i * 80}>
                <div className="bg-[#0D0D0D] p-8 hover:bg-[#111] transition-colors group h-full">
                  <div className="w-12 h-12 border border-[#333] flex items-center justify-center mb-6 transition-all group-hover:border-yellow-300"
                    style={{ transition: "border-color 0.3s" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--neon)")}
                  >
                    <Icon name={s.icon as "Pencil"} size={22} className="text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-oswald font-bold text-xl mb-3">{s.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">{s.desc}</p>
                  <div className="font-oswald font-black text-lg" style={{ color: "var(--neon)" }}>{s.price}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 px-6 max-w-7xl mx-auto">
        <AnimSection>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--neon)" }} />
            <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon)" }}>Как мы работаем</span>
          </div>
          <h2 className="font-oswald font-black text-4xl md:text-6xl mb-16">ПРОЦЕСС</h2>
        </AnimSection>

        <div className="space-y-0">
          {PROCESS.map((step, i) => (
            <AnimSection key={i} delay={i * 100}>
              <div
                className="flex gap-8 py-8 border-b border-[#1A1A1A] group cursor-default"
                style={{ transition: "border-color 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,255,0,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
              >
                <div className="font-oswald font-black text-5xl md:text-7xl w-28 flex-shrink-0 leading-none transition-colors" style={{ color: "rgba(255,255,255,0.05)" }}>
                  {step.num}
                </div>
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-oswald font-bold text-2xl mb-2 group-hover:text-white transition-colors">{step.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xl">{step.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 border border-[#333] flex items-center justify-center transition-all group-hover:border-yellow-300 group-hover:bg-yellow-300">
                      <Icon name="ArrowRight" size={16} className="text-white/30 group-hover:text-[#0A0A0A] transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[#0D0D0D] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px" style={{ backgroundColor: "var(--neon-orange)" }} />
                <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon-orange)" }}>О мастерской</span>
              </div>
              <h2 className="font-oswald font-black text-4xl md:text-5xl mb-8 leading-none">
                МЫ ДЕЛАЕМ<br />
                <span style={{ color: "var(--neon)" }}>КРАСИВО.</span><br />
                ВСЕГДА.
              </h2>
              <p className="text-white/50 leading-relaxed mb-6">
                Мастерская основана в 2016 году командой архитекторов и дизайнеров с опытом в топовых московских бюро. Мы специализируемся на жилых и коммерческих интерьерах, сочетая дерзкие решения с практичным подходом.
              </p>
              <p className="text-white/50 leading-relaxed mb-10">
                Каждый проект — это диалог. Мы слушаем, предлагаем, убеждаем. И сдаём в срок без лишних нервов.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Award", text: "Лауреат AD Design Award 2023" },
                  { icon: "Users", text: "Команда 24 специалиста" },
                  { icon: "MapPin", text: "Работаем по всей России" },
                  { icon: "Shield", text: "Гарантия 3 года на работы" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ border: "1px solid rgba(232,255,0,0.3)" }}>
                      <Icon name={item.icon as "Award"} size={14} style={{ color: "var(--neon)" }} />
                    </div>
                    <span className="text-white/60 text-sm leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection delay={200} className="relative">
              <div className="relative">
                <img src={IMG_BATH} alt="о нас" className="w-full h-80 md:h-[500px] object-cover" />
                <div className="absolute -bottom-6 -left-6 p-6 hidden md:block text-[#0A0A0A]" style={{ backgroundColor: "var(--neon)" }}>
                  <div className="font-oswald font-black text-4xl">320+</div>
                  <div className="font-oswald text-[#0A0A0A]/70 text-xs uppercase tracking-wider">проектов сдано</div>
                </div>
                <div className="absolute top-6 -right-6 bg-[#111] border border-[#333] p-5 hidden md:block">
                  <div className="font-oswald font-black text-white text-3xl">8 лет</div>
                  <div className="text-white/40 text-xs uppercase tracking-wider">на рынке</div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 max-w-7xl mx-auto">
        <AnimSection>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--neon)" }} />
            <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon)" }}>Что говорят клиенты</span>
          </div>
          <h2 className="font-oswald font-black text-4xl md:text-6xl mb-16">ОТЗЫВЫ</h2>
        </AnimSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <AnimSection key={i} delay={i * 120}>
              <div className="bg-[#111] border border-[#1E1E1E] p-8 h-full" style={{ transition: "border-color 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,255,0,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1E1E1E")}
              >
                <div className="flex gap-1 mb-6">
                  {Array(r.rating).fill(0).map((_, j) => (
                    <Icon key={j} name="Star" size={14} style={{ color: "var(--neon)", fill: "var(--neon)" }} />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-8 italic">"{r.text}"</p>
                <div className="border-t border-[#222] pt-6">
                  <div className="font-oswald font-bold text-white">{r.name}</div>
                  <div className="text-white/30 text-xs mt-1">{r.role}</div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="py-16 px-6" style={{ backgroundColor: "var(--neon)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-oswald font-black text-[#0A0A0A] text-4xl md:text-5xl mb-2">ГОТОВЫ НАЧАТЬ?</h3>
            <p className="text-[#0A0A0A]/60 font-golos">Бесплатный замер и консультация — уже сегодня</p>
          </div>
          <button
            onClick={() => scrollTo("contacts")}
            className="bg-[#0A0A0A] font-oswald font-black px-12 py-5 text-sm tracking-widest uppercase flex-shrink-0 transition-all hover:scale-105"
            style={{ color: "var(--neon)" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#111")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0A0A0A")}
          >
            Оставить заявку
          </button>
        </div>
      </div>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ backgroundColor: "var(--neon)" }} />
              <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: "var(--neon)" }}>Свяжитесь с нами</span>
            </div>
            <h2 className="font-oswald font-black text-4xl md:text-6xl mb-16">КОНТАКТЫ</h2>
          </AnimSection>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <AnimSection>
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block font-oswald">Ваше имя</label>
                  <input type="text" placeholder="Иван Петров"
                    className="w-full bg-[#111] border border-[#222] text-white px-5 py-4 outline-none placeholder:text-white/20 text-sm focus:border-yellow-300 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block font-oswald">Телефон</label>
                  <input type="tel" placeholder="+7 (999) 000-00-00"
                    className="w-full bg-[#111] border border-[#222] text-white px-5 py-4 outline-none placeholder:text-white/20 text-sm focus:border-yellow-300 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block font-oswald">Услуга</label>
                  <select className="w-full bg-[#111] border border-[#222] text-white px-5 py-4 outline-none text-sm appearance-none focus:border-yellow-300 transition-colors">
                    <option value="">Выберите услугу</option>
                    <option>Дизайн-проект</option>
                    <option>Ремонт под ключ</option>
                    <option>Авторский надзор</option>
                    <option>Консультация</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block font-oswald">Сообщение</label>
                  <textarea rows={4} placeholder="Опишите ваш проект..."
                    className="w-full bg-[#111] border border-[#222] text-white px-5 py-4 outline-none placeholder:text-white/20 text-sm resize-none focus:border-yellow-300 transition-colors"
                  />
                </div>
                <button
                  className="w-full font-oswald font-black py-5 text-sm tracking-widest uppercase text-[#0A0A0A] transition-colors"
                  style={{ backgroundColor: "var(--neon)" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "white")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--neon)")}
                >
                  Отправить заявку
                </button>
              </div>
            </AnimSection>

            {/* Contact info */}
            <AnimSection delay={200}>
              <div className="space-y-8">
                {[
                  { icon: "Phone", title: "Телефон", lines: ["+7 (495) 000-00-00", "Пн–Пт: 9:00 – 20:00"] },
                  { icon: "Mail", title: "Email", lines: ["hello@masterskaya.ru", "Ответим в течение часа"] },
                  { icon: "MapPin", title: "Офис", lines: ["Москва, ул. Тверская, 15", "Рядом с м. Тверская"] },
                  { icon: "Instagram", title: "Соцсети", lines: ["@masterskaya_design", "Проекты и процесс"] },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group cursor-default">
                    <div className="w-12 h-12 border border-[#333] flex items-center justify-center flex-shrink-0 transition-all"
                      onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--neon)")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "#333")}
                    >
                      <Icon name={item.icon as "Phone"} size={18} className="text-white/30 transition-colors" />
                    </div>
                    <div>
                      <div className="font-oswald font-bold text-white/30 text-xs uppercase tracking-widest mb-1">{item.title}</div>
                      {item.lines.map((l, j) => (
                        <div key={j} className={j === 0 ? "text-white font-medium" : "text-white/40 text-sm"}>{l}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1A1A1A] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/3fc68a78-3d8c-43b1-90a7-27015701c170/bucket/acef5a9c-f72a-4801-8678-dbf2fb2f1d39.jpg"
              alt="Мастерская"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-oswald text-xl font-bold">
              МАС<span style={{ color: "var(--neon)" }}>ТЕР</span>СКАЯ
            </span>
          </div>
          <div className="text-white/20 text-xs text-center">
            © 2024 Мастерская интерьеров. Все права защищены.
          </div>
          <div className="flex gap-4">
            {["Instagram", "MessageCircle", "Send"].map((icon, i) => (
              <button key={i} className="w-9 h-9 border border-[#222] flex items-center justify-center transition-colors"
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--neon)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#222")}
              >
                <Icon name={icon as "Instagram"} size={14} className="text-white/30" />
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Keyframe styles */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Index;