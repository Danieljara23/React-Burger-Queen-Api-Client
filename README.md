#  Burger Queen (API Client) with TypeScript proposal

## Stack tecnológico

- `ViteJs` para construir el proyecto.
- `React Testing Library` para las pruebas de componentes.
- `React Router DOM` para las rutas de la SPA.

## Estructura de archivos

- `src/assets`: directorio para imágenes.
- `src/components`: directorio para componentes React.
- `src/models`: directorio para interfaces TypeScript.
- `src/routes`: directorio para componentes relacionados con rutas.
- `src/services`: directorio para las funciones que interactuán con la API Rest y `localstorage`.

## Rutas

Se definirán las siguientes rutas:

- /login: formulario de login (historia de usuaria 1)
- /home: menú de módulos
- /orders/create: creación de pedidos (historia de usuaria 2)
- /orders/pending: listado de pedidos para preparar para jefa de cocina (historia de usuaria 3)
- /orders/delivering: listado de pedidos listos para servir para mesero (historia de usuario 4)
- /orders/delivered: listado de pedidos para entregados
- /admin/products: CRUD de productos (historia de usuario 5)
- /admin/users: CRUD de usuarias (historia de usuario 6)

### Protección de rutas

Para proteger las rutas creamos un componente [ProtectedRoute](src\routes\protected-route.tsx)