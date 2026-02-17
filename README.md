# Campaign Wizard – Krowdy Reto (React + TypeScript + Vite)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Este proyecto es un **Wizard dinámico** diseñado para la creación de campañas multicanal (**SMS / Email / WhatsApp**) utilizando un flujo de pasos inteligente, tipado fuerte y una interfaz moderna.

## 🚀 Características principales

* **Stepper dinámico:** Flujo adaptable según los canales seleccionados (Orden estricto: **SMS → Email → WhatsApp**).
* **Gestión de Plantillas:** Precarga de contenido inteligente (Invitación / Recordatorio / Personalizado).
* **Validaciones robustas:** Control de errores y validación de campos obligatorios por cada paso.
* **Confirmación y Simulación:** Modal de revisión final y simulación de envío con estados de carga (*loading*).
* **Feedback Visual:** Pantalla de éxito con resúmenes detallados en **Accordions** y celebración con 🎉 **canvas-confetti**.

---

## 🛠️ Requisitos previos

* **Node.js** >= 18
* **npm** >= 9

**Verificar versiones:**
```bash
node -v
npm -v
📦 Instalación y EjecuciónClonar el repositorio:Bashgit clone <URL_DEL_REPO>
cd krowdy-reto
Instalar dependencias:Bashnpm install
Instalar tipos para confetti (TypeScript):Bashnpm install --save-dev @types/canvas-confetti
Ejecutar en modo desarrollo:Bashnpm run dev
Abrir en el navegador:Visita http://localhost:5173💻 Scripts DisponiblesScriptDescripciónnpm run devInicia el servidor de desarrollo local con Vite.npm run buildCompila la aplicación para producción en la carpeta /dist.npm run previewPrevisualiza localmente el build de producción.npm run lintEjecuta ESLint para asegurar la calidad del código.📂 Estructura del Proyecto (Sugerida)Plaintextsrc/
 └── features/
      └── campaign-wizard/
           ├── Wizard.tsx          # Componente contenedor del Stepper
           ├── reducer.ts         # Gestión de estado complejo (useReducer)
           ├── types.ts           # Interfaces y Types de TypeScript
           ├── templates.ts       # Configuración y datos de plantillas
           └── steps/             # Componentes específicos de cada paso
                ├── StepTemplate.tsx
                ├── StepChannels.tsx
                ├── StepSms.tsx
                ├── StepEmail.tsx
                ├── StepWhatsapp.tsx
                ├── StepReview.tsx
                └── StepSuccess.tsx
🔄 Flujo del WizardPlantilla: Selección del tipo de mensaje (Invitación, Recordatorio o Personalizado).Canales: Selección de los medios de envío.Edición por canal: El Wizard genera los pasos dinámicamente según la selección previa.Resumen: Revisión final de los textos y configuraciones.Confirmación: Modal interactivo antes de procesar el envío.Envío: Simulación de latencia de red (estado de carga).Success: Pantalla final con resumen expandible y animación de éxito.⚙️ Decisiones TécnicasuseReducer: Se eligió para manejar el estado global del Wizard debido a la complejidad de los datos (múltiples canales, pasos variables y contenido de plantillas). Esto facilita la escalabilidad frente a múltiples useState.Stepper Dinámico: Los pasos no son estáticos; se filtran y ordenan en tiempo de ejecución basándose en la regla de negocio: SMS siempre va antes que Email, y este antes que WhatsApp.Material UI (MUI): Uso intensivo de componentes como Stepper, Dialog, Accordion y TextField para asegurar una experiencia de usuario estándar y profesional.Canvas-confetti: Implementado para mejorar el User Delight al completar exitosamente el reto.