# Campaign Wizard - Krowdy Reto

Aplicacion web construida con React, TypeScript y Vite para crear campanas multicanal (SMS, Email y WhatsApp) usando un wizard dinamico.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

Verifica tus versiones:

```bash
node -v
npm -v
```

## Como descargar el proyecto

Puedes obtener el codigo de 2 formas:

1. Clonando el repositorio con Git:

```bash
git clone <URL_DEL_REPOSITORIO>
cd krowdy-reto-
```

2. Descargando el ZIP desde GitHub:

- Click en `Code` -> `Download ZIP`
- Descomprime el archivo
- Abre una terminal dentro de la carpeta `krowdy-reto-`

## Instalacion de dependencias

Desde la raiz del proyecto ejecuta:

```bash
npm install
```

Nota: `@types/canvas-confetti` ya esta definido en `devDependencies`, no necesitas instalarlo manualmente.

## Ejecutar en desarrollo

```bash
npm run dev
```

Luego abre en tu navegador:

```text
http://localhost:5173
```

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera el build de produccion en `dist/`.
- `npm run preview`: levanta localmente el build generado.
- `npm run lint`: ejecuta ESLint.

## Estructura principal

```text
src/
  features/
    campaign-wizard/
      reducer.ts
      templates.ts
      types.ts
      Wizard.tsx
      steps/
```

## Solucion de problemas rapida

- Si falla la instalacion, elimina `node_modules` y vuelve a ejecutar `npm install`.
- Si el puerto 5173 esta ocupado, Vite mostrara otro puerto disponible en consola.
- Si usas una version antigua de Node, actualiza a Node 18+.
