import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  CakeSlice,
  ChevronRight,
  Clock3,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Sparkles,
  Star,
  X
} from "lucide-react";
import "./styles.css";
import { cakes, categories } from "./data/cakes";
import { emailUrl, shop, whatsappUrl } from "./config/shop";

const logo = "./logo.png";

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [toast, setToast] = useState("");

  const filteredCakes = useMemo(
    () =>
      activeCategory === "All"
        ? cakes
        : cakes.filter((cake) => cake.category === activeCategory),
    [activeCategory]
  );

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const orderCake = (cake) => {
    const message = `Hi ${shop.name}! I would like to order:\n\nCake: ${cake.name}\nSize: ${cake.size}\nPlease share availability, flavours and delivery details.`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#home" onClick={() => scrollTo("home")}><img src={logo} alt="Customized Cakes" className="site-logo" />
            <span className="brand-icon"><CakeSlice size={22} /></span>
            <span>
              <strong>{shop.name}</strong>
              <small>Handcrafted celebrations</small>
            </span>
          </a>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            <button onClick={() => scrollTo("home")}>Home</button>
            <button onClick={() => scrollTo("cakes")}>Cakes</button>
            <button onClick={() => scrollTo("custom")}>Custom Order</button>
            <button onClick={() => scrollTo("about")}>About</button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
          </nav>

          <a className="nav-order" href={whatsappUrl("Hi! I would like to place a cake order.")} target="_blank" rel="noreferrer">
            Order on WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><Sparkles size={16} /> Cakes made for your moment</div>
              <h1>Your story deserves a <em>beautiful</em> cake.</h1>
              <p>
                Custom-designed cakes for birthdays, weddings, anniversaries and every
                celebration that deserves something unforgettable.
              </p>
              <div className="hero-actions">
                <button className="btn primary" onClick={() => scrollTo("cakes")}>
                  Explore Cakes <ChevronRight size={18} />
                </button>
                <button className="btn secondary" onClick={() => setCustomOpen(true)}>
                  Design My Cake
                </button>
              </div>
              <div className="hero-trust">
                <div><Star size={16} fill="currentColor" /> Freshly baked</div>
                <div><Heart size={16} fill="currentColor" /> Made to order</div>
                <div><Sparkles size={16} /> Custom designs</div>
              </div>
            </div>

            <div className="hero-art">
              <div className="cake-photo-wrap">
                <img
                  src="https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1200&q=90"
                  alt="Beautiful custom celebration cake"
                />
              </div>
              <div className="floating-card">
                <span className="mini-icon"><CakeSlice size={18} /></span>
                <div><strong>Made just for you</strong><small>Custom flavours & designs</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container feature-grid">
            <div><CakeSlice /><span><strong>Handcrafted</strong><small>Every cake is prepared with care</small></span></div>
            <div><Clock3 /><span><strong>Made Fresh</strong><small>Freshly baked for your celebration</small></span></div>
            <div><Heart /><span><strong>Personalised</strong><small>Choose your flavour and design</small></span></div>
            <div><MessageCircle /><span><strong>Easy Ordering</strong><small>Order directly on WhatsApp</small></span></div>
          </div>
        </section>

        <section id="cakes" className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Our collection</span>
                <h2>Find your perfect cake</h2>
              </div>
              <p>Pick a design you love or tell us what you have in mind. We can customise it for you.</p>
            </div>

            <div className="category-row">
              {categories.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "category active" : "category"}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="cake-grid">
              {filteredCakes.map((cake) => (
                <article className="cake-card" key={cake.id}>
                  <div className="cake-image">
                    <img src={cake.image} alt={cake.name} loading="lazy" />
                    <span className="tag">{cake.category}</span>
                  </div>
                  <div className="cake-info">
                    <div className="cake-title-row">
                      <h3>{cake.name}</h3>
                      
                    </div>
                    <p>{cake.description}</p>
                    <div className="cake-bottom">
                      <small>{cake.size} · Custom design</small>
                      <button onClick={() => orderCake(cake)}>Order <ChevronRight size={16} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="custom" className="custom-section">
          <div className="container custom-grid">
            <div className="custom-copy">
              <span className="eyebrow">Make it yours</span>
              <h2>Have a cake idea in your mind?</h2>
              <p>
                Send us your reference image, theme, flavour, size and event date.
                We'll turn your idea into a cake designed especially for you.
              </p>
              <div className="custom-points">
                <div><span>01</span><p><strong>Tell us your idea</strong><br />Share a photo or describe your dream cake.</p></div>
                <div><span>02</span><p><strong>Choose your details</strong><br />Flavour, size, colours, theme and message.</p></div>
                <div><span>03</span><p><strong>Confirm your order</strong><br />We'll share the final price and availability.</p></div>
              </div>
              <button className="btn primary" onClick={() => setCustomOpen(true)}>Start Custom Order <ChevronRight size={18} /></button>
            </div>
            <div className="custom-visual">
              <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85" alt="Chocolate custom cake" />
              <div className="visual-note"><Sparkles size={17} /><span>Every detail can be customised</span></div>
            </div>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="container about-grid">
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=85" alt="Freshly baked cake" loading="lazy" />
            </div>
            <div>
              <span className="eyebrow">Why {shop.name}</span>
              <h2>Small details. Big celebrations.</h2>
              <p>
                We believe a cake is more than dessert. It is the centrepiece of a
                memory. That's why every order is prepared with attention to flavour,
                finish and the little details that make it yours.
              </p>
              <div className="stats">
                <div><strong>100%</strong><span>Made to order</span></div>
                <div><strong>Fresh</strong><span>Ingredients</span></div>
                <div><strong>Custom</strong><span>Designs</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container cta-inner">
            <div>
              <span className="eyebrow">Ready to celebrate?</span>
              <h2>Let's create your dream cake.</h2>
              <p>Send us your requirements on WhatsApp and we'll take it from there.</p>
            </div>
            <a className="btn light" href={whatsappUrl("Hi! I want to create a custom cake. Please help me with the options.")} target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div className="container">
            <div className="section-heading centered">
              <div>
                <span className="eyebrow">Get in touch</span>
                <h2>Let's make something sweet</h2>
              </div>
              <p>For orders, custom designs and availability, contact us directly.</p>
            </div>

            <div className="contact-grid">
              <a href={whatsappUrl("Hi! I would like to enquire about a cake.")} target="_blank" rel="noreferrer" className="contact-card">
                <span><MessageCircle /></span>
                <div><small>WhatsApp</small><strong>Chat with us</strong><p>Fastest way to place an order</p></div>
              </a>
              <a href={`tel:+91${shop.phone}`} className="contact-card">
                <span><Phone /></span>
                <div><small>Call us</small><strong>+91 {shop.phone}</strong><p>Speak to us about your cake</p></div>
              </a>
              <a href={emailUrl("Cake enquiry", "Hi Customized Cakes,\n\nI would like to enquire about a cake.\n\n")} className="contact-card">
                <span><Mail /></span>
                <div><small>Email</small><strong>{shop.email}</strong><p>For detailed enquiries</p></div>
              </a>
              <div className="contact-card">
                <span><MapPin /></span>
                <div><small>Location</small><strong>{shop.city}</strong><p>Delivery availability can be confirmed on WhatsApp</p></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <span className="brand-icon"><CakeSlice size={22} /></span>
              <span><strong>{shop.name}</strong><small>Handcrafted celebrations</small></span>
            </a>
            <p>Beautiful cakes, made fresh and customised for your special moments.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <button onClick={() => scrollTo("cakes")}>Cakes</button>
            <button onClick={() => scrollTo("custom")}>Custom Order</button>
            <button onClick={() => scrollTo("about")}>About Us</button>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={whatsappUrl("Hi! I would like to enquire about a cake.")} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={`tel:+91${shop.phone}`}>+91 {shop.phone}</a>
            <a href={emailUrl("Cake enquiry")}>{shop.email}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container"><span>© {new Date().getFullYear()} {shop.name}. All rights reserved.</span><span>Made with <Heart size={14} fill="currentColor" /> for celebrations.</span></div>
        </div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl("Hi! I would like to enquire about a cake.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <MessageCircle />
      </a>

      {selectedCake && (
        <div className="modal-backdrop" onClick={() => setSelectedCake(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCake(null)}><X /></button>
            <img src={selectedCake.image} alt={selectedCake.name} />
            <div className="modal-content">
              <span className="eyebrow">{selectedCake.category}</span>
              <h2>{selectedCake.name}</h2>
              <p>{selectedCake.description}</p>
              <strong className="modal-price">{shop.currency}{selectedCake.price} <small>starting price</small></strong>
              <button className="btn primary full" onClick={() => orderCake(selectedCake)}>Order on WhatsApp</button>
            </div>
          </div>
        </div>
      )}

      {customOpen && <CustomOrderModal onClose={() => setCustomOpen(false)} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function CustomOrderModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    date: "",
    flavour: "",
    size: "1 kg",
    theme: "",
    budget: "",
    message: ""
  });

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    const text = `Hi ${shop.name}! I want a custom cake.\n\nName: ${form.name}\nEvent date: ${form.date}\nFlavour: ${form.flavour}\nSize: ${form.size}\nTheme/design: ${form.theme}\nBudget: ${form.budget || "Not specified"}\nAdditional details: ${form.message || "None"}\n\nPlease let me know the availability and price.`;
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X /></button>
        <div className="form-heading">
          <span className="eyebrow">Custom cake</span>
          <h2>Tell us what you're imagining</h2>
          <p>Submit the details and WhatsApp will open with your enquiry ready to send.</p>
        </div>
        <form onSubmit={submit}>
          <div className="form-grid">
            <label>Name<input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" /></label>
            <label>Event date<input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} /></label>
            <label>Flavour<input required value={form.flavour} onChange={(e) => update("flavour", e.target.value)} placeholder="Chocolate, vanilla..." /></label>
            <label>Size<select value={form.size} onChange={(e) => update("size", e.target.value)}><option>0.5 kg</option><option>1 kg</option><option>1.5 kg</option><option>2 kg</option><option>3 kg+</option></select></label>
            <label>Theme / design<input value={form.theme} onChange={(e) => update("theme", e.target.value)} placeholder="Floral, football, cartoon..." /></label>
            <label>Budget<input value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder="₹ Approx." /></label>
          </div>
          <label>Additional details<textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Cake message, colours, reference image details, delivery area..." rows="4" /></label>
          <button className="btn primary full" type="submit"><MessageCircle size={18} /> Send Custom Order on WhatsApp</button>
        </form>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
