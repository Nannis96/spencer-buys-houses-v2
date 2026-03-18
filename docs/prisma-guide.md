# Guía de Prisma

Esta guía detalla los comandos necesarios para administrar la base de datos y el ORM Prisma utilizando `pnpm`.

## Comandos Principales

### Generar el Cliente de Prisma
Cada vez que realices cambios en el archivo `schema.prisma`, debes regenerar el cliente:
```bash
pnpm prisma generate
```

### Ejecutar Migraciones
Para aplicar los cambios del esquema a la base de datos y crear una nueva migración:
```bash
pnpm prisma migrate dev --name nombre_de_la_migracion
```

### Restablecer la Base de Datos
Para borrar todos los datos y reaplicar las migraciones (¡Cuidado: esto elimina datos!):
```bash
pnpm prisma migrate reset
```

### Inicializar / Sincronizar Base de Datos
Para sincronizar el estado de la base de datos sin crear una nueva migración:
```bash
pnpm prisma db push
```

### Ejecutar Seeders

El proyecto utiliza seeders para poblar la base de datos con datos de prueba.

#### 1. Seeder General (Usuarios/Admin)
Para ejecutar el seeder principal que crea el usuario administrador:
```bash
pnpm prisma db seed
```

#### 2. Seeders Individuales

Si deseas ejecutar un seeder específico sin correr todo el flujo de `prisma db seed`, puedes usar `tsx` para ejecutar el archivo directamente:

```bash
npx tsx prisma/seed/nombre-del-archivo.ts
```

#### Ejecución en Docker

Si el proyecto se encuentra corriendo en Docker, puedes ejecutar un seeder individual de la siguiente manera:

```bash
docker compose exec web npx tsx prisma/seed/nombre-del-archivo.ts
```

## Administración Visual

### Prisma Studio
Para abrir la interfaz gráfica de administración de la base de datos:
```bash
pnpm prisma studio
```
*Si estás usando Docker, asegúrate de que el puerto 5555 esté mapeado o ejecútalo desde tu host apuntando a la DB mapeada.*

## Ejecución dentro de Docker

Si necesitas ejecutar estos comandos dentro del contenedor `web`:

```bash
docker-compose exec web pnpm prisma <comando>
```

Ejemplo para migrar:
```bash
docker-compose exec web pnpm prisma migrate dev
```
