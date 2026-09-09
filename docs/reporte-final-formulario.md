# Reporte final del formulario de solicitud de oferta

**Spencer Buys Houses** · Revisión previa al lanzamiento
Fecha: 4 de agosto de 2026

---

## Alcance

Se revisó el recorrido completo que hace un visitante desde que escribe su dirección en la página de inicio hasta que agenda su cita: los siete pasos del formulario, la pantalla de contacto y la página de agendamiento.

La revisión toma en cuenta las decisiones de negocio ya tomadas y **no las cuestiona**. Cuando una recomendación de experiencia de usuario entra en conflicto con una decisión del negocio, se evalúa qué tan bien está implementada esa decisión, no si debería existir.

---

## Resumen ejecutivo

El rediseño cumplió su objetivo. El formulario pasó de cuatro pantallas cargadas con cerca de veinte campos a **siete pasos con una sola pregunta cada uno**. El recorrido es más corto, más claro y considerablemente más fácil de completar desde un teléfono.

El único asunto de peso que encontramos no está en el diseño del recorrido, sino en **la distancia entre lo que el formulario promete y lo que el negocio puede entregar de manera responsable**. Es un problema de redacción, no de estructura, y se corrige cambiando el texto de tres pantallas.

> ### Calificación general: **8.5 / 10**
>
> La estructura del formulario está resuelta. Lo que separa la nota actual de un 9.5 es un ajuste de expectativas y tres refinamientos de bajo costo.

| | |
|---|---|
| **Puntos a resolver antes de lanzar** | 1 |
| **Mejoras recomendadas para después** | 3 |

---

## Lo que funciona muy bien

**Una decisión por pantalla.** Es el cambio de mayor valor de todo el rediseño. El visitante nunca ve más de una pregunta a la vez y ninguna pantalla lo obliga a desplazarse para entender qué se le está pidiendo.

**El sistema trabaja por el cliente.** En cuanto se conoce la dirección, el formulario consulta los registros públicos de la propiedad en segundo plano. Para cuando el visitante llega al paso de detalles, la información ya está esperándolo: solo tiene que confirmarla en lugar de escribirla.

**El cliente siempre tiene la última palabra.** Si el visitante escribió un dato, el sistema nunca lo sobrescribe con el que encontró. Y en cuanto edita un valor sugerido, la etiqueta de "dato obtenido de registros públicos" desaparece — el formulario deja de atribuirse algo que ya es del cliente.

**El indicador de progreso es honesto.** La línea "Paso 4 de 7 — Precio" está siempre visible, incluso en teléfonos donde las etiquetas de la barra se ocultan por falta de espacio. El visitante siempre sabe dónde está y cuánto le falta.

**No se pregunta lo que no aplica.** El año de la última venta solo aparece si los registros públicos efectivamente lo conocían. No se le pide al cliente que recuerde una fecha que no hay razón para esperar que sepa.

**El avance no se pierde.** Si el visitante regresa desde la pantalla de contacto para corregir algo, sus respuestas siguen ahí en ambas direcciones.

---

## El punto a resolver antes de lanzar

### 1. Se promete una oferta inmediata que el negocio no debe dar en línea

**Qué está pasando.** El recorrido promete una oferta inmediata en dos momentos:

| Dónde | Qué dice |
|---|---|
| Página de inicio | "Recibe tu oferta en aproximadamente **2 minutos**" |
| Última pantalla | "Un paso más — **para ver tu OFERTA**" |

Al enviar el formulario, el visitante llega a la página de agendamiento y lee: *"Recibirás tu oferta por correo en breve"*, seguido de un video y un calendario para agendar la conversación.

**Por qué importa.** Es una promesa incumplida en el momento de mayor inversión del cliente. Acaba de contestar seis preguntas y entregar su nombre, teléfono y correo — y la razón por la que lo hizo fue *para ver la oferta ahora*.

Esto es además lo único que convierte una decisión de negocio razonable en un riesgo. Dejar los datos de contacto al final está bien **siempre que el intercambio se cumpla**. Si no se cumple, el cliente pagó el precio más alto del formulario y siente que no recibió nada a cambio.

**Qué proponemos.** Alinear el texto con lo que el negocio realmente entrega. **No recomendamos publicar una cifra en el sitio**, y no solo por una cuestión operativa: mostrarla sería un error comercial.

- Una oferta en efectivo por una casa **no se sostiene sin ver la propiedad**. Cualquier número publicado antes de la visita es provisional por definición.
- Un número provisional **ancla al vendedor**. Si la oferta real resulta menor, la conversación arranca a la defensiva en lugar de arrancar vendiendo.
- Una cifra que después se corrige a la baja **se percibe como gancho**. El daño a la reputación supera cualquier ganancia de conversión.
- La cifra es **el mejor motivo que tiene el cliente para asistir a la cita**. Entregada por adelantado, deja de serlo.

La página de agendamiento ya dice lo correcto. El trabajo consiste en que las pantallas anteriores digan lo mismo:

| Dónde | Cambiar a |
|---|---|
| Página de inicio | "Recibe tu oferta **en 24 horas**" |
| Última pantalla | "Un paso más — **para recibir tu oferta**" |

El botón final, *"Quiero mi oferta gratis en efectivo"*, puede quedarse como está: expresa la intención del cliente, no un plazo.

| Impacto | Esfuerzo |
|---|---|
| **Alto** | Bajo |

---

## Mejoras recomendadas para después del lanzamiento

Ninguna de estas bloquea la publicación. Todas son de bajo costo.

### 2. La opción "Otro" no pregunta nada más

Cuando el cliente marca *Otro* como motivo de venta, el equipo de ventas recibe literalmente la palabra "Otro". Proponemos que al seleccionarla se abra un campo de texto opcional de una línea. Es información valiosa a costo cero: quien no quiera escribir, simplemente avanza.

**Impacto: Medio · Esfuerzo: Bajo**

### 3. En la pantalla de dirección, el mapa aparece antes que la dirección

El mapa ocupa la primera pantalla completa en un teléfono, y el texto de la dirección —que es lo que realmente hay que verificar— queda debajo. El orden de lectura debería coincidir con el orden de la decisión: primero el dato, después la confirmación visual.

**Impacto: Medio · Esfuerzo: Bajo**

### 4. Una dirección puede avanzar incompleta

En la página de inicio, el botón se habilita en cuanto el visitante escribe algo, sin necesidad de elegir una de las sugerencias de Google. Quien escriba "123 main" y presione el botón avanza sin ciudad, estado ni código postal.

A partir de ahí todo se degrada: los registros públicos no encuentran la propiedad y la pantalla de detalles aparece completamente vacía, de modo que el equipo de ventas recibe un contacto sin información de respaldo.

No recomendamos endurecer la página de inicio —ahí la facilidad de entrada es correcta y es parte de por qué funciona. La corrección va en la pantalla de confirmación de dirección: si faltan datos, que se abra directamente en modo edición con el autocompletado activo. Esa pantalla existe justamente para esto.

**Impacto: Medio-Alto · Esfuerzo: Bajo**

---

## Qué haríamos antes de dar el formulario por terminado

**Una sola cosa: ajustar el texto de las dos pantallas que prometen una oferta inmediata.** Es un cambio de redacción, sin riesgo técnico, y elimina el único punto del recorrido donde el cliente puede sentirse engañado.

Las tres mejoras restantes pueden implementarse después de publicar, en cualquier orden.

---

## Sobre la calificación

**8.5 de 10.**

Lo que ya vale un 9 es el recorrido en sí: el orden de las preguntas, la carga que se le pide al cliente en cada pantalla, el uso automático de registros públicos, la honestidad del indicador de progreso y la consistencia visual del conjunto. Como estructura de formulario, esto está resuelto.

Lo que baja la nota:

| Punto | Resta | Por qué |
|---|---|---|
| Promesa de oferta inmediata | −1.0 | Es lo único que afecta directamente la confianza del cliente |
| Los tres refinamientos pendientes | −0.5 | Pulido: ninguno impide completar el formulario |

Llegar a un 10 exigiría funciones cuyo retorno todavía es incierto —guardar el avance para retomarlo después, lógica condicional más profunda— y no recomendamos perseguirlas por ahora. Perfeccionar sin evidencia cuesta más de lo que devuelve.
