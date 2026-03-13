# Guía de Docker

Esta guía explica cómo ejecutar y administrar el proyecto utilizando Docker.

## Requisitos Previos

- Docker instalado.
- Docker Compose instalado.

## Ejecución del Proyecto

Para iniciar el proyecto en modo de desarrollo, utiliza el siguiente comando:

```bash
docker-compose up -d --build
```

Esto levantará los servicios:
- `web`: La aplicación Next.js en el puerto `3000`.
- `db`: La base de datos PostgreSQL en el puerto `5432`.

## Comandos Comunes de Docker

### Ver Logs
Para ver los logs de los contenedores:
```bash
docker-compose logs -f
```

### Detener Servicios
Para detener y eliminar los contenedores:
```bash
docker-compose down
```

### Acceso a la Terminal del Contenedor
Para entrar en la terminal del contenedor de la aplicación:
```bash
docker-compose exec web sh
```

### Estado de los Contenedores
Para ver el estado de los servicios:
```bash
docker-compose ps
```

## Notas Adicionales
El proyecto está configurado para sincronizar los cambios de código en tiempo real mediante volúmenes. Si instalas una nueva dependencia en el `package.json`, es recomendable reconstruir la imagen:
```bash
docker-compose up -d --build
```
