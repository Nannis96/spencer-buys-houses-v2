# Guía de Imágenes y Multimedia

Esta guía explica cómo se manejan las imágenes en el proyecto, incluyendo la configuración de dominios externos y la integración con AWS S3.

## Configuración de Dominios Externos (Next.js Image)

Next.js requiere que los dominios externos estén autorizados en `next.config.ts` para poder optimizar y mostrar imágenes usando el componente `<Image />`.

### Dominios Autorizados Actuales

Si necesitas cargar imágenes de un nuevo servicio, añádelo a la lista `remotePatterns` en `next.config.ts`:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Usado para posts de prueba
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me', // Usado para perfiles de autor de prueba
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com', // Crítico para las imágenes subidas a S3
      },
    ],
  },
};
```

> [!IMPORTANT]
> Cada vez que modifiques esta lista, debes **reiniciar el servidor de desarrollo** (`pnpm dev` o `docker compose restart web`) para que los cambios surtan efecto.

## Almacenamiento en AWS S3

Las imágenes del blog (portadas, fotos de autor e imágenes inline) se suben directamente a un bucket de S3.

### Estructura de Carpetas

En el bucket de S3, las imágenes se organizan por carpetas:
- `blog/main/`: Imágenes de portada de los artículos.
- `blog/authors/`: Fotos de perfil de los redactores.
- `blog/content/`: Imágenes que van dentro del cuerpo del artículo.

### Eliminación Automática

El sistema está configurado para que, cuando se elimine un post desde el dashboard, se busquen todas las imágenes asociadas en S3 y se borren del bucket automáticamente para evitar costos innecesarios y mantener el storage limpio.
