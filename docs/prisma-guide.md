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
Para poblar la base de datos con datos iniciales (asegúrate de tener configurado el script `seed` en `package.json` o usa `tsx`):
```bash
pnpm prisma db seed
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
