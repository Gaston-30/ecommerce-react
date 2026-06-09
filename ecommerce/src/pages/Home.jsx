import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import Hero from "../components/Hero"
import ProductSection from "../components/ProductSection"
import useProducts from "../hooks/useProducts"
import { useFilter } from "../context/FilterContext"
import CampaignBanner from "../components/CampaignBanner"

function FeatureCard({ icon, title, description, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      style={stylesHome.featureCard}
    >
      <span style={stylesHome.featureIcon}>{icon}</span>
      <h3 style={stylesHome.featureTitle}>{title}</h3>
      <p style={stylesHome.featureText}>{description}</p>
    </motion.div>
  )
}

function Home() {
  const { products, loading } = useProducts()
  const { selectedCategory } = useFilter()
  const isMobile = window.innerWidth < 768

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ width: "40px", height: "40px", border: "3px solid #D6B79A", borderTopColor: "#8B5E3C", borderRadius: "50%" }}
      />
    </div>
  )

  const filteredProducts = products.filter(product =>
    selectedCategory === "" || product.categoria === selectedCategory
  )

  return (
    <div style={{ backgroundColor: "#F8F5F2" }}>

      <Hero />

      <CampaignBanner />
      {/* FEATURES */}
      <section style={stylesHome.features}>
        <FeatureCard icon="🚚" title="Envíos a todo el país" description="Entregas a toda Argentina" delay={0} />
        <FeatureCard icon="🔒" title="Compra segura" description="Tus datos y pagos están siempre protegidos" delay={0.15} />
        <FeatureCard icon="💳" title="Hasta 3 cuotas sin interés" description="Con todas las tarjetas de crédito" delay={0.3} />
        <FeatureCard icon="✨" title="Calidad garantizada" description="Productos seleccionados con amor y dedicación" delay={0.45} />
      </section>

      {/* PRODUCTOS */}
      <div id="novedades">
        <ProductSection
          title="Novedades"
          products={filteredProducts}
        />
      </div>
      <ProductSection title="Descuentos" products={filteredProducts} />
      <ProductSection title="Festividades" products={filteredProducts} />

      {/* BANNER CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={stylesHome.banner}
      >
        <div style={stylesHome.bannerOverlay} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "white" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={stylesHome.bannerTitle}
          >
            Transformá tu hogar hoy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={stylesHome.bannerSubtitle}
          >
            Encontrá piezas únicas que reflejan tu estilo
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/products" style={stylesHome.bannerBtn}>
              Ver toda la colección →
            </Link>
          </motion.div>
        </div>
      </motion.section>

    </div>
  )
}

const isMobile = window.innerWidth < 768

const stylesHome = {
  features: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
    gap: isMobile ? "12px" : "20px",
    padding: isMobile ? "40px 16px" : "60px 40px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  featureCard: {
    backgroundColor: "white",
    padding: isMobile ? "20px 16px" : "30px 24px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 2px 15px rgba(0,0,0,0.05)"
  },
  featureIcon: {
    fontSize: isMobile ? "28px" : "36px",
    display: "block",
    marginBottom: "12px"
  },
  featureTitle: {
    fontSize: isMobile ? "13px" : "15px",
    fontWeight: "600",
    color: "#3E2C23",
    marginBottom: "8px"
  },
  featureText: {
    fontSize: isMobile ? "11px" : "13px",
    color: "#888",
    lineHeight: "1.5"
  },
  banner: {
    position: "relative",
    height: isMobile ? "300px" : "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    margin: isMobile ? "40px 0 0" : "80px 0 0",
    backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1600')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: isMobile ? "scroll" : "fixed"
  },
  bannerOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(30,15,8,0.7) 0%, rgba(139,94,60,0.5) 100%)"
  },
  bannerTitle: {
    fontSize: isMobile ? "28px" : "48px",
    fontWeight: "700",
    marginBottom: "16px",
    letterSpacing: "-0.5px"
  },
  bannerSubtitle: {
    fontSize: isMobile ? "14px" : "18px",
    opacity: 0.85,
    marginBottom: "32px",
    fontWeight: "300"
  },
  bannerBtn: {
    display: "inline-block",
    padding: isMobile ? "14px 28px" : "16px 40px",
    backgroundColor: "white",
    color: "#3E2C23",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: isMobile ? "14px" : "16px",
    fontWeight: "600",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
  }
}

export default Home