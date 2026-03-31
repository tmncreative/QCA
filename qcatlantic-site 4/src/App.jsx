import { useState, useEffect } from "react";
import PaymentPage from "./PaymentPage";

const COLORS = {
  teal: "#1B6E8A",
  tealDark: "#134E63",
  tealDeep: "#0C2F3D",
  green: "#00D455",
  greenBright: "#00E85E",
  greenDark: "#00A843",
  white: "#FFFFFF",
  offWhite: "#F4F8F9",
  lightTeal: "rgba(27, 110, 138, 0.06)",
  grayText: "#5A6B73",
  grayLight: "#8A9BA3",
  dark: "#091E27",
};

const FONTS = {
  heading: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', 'Helvetica Neue', sans-serif",
};

// Hexagon Logo
function Logo({ size = 48 }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110">
      <path d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" fill={COLORS.teal} />
      <path d="M10 72.5 L10 98 L28 98 L10 72.5Z" fill={COLORS.teal} />
      <path d="M50 15 L82 33 L82 67 L50 85 L18 67 L18 33 Z" fill={COLORS.white} />
      <path d="M50 22 L76 37 L76 63 L50 78 L24 63 L24 37 Z" fill="none" stroke={COLORS.green} strokeWidth="5" />
      <path d="M57 57 C57 61 54 64 51 64 C48 64 45 61 45 57 C45 53 51 46 51 46 C51 46 57 53 57 57Z" fill={COLORS.teal} />
    </svg>
  );
}

// Nav
function Nav({ currentPage, setPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const pages = ["Home", "Products", "About", "Contact", "Pay"];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "10px 0" : "18px 0",
        background: scrolled ? "rgba(12, 47, 61, 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.35s ease",
        borderBottom: scrolled ? `1px solid rgba(0, 212, 85, 0.12)` : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => setPage("Home")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
        >
          <Logo size={32} />
          <span
            style={{
              fontFamily: FONTS.heading,
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.white,
              letterSpacing: "-0.01em",
            }}
          >
            QC Atlantic
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setPage(page)}
              style={{
                background: "none",
                border: "none",
                fontFamily: FONTS.body,
                fontSize: 13,
                fontWeight: currentPage === page ? 600 : 400,
                color: currentPage === page ? COLORS.green : "rgba(255,255,255,0.7)",
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "4px 0",
                borderBottom: currentPage === page ? `2px solid ${COLORS.green}` : "2px solid transparent",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== page) e.target.style.color = COLORS.greenBright;
              }}
              onMouseLeave={(e) => {
                if (currentPage !== page) e.target.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setPage("Contact")}
            style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              fontWeight: 600,
              padding: "10px 24px",
              background: COLORS.green,
              color: COLORS.dark,
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              borderRadius: 2,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.background = COLORS.greenBright)}
            onMouseLeave={(e) => (e.target.style.background = COLORS.green)}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

function SectionLabel({ text }) {
  return (
    <div
      style={{
        fontFamily: FONTS.body,
        fontSize: 12,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: COLORS.green,
        marginBottom: 14,
        fontWeight: 600,
      }}
    >
      {text}
    </div>
  );
}

// Home Page
function HomePage({ setPage }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div>
      <section
        style={{
          minHeight: "100vh",
          background: `linear-gradient(160deg, ${COLORS.dark} 0%, ${COLORS.tealDeep} 40%, ${COLORS.tealDark} 100%)`,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage: `radial-gradient(circle, ${COLORS.green} 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, transparent 10%, ${COLORS.green} 50%, transparent 90%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-5%",
            top: "10%",
            width: 2,
            height: "80%",
            background: `linear-gradient(180deg, transparent, ${COLORS.green}22, transparent)`,
            transform: "rotate(-15deg)",
          }}
        />

        <div
          style={{
            maxWidth: 880,
            margin: "0 auto",
            padding: "140px 32px 100px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <SectionLabel text="Custom-Fit Car Wash Chemistry" />
          <h1
            style={{
              fontFamily: FONTS.heading,
              fontSize: "clamp(44px, 7vw, 80px)",
              fontWeight: 700,
              color: COLORS.white,
              lineHeight: 1.05,
              margin: "0 0 24px 0",
              letterSpacing: "-0.03em",
            }}
          >
            Chemistry.
            <br />
            <span style={{ color: COLORS.green, fontStyle: "italic" }}>Not Soap.</span>
          </h1>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 18,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 540,
              margin: "0 auto 48px",
              lineHeight: 1.7,
            }}
          >
            Car wash chemistry custom fit to your tunnel, your water, and your market. Cleaner cars, drier cars, shinier cars, and a lower cost per car.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setPage("Contact")}
              style={{
                fontFamily: FONTS.body,
                fontSize: 15,
                fontWeight: 600,
                padding: "16px 40px",
                background: COLORS.green,
                color: COLORS.dark,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius: 2,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => (e.target.style.background = COLORS.greenBright)}
              onMouseLeave={(e) => (e.target.style.background = COLORS.green)}
            >
              Schedule a Trial
            </button>
            <button
              onClick={() => setPage("Products")}
              style={{
                fontFamily: FONTS.body,
                fontSize: 15,
                fontWeight: 500,
                padding: "16px 40px",
                background: "transparent",
                color: COLORS.white,
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius: 2,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = COLORS.green;
                e.target.style.color = COLORS.green;
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.2)";
                e.target.style.color = COLORS.white;
              }}
            >
              See Our Chemistry
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: COLORS.white, borderBottom: `1px solid ${COLORS.lightTeal}` }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "52px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 32,
            textAlign: "center",
          }}
        >
          {[
            { number: "10+", label: "Years Custom-Fitting Chemistry" },
            { number: "1", label: "Point of Contact. Always." },
            { number: "100%", label: "Operator-Minded" },
          ].map((s, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 42,
                  fontWeight: 700,
                  color: COLORS.teal,
                  lineHeight: 1,
                }}
              >
                {s.number}
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 13,
                  color: COLORS.grayLight,
                  marginTop: 8,
                  letterSpacing: "0.02em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Value Props */}
      <section style={{ background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel text="Why QC Atlantic" />
            <h2
              style={{
                fontFamily: FONTS.heading,
                fontSize: "clamp(28px, 4vw, 42px)",
                color: COLORS.tealDeep,
                margin: 0,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Complete Control of Your Chemistry
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28,
            }}
          >
            {[
              {
                icon: "⚗️",
                title: "Custom-Fit to Your Wash",
                desc: "Every tunnel is different. We custom fit chemistry to your equipment, water quality, tunnel length, and dwell time. You get complete control over cleaning power, foam profile, and cost per car, all dialed independently.",
              },
              {
                icon: "📊",
                title: "Cleaner. Drier. Shinier.",
                desc: "Every application we set up is designed with drying in mind. From dual pH presoaks that tackle both organic and inorganic soils to protectants that prep the surface for a spot-free finish, the whole system works together.",
              },
              {
                icon: "🤝",
                title: "Service Starts at the Sale",
                desc: "You deal with Winston directly. Not a call center, not a regional manager. When you have a problem at 6am on a Saturday, you get someone who has spent a decade solving those exact problems in backrooms across the country.",
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: COLORS.white,
                  padding: 40,
                  border: `1px solid rgba(27, 110, 138, 0.08)`,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(27, 110, 138, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.green})`,
                  }}
                />
                <div style={{ fontSize: 32, marginBottom: 20 }}>{card.icon}</div>
                <h3
                  style={{
                    fontFamily: FONTS.heading,
                    fontSize: 22,
                    fontWeight: 700,
                    color: COLORS.tealDeep,
                    margin: "0 0 12px 0",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 15,
                    color: COLORS.grayText,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: `linear-gradient(135deg, ${COLORS.tealDeep}, ${COLORS.tealDark})`,
          padding: "80px 32px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.green}08, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: FONTS.heading,
              fontSize: "clamp(26px, 3.5vw, 38px)",
              color: COLORS.white,
              margin: "0 0 12px 0",
              fontWeight: 700,
            }}
          >
            Ready to own the car?
          </h2>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 36px 0",
            }}
          >
            Schedule a trial and we'll custom fit a chemistry program to your wash. No contracts, no pressure. Just results.
          </p>
          <button
            onClick={() => setPage("Contact")}
            style={{
              fontFamily: FONTS.body,
              fontSize: 15,
              fontWeight: 600,
              padding: "16px 44px",
              background: COLORS.green,
              color: COLORS.dark,
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              borderRadius: 2,
            }}
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}

// Products Page
function ProductsPage({ setPage }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const blairProducts = [
    {
      name: "Presoaks",
      tag: "Cleaning",
      desc: "Hi and Lo pH presoaks formulated with varying blends of acids and surfactants to penetrate and remove road film, oil, grease, bug residue, and mineral deposits. Available in HF, ABF, and acid-alternative formulations for touchless, friction, and self-serve applications.",
      products: ["Hi-pH Presoak", "Lo-pH Presoak", "Impact Detergent", "Acid Alternative Presoak"],
    },
    {
      name: "Ceramic Protectants",
      tag: "Premium",
      desc: "Blair's exclusive ceramic-infused line uses silica layering technology that builds with each wash. Quartz fills small surface imperfections over repeated use, leaving a deep mirror finish. Defender provides true hydrophobic clear coat protection with UV blockers. These are the products that drive membership upgrades.",
      products: ["Quartz Full Body Protectant", "Defender Clear Coat", "Ceramic Shine", "Ceramic Gloss (IBA)", "Extreme Gloss Lava Polish"],
    },
    {
      name: "Foam & Conditioning",
      tag: "The Big Show",
      desc: "High-foaming shampoos and tri-color conditioners that deliver the visual impact customers expect. Deep cleaning, quick rinsing, pH-neutralizing formulas that prep the surface for protectants and drying. Ceramic-infused options available across the line.",
      products: ["Wicked Wash Triple Foam", "Ceramic Foaming Shampoo", "Conditioning Shampoo"],
    },
    {
      name: "Drying & Finish",
      tag: "The Finish",
      desc: "Ram Dry drying agent with ceramic properties aids rapid water removal without streaking. Non-MSO formula. Every Blair application is designed with drying in mind, so vehicles roll out cleaner and drier with less blower power.",
      products: ["Ram Dry Drying Agent", "Spot-Free Rinse", "Rain Repellent"],
    },
    {
      name: "Wheel, Tire & Specialty",
      tag: "Specialty",
      desc: "High-shine solvent-based nano-fortified tire dressing plus water-based options. Lo-pH wheel cleaners that cut through brake dust and oxidation. Underbody rust inhibitor that fights corrosion from road salt and mud. Injection fragrances available in 8+ scents.",
      products: ["Tire Dressing", "Wheel Brightener", "Underbody Rust Inhibitor", "Don't Bug Me Remover", "Injection Fragrances"],
    },
  ];

  const oasisProducts = [
    {
      name: "Typhoon",
      tag: "High Volume",
      desc: "The fastest touchless automatic on the market. Up to 40 cars per hour with dual-bridge high-pressure turbo nozzles, intelligent vehicle scanning, and hydraulic gear drive. Built for high-volume locations that need maximum throughput without sacrificing wash quality.",
      products: ["Dual-Step Presoak", "Turbo Nozzles", "XPert Monitoring", "Buy-Up Technology", "5-Year Warranty"],
    },
    {
      name: "Eclipse",
      tag: "Unattended",
      desc: "Touchless automatic designed for 24/7 unattended operation. Wall-mounted frame and elevated carriage protect the unit from strike damage, chemicals, and grime. Open bay design increases throughput and customer comfort. Eco-Wash package comes standard.",
      products: ["Wall-Mounted Frame", "Smart Dryer Integration", "Eco-Wash Package", "Remote Diagnostics", "5-Year Warranty"],
    },
    {
      name: "XP",
      tag: "Touchless",
      desc: "Single-bridge, two-arm touchless automatic. A proven performer for locations that need reliable touchless cleaning at a lower price point than the Typhoon. Still faster than most competitors. Same Oasis build quality and warranty.",
      products: ["Single Bridge Design", "Two-Arm System", "Vehicle Scanning", "XPert Monitoring", "5-Year Warranty"],
    },
    {
      name: "BayWash i5",
      tag: "Soft-Touch",
      desc: "Oasis took the proven Sonny's i5 platform and loaded it with upgrades. Top washes run around 4:20 with ceramic included. Multiple processes per pass keep cycle times tight. One of the best friction machines on the market for in-bay automatic operators.",
      products: ["Friction Wash System", "Multi-Process Passes", "Ceramic Compatible", "Wheel Blasters", "5-Year Warranty"],
    },
    {
      name: "Self-Service & Drying",
      tag: "Support Systems",
      desc: "JetStream self-service equipment for operators adding self-serve bays. Adapt and GaleForce high-velocity drying systems that integrate with any Oasis automatic for a complete, hands-free finish.",
      products: ["JetStream Self-Service", "Adapt Drying System", "GaleForce Dryers"],
    },
  ];

  return (
    <div>
      <section
        style={{
          background: `linear-gradient(160deg, ${COLORS.dark} 0%, ${COLORS.tealDeep} 100%)`,
          padding: "160px 32px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <SectionLabel text="Product Lines" />
          <h1
            style={{
              fontFamily: FONTS.heading,
              fontSize: "clamp(32px, 5vw, 52px)",
              color: COLORS.white,
              margin: "0 0 16px 0",
              fontWeight: 700,
            }}
          >
            Chemistry + Equipment
          </h1>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 17,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Chemistry by Blair Ceramics. Equipment by Oasis Car Wash Systems. Custom fit to your wash by QC Atlantic.
          </p>
        </div>
      </section>

      {/* Reusable product card renderer */}
      {[
        { title: "Blair Ceramics", subtitle: "Chemistry", items: blairProducts, intro: "30+ years of car wash chemistry innovation. Blair's exclusive ceramic-infused line uses silica layering technology that builds protection with every wash. Full product range from presoaks to protectants, all formulated for tunnel, in-bay, and self-serve applications.", color: COLORS.green },
        { title: "Oasis Car Wash Systems", subtitle: "Equipment", items: oasisProducts, intro: "Family-owned since 1964. Oasis builds the most dependable high-pressure automatics in the industry. From the Typhoon (fastest touchless on the market) to the BayWash i5 (best-in-class soft-touch), every unit comes with a 5-year warranty and Oasis's XPert remote monitoring.", color: COLORS.teal },
      ].map((section, si) => (
        <section key={si} style={{ background: si === 0 ? COLORS.offWhite : COLORS.white }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
            <div style={{ marginBottom: 48 }}>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: section.color,
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                {section.subtitle}
              </div>
              <h2
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: "clamp(26px, 3.5vw, 36px)",
                  color: COLORS.tealDeep,
                  margin: "0 0 12px 0",
                  fontWeight: 700,
                }}
              >
                {section.title}
              </h2>
              <p
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 15,
                  color: COLORS.grayText,
                  lineHeight: 1.7,
                  maxWidth: 700,
                  margin: 0,
                }}
              >
                {section.intro}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: 24,
              }}
            >
              {section.items.map((cat, i) => (
                <div
                  key={i}
                  style={{
                    background: si === 0 ? COLORS.white : COLORS.offWhite,
                    border: `1px solid rgba(27, 110, 138, 0.08)`,
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(27, 110, 138, 0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      height: 3,
                      background: `linear-gradient(90deg, ${COLORS.teal}, ${section.color})`,
                    }}
                  />
                  <div style={{ padding: "28px 32px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 14,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: FONTS.heading,
                          fontSize: 23,
                          fontWeight: 700,
                          color: COLORS.tealDeep,
                          margin: 0,
                        }}
                      >
                        {cat.name}
                      </h3>
                      <span
                        style={{
                          fontFamily: FONTS.body,
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: COLORS.teal,
                          background: COLORS.lightTeal,
                          padding: "4px 10px",
                          borderRadius: 2,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cat.tag}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: 14,
                        color: COLORS.grayText,
                        lineHeight: 1.7,
                        margin: "0 0 20px 0",
                      }}
                    >
                      {cat.desc}
                    </p>
                    <div
                      style={{
                        borderTop: `1px solid rgba(27, 110, 138, 0.08)`,
                        paddingTop: 16,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      {cat.products.map((p, j) => (
                        <span
                          key={j}
                          style={{
                            fontFamily: FONTS.body,
                            fontSize: 12,
                            color: COLORS.teal,
                            background: si === 0 ? COLORS.offWhite : COLORS.white,
                            padding: "5px 12px",
                            borderRadius: 2,
                            fontWeight: 500,
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section
        style={{
          background: COLORS.tealDeep,
          padding: "72px 32px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.heading,
            fontSize: "clamp(24px, 3.5vw, 34px)",
            color: COLORS.white,
            margin: "0 0 12px 0",
            fontWeight: 700,
          }}
        >
          Need chemistry, equipment, or both?
        </h2>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 15,
            color: "rgba(255,255,255,0.5)",
            margin: "0 0 32px 0",
          }}
        >
          We'll visit your site, evaluate your setup, and build a program that covers everything from presoak to drying system.
        </p>
        <button
          onClick={() => setPage("Contact")}
          style={{
            fontFamily: FONTS.body,
            fontSize: 14,
            fontWeight: 600,
            padding: "14px 40px",
            background: COLORS.green,
            color: COLORS.dark,
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            borderRadius: 2,
          }}
        >
          Request a Consultation
        </button>
      </section>
    </div>
  );
}

// About Page
function AboutPage({ setPage }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const timeline = [
    { year: "2016", role: "Territory Manager", co: "Carolina Pride Carwash Systems", note: "Top Sales Rep and Top Growth Rep. Managed all customer acquisition, deliveries, and chemical programs across the Charlotte territory." },
    { year: "2019", role: "Senior Account Manager", co: "Qual Chem LLC", note: "Built the Colorado territory from zero. Grew it 30%+ year over year working with top-tier operators." },
    { year: "2022", role: "Outside Sales Representative", co: "DuraServ", note: "Expanded into the Fort Myers, FL market." },
    { year: "2023", role: "Chemical Sales Manager", co: "AUTEC Car Wash Systems", note: "Managed chemical sales nationally for 2.5 years across tunnel and in-bay configurations." },
    { year: "2025", role: "Chemical Sales", co: "Anova", note: "Final year in corporate chemical sales before going independent." },
    { year: "2026", role: "Founder & President", co: "QC Atlantic", note: "Chemistry. Not Soap. Serving operators across the Atlantic region from Clemmons, NC.", highlight: true },
  ];

  return (
    <div>
      <section
        style={{
          background: `linear-gradient(160deg, ${COLORS.dark} 0%, ${COLORS.tealDeep} 100%)`,
          padding: "160px 32px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <SectionLabel text="About QC Atlantic" />
          <h1
            style={{
              fontFamily: FONTS.heading,
              fontSize: "clamp(32px, 5vw, 52px)",
              color: COLORS.white,
              margin: "0 0 16px 0",
              fontWeight: 700,
            }}
          >
            Operator-Minded from Day One
          </h1>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 17,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Winston Matney has spent his career inside car wash backrooms, diagnosing chemistry problems and helping operators produce the cleanest, driest, shiniest cars in their markets.
          </p>
        </div>
      </section>

      <section style={{ background: COLORS.white }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 32px" }}>
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 17,
              color: COLORS.grayText,
              lineHeight: 1.8,
            }}
          >
            <p style={{ margin: "0 0 24px 0" }}>
              QC Atlantic was founded in Clemmons, North Carolina by a car wash chemical veteran who saw the same problem at every company he worked for: operators were getting chemistry that was close enough, but never truly dialed in.
            </p>
            <p style={{ margin: "0 0 24px 0" }}>
              Winston spent a decade at companies like Qual Chem, Carolina Pride, DuraServ, AUTEC, and Anova. He built territories from scratch, grew established markets 30%+ year over year, and earned Top Sales Rep and Top Growth Rep honors along the way. More importantly, he learned how different chemistry platforms perform across different equipment, water qualities, climates, and tunnel configurations.
            </p>
            <p style={{ margin: "0 0 24px 0" }}>
              That experience is the foundation of QC Atlantic. When we custom fit chemistry to your wash, we are drawing on thousands of hours in tunnels across the Southeast, the West, and Florida. We know what works in hard water and soft water, in 120-foot tunnels and 60-foot express washes, during peak bug season and mild winters.
            </p>
            <p style={{ margin: "0 0 24px 0" }}>
              At QC Atlantic, you are not handed off to a territory rep. Winston is your point of contact from trial through ongoing service. When a problem comes up, you talk to the person who can solve it, not someone who needs to escalate.
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: FONTS.heading,
                fontSize: 22,
                fontWeight: 700,
                color: COLORS.tealDeep,
                fontStyle: "italic",
              }}
            >
              Chemistry for car wash operators, backed by someone who has been in your backroom.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: COLORS.offWhite }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="Experience" />
            <h2
              style={{
                fontFamily: FONTS.heading,
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.tealDeep,
                margin: 0,
              }}
            >
              10 Years Across the Industry
            </h2>
          </div>

          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 59,
                top: 0,
                bottom: 0,
                width: 2,
                background: `linear-gradient(180deg, ${COLORS.teal}33, ${COLORS.green}66, ${COLORS.green})`,
              }}
            />
            {timeline.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 28,
                  marginBottom: i < timeline.length - 1 ? 36 : 0,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    fontWeight: 700,
                    color: item.highlight ? COLORS.green : COLORS.grayLight,
                    minWidth: 48,
                    textAlign: "right",
                    paddingTop: 14,
                  }}
                >
                  {item.year}
                </div>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: item.highlight ? COLORS.green : COLORS.teal,
                    border: `3px solid ${COLORS.offWhite}`,
                    marginTop: 16,
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                    boxShadow: item.highlight ? `0 0 0 4px ${COLORS.green}33` : "none",
                  }}
                />
                <div
                  style={{
                    background: COLORS.white,
                    padding: "16px 24px",
                    border: item.highlight
                      ? `2px solid ${COLORS.green}44`
                      : `1px solid rgba(27, 110, 138, 0.08)`,
                    borderRadius: 3,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.heading,
                      fontSize: 17,
                      fontWeight: 700,
                      color: COLORS.tealDeep,
                      marginBottom: 2,
                    }}
                  >
                    {item.role}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 14,
                      fontWeight: 600,
                      color: COLORS.teal,
                      marginBottom: 6,
                    }}
                  >
                    {item.co}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 13,
                      color: COLORS.grayLight,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: COLORS.tealDeep,
          padding: "72px 32px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.heading,
            fontSize: 32,
            color: COLORS.white,
            margin: "0 0 32px 0",
            fontWeight: 700,
          }}
        >
          Let's talk about your wash.
        </h2>
        <button
          onClick={() => setPage("Contact")}
          style={{
            fontFamily: FONTS.body,
            fontSize: 14,
            fontWeight: 600,
            padding: "14px 40px",
            background: COLORS.green,
            color: COLORS.dark,
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            borderRadius: 2,
          }}
        >
          Get in Touch
        </button>
      </section>
    </div>
  );
}

// Contact Page
function ContactPage() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", washes: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const handleSubmit = () => {
    if (form.name && form.email) setSubmitted(true);
  };

  const inputStyle = {
    fontFamily: FONTS.body,
    fontSize: 15,
    padding: "14px 16px",
    border: `1px solid rgba(27, 110, 138, 0.15)`,
    borderRadius: 2,
    background: COLORS.white,
    color: COLORS.tealDeep,
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle = {
    fontFamily: FONTS.body,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: COLORS.teal,
    marginBottom: 6,
    display: "block",
  };

  return (
    <div>
      <section
        style={{
          background: `linear-gradient(160deg, ${COLORS.dark} 0%, ${COLORS.tealDeep} 100%)`,
          padding: "160px 32px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <SectionLabel text="Get Started" />
          <h1
            style={{
              fontFamily: FONTS.heading,
              fontSize: "clamp(32px, 5vw, 52px)",
              color: COLORS.white,
              margin: "0 0 16px 0",
              fontWeight: 700,
            }}
          >
            Let's Talk Chemistry
          </h1>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 17,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Whether you run 1 tunnel or 20 locations, we'll build a chemical program around your operation.
          </p>
        </div>
      </section>

      <section style={{ background: COLORS.offWhite }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "80px 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
          }}
        >
          <div>
            {submitted ? (
              <div
                style={{
                  padding: 48,
                  background: COLORS.white,
                  border: `2px solid ${COLORS.green}44`,
                  borderRadius: 3,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16, color: COLORS.green }}>✓</div>
                <h3
                  style={{
                    fontFamily: FONTS.heading,
                    fontSize: 24,
                    color: COLORS.tealDeep,
                    margin: "0 0 8px 0",
                  }}
                >
                  Message Received
                </h3>
                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 15,
                    color: COLORS.grayText,
                    margin: 0,
                  }}
                >
                  Winston will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input
                    style={inputStyle}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    onFocus={(e) => (e.target.style.borderColor = COLORS.teal)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(27, 110, 138, 0.15)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    style={inputStyle}
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    onFocus={(e) => (e.target.style.borderColor = COLORS.teal)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(27, 110, 138, 0.15)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input
                    style={inputStyle}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(000) 000-0000"
                    onFocus={(e) => (e.target.style.borderColor = COLORS.teal)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(27, 110, 138, 0.15)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>I am a...</label>
                  <select
                    style={{ ...inputStyle, cursor: "pointer" }}
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="">Select one</option>
                    <option value="operator">Car Wash Operator</option>
                    <option value="distributor">Distributor</option>
                    <option value="investor">Investor / Multi-Site Owner</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Number of Wash Locations</label>
                  <input
                    style={inputStyle}
                    value={form.washes}
                    onChange={(e) => setForm({ ...form, washes: e.target.value })}
                    placeholder="e.g. 3"
                    onFocus={(e) => (e.target.style.borderColor = COLORS.teal)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(27, 110, 138, 0.15)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your wash and what you're looking for."
                    onFocus={(e) => (e.target.style.borderColor = COLORS.teal)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(27, 110, 138, 0.15)")}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 15,
                    fontWeight: 600,
                    padding: "16px 0",
                    background: COLORS.green,
                    color: COLORS.dark,
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    borderRadius: 2,
                    width: "100%",
                    transition: "all 0.2s ease",
                    opacity: form.name && form.email ? 1 : 0.5,
                  }}
                  onMouseEnter={(e) => (e.target.style.background = COLORS.greenBright)}
                  onMouseLeave={(e) => (e.target.style.background = COLORS.green)}
                >
                  Send Message
                </button>
              </div>
            )}
          </div>

          <div>
            <div
              style={{
                background: COLORS.white,
                padding: 36,
                border: `1px solid rgba(27, 110, 138, 0.08)`,
                borderRadius: 3,
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.tealDeep,
                  margin: "0 0 24px 0",
                }}
              >
                Direct Contact
              </h3>
              {[
                { label: "Winston Matney", value: "President, Owner" },
                { label: "Phone", value: "(336) 909-8321" },
                { label: "Email", value: "wmatney@qcatlantic.com" },
                { label: "Location", value: "Clemmons, North Carolina" },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: i < 3 ? 18 : 0 }}>
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: COLORS.grayLight,
                      marginBottom: 2,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 16,
                      color: COLORS.tealDeep,
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: `linear-gradient(135deg, ${COLORS.tealDeep}, ${COLORS.tealDark})`,
                padding: 32,
                borderRadius: 3,
              }}
            >
              <h4
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 18,
                  fontWeight: 700,
                  color: COLORS.white,
                  margin: "0 0 12px 0",
                }}
              >
                Follow QC Atlantic
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a
                  href="https://www.linkedin.com/company/quality-car-atlantic/about/"
                  target="_blank"
                  rel="noopener"
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 14,
                    color: COLORS.green,
                    textDecoration: "none",
                  }}
                >
                  LinkedIn →
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61575448862175"
                  target="_blank"
                  rel="noopener"
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 14,
                    color: COLORS.green,
                    textDecoration: "none",
                  }}
                >
                  Facebook →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Footer
function Footer() {
  return (
    <footer
      style={{
        background: COLORS.dark,
        padding: "48px 32px 32px",
        borderTop: `1px solid rgba(0, 212, 85, 0.08)`,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={28} />
          <span
            style={{
              fontFamily: FONTS.heading,
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.white,
            }}
          >
            QC Atlantic
          </span>
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          © 2026 Quality Car Atlantic. Clemmons, NC.
        </div>
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 15,
            fontWeight: 700,
            color: COLORS.green,
            fontStyle: "italic",
          }}
        >
          Chemistry. Not Soap.
        </div>
      </div>
    </footer>
  );
}

// App
export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const setPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Home": return <HomePage setPage={setPage} />;
      case "Products": return <ProductsPage setPage={setPage} />;
      case "About": return <AboutPage setPage={setPage} />;
      case "Contact": return <ContactPage />;
      case "Pay": return <PaymentPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.offWhite }}>
      <Nav currentPage={currentPage} setPage={setPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}