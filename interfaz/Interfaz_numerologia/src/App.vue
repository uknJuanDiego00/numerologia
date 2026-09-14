<script setup>
import { ref, reactive, computed } from 'vue'

// --- PESTAÑAS DE NAVEGACIÓN ---
const activeTab = ref('perfil') // 'perfil' | 'lecturas' | 'compatibilidad' | 'usuarios'

// Mensaje de notificación temporal
const notification = ref(null)
function showNotification(text) {
  notification.value = text
  setTimeout(() => {
    if (notification.value === text) {
      notification.value = null
    }
  }, 3500)
}

// ==========================================
// 1. MÓDULO: PERFIL NUMEROLÓGICO
// ==========================================
const profileForm = reactive({
  nombre: 'Alejandro Morales',
  fecha_nacimiento: '1995-08-24'
})

const currentProfile = ref({
  nombre: 'Alejandro Morales',
  fecha_nacimiento: '1995-08-24',
  numero_vida: 11,
  numero_expresion: 7,
  numero_alma: 4,
  detalles: {
    vida: 'Número maestro de inspiración e intuición profunda. Guía a otros mediante el ejemplo.',
    expresion: 'Mente analítica, investigadora y búsqueda de la verdad y el conocimiento interior.',
    alma: 'Busca estabilidad, orden, estructura y bases sólidas en todos los aspectos de su vida.'
  }
})

// Algoritmos locales de numerología para previsualización interactiva (sin backend)
function reducirANumero(num, permitirMaestros = true) {
  while (num > 9) {
    if (permitirMaestros && (num === 11 || num === 22 || num === 33)) {
      return num
    }
    num = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0)
  }
  return num
}

function calcularNumeroVida(fechaStr) {
  if (!fechaStr) return 1
  const digitos = fechaStr.replace(/\D/g, '')
  let suma = digitos.split('').reduce((acc, d) => acc + parseInt(d, 10), 0)
  return reducirANumero(suma, true)
}

const tablaPitagorica = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
}

function calcularNumeroNombre(nombreCompleto, soloVocales = false) {
  if (!nombreCompleto) return 1
  const vocales = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú']
  const limpio = nombreCompleto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  let suma = 0
  for (const char of limpio) {
    if (soloVocales && !vocales.includes(char)) continue
    if (tablaPitagorica[char]) {
      suma += tablaPitagorica[char]
    }
  }
  return reducirANumero(suma || 1, true)
}

function handleCalcularPerfil() {
  if (!profileForm.nombre || !profileForm.fecha_nacimiento) {
    showNotification('Por favor ingresa nombre y fecha de nacimiento.')
    return
  }

  const numVida = calcularNumeroVida(profileForm.fecha_nacimiento)
  const numExp = calcularNumeroNombre(profileForm.nombre, false)
  const numAlma = calcularNumeroNombre(profileForm.nombre, true)

  const interpretaciones = {
    1: 'Liderazgo, independencia, iniciativa y determinación para emprender caminos nuevos.',
    2: 'Cooperación, diplomacia, equilibrio emocional y habilidad para la mediación.',
    3: 'Creatividad, comunicación fluida, expresión artística y optimismo natural.',
    4: 'Trabajo metódico, lealtad, perseverancia, orden y construcción práctica.',
    5: 'Adaptabilidad, libertad de pensamiento, versatilidad y pasión por la transformación.',
    6: 'Responsabilidad familiar, compasión, búsqueda de armonía y servicio a los demás.',
    7: 'Análisis introspectivo, sabiduría, pensamiento reflexivo y rigor conceptual.',
    8: 'Capacidad ejecutiva, visión de abundancia, gestión eficiente y poder de realización.',
    9: 'Vocación humanitaria, altruismo, perspectiva global y generosidad.',
    11: 'Número Maestro: Intuición lúcida, visión inspiradora y guía ética para el entorno.',
    22: 'Número Maestro: Capacidad para materializar grandes proyectos en beneficio colectivo.',
    33: 'Número Maestro: Dedicación compasiva y entrega altruista de alto impacto.'
  }

  currentProfile.value = {
    nombre: profileForm.nombre,
    fecha_nacimiento: profileForm.fecha_nacimiento,
    numero_vida: numVida,
    numero_expresion: numExp,
    numero_alma: numAlma,
    detalles: {
      vida: interpretaciones[numVida] || 'Enfoque de vida centrado en el desarrollo integral.',
      expresion: interpretaciones[numExp] || 'Habilidades orientadas a la expresión y relación con el entorno.',
      alma: interpretaciones[numAlma] || 'Motivaciones profundas ligadas a la coherencia y bienestar interior.'
    }
  }

  showNotification('Perfil numerológico calculado correctamente.')
}

// ==========================================
// 2. MÓDULO: LECTURAS
// ==========================================
const readingForm = reactive({
  tipo_lectura: 'general',
  prompt: ''
})

const readingsList = ref([
  {
    id: 1,
    tipo_lectura: 'diaria',
    prompt: 'Orientación para toma de decisiones laborales el día de hoy',
    respuesta: 'El tránsito numérico actual favorece la calma antes de firmar acuerdos. Mantén la concentración en prioridades inmediatas y evita dispersiones.',
    fecha: '2026-09-07'
  },
  {
    id: 2,
    tipo_lectura: 'anual',
    prompt: 'Proyección anual para proyectos de emprendimiento personal',
    respuesta: 'Ciclo regido por la vibración del número 5, propicio para renovar metodologías, expandir redes y explorar nuevos modelos de negocio.',
    fecha: '2026-09-01'
  }
])

function handleCrearLectura() {
  if (!readingForm.prompt.trim()) {
    showNotification('Escribe una consulta para la lectura.')
    return
  }

  const tiposRespuestas = {
    diaria: 'Lectura diaria: Las influencias energéticas del día señalan estabilidad en gestiones personales y claridad para resolver pendientes estructurados.',
    general: 'Lectura general: Tu perfil refleja una etapa de consolidación. El equilibrio entre el discernimiento analítico y la flexibilidad facilitará el avance de tus metas.',
    anual: 'Lectura anual: El presente ciclo anual enfatiza el aprendizaje constructivo y el fortalecimiento de alianzas estratégicas.'
  }

  const nueva = {
    id: Date.now(),
    tipo_lectura: readingForm.tipo_lectura,
    prompt: readingForm.prompt.trim(),
    respuesta: tiposRespuestas[readingForm.tipo_lectura],
    fecha: new Date().toISOString().split('T')[0]
  }

  readingsList.value.unshift(nueva)
  readingForm.prompt = ''
  showNotification('Lectura generada y agregada al historial.')
}

function eliminarLectura(id) {
  readingsList.value = readingsList.value.filter(item => item.id !== id)
  showNotification('Lectura eliminada del historial.')
}

// ==========================================
// 3. MÓDULO: COMPATIBILIDAD
// ==========================================
const compatForm = reactive({
  usuario_1: 'Alejandro Morales',
  fecha_1: '1995-08-24',
  usuario_2: 'Valentina Restrepo',
  fecha_2: '1996-03-12'
})

const compatResult = ref({
  usuario_1: 'Alejandro Morales',
  usuario_2: 'Valentina Restrepo',
  puntaje: 86,
  interpretacion: 'Excelente nivel de resonancia. La combinación de sus números centrales aporta reciprocidad, apoyo mutuo en metas prácticas y una comunicación fluida frente a desacuerdos.'
})

function handleCalcularCompatibilidad() {
  if (!compatForm.usuario_1 || !compatForm.usuario_2) {
    showNotification('Por favor ingresa los nombres de ambos usuarios.')
    return
  }

  if (compatForm.usuario_1.trim().toLowerCase() === compatForm.usuario_2.trim().toLowerCase()) {
    showNotification('No se puede realizar un análisis de compatibilidad de un usuario consigo mismo.')
    return
  }

  const n1 = calcularNumeroNombre(compatForm.usuario_1)
  const n2 = calcularNumeroNombre(compatForm.usuario_2)
  const diferencia = Math.abs(n1 - n2)
  const puntajeCalculado = Math.max(60, 100 - diferencia * 7)

  let texto = ''
  if (puntajeCalculado >= 85) {
    texto = 'Afinidad alta y complementaria. Ambos perfiles encuentran armonía en sus valores esenciales y facilidad para coordinar propósitos comunes.'
  } else if (puntajeCalculado >= 70) {
    texto = 'Compatibilidad favorable y constructiva. Existen perspectivas distintas que, bien canalizadas, enriquecen el crecimiento conjunto.'
  } else {
    texto = 'Vínculo que invita al aprendizaje. Se requiere clarificar acuerdos mutuos para fortalecer la sincronía en metas a largo plazo.'
  }

  compatResult.value = {
    usuario_1: compatForm.usuario_1,
    usuario_2: compatForm.usuario_2,
    puntaje: puntajeCalculado,
    interpretacion: texto
  }

  showNotification('Análisis de compatibilidad generado.')
}

// ==========================================
// 4. MÓDULO: GESTIÓN DE USUARIOS
// ==========================================
const userMode = ref('login') // 'login' | 'registro'
const authForm = reactive({
  nombre_completo: '',
  email: '',
  password: '',
  fecha_nacimiento: ''
})

const currentUser = ref({
  nombre_completo: 'Alejandro Morales',
  email: 'alejandro@ejemplo.com',
  fecha_nacimiento: '1995-08-24'
})

function handleAuthSubmit() {
  if (userMode.value === 'login') {
    if (!authForm.email || !authForm.password) {
      showNotification('Ingresa email y contraseña.')
      return
    }
    currentUser.value = {
      nombre_completo: 'Usuario Autenticado',
      email: authForm.email,
      fecha_nacimiento: '1995-08-24'
    }
    showNotification('Inicio de sesión simulado exitoso.')
  } else {
    if (!authForm.nombre_completo || !authForm.email || !authForm.password || !authForm.fecha_nacimiento) {
      showNotification('Todos los campos son obligatorios para el registro.')
      return
    }
    currentUser.value = {
      nombre_completo: authForm.nombre_completo,
      email: authForm.email,
      fecha_nacimiento: authForm.fecha_nacimiento
    }
    // Sincronizar también en el perfil
    profileForm.nombre = authForm.nombre_completo
    profileForm.fecha_nacimiento = authForm.fecha_nacimiento
    showNotification('Usuario registrado localmente.')
  }
}
</script>

<template>
  <div class="app-container">
    <!-- BARRA SUPERIOR -->
    <header class="app-header">
      <div class="brand">
        <span class="brand-title">Proyecto Numerología</span>
        <span class="brand-badge">Interfaz Base</span>
      </div>

      <nav class="nav-tabs" aria-label="Navegación principal">
        <button
          type="button"
          :class="['nav-btn', { active: activeTab === 'perfil' }]"
          @click="activeTab = 'perfil'"
        >
          Perfil Numerológico
        </button>
        <button
          type="button"
          :class="['nav-btn', { active: activeTab === 'lecturas' }]"
          @click="activeTab = 'lecturas'"
        >
          Lecturas
        </button>
        <button
          type="button"
          :class="['nav-btn', { active: activeTab === 'compatibilidad' }]"
          @click="activeTab = 'compatibilidad'"
        >
          Compatibilidad
        </button>
        <button
          type="button"
          :class="['nav-btn', { active: activeTab === 'usuarios' }]"
          @click="activeTab = 'usuarios'"
        >
          Cuenta / Usuarios
        </button>
      </nav>
    </header>

    <!-- NOTIFICACIÓN TEMPORAL -->
    <div v-if="notification" class="notification-toast">
      {{ notification }}
    </div>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="main-content">
      <!-- ========================================== -->
      <!-- PESTAÑA 1: PERFIL NUMEROLÓGICO -->
      <!-- ========================================== -->
      <section v-if="activeTab === 'perfil'" class="module-section">
        <div class="section-intro">
          <h2>Perfil Numerológico</h2>
          <p>
            Cálculo y desglose de los números esenciales (Vida, Expresión y Alma) a partir del nombre completo y la fecha de nacimiento.
          </p>
        </div>

        <div class="layout-grid">
          <!-- Formulario de cálculo -->
          <div class="card form-card">
            <h3 class="card-title">Datos del Consultante</h3>
            <form @submit.prevent="handleCalcularPerfil" class="form-body">
              <div class="form-group">
                <label for="nombre">Nombre Completo</label>
                <input
                  id="nombre"
                  v-model="profileForm.nombre"
                  type="text"
                  placeholder="Ej: Alejandro Morales"
                  required
                />
                <span class="field-hint">Utilizado para calcular el Número de Expresión y del Alma.</span>
              </div>

              <div class="form-group">
                <label for="fecha_nacimiento">Fecha de Nacimiento</label>
                <input
                  id="fecha_nacimiento"
                  v-model="profileForm.fecha_nacimiento"
                  type="date"
                  required
                />
                <span class="field-hint">Utilizada para determinar el Número de Camino de Vida.</span>
              </div>

              <button type="submit" class="btn btn-primary">
                Calcular Perfil
              </button>
            </form>
          </div>

          <!-- Resultados del Perfil -->
          <div class="card result-card">
            <div class="card-header-flex">
              <h3 class="card-title">Resultado del Perfil</h3>
              <span class="tag-status">Calculado</span>
            </div>

            <div class="meta-row">
              <div><strong>Nombre:</strong> {{ currentProfile.nombre }}</div>
              <div><strong>Fecha:</strong> {{ currentProfile.fecha_nacimiento }}</div>
            </div>

            <!-- Tres pilares numerológicos -->
            <div class="numbers-grid">
              <div class="number-box">
                <div class="number-label">Número de Vida</div>
                <div class="number-value">{{ currentProfile.numero_vida }}</div>
                <div class="number-desc">{{ currentProfile.detalles.vida }}</div>
              </div>

              <div class="number-box">
                <div class="number-label">Número de Expresión</div>
                <div class="number-value">{{ currentProfile.numero_expresion }}</div>
                <div class="number-desc">{{ currentProfile.detalles.expresion }}</div>
              </div>

              <div class="number-box">
                <div class="number-label">Número del Alma</div>
                <div class="number-value">{{ currentProfile.numero_alma }}</div>
                <div class="number-desc">{{ currentProfile.detalles.alma }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- PESTAÑA 2: LECTURAS -->
      <!-- ========================================== -->
      <section v-if="activeTab === 'lecturas'" class="module-section">
        <div class="section-intro">
          <h2>Lecturas Numerológicas</h2>
          <p>
            Generación y consulta de lecturas diarias, generales o anuales basadas en el contexto del usuario.
          </p>
        </div>

        <div class="layout-grid">
          <!-- Formulario de solicitud -->
          <div class="card form-card">
            <h3 class="card-title">Nueva Lectura</h3>
            <form @submit.prevent="handleCrearLectura" class="form-body">
              <div class="form-group">
                <label for="tipo_lectura">Tipo de Lectura</label>
                <select id="tipo_lectura" v-model="readingForm.tipo_lectura">
                  <option value="diaria">Diaria</option>
                  <option value="general">General</option>
                  <option value="anual">Anual</option>
                </select>
                <span class="field-hint">Define la escala temporal y el alcance interpretativo.</span>
              </div>

              <div class="form-group">
                <label for="prompt">Consulta o Pregunta (Prompt)</label>
                <textarea
                  id="prompt"
                  v-model="readingForm.prompt"
                  rows="4"
                  placeholder="Escribe aquí tu consulta o el aspecto en el que deseas profundizar..."
                  required
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary">
                Generar Lectura
              </button>
            </form>
          </div>

          <!-- Historial de Lecturas -->
          <div class="card result-card">
            <div class="card-header-flex">
              <h3 class="card-title">Historial de Lecturas</h3>
              <span class="badge-count">{{ readingsList.length }} registradas</span>
            </div>

            <div v-if="readingsList.length === 0" class="empty-state">
              No hay lecturas registradas. Genera una nueva desde el formulario.
            </div>

            <div v-else class="readings-list">
              <article
                v-for="item in readingsList"
                :key="item.id"
                class="reading-item"
              >
                <div class="reading-header">
                  <span class="reading-type">{{ item.tipo_lectura.toUpperCase() }}</span>
                  <span class="reading-date">{{ item.fecha }}</span>
                  <button
                    type="button"
                    class="btn-delete"
                    title="Eliminar lectura"
                    @click="eliminarLectura(item.id)"
                  >
                    Eliminar
                  </button>
                </div>

                <div class="reading-prompt">
                  <strong>Consulta:</strong> {{ item.prompt }}
                </div>

                <div class="reading-response">
                  {{ item.respuesta }}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- PESTAÑA 3: COMPATIBILIDAD -->
      <!-- ========================================== -->
      <section v-if="activeTab === 'compatibilidad'" class="module-section">
        <div class="section-intro">
          <h2>Análisis de Compatibilidad</h2>
          <p>
            Evaluación del grado de afinidad y resonancia numérica entre dos perfiles personales.
          </p>
        </div>

        <div class="layout-grid">
          <!-- Formulario de compatibilidad -->
          <div class="card form-card">
            <h3 class="card-title">Comparar Dos Personas</h3>
            <form @submit.prevent="handleCalcularCompatibilidad" class="form-body">
              <div class="form-group">
                <label for="usuario_1">Persona 1 (Nombre Completo)</label>
                <input
                  id="usuario_1"
                  v-model="compatForm.usuario_1"
                  type="text"
                  placeholder="Ej: Alejandro Morales"
                  required
                />
              </div>

              <div class="form-group">
                <label for="usuario_2">Persona 2 (Nombre Completo)</label>
                <input
                  id="usuario_2"
                  v-model="compatForm.usuario_2"
                  type="text"
                  placeholder="Ej: Valentina Restrepo"
                  required
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Analizar Compatibilidad
              </button>
            </form>
          </div>

          <!-- Resultado de Compatibilidad -->
          <div class="card result-card">
            <h3 class="card-title">Resultado de la Comparación</h3>

            <div class="compatibility-box">
              <div class="comp-users">
                <div class="comp-pill">{{ compatResult.usuario_1 }}</div>
                <span class="comp-vs">y</span>
                <div class="comp-pill">{{ compatResult.usuario_2 }}</div>
              </div>

              <div class="score-display">
                <div class="score-value">{{ compatResult.puntaje }}%</div>
                <div class="score-title">Nivel de Compatibilidad</div>
              </div>

              <div class="progress-track" aria-hidden="true">
                <div
                  class="progress-fill"
                  :style="{ width: compatResult.puntaje + '%' }"
                ></div>
              </div>

              <div class="interpretation-card">
                <h4 class="interp-heading">Interpretación del Vínculo</h4>
                <p class="interp-text">{{ compatResult.interpretacion }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- PESTAÑA 4: USUARIOS / CUENTA -->
      <!-- ========================================== -->
      <section v-if="activeTab === 'usuarios'" class="module-section">
        <div class="section-intro">
          <h2>Gestión de Usuarios</h2>
          <p>
            Estructura de autenticación y datos de usuario según los modelos del sistema.
          </p>
        </div>

        <div class="layout-grid">
          <!-- Formulario Auth -->
          <div class="card form-card">
            <div class="subtabs-header">
              <button
                type="button"
                :class="['subtab-btn', { active: userMode === 'login' }]"
                @click="userMode = 'login'"
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                :class="['subtab-btn', { active: userMode === 'registro' }]"
                @click="userMode = 'registro'"
              >
                Registrar Usuario
              </button>
            </div>

            <form @submit.prevent="handleAuthSubmit" class="form-body">
              <div v-if="userMode === 'registro'" class="form-group">
                <label for="auth_nombre">Nombre Completo</label>
                <input
                  id="auth_nombre"
                  v-model="authForm.nombre_completo"
                  type="text"
                  placeholder="Nombre y apellido"
                  required
                />
              </div>

              <div class="form-group">
                <label for="auth_email">Correo Electrónico</label>
                <input
                  id="auth_email"
                  v-model="authForm.email"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  required
                />
              </div>

              <div class="form-group">
                <label for="auth_password">Contraseña</label>
                <input
                  id="auth_password"
                  v-model="authForm.password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div v-if="userMode === 'registro'" class="form-group">
                <label for="auth_fecha">Fecha de Nacimiento</label>
                <input
                  id="auth_fecha"
                  v-model="authForm.fecha_nacimiento"
                  type="date"
                  required
                />
              </div>

              <button type="submit" class="btn btn-primary">
                {{ userMode === 'login' ? 'Ingresar' : 'Crear Usuario' }}
              </button>
            </form>
          </div>

          <!-- Estado del Usuario Actual -->
          <div class="card result-card">
            <h3 class="card-title">Usuario Activo en Sesión</h3>

            <div class="user-summary-card">
              <div class="user-avatar-placeholder">
                {{ currentUser.nombre_completo.charAt(0) }}
              </div>
              <div class="user-info-text">
                <h4 class="user-name">{{ currentUser.nombre_completo }}</h4>
                <p class="user-email">{{ currentUser.email }}</p>
                <p class="user-meta">Fecha de Nacimiento: {{ currentUser.fecha_nacimiento }}</p>
              </div>
            </div>

            <div class="info-note">
              Esta interfaz opera actualmente en modo local/desconectado para validación de diseño y experiencia de usuario.
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- PIE DE PÁGINA -->
    <footer class="app-footer">
      <p>Sistema de Numerología - Interfaz de Usuario</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-main);
  text-align: left;
}

/* HEADER */
.app-header {
  background-color: var(--surface-color);
  border-bottom: 1px solid var(--border-color);
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.brand-title {
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text-main);
}

.brand-badge {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  background-color: var(--surface-muted);
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

/* NAVEGACIÓN POR PESTAÑAS */
.nav-tabs {
  display: flex;
  gap: 0.35rem;
  background-color: var(--surface-muted);
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.nav-btn {
  background: transparent;
  border: none;
  padding: 0.45rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.15s ease;
}

.nav-btn:hover {
  color: var(--text-main);
}

.nav-btn.active {
  background-color: var(--surface-color);
  color: var(--text-main);
  box-shadow: var(--shadow-sm);
}

/* NOTIFICACIÓN TOAST */
.notification-toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: #1e293b;
  color: #ffffff;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  box-shadow: var(--shadow-md);
  z-index: 100;
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* CONTENIDO PRINCIPAL */
.main-content {
  flex: 1;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.section-intro {
  margin-bottom: 1.75rem;
}

.section-intro h2 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: var(--text-main);
}

.section-intro p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* GRID LAYOUT */
.layout-grid {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 860px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
}

/* TARJETAS */
.card {
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.card-title {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: var(--text-main);
}

.card-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header-flex .card-title {
  margin-bottom: 0;
}

.tag-status {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background-color: var(--success-subtle);
  color: var(--success);
  border-radius: var(--radius-sm);
  font-weight: 500;
}

.badge-count {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* FORMULARIOS */
.form-body {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-main);
}

.form-group input,
.form-group select,
.form-group textarea {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.75rem;
  font-size: 0.9rem;
  color: var(--text-main);
  background-color: var(--surface-color);
  transition: border-color 0.15s ease;
  outline: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary);
}

.form-group textarea {
  resize: vertical;
}

.field-hint {
  font-size: 0.75rem;
  color: var(--text-light);
}

/* BOTONES */
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.65rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
  cursor: pointer;
  border: none;
  transition: background-color 0.15s ease;
}

.btn-primary {
  background-color: var(--primary);
  color: #ffffff;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-delete {
  background: transparent;
  border: none;
  color: var(--danger);
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
}

.btn-delete:hover {
  background-color: #fef2f2;
}

/* METADATOS Y CAJAS NUMÉRICAS */
.meta-row {
  display: flex;
  gap: 1.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.numbers-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.number-box {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 1rem;
  background-color: var(--surface-muted);
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  align-items: center;
}

.number-value {
  grid-row: 1 / 3;
  grid-column: 1;
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  text-align: center;
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 0.35rem 0;
}

.number-label {
  grid-row: 1;
  grid-column: 2;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main);
}

.number-desc {
  grid-row: 2;
  grid-column: 2;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.15rem;
}

/* LECTURAS */
.readings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 480px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.reading-item {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 1rem;
  background-color: var(--surface-color);
}

.reading-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.reading-type {
  font-size: 0.75rem;
  font-weight: 600;
  background-color: var(--primary-subtle);
  color: var(--primary);
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-sm);
}

.reading-date {
  font-size: 0.75rem;
  color: var(--text-light);
  margin-left: auto;
  margin-right: 0.75rem;
}

.reading-prompt {
  font-size: 0.85rem;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.reading-response {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.45;
  background-color: var(--surface-muted);
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--primary);
}

.empty-state {
  font-size: 0.875rem;
  color: var(--text-light);
  text-align: center;
  padding: 2.5rem 1rem;
}

/* COMPATIBILIDAD */
.compatibility-box {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.comp-users {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.comp-pill {
  background-color: var(--surface-muted);
  border: 1px solid var(--border-color);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 500;
}

.comp-vs {
  font-size: 0.85rem;
  color: var(--text-light);
}

.score-display {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.score-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
}

.score-title {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
}

.progress-track {
  width: 100%;
  height: 8px;
  background-color: var(--surface-muted);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.progress-fill {
  height: 100%;
  background-color: var(--primary);
  border-radius: 999px;
  transition: width 0.4s ease;
}

.interpretation-card {
  background-color: var(--surface-muted);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 1rem;
}

.interp-heading {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--text-main);
}

.interp-text {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.45;
}

/* SUBTABS USUARIOS */
.subtabs-header {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.subtab-btn {
  background: transparent;
  border: none;
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
  cursor: pointer;
  padding: 0.35rem 0.5rem;
  border-radius: var(--radius-sm);
}

.subtab-btn.active {
  color: var(--primary);
  background-color: var(--primary-subtle);
}

.user-summary-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background-color: var(--surface-muted);
  margin-bottom: 1.25rem;
}

.user-avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--primary);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
}

.user-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
}

.user-email,
.user-meta {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.info-note {
  font-size: 0.8rem;
  color: var(--text-muted);
  background-color: var(--surface-muted);
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px dashed var(--border-color);
}

/* FOOTER */
.app-footer {
  text-align: center;
  padding: 1.25rem 1rem;
  border-top: 1px solid var(--border-color);
  background-color: var(--surface-color);
  font-size: 0.8rem;
  color: var(--text-light);
}
</style>
