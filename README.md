#  Burger Queen (API Client) with TypeScript proposal

## Stack tecnológico

- `ViteJs` para construir el proyecto.
- `React Testing Library` para las pruebas de componentes.
- `React Router DOM` para las rutas de la SPA.
- `react-router-dom` para la dirección de rutas
- `ESLint` y `Prettier` para el formato de archivos

### Peticiones al API

El Common.service.ts se encarga de realizar la petición y agregar el encabezado `"Content-Type": "application/json"`, así como también leer el mensaje de error e interceptarlo.

### Token Repository

En este archivo se controla el token y su almacenamiento y lectura del localStorage, siendo el encargado de guardar la sesión y cerrarla.

Así como también realiza la petición de inicio de sesión.

### Jerarquía de componentes vista /orders/create

![Create order components view](./pictures/create-order-components-view.png)

Tenemos 4 componentes:

#### Waiter

Controla el estado de la orden y productos, conteniendo 2 componentes CreateOrder y ProductList.

* Props: no tiene.

* Hooks:

	* useReducer:
		* Orden: permite controlar la orden, agregar productos, el nombre del cliente y modificarlos.
	* useState:
		* products: Permite tener en memoria el listado de productos que puede ofrecer el restaurante.
		* message: Permite tener en memoria el mensaje a mostrar al usuario cuando crea la orden.
		* selectedCategory: Permite tener en memoria qué listado mostrar al usuario según el tipo de producto que se haya seleccionado.
	* useRequestHook:
		* crear orden: Permite controlar el estado de carga, petición y su resultado al momento de crear la orden.

* Componentes que contiene:

	* ProductList
	* CreateOrder

#### ProductList

Permite visualizar el lista de productos con sus precios para ser seleccionados y agregados a la comanda.

* Props: 
	* onModifyProductQty: permite agregar un producto a la orden.
	* products: listado de productos a ser mostrados.

* Hooks: no tiene.
* Componentes que contiene: no tiene.

#### CreateOrder

Permite visualizar la comanda, costo total y formulario de envío de la orden, permitiendo también la modificación de cantidad de productos, contiene un componente OrderProductList.

* Props:

	* order: Tiene los datos de la orden que se está creando.
	* disableForm: indica el estado que debe mantener el formulario.
	* onRemoveProductFromList: Elimina un elemento de la lista de productos de la orden.
	* onModifyProductQty: Agrega o quita una cantidad de un producto a la orden.
	* onChangeCustomer: Modifica el nombre del cliente.
	* onSubmit: Envía la orden.

* Hooks: no tiene.
* Componentes que contiene:
	* OrderProductList

#### OrderProductList

Permite visualizar el listado de productos agregados a la orden, con su subtotal y con la posibilidad de agregar uno o quitar uno o el producto completo.

* Props:

	* order: Tiene los datos de la orden que se está creando.
	* disableForm: indica el estado que debe mantener el formulario.
	* onModifyProductQty: Agrega o quita una cantidad de un producto a la orden.
	* onRemoveProductFromList: Elimina un elemento de la lista de productos de la orden.

* Hooks: no tiene.
* Componentes que contiene: no tiene.

### Modelos

- Order: Contiene el type de la orden, del item de la orden y el type de estado de la orden.
- Product: Contiene el type del producto y el type de tipo de producto
- Response: Contiene el type del response del login y parámetros del request
- Role: Contiene el type del tipo de usuario
- User: Contiene el type del usuario y usuario actual

### Configuraciones del proyecto

En el package.json tenemos los siguientes scripts:

* test: Ejecuta los tests.
* dev: Compila React en desarrollo
* build: Compila React en producción
* lint: Valida el código y muestra las sugerencias y correcciones
* lint:fix: Valida el código y muestra las sugerencias y correcciones, que no pudieron ser ajustadas automáticamente.
* start-mock: inicia el servidor mockeado.
* ts: Inicia la compilación y validación de TypeScript en Watch.

### Pruebas

Para la configuración del entorno de pruebas se está usando:

- Jest
- Babel
* Testing library
* Jest environment jsdom

Actualmente se tienen los test:

- Waiter

	- Debería lanzar la petición con los parámetros correctos

- CreateOrder

	- Debería de mostrar el precio cuando se seleccionen productos
	- Debería de mostrar deshabilitado el botón cuando no se haya ingresado nombre de cliente
	- Debería de mostrar deshabilitado el botón cuando no se hayan seleccionado productos
	- Debería de mostrar habilitado el botón cuando la orden esté lista para ser enviada

* OrderRepository

	* Debería de realizar la petición con los parámetros correctos.

## Estructura de archivos

- `src/assets`: directorio para imágenes.
- `src/components`: directorio para componentes React.
- `src/models`: directorio para types de TypeScript.
- `src/routes`: directorio para componentes relacionados con rutas.
- `src/services`: directorio para las funciones que interactúan con la API Rest y `localStorage`.

## Rutas

- Usar `react-router-dom` versión *6.x* como librería de rutas.
- Se definirán las siguientes rutas:

    
	- /login: formulario de login (historia de usuaria 1)
	
		![Login preview](./pictures/login.png)
    
	- /orders/create: creación de pedidos (historia de usuaria 2)

		![Create order preview](./pictures/create-order.png)

	- /home: menú principal
	- /orders/pending: listado de pedidos para preparar para jefa de cocina (historia de usuaria 3)
	- /orders/delivering: listado de pedidos listos para servir para mesero (historia de usuario 4)
	- /orders/delivered: listado de pedidos para entregados
	- /admin/products: CRUD de productos (historia de usuario 5)
	- /admin/users: CRUD de usuarias (historia de usuario 6)

### Protección de rutas

Para proteger las rutas creamos un componente [ProtectedRoute](src\routes\protected-route.tsx)
