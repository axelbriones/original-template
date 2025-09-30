***

# Exicube BidCab App

Sistema Completo de Reserva y Gestión de Taxis

***

## 📒 Índice

- Descripción General
- Principales Características
- Arquitectura
- Stack Tecnológico
- Estructura del Proyecto
- Instalación y Configuración
- Despliegue Web, Backend y Apps Móviles
- Módulos
- Uso y Comandos
- API Documentation
- Contribución y Buenas Prácticas
- Soporte
- Licencia

***

## Descripción General

Exicube BidCab App es una solución escalable y personalizable para empresas de movilidad, operadores de flota o desarrolladores independientes. Proporciona apps móviles para clientes y conductores, panel web administrativo, backend serverless y múltiples integraciones para pagos, notificaciones y mapas. Listo para producción, fácil personalización y soporte internacional.[1]

***

## Principales Características

### Cliente
- Reserva inmediata y seguimiento en tiempo real
- Cartera digital y métodos de pago múltiples (Stripe, PayPal, etc.)
- Historial de viajes, valoraciones, soportes de promociones
- Multi-idioma y notificaciones push

### Conductor
- Panel de solicitudes (aceptar/rechazar)
- Navegación integrada y verificación documental
- Control de ingresos, retiro de fondos y historial

### Administración
- Dashboard con analítica de todo el servicio
- Gestión de usuarios y conductores
- Configuración de precios, zonas, monedas y soporte global
- Soluciones para disputas y reportes exportables

***

## Arquitectura

```
├── mobile-app/       # App móvil React Native (cliente/conductor)
├── web-app/          # Panel web React.js (administrador)
├── functions/        # Backend: Firebase Functions/API
├── common/           # Código compartido
└── json/             # Configuración del sistema
```
***

## Stack Tecnológico

- **Frontend:** React Native + Expo (mobile), React.js + Material UI (web), Redux
- **Backend:** Firebase Cloud Functions, Firebase Auth, Database, Messaging
- **Maps:** Google Maps API con configuración modular
- **Pagos:** Stripe, PayPal, RazorPay, PayStack, FlutterWave, PayU y más

***

## Estructura del Proyecto

### Web Admin (`web-app/`)
```
├── public/           # Recursos estáticos
├── src/
│   ├── components/   # Componentes UI reutilizables
│   ├── views/        # Páginas principales
│   ├── styles/       # CSS y Material UI
│   └── common/       # Utilidades compartidas
```
### App Móvil (`mobile-app/`)
```
├── assets/           # Imágenes y recursos
├── src/
│   ├── components/   # UI Components
│   ├── screens/      # Pantallas de usuario
│   ├── navigation/   # Configuración rutas
│   └── common/       # Código compartido
```
### Backend (`functions/`)
```
├── providers/        # Integraciones de pago
├── common/           # Helpers backend
└── index.js          # Main entry point
```
***

## Instalación y Configuración

### Requisitos Previos

- Node.js >= 18
- Yarn >= 1.22
- Cuenta en Firebase y Google Cloud
- Claves y credenciales para integraciones deseadas (Stripe, PayPal, mapas)

### Pasos

1. **Clona el repositorio**
   ```bash
   git clone [REPO_URL]
   cd [REPO_ROOT]
   ```
2. **Instala dependencias**
   ```bash
   yarn install
   cd web-app && yarn install
   cd mobile-app && yarn install
   cd functions && yarn install
   ```
3. **Configura variables de entorno**
   ```bash
   cp .env.example .env
   ```
4. **Configura Firebase**
   - Crea proyecto en Firebase Console
   - Rellena `firebase.json`, activa Auth, Database, Functions y Messaging
   - Añade claves Google Maps API en:
     - mobile-app/mapConfig.js
     - web-app/src/mapConfig.js
5. **Configura pagos**
   - Añade las credenciales en cada archivo de `functions/providers/[gateway]/config.json`

***

## Despliegue Web, Backend y Apps Móviles

### 1. Web (Firebase Hosting)
```bash
cd web-app
yarn build
firebase login
firebase init hosting # solo la primera vez, selecciona proyecto y elige 'build' como directorio público
firebase deploy --only hosting
```
- Para dominios personalizados configura DNS desde la consola Firebase.

### 2. Backend (Cloud Functions)
```bash
cd functions
yarn install
firebase deploy --only functions
```
- Monitorea logs y errores desde la consola Firebase.

### 3. App Móvil

#### a) Android (Google Play)
```bash
cd mobile-app
yarn build:android
```
- Firma el bundle con claves seguras.
- Sube el .aab/.apk en Google Play Console siguiendo recomendaciones de assets y permisos.
- Pasa la revisión para publicación mundial.

#### b) iOS (App Store)
```bash
cd mobile-app
yarn build:ios
```
- Configura certificados Apple, perfiles y assets.
- Sube a App Store Connect usando TestFlight para revisión previa.
- Cumple normativas legales y de privacidad para publicación.

#### c) Buenas prácticas móvil
- Usa paquetes únicos y restringe permisos.
- Gestiona los archivos de credenciales y API keys por entorno.
- Documenta todos los pasos para facilitar futuras actualizaciones.

***

## Módulos

- **Autenticación:** Email/teléfono/Social login (Google, Facebook, Apple), JWT, roles
- **Booking:** Reserva con disponibilidad en tiempo real, pricing dinámico, gestión de rutas y estados
- **Pagos:** Wallet del usuario, pasarelas de pago múltiples, historial y payout conductor
- **Notificaciones:** Push, SMS, email e in-app integradas vía Firebase, Twilio o Sendgrid

***

## Uso y Comandos

### Desarrollo local
```bash
cd web-app && yarn start
cd mobile-app && yarn start
cd functions && yarn serve
```
### Build producción
```bash
cd web-app && yarn build
cd mobile-app && yarn build
```
***

## API Documentation

- **Endpoints:** Autenticación, reservas, pagos, usuarios, configuración y notificaciones disponibles vía Firebase Cloud Functions.
- Consulta detalles en: `functions/README.md`

***

## Contribución y Buenas Prácticas

1. Haz fork del repo
2. Crea una branch de feature o fix
3. Haz tus commits (siguiendo convenciones)
4. Haz push a tu branch
5. Abre un Pull Request con descripción clara

- Usa entornos separados para staging y producción.
- Valida credenciales antes del go-live.
- Incluye test unitarios y documentación de cada módulo.

***

## Soporte

- Para consultas técnicas recurre al centro de soporte de Exicube y la documentación oficial de Firebase, Expo, Stripe y Google Maps.[1]
- Para incidencias en despliegue consulta logs vía Firebase Console o archivos de error en el repositorio.
- Comunica incidencias graves vía ticket o issues del repositorio.

***

## Licencia

Este proyecto está cubierto por la licencia MIT. Consulta el archivo LICENSE para más detalles.

***

Este README proporciona toda la información clave para que otros desarrolladores, empresas y equipos puedan instalar, configurar, personalizar, desplegar y contribuir a Exicube BidCab App siguiendo estándares internacionales y mejores prácticas.[2][1]

[1](https://exicube.com)