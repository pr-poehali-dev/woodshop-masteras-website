import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_LIVING = "https://cdn.poehali.dev/projects/3fc68a78-3d8c-43b1-90a7-27015701c170/files/6cd48931-6435-41cd-aec4-b1f939c3c18f.jpg";
const IMG_KITCHEN = "https://cdn.poehali.dev/projects/3fc68a78-3d8c-43b1-90a7-27015701c170/files/19d8120c-77a1-4446-bc5f-0f7fad51edc6.jpg";
const IMG_BATH = "https://cdn.poehali.dev/projects/3fc68a78-3d8c-43b1-90a7-27015701c170/files/28301c45-26af-4101-b6c4-32069ea0efa9.jpg";
const LOGO = "https://cdn.poehali.dev/projects/3fc68a78-3d8c-43b1-90a7-27015701c170/bucket/acef5a9c-f72a-4801-8678-dbf2fb2f1d39.jpg";

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

// CSS vars shorthand
const C = {
  gold: "var(--gold)",
  goldLight: "var(--gold-light)",
  cream: "var(--cream)",
  creamDark: "var(--cream-dark)",
  ink: "var(--ink)",
  inkSoft: "var(--ink-soft)",
  inkMuted: "var(--ink-muted)",
  border: "var(--dark-border)",
};

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
        transform: visible ? "translateY(0)" : "translateY(28px)",
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
    <div className="min-h-screen font-golos overflow-x-hidden" style={{ backgroundColor: C.cream, color: C.ink }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={scrolled ? { backgroundColor: "rgba(245,239,227,0.96)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Масторас" className="w-10 h-10 rounded-full object-cover" style={{ boxShadow: `0 0 0 2px ${C.gold}` }} />
            <span className="font-oswald text-2xl font-bold tracking-wider" style={{ color: C.ink }}>
              МАС<span style={{ color: C.gold }}>ТО</span>РАС
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {Object.keys(NAV_ITEMS).map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-xs uppercase tracking-wider transition-colors font-medium"
                style={{ color: C.inkMuted }}
                onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = C.inkMuted)}
              >
                {NAV_ITEMS[s]}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:block font-oswald font-bold px-6 py-2.5 text-sm tracking-widest uppercase transition-all"
            style={{ backgroundColor: C.gold, color: C.cream }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.ink)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.gold)}
          >
            Связаться
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: C.ink }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 py-6 flex flex-col gap-4" style={{ backgroundColor: C.creamDark, borderTop: `1px solid ${C.border}` }}>
            {Object.keys(NAV_ITEMS).map((s) => (
              <button key={s} onClick={() => scrollTo(s)} className="text-left font-oswald uppercase tracking-widest text-sm" style={{ color: C.inkSoft }}>
                {NAV_ITEMS[s]}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden paper-texture">
        {/* Background image — warm tinted overlay */}
        <div className="absolute inset-0">
          <img src={IMG_LIVING} alt="hero" className="w-full h-full object-cover" style={{ opacity: 0.12 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.cream} 40%, transparent)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.cream} 10%, transparent)` }} />
        </div>

        {/* Left gold border */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: C.gold }} />

        {/* Decorative ghost text */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 font-oswald text-[180px] font-black leading-none select-none hidden lg:block"
          style={{ color: "rgba(184,145,58,0.07)", WebkitTextStroke: `2px rgba(184,145,58,0.12)` }}
        >
          МАС
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div style={{ animation: "fade-in 0.9s ease-out forwards", opacity: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px" style={{ backgroundColor: C.gold }} />
              <span className="font-oswald text-xs tracking-[0.35em] uppercase" style={{ color: C.gold }}>Дизайн · Ремонт · Интерьер</span>
            </div>
            <h1 className="font-oswald font-black leading-none mb-8">
              <span className="block text-5xl md:text-7xl lg:text-9xl" style={{ color: C.ink }}>СОЗДАЁМ</span>
              <span className="block text-5xl md:text-7xl lg:text-9xl" style={{ color: C.gold }}>ПРОСТРАНСТВА</span>
              <span
                className="block text-5xl md:text-7xl lg:text-9xl"
                style={{ WebkitTextStroke: `2px ${C.gold}`, color: "transparent" }}
              >
                МЕЧТЫ
              </span>
            </h1>
            <p className="text-lg max-w-xl mb-10 leading-relaxed" style={{ color: C.inkMuted }}>
              Профессиональная мастерская интерьеров. Дизайн-проект, ремонт под ключ и авторский надзор в Москве.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("contacts")}
                className="font-oswald font-black px-10 py-4 text-sm tracking-widest uppercase transition-all hover:scale-105"
                style={{ backgroundColor: C.gold, color: C.cream }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.ink)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.gold)}
              >
                Получить расчёт
              </button>
              <button
                onClick={() => scrollTo("portfolio")}
                className="font-oswald font-black px-10 py-4 text-sm tracking-widest uppercase transition-all"
                style={{ border: `1px solid ${C.border}`, color: C.inkSoft }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.inkSoft; }}
              >
                Смотреть работы
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10" style={{ borderTop: `1px solid ${C.border}` }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ animation: `fade-in 0.6s ease-out ${300 + i * 100}ms forwards`, opacity: 0 }}>
                <div className="font-oswald text-3xl md:text-4xl font-black" style={{ color: C.gold }}>{s.value}</div>
                <div className="text-xs uppercase tracking-wider mt-1" style={{ color: C.inkMuted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: C.inkMuted }}>
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, ${C.inkMuted}, transparent)` }} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-3 overflow-hidden" style={{ backgroundColor: C.gold }}>
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
          {Array(10).fill("ДИЗАЙН · РЕМОНТ · ИНТЕРЬЕР · ПРОЕКТИРОВАНИЕ · АВТОРСКИЙ НАДЗОР · КУХНИ · ВАННЫЕ · ОФИСЫ · ").map((t, i) => (
            <span key={i} className="font-oswald font-black text-sm tracking-widest" style={{ color: C.cream }}>{t}</span>
          ))}
        </div>
      </div>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
        <AnimSection>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
            <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: C.gold }}>Наши работы</span>
          </div>
          <h2 className="font-oswald font-black text-4xl md:text-6xl mb-12" style={{ color: C.ink }}>ПОРТФОЛИО</h2>
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
                  ? { backgroundColor: C.gold, color: C.cream, fontWeight: 900 }
                  : { border: `1px solid ${C.border}`, color: C.inkMuted }
                }
                onMouseEnter={e => { if (activeFilter !== f) { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; } }}
                onMouseLeave={e => { if (activeFilter !== f) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.inkMuted; } }}
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
              <div className="relative overflow-hidden aspect-[4/3]" style={{ backgroundColor: C.creamDark }}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transform: "scale(1)", transition: "transform 0.7s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,21,10,0.7) 0%, transparent 50%)" }} />
                {/* Tag */}
                <div className="absolute top-4 left-4 font-oswald font-bold text-xs px-3 py-1 uppercase tracking-wider" style={{ backgroundColor: C.gold, color: C.cream }}>
                  {p.tag}
                </div>
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-oswald font-bold text-xl mb-1 text-white">{p.title}</div>
                  <div className="flex items-center justify-between text-xs text-white/60">
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
      <section id="services" className="py-24" style={{ backgroundColor: C.creamDark }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
              <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: C.gold }}>Что мы делаем</span>
            </div>
            <h2 className="font-oswald font-black text-4xl md:text-6xl mb-16" style={{ color: C.ink }}>УСЛУГИ</h2>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: C.border }}>
            {SERVICES.map((s, i) => (
              <AnimSection key={i} delay={i * 80}>
                <div
                  className="p-8 h-full group transition-colors"
                  style={{ backgroundColor: C.creamDark }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.cream)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.creamDark)}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-6 transition-all"
                    style={{ border: `1px solid ${C.border}` }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                  >
                    <Icon name={s.icon as "Pencil"} size={20} style={{ color: C.inkMuted }} />
                  </div>
                  <h3 className="font-oswald font-bold text-xl mb-3" style={{ color: C.ink }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: C.inkMuted }}>{s.desc}</p>
                  <div className="font-oswald font-black text-lg" style={{ color: C.gold }}>{s.price}</div>
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
            <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
            <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: C.gold }}>Как мы работаем</span>
          </div>
          <h2 className="font-oswald font-black text-4xl md:text-6xl mb-16" style={{ color: C.ink }}>ПРОЦЕСС</h2>
        </AnimSection>

        <div>
          {PROCESS.map((step, i) => (
            <AnimSection key={i} delay={i * 100}>
              <div
                className="flex gap-8 py-8 group cursor-default"
                style={{ borderBottom: `1px solid ${C.border}`, transition: "border-color 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
              >
                <div className="font-oswald font-black text-5xl md:text-7xl w-28 flex-shrink-0 leading-none" style={{ color: "rgba(184,145,58,0.15)" }}>
                  {step.num}
                </div>
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-oswald font-bold text-2xl mb-2 transition-colors group-hover:text-amber-700" style={{ color: C.ink }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed max-w-xl" style={{ color: C.inkMuted }}>{step.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div
                      className="w-10 h-10 flex items-center justify-center transition-all"
                      style={{ border: `1px solid ${C.border}` }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.backgroundColor = C.gold; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      <Icon name="ArrowRight" size={16} style={{ color: C.inkMuted }} />
                    </div>
                  </div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 overflow-hidden" style={{ backgroundColor: C.creamDark }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
                <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: C.gold }}>О мастерской</span>
              </div>
              <h2 className="font-oswald font-black text-4xl md:text-5xl mb-8 leading-none" style={{ color: C.ink }}>
                МЫ ДЕЛАЕМ<br />
                <span style={{ color: C.gold }}>КРАСИВО.</span><br />
                ВСЕГДА.
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: C.inkMuted }}>
                Масторас основана в 2016 году командой архитекторов и дизайнеров с опытом в топовых московских бюро. Специализируемся на жилых и коммерческих интерьерах, сочетая дерзкие решения с практичным подходом.
              </p>
              <p className="leading-relaxed mb-10" style={{ color: C.inkMuted }}>
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
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ border: `1px solid rgba(184,145,58,0.4)` }}>
                      <Icon name={item.icon as "Award"} size={14} style={{ color: C.gold }} />
                    </div>
                    <span className="text-sm leading-snug" style={{ color: C.inkMuted }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection delay={200} className="relative">
              <div className="relative">
                <img src={IMG_BATH} alt="о нас" className="w-full h-80 md:h-[500px] object-cover" />
                <div className="absolute -bottom-6 -left-6 p-6 hidden md:block" style={{ backgroundColor: C.gold }}>
                  <div className="font-oswald font-black text-4xl" style={{ color: C.cream }}>320+</div>
                  <div className="font-oswald text-xs uppercase tracking-wider" style={{ color: "rgba(245,239,227,0.7)" }}>проектов сдано</div>
                </div>
                <div className="absolute top-6 -right-6 p-5 hidden md:block" style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}>
                  <div className="font-oswald font-black text-3xl" style={{ color: C.ink }}>8 лет</div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: C.inkMuted }}>на рынке</div>
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
            <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
            <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: C.gold }}>Что говорят клиенты</span>
          </div>
          <h2 className="font-oswald font-black text-4xl md:text-6xl mb-16" style={{ color: C.ink }}>ОТЗЫВЫ</h2>
        </AnimSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <AnimSection key={i} delay={i * 120}>
              <div
                className="p-8 h-full transition-all"
                style={{ backgroundColor: C.creamDark, border: `1px solid ${C.border}` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
              >
                <div className="flex gap-1 mb-6">
                  {Array(r.rating).fill(0).map((_, j) => (
                    <Icon key={j} name="Star" size={14} style={{ color: C.gold, fill: C.gold }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-8 italic" style={{ color: C.inkMuted }}>"{r.text}"</p>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem" }}>
                  <div className="font-oswald font-bold" style={{ color: C.ink }}>{r.name}</div>
                  <div className="text-xs mt-1" style={{ color: C.inkMuted }}>{r.role}</div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="py-16 px-6" style={{ backgroundColor: C.ink }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-oswald font-black text-4xl md:text-5xl mb-2" style={{ color: C.gold }}>ГОТОВЫ НАЧАТЬ?</h3>
            <p style={{ color: "rgba(245,239,227,0.5)" }}>Бесплатный замер и консультация — уже сегодня</p>
          </div>
          <button
            onClick={() => scrollTo("contacts")}
            className="font-oswald font-black px-12 py-5 text-sm tracking-widest uppercase flex-shrink-0 transition-all hover:scale-105"
            style={{ backgroundColor: C.gold, color: C.cream }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.goldLight)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.gold)}
          >
            Оставить заявку
          </button>
        </div>
      </div>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ backgroundColor: C.creamDark }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
              <span className="font-oswald text-xs tracking-[0.3em] uppercase" style={{ color: C.gold }}>Свяжитесь с нами</span>
            </div>
            <h2 className="font-oswald font-black text-4xl md:text-6xl mb-16" style={{ color: C.ink }}>КОНТАКТЫ</h2>
          </AnimSection>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <AnimSection>
              <div className="space-y-4">
                {[
                  { label: "Ваше имя", type: "text", placeholder: "Иван Петров" },
                  { label: "Телефон", type: "tel", placeholder: "+7 (999) 000-00-00" },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="font-oswald text-xs uppercase tracking-wider mb-2 block" style={{ color: C.inkMuted }}>{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-5 py-4 text-sm outline-none transition-colors"
                      style={{ backgroundColor: C.cream, border: `1px solid ${C.border}`, color: C.ink }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
                      onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                    />
                  </div>
                ))}
                <div>
                  <label className="font-oswald text-xs uppercase tracking-wider mb-2 block" style={{ color: C.inkMuted }}>Услуга</label>
                  <select
                    className="w-full px-5 py-4 text-sm outline-none transition-colors appearance-none"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.border}`, color: C.ink }}
                  >
                    <option value="">Выберите услугу</option>
                    <option>Дизайн-проект</option>
                    <option>Ремонт под ключ</option>
                    <option>Авторский надзор</option>
                    <option>Консультация</option>
                  </select>
                </div>
                <div>
                  <label className="font-oswald text-xs uppercase tracking-wider mb-2 block" style={{ color: C.inkMuted }}>Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Опишите ваш проект..."
                    className="w-full px-5 py-4 text-sm outline-none transition-colors resize-none"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.border}`, color: C.ink }}
                    onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
                    onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                  />
                </div>
                <button
                  className="w-full font-oswald font-black py-5 text-sm tracking-widest uppercase transition-all"
                  style={{ backgroundColor: C.gold, color: C.cream }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.ink)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.gold)}
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
                  { icon: "Mail", title: "Email", lines: ["hello@mastoras.ru", "Ответим в течение часа"] },
                  { icon: "MapPin", title: "Офис", lines: ["Москва, ул. Тверская, 15", "Рядом с м. Тверская"] },
                  { icon: "Instagram", title: "Соцсети", lines: ["@mastoras_design", "Проекты и процесс"] },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ border: `1px solid ${C.border}` }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
                    >
                      <Icon name={item.icon as "Phone"} size={18} style={{ color: C.inkMuted }} />
                    </div>
                    <div>
                      <div className="font-oswald font-bold text-xs uppercase tracking-widest mb-1" style={{ color: C.inkMuted }}>{item.title}</div>
                      {item.lines.map((l, j) => (
                        <div key={j} className={j === 0 ? "font-medium" : "text-sm"} style={{ color: j === 0 ? C.ink : C.inkMuted }}>{l}</div>
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
      <footer className="py-10 px-6" style={{ borderTop: `1px solid ${C.border}`, backgroundColor: C.cream }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Масторас" className="w-8 h-8 rounded-full object-cover" style={{ boxShadow: `0 0 0 1.5px ${C.gold}` }} />
            <span className="font-oswald text-xl font-bold" style={{ color: C.ink }}>
              МАС<span style={{ color: C.gold }}>ТО</span>РАС
            </span>
          </div>
          <div className="text-xs text-center" style={{ color: C.inkMuted }}>
            © 2024 Масторас. Все права защищены.
          </div>
          <div className="flex gap-4">
            {["Instagram", "MessageCircle", "Send"].map((icon, i) => (
              <button
                key={i}
                className="w-9 h-9 flex items-center justify-center transition-all"
                style={{ border: `1px solid ${C.border}` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
              >
                <Icon name={icon as "Instagram"} size={14} style={{ color: C.inkMuted }} />
              </button>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .paper-texture {
          background-color: var(--cream);
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(184,145,58,0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(184,145,58,0.05) 0%, transparent 50%);
        }
      `}</style>
    </div>
  );
};

export default Index;
