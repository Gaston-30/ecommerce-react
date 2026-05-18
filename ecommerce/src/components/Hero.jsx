import { motion } from "framer-motion"

function Hero() {

  return (

    <section style={styles.hero}>

      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 1 }}

        style={styles.overlay}
      >

        <motion.h1

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 0.4 }}

          style={styles.title}
        >

          Deco & Hogar

        </motion.h1>

        <motion.p

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 0.7 }}

          style={styles.subtitle}
        >

          Diseño cálido para transformar tus espacios

        </motion.p>

      </motion.div>

    </section>

  )
}

const styles = {

  hero: {

    height: "70vh",

    backgroundImage:
      "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200')",

    backgroundSize: "cover",
    backgroundPosition: "center",

    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  overlay: {

    backgroundColor: "rgba(0,0,0,0.35)",

    padding: "40px 60px",

    borderRadius: "20px",

    textAlign: "center",

    color: "white",

    backdropFilter: "blur(3px)"
  },

  title: {
    fontSize: "60px",
    fontWeight: "600"
  },

  subtitle: {
    marginTop: "15px",
    fontSize: "20px"
  }

}

export default Hero