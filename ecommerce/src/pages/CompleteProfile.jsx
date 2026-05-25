import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { supabase } from "../supabase"
import { useAuth } from "../context/AuthContext"
import useProfile from "../hooks/useProfile"

function EditableField({ label, value, onSave, isEditing }) {
  const [editing, setEditing] = useState(false)
  const [temp, setTemp] = useState(value)

  useEffect(() => setTemp(value), [value])

  if (!isEditing) {
    return (
      <input
        type="text"
        placeholder={label}
        value={value}
        onChange={(e) => onSave(e.target.value)}
        style={styles.input}
      />
    )
  }

  return (
    <div style={styles.editableWrapper}>
      <input
        type="text"
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        disabled={!editing}
        style={{
          ...styles.input,
          backgroundColor: editing ? "white" : "#f5f5f5",
          color: editing ? "#3E2C23" : "#888",
          cursor: editing ? "text" : "default"
        }}
        onBlur={() => {
          onSave(temp)
          setEditing(false)
        }}
      />
      {!editing && (
        <button
          type="button"
          style={styles.pencilBtn}
          onClick={() => setEditing(true)}
          title="Editar"
        >
          ✏️
        </button>
      )}
    </div>
  )
}

function AddressCard({ address, onSetPrincipal, onDelete, onEdit }) {
  return (
    <div style={{
      ...styles.addressCard,
      border: address.es_principal
        ? "2px solid #8B5E3C"
        : "1px solid rgba(0,0,0,0.08)"
    }}>
      <div style={styles.addressInfo}>
        {address.es_principal && (
          <span style={styles.principalBadge}>⭐ Principal</span>
        )}
        <p style={styles.addressText}>{address.direccion}</p>
        <p style={styles.addressSubtext}>{address.ciudad} · CP {address.codigo_postal}</p>
        <p style={styles.addressSubtext}>📞 {address.telefono}</p>
      </div>
      <div style={styles.addressActions}>
        <button type="button" style={styles.addressBtn} onClick={() => onEdit(address)}>✏️</button>
        {!address.es_principal && (
          <button type="button" style={styles.addressBtn} onClick={() => onSetPrincipal(address.id)}>⭐</button>
        )}
        <button type="button" style={{ ...styles.addressBtn, color: "#e53e3e" }} onClick={() => onDelete(address.id)}>🗑️</button>
      </div>
    </div>
  )
}

function CompleteProfile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { refetch } = useProfile()

  // Perfil
  const [username, setUsername] = useState("")
  const [avatarFile, setAvatarFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [currentAvatar, setCurrentAvatar] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)

  // Direcciones
  const [addresses, setAddresses] = useState([])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [newDireccion, setNewDireccion] = useState("")
  const [newCiudad, setNewCiudad] = useState("")
  const [newCP, setNewCP] = useState("")
  const [newTelefono, setNewTelefono] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) { setLoadingProfile(false); return }

    supabase.from("profiles").select("*").eq("id", user.id).single()
      .then(({ data }) => {
        if (data) {
          setUsername(data.username || "")
          setCurrentAvatar(data.avatar_url || null)
          setIsEditing(true)
        }
        setLoadingProfile(false)
      })

    supabase.from("addresses").select("*").eq("user_id", user.id).order("es_principal", { ascending: false })
      .then(({ data }) => { if (data) setAddresses(data) })
  }, [user])

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (file) { setAvatarFile(file); setPreview(URL.createObjectURL(file)) }
  }

  const validateAddress = (dir, cp, tel) => {
    if (!/\d/.test(dir)) {
      setError("La dirección debe incluir número de calle (ej: Rivadavia 1234)")
      return false
    }
    if (!/^\d{4,8}$/.test(cp)) {
      setError("El código postal debe tener entre 4 y 8 números")
      return false
    }
    if (!/^\d{8,15}$/.test(tel.replace(/\s|-/g, ""))) {
      setError("El teléfono debe tener al menos 8 dígitos")
      return false
    }
    return true
  }

    const validateAddressNominatim = async (direccion, ciudad) => {
    const query = encodeURIComponent(`${direccion}, ${ciudad}, Argentina`)
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
        { headers: { "Accept-Language": "es" } }
    )
    const data = await res.json()
    return data.length > 0
    }

  const handleSaveAddress = async () => {
    setError("")
    if (!validateAddress(newDireccion, newCP, newTelefono)) return

    const esValida = await validateAddressNominatim(newDireccion, newCiudad)
        if (!esValida) {
            setError("No encontramos esa dirección. Verificá que sea correcta (ej: Rivadavia 1234, Buenos Aires)")
            return
        }

    const esPrimero = addresses.length === 0

    if (editingAddress) {
      const { error } = await supabase.from("addresses").update({
        direccion: newDireccion,
        ciudad: newCiudad,
        codigo_postal: newCP,
        telefono: newTelefono
      }).eq("id", editingAddress.id)

      if (!error) {
        setAddresses(prev => prev.map(a =>
          a.id === editingAddress.id
            ? { ...a, direccion: newDireccion, ciudad: newCiudad, codigo_postal: newCP, telefono: newTelefono }
            : a
        ))
      }
    } else {
      const { data, error } = await supabase.from("addresses").insert({
        user_id: user.id,
        direccion: newDireccion,
        ciudad: newCiudad,
        codigo_postal: newCP,
        telefono: newTelefono,
        es_principal: esPrimero
      }).select().single()

      if (!error && data) setAddresses(prev => [...prev, data])
    }

    setNewDireccion(""); setNewCiudad(""); setNewCP(""); setNewTelefono("")
    setShowAddressForm(false); setEditingAddress(null)
  }

  const handleSetPrincipal = async (id) => {
    await supabase.from("addresses").update({ es_principal: false }).eq("user_id", user.id)
    await supabase.from("addresses").update({ es_principal: true }).eq("id", id)
    setAddresses(prev => prev.map(a => ({ ...a, es_principal: a.id === id })))
  }

  const handleDeleteAddress = async (id) => {
    await supabase.from("addresses").delete().eq("id", id)
    setAddresses(prev => prev.filter(a => a.id !== id))
  }

  const handleEditAddress = (address) => {
    setEditingAddress(address)
    setNewDireccion(address.direccion)
    setNewCiudad(address.ciudad)
    setNewCP(address.codigo_postal)
    setNewTelefono(address.telefono)
    setShowAddressForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (username.trim().length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres")
      return
    }

    setLoading(true)
    let avatar_url = currentAvatar

    if (avatarFile) {
      const fileExt = avatarFile.name.split(".").pop()
      const fileName = `${user.id}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, avatarFile, { upsert: true })
      if (uploadError) { setError("Error al subir la imagen"); setLoading(false); return }
      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName)
      avatar_url = data.publicUrl
    }

    const { error } = await supabase.from("profiles").upsert({ id: user.id, username, avatar_url })
    if (error) { setError("No se pudo guardar el perfil: " + error.message) }
    else { 
        await refetch()
        navigate("/")
    }
    setLoading(false)
  }

  if (loadingProfile) return <p style={{ textAlign: "center", marginTop: "100px" }}>Cargando...</p>

  return (
    <motion.div style={styles.page} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={styles.card}>
        <h1 style={styles.title}>{isEditing ? "Tu perfil" : "Completá tu perfil"}</h1>
        <p style={styles.subtitle}>{isEditing ? "Editá tu información" : "Estos datos se usan para tus envíos"}</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* AVATAR */}
          <div style={styles.avatarContainer}>
            <div style={styles.avatarPreview}>
              {preview
                ? <img src={preview} alt="avatar" style={styles.avatarImg} />
                : currentAvatar
                  ? <img src={currentAvatar} alt="avatar" style={styles.avatarImg} />
                  : <span style={{ fontSize: "40px" }}>👤</span>
              }
            </div>
            <label style={styles.avatarLabel}>
              {currentAvatar ? "Cambiar foto" : "Subir foto (opcional)"}
              <input type="file" accept="image/*" onChange={handleAvatar} style={{ display: "none" }} />
            </label>
          </div>

          {/* USERNAME */}
          <EditableField
            label="Nombre de usuario"
            value={username}
            onSave={setUsername}
            isEditing={isEditing}
          />

          <hr style={styles.divider} />

          {/* DIRECCIONES */}
          <p style={styles.sectionLabel}>Direcciones de envío</p>

          {addresses.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              onSetPrincipal={handleSetPrincipal}
              onDelete={handleDeleteAddress}
              onEdit={handleEditAddress}
            />
          ))}

          {/* FORMULARIO NUEVA DIRECCIÓN */}
          {showAddressForm && (
            <div style={styles.addressForm}>
              <p style={styles.sectionLabel}>{editingAddress ? "Editar dirección" : "Nueva dirección"}</p>
              <input type="text" placeholder="Dirección (ej: Rivadavia 1234)" value={newDireccion} onChange={(e) => setNewDireccion(e.target.value)} style={styles.input} />
              <input type="text" placeholder="Ciudad" value={newCiudad} onChange={(e) => setNewCiudad(e.target.value)} style={styles.input} />
              <input type="text" placeholder="Código postal" value={newCP} onChange={(e) => setNewCP(e.target.value)} style={styles.input} />
              <a href="https://www.correoargentino.com.ar/formularios/cpa" target="_blank" rel="noopener noreferrer" style={styles.cpLink}>No sé mi código postal</a>
              <input type="text" placeholder="Teléfono (ej: 1123456789)" value={newTelefono} onChange={(e) => setNewTelefono(e.target.value)} style={styles.input} />
              <div style={{ display: "flex", gap: "10px" }}>
                <motion.button type="button" style={styles.button} onClick={handleSaveAddress} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  {editingAddress ? "Guardar cambios" : "Agregar dirección"}
                </motion.button>
                <button type="button" style={styles.skipButton} onClick={() => { setShowAddressForm(false); setEditingAddress(null) }}>Cancelar</button>
              </div>
            </div>
          )}

          {!showAddressForm && (
            <button type="button" style={styles.addAddressBtn} onClick={() => setShowAddressForm(true)}>
              + Agregar dirección
            </button>
          )}

          <hr style={styles.divider} />

          <motion.button type="submit" style={styles.button} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} disabled={loading}>
            {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Guardar y continuar"}
          </motion.button>

          <button type="button" style={styles.skipButton} onClick={() => navigate("/")}>
            {isEditing ? "Cancelar" : "Completar después"}
          </button>

        </form>
      </div>
    </motion.div>
  )
}

const styles = {
  page: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F8F5F2", padding: "40px 20px" },
  card: { width: "440px", backgroundColor: "white", padding: "40px", borderRadius: "20px", boxShadow: "0 2px 15px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: "16px" },
  title: { textAlign: "center", color: "#3E2C23", marginBottom: "4px" },
  subtitle: { textAlign: "center", color: "#999", fontSize: "14px", marginTop: "-8px" },
  form: { display: "flex", flexDirection: "column", gap: "14px" },
  avatarContainer: { display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" },
  avatarPreview: { width: "90px", height: "90px", borderRadius: "50%", backgroundColor: "#F8F5F2", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "2px solid #D6B79A" },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  avatarLabel: { fontSize: "13px", color: "#8B5E3C", cursor: "pointer", textDecoration: "underline" },
  input: { padding: "15px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "rgba(255,255,255,0.9)", boxShadow: "0 4px 10px rgba(0,0,0,0.03)", fontSize: "15px", outline: "none", width: "100%", boxSizing: "border-box" },
  editableWrapper: { position: "relative", display: "flex", alignItems: "center" },
  pencilBtn: { position: "absolute", right: "12px", background: "none", border: "none", cursor: "pointer", fontSize: "16px", padding: "4px" },
  button: { padding: "15px", border: "none", borderRadius: "12px", backgroundColor: "#8B5E3C", color: "white", fontSize: "16px", cursor: "pointer", fontWeight: "600", flex: 1 },
  skipButton: { background: "none", border: "none", color: "#999", fontSize: "13px", cursor: "pointer", textAlign: "center" },
  divider: { border: "none", borderTop: "1px solid rgba(0,0,0,0.06)", margin: "4px 0" },
  sectionLabel: { fontSize: "13px", fontWeight: "600", color: "#8B5E3C", textTransform: "uppercase", letterSpacing: "0.5px" },
  cpLink: { fontSize: "13px", color: "#8B5E3C", marginTop: "-6px" },
  error: { color: "#e53e3e", fontSize: "14px", textAlign: "center" },
  addressCard: { padding: "16px", borderRadius: "14px", backgroundColor: "#fafafa", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" },
  addressInfo: { display: "flex", flexDirection: "column", gap: "4px", flex: 1 },
  addressText: { fontSize: "15px", color: "#3E2C23", fontWeight: "500", margin: 0 },
  addressSubtext: { fontSize: "13px", color: "#888", margin: 0 },
  addressActions: { display: "flex", gap: "6px" },
  addressBtn: { background: "none", border: "none", cursor: "pointer", fontSize: "16px", padding: "4px" },
  principalBadge: { fontSize: "12px", color: "#8B5E3C", fontWeight: "600", marginBottom: "4px" },
  addAddressBtn: { padding: "12px", border: "2px dashed #D6B79A", borderRadius: "12px", backgroundColor: "transparent", color: "#8B5E3C", fontSize: "14px", cursor: "pointer", fontWeight: "500" },
  addressForm: { display: "flex", flexDirection: "column", gap: "12px", padding: "16px", backgroundColor: "#fafafa", borderRadius: "14px" },
}

export default CompleteProfile