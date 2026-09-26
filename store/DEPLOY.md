# Publicar Lunara en internet

GitHub Pages solo sirve archivos estáticos, y esta tienda necesita un servidor y una base de datos. Por eso se usan tres servicios gratis que se conectan con tu cuenta de GitHub:

| Parte | Servicio | Resultado |
|---|---|---|
| Base de datos PostgreSQL | [Neon](https://neon.tech) | una connection string |
| Backend Medusa + admin | [Render](https://render.com) | `https://lunara-backend-xxxx.onrender.com` |
| Tienda (Next.js) | [Vercel](https://vercel.com) | `https://tu-tienda.vercel.app` |

Hazlo en este orden: la tienda necesita que el backend ya esté arriba para compilar.

## 1. Base de datos (Neon)

1. Entra a neon.tech con GitHub y crea un proyecto (región: US East).
2. En **Connect**, desactiva **Connection pooling** y copia la URL. Debe verse así:
   `postgresql://usuario:clave@ep-xxxx.us-east-1.aws.neon.tech/neondb?sslmode=require`

## 2. Cargar los datos (desde tu PC, una sola vez)

En PowerShell, desde `store/apps/backend`:

```powershell
$env:DATABASE_URL="<URL de Neon>"
pnpm exec medusa db:migrate          # tablas + 9 collares, regiones USD/EUR, envíos, pago
pnpm exec medusa user -e admin@medusajs.com -p <una contraseña segura>
Remove-Item Env:DATABASE_URL
```

La variable solo vive en esa terminal; tu `.env` local sigue apuntando a tu base local.

La **publishable key** la necesitarás en el paso 4. Se ve en el admin (paso 3) en **Settings > Publishable API Keys**.

## 3. Backend (Render)

1. Entra a render.com con GitHub > **New > Blueprint** > elige el repo `W4730/deber2`. Render lee `render.yaml`.
2. Te pedirá estas variables:

| Variable | Valor |
|---|---|
| `DATABASE_URL` | la URL de Neon |
| `MEDUSA_BACKEND_URL` | la URL de Render del servicio (si aún no la sabes, pon cualquier cosa y corrígela luego) |
| `ADMIN_CORS` | la misma URL de Render |
| `AUTH_CORS` | la misma URL de Render |
| `STORE_CORS` | la URL de Vercel (paso 4). Mientras tanto: `http://localhost:8000` |

3. Espera el deploy (unos 5-10 min). Luego verifica:
   - `https://<render>/health` debe responder `OK`
   - `https://<render>/app` abre el admin; entra con el usuario del paso 2

Las URLs van sin `/` al final.

## 4. Tienda (Vercel)

1. Entra a vercel.com con GitHub > **Add New > Project** > importa `W4730/deber2`.
2. **Root Directory**: `store/apps/storefront` (Vercel detecta Next.js y pnpm).
3. **Environment Variables**:

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | URL de Render |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | la publishable key (`pk_...`) |
| `NEXT_PUBLIC_DEFAULT_REGION` | `ec` |
| `NEXT_PUBLIC_BASE_URL` | la URL que te dé Vercel (puedes ajustarla tras el primer deploy) |

4. **Deploy**.

## 5. Conectar tienda y backend

En Render > Environment, cambia `STORE_CORS` a la URL de Vercel y guarda (Render redespliega solo). Sin esto la tienda no puede crear carritos.

## 6. Evitar que el backend se duerma (recomendado)

El plan gratis de Render apaga el servidor tras 15 min sin visitas, y la primera visita después tarda unos 50 s. Para mantenerlo despierto, crea un monitor gratis en [UptimeRobot](https://uptimerobot.com): tipo HTTP, URL `https://<render>/health`, cada 5 minutos.

## Problemas comunes

- **La tienda carga pero el carrito falla** → `STORE_CORS` en Render no coincide exactamente con la URL de Vercel.
- **Error de publishable key** → revisa `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` en Vercel y redespliega (las variables `NEXT_PUBLIC_*` se leen al compilar).
- **El build de Render se queda sin memoria** → añade en Render la variable `DISABLE_MEDUSA_ADMIN=true`. La tienda sigue funcionando; el admin lo usas desde tu PC con `DATABASE_URL` apuntando a Neon.
- **Cambiaste productos o el seed** → el seed solo corre en una base vacía; los productos nuevos se crean desde el admin.
