# Documentación Detallada - E-commerce Ópticas Lúmina

Esta documentación proporciona una visión profunda de la arquitectura, flujos de datos y lógica de negocio del sistema **Ópticas Lúmina**.

---

## 🛠️ Stack Tecnológico Completo

### Frontend (Cliente)
- **Vite + React**: Entorno de desarrollo y librería base.
- **React Router DOM v6**: Gestión de rutas SPA y protección de rutas (Guards).
- **Context API**: Gestión de estado global para:
  - `UserContext`: Sesión y autenticación.
  - `ProductContext`: Catálogo y sincronización.
  - `CartContext`: Carrito y persistencia.
- **Bootstrap 5**: Sistema de rejilla (grid) y componentes UI básicos.
- **React Toastify**: Sistema de notificaciones no intrusivas.
- **CSS3 (Módulos)**: Estilos personalizados con variables para diseño consistente.

### Backend (Servidor API)
- **Node.js + Express**: Servidor web y API RESTful.
- **PostgreSQL**: Base de datos relacional para integridad de datos.
- **JWT (JSON Web Tokens)**: Estándar para transmisión segura de identidad.
- **Bcryptjs**: Algoritmo de hashing para protección de contraseñas.
- **PG Pool**: Gestión de conexiones eficientes a la base de datos.
- **Dotenv**: Manejo de variables de entorno seguras.

---

## � Módulo de Autenticación

### 1. Registro de Usuarios (`/register`)
- **Flujo**:
  1. El cliente envía `nombre_completo`, `email` y `password`.
  2. El servidor valida si el email ya existe (Status 409).
  3. La contraseña se encripta con un *salt* de 10 rondas.
  4. Se crea el registro en la tabla `usuarios`.
- **Seguridad**: Nunca se almacena la contraseña en texto plano.

### 2. Login (`/login`)
- **Flujo**:
  1. El usuario ingresa credenciales.
  2. El servidor busca el email y compara el hash de la contraseña.
  3. Si es válido, genera un JWT firmado con `JWT_SECRET`.
  4. El cliente recibe el token y el email, almacenándolos en `localStorage`.
- **Persistencia**: Al recargar la página, `UserContext` inicializa el estado leyendo el token de `localStorage`.

### 3. Protección de Rutas
- **Middleware `requireAuth`**: Verifica que el encabezado `Authorization: Bearer <token>` sea válido antes de permitir el acceso a rutas sensibles (como el CRUD de administrador).

---

## 🛍️ Módulo de Tienda y Catálogo

### 1. Visualización General (`/tienda`)
- **ProductContext**: Realiza una petición `GET /products` al montar la aplicación.
- **Mapeo de Datos**: Transforma la estructura relacional de la DB (SQL) a objetos de JavaScript manejables por React.
- **Filtros**: Permite filtrar por `categoria_slug` dinámicamente mediante `useSearchParams`.

### 2. Detalle de Producto (`/producto/:id`)
- **Compatibilidad**: Diseñado para mostrar tanto productos de la base de datos como el catálogo de prueba (*fallback*).
- **Interfaz**:
  - Imagen con `object-fit: contain` para visualización completa.
  - Formateo de precios a moneda chilena (CLP).
  - Sección de "Categorías relacionadas" limitada a 3 elementos para mantener la estética.

---

## ⚙️ Módulo Administrativo (CRUD Completo)

Exclusivo para el usuario `admin@lumina.com`.

### 1. Formulario de Publicación
- **Campos**: Imagen (URL), Título, Descripción, Precio y Categoría (Select dinámico).
- **Lógica Dual**: El mismo formulario funciona para **Crear** (POST) y **Editar** (PUT).
- **Validación**: Botón de envío deshabilitado hasta que todos los campos requeridos estén llenos.

### 2. Gestión de Datos (DataTable)
- **Lectura**: Lista todos los productos en tiempo real.
- **Edición**: Al pulsar "Editar", carga los datos en el formulario superior y realiza un scroll suave al inicio.
- **Eliminación Lógica**: El botón "Eliminar" realiza un `UPDATE` en la DB cambiando el campo `activo` a `false`. Esto preserva la integridad referencial.

---

## 🛒 Módulo de Carrito de Compras

### 1. Gestión de Estado (`CartContext`)
- **Reducer**: Utiliza `useReducer` para manejar acciones complejas:
  - `ADD_ITEM`: Agrega un nuevo producto o incrementa la cantidad si ya existe.
  - `INCREASE` / `DECREASE`: Ajusta cantidades unitarias.
  - `REMOVE_ITEM`: Quita un producto específico.
  - `CLEAR`: Vacía el carrito por completo.

### 2. Persistencia
- Cada cambio en el estado del carrito se sincroniza automáticamente con `localStorage` bajo la clave `lumina_cart_v1`.

---

## 🗄️ Arquitectura de Base de Datos (PostgreSQL)

### Esquema Relacional
1. **`usuarios`**: Entidad principal para clientes y administradores.
2. **`categorias`**: Clasificación jerárquica (Sol, Recetados, Contacto).
3. **`productos`**: Datos maestros del artículo.
4. **`sku_productos`**: (Stock Keeping Unit) Maneja el precio, stock y variantes de cada producto. Relacionado 1:N con `productos`.
5. **`imagenes_producto`**: Almacena múltiples imágenes por producto (1:N).
6. **`carrito` / `items_carrito`**: Persistencia de intención de compra.

---

## 🚀 Instalación y Despliegue

### Requisitos Previos
- Node.js v16+
- PostgreSQL v14+

### Configuración de Variables (`.env`)

**En `/backend/.env`**:
```env
PORT=5001
JWT_SECRET=e9f1a4c3... (64 chars hex recomendado)
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=****
DB_DATABASE=opticas_lumina
DB_PORT=5432
```

**En `/frontend/.env`**:
```env
VITE_API_URL=http://localhost:5001
```

### Comandos de Inicio
```bash
# 1. Configurar base de datos (Ejecutar DDL.sql y DML.sql en Postgres)

# 2. Instalar dependencias
npm install --prefix backend
npm install --prefix frontend

# 3. Crear usuario Admin
node backend/seedAdmin.js

# 4. Iniciar Servidores (en terminales separadas)
npm run dev --prefix backend
npm run dev --prefix frontend
```
