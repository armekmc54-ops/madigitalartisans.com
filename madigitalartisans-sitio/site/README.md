# M&A Digital Artisans — Sitio web corporativo

Sitio estático (HTML + CSS + JS puro, sin frameworks ni build) listo para desplegar en cualquier hosting estático: Netlify, Vercel, Cloudflare Pages, GitHub Pages o un servidor propio.

## Estructura
```
index.html
css/styles.css
js/main.js
_headers        → cabeceras de seguridad (Netlify / Cloudflare Pages las leen automáticamente)
robots.txt
sitemap.xml
```

## Antes de publicar — pendientes importantes

1. **Formulario de contacto (obligatorio).** Un sitio estático no puede enviar correos por sí solo. El formulario en `index.html` apunta a:
   ```
   action="https://formspree.io/f/REEMPLAZAR_ID"
   ```
   Pasos:
   - Crea una cuenta gratuita en [formspree.io](https://formspree.io) con `madigitalartisans@gmail.com`.
   - Crea un formulario nuevo y copia el ID que te dan.
   - Reemplaza `REEMPLAZAR_ID` en `index.html` por ese ID.
   - Alternativas equivalentes: [Web3Forms](https://web3forms.com) o [EmailJS](https://www.emailjs.com) si prefieres otro servicio.

2. **Equipo fundador.** En la sección "Nosotros" dejé los tres roles (arquitectura, diseño, automatización) sin nombres ni fotos — reemplázalos con los datos reales del equipo antes de publicar.

3. **Casos de éxito y testimonios.** Los tres casos de portafolio y el testimonio rotativo son **ejemplos ilustrativos**, no clientes reales. Sustitúyelos por proyectos y reseñas verdaderas (con autorización del cliente) antes de publicar — presentar casos o testimonios inventados como reales sería engañoso para quien visite el sitio.

4. **Número de WhatsApp.** Usé `524443211123` (código de México + tu número). Verifica que el enlace `https://wa.me/524443211123` abra correctamente tu WhatsApp Business antes de publicar.

5. **Imagen de Open Graph.** El meta tag `og:image` apunta a `https://madigitalartisans.com/assets/og-cover.jpg`, que aún no existe. Sube una imagen de 1200×630px a esa ruta (o cambia la URL) para que se vea bien al compartir el link en redes.

## Sobre el chatbot

El widget de chat es un asistente de reglas fijas (preguntas frecuentes con respuestas predefinidas en `js/main.js`, objeto `faqBot`) — no está conectado a un modelo de IA en vivo. Cubre las preguntas que pediste (qué es una página profesional, tecnologías, renta vs. membresía, tiempos, precio). Si más adelante quieres respuestas generadas por IA de verdad, se necesita un backend propio que llame a una API de lenguaje — eso implica un servidor y una llave de API que nunca debe quedar expuesta en el código del navegador.

## Seguridad

- El archivo `_headers` aplica cabeceras de seguridad (CSP, X-Frame-Options, HSTS, etc.) automáticamente si despliegas en **Netlify** o **Cloudflare Pages**.
- Si usas **Apache**, esas mismas reglas hay que moverlas a un archivo `.htaccess`.
- Si usas **Nginx**, van en el bloque `server` de tu configuración.
- El formulario incluye un campo oculto anti-spam (`_gotcha`) además de la validación del propio servicio de formularios.
- La protección real contra XSS/inyecciones para el formulario la da el servicio que elijas (Formspree, etc.) del lado del servidor — el navegador nunca es suficiente por sí solo.

## SEO

- Metaetiquetas de título, descripción, Open Graph y datos estructurados (JSON-LD tipo `ProfessionalService`) ya están en `index.html`.
- Actualiza `sitemap.xml` si agregas más páginas.
- Antes de indexar en Google, verifica el sitio en Google Search Console con el dominio `madigitalartisans.com`.

## Vista previa local

Sin instalar nada, desde esta carpeta:
```
python3 -m http.server 8000
```
y abre `http://localhost:8000` en tu navegador.
