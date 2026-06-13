# Sistema de Gestión de Proyectos

Prueba técnica frontend para Impresos Múltiples S.A. de C.V. Aplicación de gestión de proyectos con autenticación, control de acceso por roles y simulación de API.

## Stack

- React 19 + TypeScript
- Vite
- React Router 7
- Tailwind CSS 4
- Context API para estado global

## Instalación y ejecución

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

Otros comandos:

```bash
npm run build     # build de producción
npm run preview   # sirve el build
```

## Cuentas de prueba

La contraseña de todas las cuentas es `123`.

| Rol | Correo | Permisos |
|-----|--------|----------|
| Admin | admin@test.com | Ver, crear, editar y eliminar proyectos. Ver usuarios. |
| Manager | manager@test.com | Ver proyectos y actualizar su estado. |
| Viewer | viewer@test.com | Solo lectura de proyectos. |

## Funcionalidades

- Login con validación y mensaje de error claro.
- Rutas protegidas: sin sesión redirige al login; sesión persistida en `localStorage`.
- Dashboard con listado de proyectos (Nombre, Cliente, Estado, Fecha de inicio y Asignado a).
- Filtros por estado y búsqueda por nombre.
- Vista de detalle del proyecto en modal.
- CRUD de proyectos y cambio de estado según permisos del rol.
- Página de usuarios (solo Admin).
- Estados de carga, error y vacío, con spinners y notificaciones (toasts).

## Decisiones técnicas que tome 

- **Arquitectura por responsabilidades**: `services` (simulación de API), `hooks` y `context` (lógica de negocio y estado global), `components` (UI reutilizable), `pages` (vistas) y `routes` (navegación y guardas).
- **Simulación de API**: cada servicio usa `Promise` + `setTimeout` para imitar latencia de red y poder ejercitar los estados de carga, éxito y error.
- **Control de acceso**: un mapa `rolePermissions` define los permisos por rol y el hook `usePermissions` expone `can(permission)`. La UI y las rutas (`ProtectedRoute`, `RoleGuard`) renderizan condicionalmente según ese permiso, evitando lógica de roles dispersa.
- **Estado global con Context API**: `AuthContext` gestiona la sesión y `ToastContext` el feedback visual, evitando prop-drilling.
- **TypeScript** para tipar entidades (`Project`, `User`, `Role`) y reducir errores en tiempo de desarrollo.
- **Tailwind CSS** con los colores de marca definidos como tokens en `index.css`.
