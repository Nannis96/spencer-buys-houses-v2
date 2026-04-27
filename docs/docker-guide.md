# Guía de Docker

Esta guía explica cómo ejecutar y administrar el proyecto con Docker en los distintos entornos disponibles.

## Requisitos Previos

- Docker Desktop (o Docker Engine + Docker Compose plugin) instalado.

---

## Entornos disponibles

| Entorno     | Archivo compose             | Dockerfile         | Puerto |
|-------------|-----------------------------|--------------------|--------|
| Desarrollo  | `docker-compose.yml`        | `Dockerfile.dev`   | 3000   |
| Staging     | `docker-compose.stage.yml`  | `Dockerfile.stage` | 3000   |

---

## Desarrollo

Levanta la aplicación con hot-reload y la base de datos:

```bash
docker compose up -d --build
```

Servicios:
- `web`: Next.js en modo desarrollo en el puerto `3000`.
- `db`: PostgreSQL en el puerto `5432`.

Los cambios de código se reflejan en tiempo real mediante volúmenes. Si instalas nuevas dependencias, reconstruye la imagen:

```bash
docker compose up -d --build
```

---

## Staging / Producción

### Primera puesta en marcha (o rebuild completo)

```bash
# 1. Construir y levantar los servicios
docker compose -f docker-compose.stage.yml up -d --build

# 2. Verificar que los contenedores están corriendo y la DB está healthy
docker compose -f docker-compose.stage.yml ps
```

### Inicializar / resetear la base de datos en staging

> ⚠️ `migrate reset` elimina todos los datos. Úsalo solo en staging o cuando quieras partir de cero.

```bash
# Aplicar migraciones desde cero
docker compose -f docker-compose.stage.yml exec web npx prisma migrate reset --force

# Seed principal (crea usuarios admin/test)
docker compose -f docker-compose.stage.yml exec web npx prisma db seed

# Seed adicional de posts (ajusta el nombre del archivo según corresponda)
docker compose -f docker-compose.stage.yml exec web npx tsx prisma/seed/posts10_9.ts
```

### Aplicar nuevas migraciones (sin borrar datos)

```bash
docker compose -f docker-compose.stage.yml exec web npx prisma migrate deploy
```

### Ejecutar un seed específico

```bash
docker compose -f docker-compose.stage.yml exec web npx tsx prisma/seed/<nombre-del-archivo>.ts
```

> **Nota sobre `pnpm`:** La imagen de runner es minimal (standalone) y no incluye `pnpm`.
> Usa `npx prisma` y `npx tsx` para ejecutar comandos dentro del contenedor.
> No es necesario usar `-u root`; todos los archivos tienen el ownership correcto para el usuario `nextjs`.

---

## Comandos comunes

### Ver logs

```bash
# Desarrollo
docker compose logs -f

# Staging
docker compose -f docker-compose.stage.yml logs -f

# Solo el servicio web
docker compose -f docker-compose.stage.yml logs -f web
```

### Detener servicios

```bash
# Desarrollo
docker compose down

# Staging (conserva los volúmenes/datos)
docker compose -f docker-compose.stage.yml down

# Staging eliminando también los volúmenes (borra la DB)
docker compose -f docker-compose.stage.yml down -v
```

### Acceder a la terminal del contenedor

```bash
# Desarrollo
docker compose exec web sh

# Staging
docker compose -f docker-compose.stage.yml exec web sh
```

### Estado de los contenedores

```bash
docker compose -f docker-compose.stage.yml ps
# o
docker ps
```

### Reconstruir solo la imagen web (sin tocar la DB)

```bash
docker compose -f docker-compose.stage.yml up -d --build web
```
