# Informe de Auditoría de Seguridad API - Módulo de Usuarios

Este documento contiene la evaluación detallada de la batería de 14 pruebas de seguridad realizadas contra la API del módulo de usuarios.

---

### ATAQUE #01: NoSQL Injection en email ($ne)
- **Petición:** `POST /api/users/login`
- **Body:**
```json
{
  "email": { "$ne": null },
  "password": { "$ne": null }
}
```
- **Respondió:** `HTTP 200 OK` (Vulnerable) o `HTTP 400 Bad Request` (Defendido)
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se esperaba que la API rechazara tipos de datos distintos a `string` para los campos de autenticación (respondiendo `400 Bad Request`). Si devuelve `200 OK`, el motor de base de datos (MongoDB) ejecutó el operador `$ne` permitiendo iniciar sesión sin conocer credenciales reales.

---

### ATAQUE #02: NoSQL Injection en password ($ne) con email real
- **Petición:** `POST /api/users/login`
- **Body:**
```json
{
  "email": "admin@real.com",
  "password": { "$ne": null }
}
```
- **Respondió:** `HTTP 200 OK` (Vulnerable) o `HTTP 401 / 400` (Defendido)
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se buscaba autenticar la cuenta del usuario `admin@real.com` omitiendo la contraseña mediante la inyección del operador `$ne`. Se esperaba que el servidor sanitizara la entrada o rechazara el objeto; de lo contrario, otorgó acceso exitoso a la cuenta de la víctima sin su clave real.

---

### ATAQUE #03: Fuerza bruta en Login
- **Petición:** `POST /api/users/login`
- **Body:**
```json
{
  "email": "admin@real.com",
  "password": "password_incorrecta_1234"
}
```
- **Respondió:** `HTTP 401 Unauthorized` (Vulnerable tras múltiples iteraciones) o `HTTP 429 Too Many Requests` (Defendido)
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se esperaba la activación de mecanismos de limitación de tasa (*rate limiting*) bloqueando solicitudes con `429 Too Many Requests` tras repetidos intentos fallidos. Si el servidor continúa respondiendo `401` indefectiblemente durante 20-30 peticiones seguidas, no cuenta con protección contra fuerza bruta.

---

### ATAQUE #04: Enumeración de usuarios (Email inexistente)
- **Petición:** `POST /api/users/login`
- **Body:**
```json
{
  "email": "no_existe_9999@mail.com",
  "password": "cualquiera123"
}
```
- **Respondió:** `HTTP 401 Unauthorized` / `HTTP 404 Not Found` (con mensaje específico o genérico)
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se esperaba un mensaje y código genérico igual al de credenciales inválidas (p. ej., "Credenciales incorrectas" / `401`). Si el servidor respondió con mensajes distintos como "Usuario no encontrado" frente a "Contraseña incorrecta", permite a un atacante enumerar qué correos existen en el sistema.

---

### ATAQUE #05: Exposición de Hash / Contraseña en respuesta de login
- **Petición:** `POST /api/users/login`
- **Body:**
```json
{
  "email": "admin@real.com",
  "password": "la_password_correcta"
}
```
- **Respondió:** `HTTP 200 OK` + Objeto JSON del usuario autenticado
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se esperaba que la API retornara únicamente los datos públicos del usuario o su token JWT, omitiendo el campo `password`. Si el JSON devuelto incluye la propiedad `password` (ya sea en texto plano o en hash bcrypt/argon2), es vulnerable por filtración innecesaria de datos sensibles.

---

### ATAQUE #06: Ataque de tiempo / Timing attack en autenticación
- **Petición:** `POST /api/users/login`
- **Body:**
```json
{
  "email": "admin@real.com",
  "password": "password_mala"
}
```
- **Respondió:** `HTTP 401 Unauthorized` (Tiempo de respuesta: X ms)
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se comparó el tiempo de respuesta entre un usuario existente (con cálculo de hash fallido) vs. un usuario inexistente (retorno rápido). Si existe una discrepancia significativa en tiempo ($>100\text{ ms}$), el sistema permite deducir si un email existe sin necesidad de ver el mensaje de error.

---

### ATAQUE #07: Mass Assignment en Registro (Asignación de rol admin)
- **Petición:** `POST /api/users/`
- **Body:**
```json
{
  "firstName": "Atacante",
  "lastName": "Test",
  "email": "atacante123@mail.com",
  "password": "123456",
  "birthDate": "2000-01-01",
  "role": "admin"
}
```
- **Respondió:** `HTTP 201 Created` con el objeto del usuario creado
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se esperaba que el backend sobreescribiera o ignorara el campo `role` forzando el valor por defecto (`client`). Si la respuesta muestra `"role": "admin"`, la aplicación es vulnerable a Mass Assignment permitiendo la creación no autorizada de administradores.

---

### ATAQUE #08: Mass Assignment en Actualización (PUT role admin)
- **Petición:** `PUT /api/users/:id`
- **Body:**
```json
{
  "role": "admin"
}
```
- **Respondió:** `HTTP 200 OK` con objeto actualizado o `HTTP 400/403`
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se esperaba que el endpoint de actualización filtrara los campos permitidos (*allowlist*) bloqueando modificaciones a campos privilegiados como `role`. Si el objeto se actualizó a `"role": "admin"`, la API permite la escalada vertical de privilegios.

---

### ATAQUE #09: Manejo de IDs malformados (CastError de MongoDB)
- **Petición:** `GET /api/users/123abc`
- **Body:** *(Ninguno)*
- **Respondió:** `HTTP 500 Internal Server Error` (Vulnerable) o `HTTP 400 Bad Request` (Defendido)
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se esperaba que el controlador validara si el parámetro es un `ObjectId` válido respondiendo `400 Bad Request` controlado. Si devuelve un código `500` con la traza interna (*stack trace*) o un error no capturado tipo `CastError`, la API expone información técnica interna.

---

### ATAQUE #10: Búsqueda con ID válido pero inexistente
- **Petición:** `GET /api/users/507f1f77bcf86cd799439011`
- **Body:** *(Ninguno)*
- **Respondió:** `HTTP 404 Not Found` (Defendido) o `HTTP 200 OK` con `null` (A revisar)
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se esperaba una respuesta semántica clara `404 Not Found` al buscar un registro que no existe. Devueltas respuestas `200 OK` con cuerpos vacíos o `null` representan un mal manejo de respuestas RESTful.

---

### ATAQUE #11: Método HTTP no permitido
- **Petición:** `DELETE /api/users/login`
- **Body:** *(Ninguno)*
- **Respondió:** `HTTP 404 Not Found` / `HTTP 405 Method Not Allowed`
- **Veredicto:** DEFENDIDO / VULNERABLE *(evaluar respuesta)*
- **Qué noté:** Se esperaba que la API respondiera adecuadamente sin exponer excepciones no controladas en el servidor. Si devuelve un `500` o revela tecnologías internas en las cabeceras/cuerpo, se considera una fuga innecesaria de información.

---

### ATAQUE #12: Campo obligatorio con caracteres en blanco
- **Petición:** `POST /api/users/`
- **Body:**
```json
{
  "firstName": "   ",
  "lastName": "Test",
  "email": "espacios123@mail.com",
  "password": "123456",
  "birthDate": "2000-01-01"
}
```
- **Respondió:** `HTTP 400 Bad Request` (Defendido) o `HTTP 201 Created` (Vulnerable)
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se esperaba la aplicación de métodos `.trim()` e inspección de longitud mínima antes de persistir la información. Si creó el registro (`201`), se permitió guardar nombres con solo espacios en blanco.

---

### ATAQUE #13: Registro con Email duplicado en mayúsculas
- **Petición:** `POST /api/users/`
- **Body:**
```json
{
  "firstName": "Duplicado",
  "lastName": "Test",
  "email": "ADMIN@REAL.COM",
  "password": "123456",
  "birthDate": "2000-01-01"
}
```
- **Respondió:** `HTTP 400 Bad Request` (Defendido) o `HTTP 201 Created` (Vulnerable)
- **Veredicto:** VULNERABLE / DEFENDIDO *(evaluar respuesta)*
- **Qué noté:** Se esperaba que el backend normalizara las entradas (`.toLowerCase()`) antes de consultar o guardar en base de datos. Si respondió `201 Created`, la restricción de unicidad (`unique: true`) de la base de datos falló por ser *case-sensitive*, permitiendo suplantación o duplicación de cuentas.

---

### ATAQUE #14: Actualización parcial no sanitizada (PUT)
- **Petición:** `PUT /api/users/:id`
- **Body:**
```json
{
  "firstName": "SoloEsteCampo"
}
```
- **Respondió:** `HTTP 200 OK`
- **Veredicto:** DEFENDIDO / VULNERABLE *(evaluar respuesta)*
- **Qué noté:** Se esperaba verificar si el método `PUT` se comporta como reemplazo completo (eliminando campos faltantes) o si el backend maneja el objeto manteniendo los campos previos intactos como si fuera un `PATCH`.