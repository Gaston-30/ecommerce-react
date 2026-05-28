import { motion } from "framer-motion"

function Skeleton({ width = "100%", height = "20px", borderRadius = "8px", style = {} }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#E8E0D8",
        ...style
      }}
    />
  )
}

export function ProductCardSkeleton() {
  const isMobile = window.innerWidth < 768
  return (
    <div style={{
      width: isMobile ? "160px" : "240px",
      borderRadius: "18px",
      overflow: "hidden",
      backgroundColor: "white",
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      flexShrink: 0
    }}>
      <Skeleton height={isMobile ? "160px" : "260px"} borderRadius="0" />
      <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Skeleton height="18px" width="80%" />
        <Skeleton height="16px" width="50%" />
        <Skeleton height="38px" borderRadius="10px" style={{ marginTop: "8px" }} />
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  const isMobile = window.innerWidth < 768
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "120px minmax(300px, 500px) 1fr",
      gap: isMobile ? "20px" : "40px",
      padding: isMobile ? "16px" : "80px 20px",
      maxWidth: "1400px",
      margin: "0 auto"
    }}>
      {!isMobile && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[1,2,3].map(i => <Skeleton key={i} width="100px" height="100px" borderRadius="12px" />)}
        </div>
      )}
      <Skeleton height={isMobile ? "260px" : "500px"} borderRadius="20px" />
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Skeleton height="40px" width="80%" />
        <Skeleton height="50px" width="50%" />
        <Skeleton height="20px" width="70%" />
        <Skeleton height="20px" width="60%" />
        <Skeleton height="60px" borderRadius="16px" style={{ marginTop: "8px" }} />
        <Skeleton height="50px" borderRadius="14px" style={{ marginTop: "8px" }} />
        <Skeleton height="50px" borderRadius="14px" />
      </div>
    </div>
  )
}

export function PageSkeleton({ rows = 3 }) {
  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Skeleton height="40px" width="200px" style={{ margin: "0 auto 40px" }} />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{
          display: "flex", gap: "20px", backgroundColor: "white",
          padding: "20px", borderRadius: "15px", marginBottom: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
        }}>
          <Skeleton width="120px" height="120px" borderRadius="10px" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
            <Skeleton height="24px" width="60%" />
            <Skeleton height="16px" width="30%" />
            <Skeleton height="16px" width="40%" />
          </div>
          <Skeleton width="80px" height="24px" style={{ alignSelf: "center" }} />
        </div>
      ))}
    </div>
  )
}

export default Skeleton