# Auditoría final del formulario de solicitud de oferta

**Spencer Buys Houses** · Revisión previa al lanzamiento
Fecha: 4 de agosto de 2026

---

## Alcance

Se revisó el recorrido completo que hace un visitante desde que escribe su dirección en la página de inicio hasta que agenda su cita: los siete pasos del formulario, la pantalla de contacto y la página de agendamiento.

La revisión toma en cuenta las decisiones de negocio ya tomadas y **no las cuestiona**. Cuando una recomendación de experiencia de usuario entra en conflicto con una decisión del negocio, se evalúa qué tan bien está implementada esa decisión, no si debería existir.

---

## Resumen ejecutivo

El rediseño cumplió su objetivo. El formulario pasó de cuatro pantallas cargadas con cerca de veinte campos a **siete pasos con una sola pregunta cada uno**. El recorrido es más corto, más claro y considerablemente más fácil de completar desde un teléfono.

Los problemas que encontramos no están en el diseño del recorrido. Están en **la distancia entre lo que el formulario promete y lo que entrega**, y en la ausencia total de medición para saber si el rediseño está funcionando.

> ### Calificación general: **7.5 / 10**
>
> La estructura del formulario, por sí sola, vale un 9. Lo que baja la nota son cuatro asuntos concretos y corregibles, todos resolubles en aproximadamente medio día de trabajo. Con esos cuatro puntos atendidos, el formulario es un 9.

| | |
|---|---|
| **Puntos a resolver antes de lanzar** | 4 |
| **Mejoras recomendadas para después** | 7 |
| **Decisiones que corresponden a Spencer** | 2 |

---

## Lo que funciona muy bien

**Una decisión por pantalla.** Es el cambio de mayor valor de todo el rediseño. El visitante nunca ve más de una pregunta a la vez y ninguna pantalla lo obliga a desplazarse para entender qué se le está pidiendo.

**El sistema trabaja por el cliente.** En cuanto se conoce la dirección, el formulario consulta los registros públicos de la propiedad en segundo plano. Para cuando el visitante llega al paso de detalles, la información ya está esperándolo: solo tiene que confirmarla en lugar de escribirla.

**El cliente siempre tiene la última palabra.** Si el visitante escribió un dato, el sistema nunca lo sobrescribe con el que encontró. Y en cuanto edita un valor sugerido, la etiqueta de "dato obtenido de registros públicos" desaparece — el formulario deja de atribuirse algo que ya es del cliente.

**El indicador de progreso es honesto.** La línea "Paso 4 de 7 — Precio" está siempre visible, incluso en teléfonos donde las etiquetas de la barra se ocultan por falta de espacio. El visitante siempre sabe dónde está y cuánto le falta.

**No se pregunta lo que no aplica.** El año de la última venta solo aparece si los registros públicos efectivamente lo conocían. No se le pide al cliente que recuerde una fecha que no hay razón para esperar que sepa.

**El avance no se pierde.** Si el visitante regresa desde la pantalla de contacto para corregir algo, sus respuestas siguen ahí en ambas direcciones.

---

## Los cuatro puntos a resolver antes de lanzar

### 1. El formulario promete una oferta que el visitante nunca ve

**Qué está pasando.** El recorrido promete una oferta en tres momentos distintos:

| Dónde | Qué dice |
|---|---|
| Página de inicio | "Recibe tu oferta en aproximadamente **2 minutos**" |
| Última pantalla | "Un paso más — **para ver tu OFERTA**" |
| Botón final | "**QUIERO MI OFERTA GRATIS EN EFECTIVO**" |

Al enviar el formulario, el visitante llega a la página de agendamiento y lee: *"Recibirás tu oferta por correo en breve"*, seguido de un video y un calendario. **Nunca ve una cifra.**

Y la cifra existe. El sistema ya calcula la oferta estimada, el valor de reparaciones y el valor de reventa de cada propiedad. Esos números llegan correctamente al CRM para el equipo de ventas, pero se pierden en el último tramo y jamás se le muestran a la persona que acaba de entregar sus datos para verlos.

**Por qué importa.** Es una promesa incumplida en el momento de mayor inversión del cliente. Acaba de contestar seis preguntas y entregar su nombre, teléfono y correo — y la razón por la que lo hizo fue *para ver la oferta*.

Esto es además lo único que convierte una decisión de negocio razonable en un riesgo. Dejar los datos de contacto al final está bien **siempre que el intercambio se cumpla**. Si no se cumple, el cliente pagó el precio más alto del formulario sin recibir nada a cambio, y esa es la sensación con la que se queda.

**Qué proponemos.** Dos caminos posibles; la decisión corresponde a Spencer y está desarrollada más abajo, en *Decisiones que corresponden a Spencer*.

Lo que no es sostenible es el estado actual: prometer una cosa y entregar otra.

| Impacto | Esfuerzo |
|---|---|
| **Alto** | Medio |

---

### 2. No hay forma de saber en qué paso se pierde la gente

**Qué está pasando.** El sitio tiene Google Analytics y Google Ads correctamente instalados, pero lo único que se está registrando en todo el embudo es la cita agendada al final. Los seis pasos del formulario ocurren en una sola dirección web, y por la forma en que están construidos, **Analytics los ve como una sola visita**.

En términos prácticos: hoy se sabe cuántas personas terminan, pero no se sabe **dónde abandonan las que no terminan**.

**Por qué importa.** Se acaba de rehacer el formulario completo. Sin datos por paso no hay manera de comprobar si mejoró, ni de saber qué pregunta está costando conversiones. Todas las demás recomendaciones de este informe son hipótesis razonables hasta que exista esta información.

**Qué proponemos.** Registrar un evento por cada paso completado. Es un cambio pequeño y aislado que empieza a generar datos desde el primer día.

| Impacto | Esfuerzo |
|---|---|
| **Alto** | Bajo |

---

### 3. El campo de precio borra lo que el cliente escribe

**Qué está pasando.** El campo donde el cliente escribe cuánto espera recibir por su propiedad solo acepta dígitos. Si escribe `150,000` o `$150,000` —que es exactamente como una persona escribe el precio de una casa— el navegador rechaza la coma y el signo, y el campo puede quedar vacío.

El cliente ve desaparecer lo que acaba de escribir, o presiona "Siguiente" y recibe el mensaje *"Por favor ingresa el monto que tienes en mente"* después de haberlo ingresado.

Un detalle adicional: si el cliente hace scroll con el ratón mientras el cursor está sobre ese campo, la cifra cambia sola sin que él lo note.

**Por qué importa.** Es el campo más cargado emocionalmente del formulario y el único donde el cliente escribe libremente. Fue una decisión explícita del negocio que el precio se escriba a mano en lugar de elegirse de una lista — razón de más para que escribir ahí sea impecable.

**Qué proponemos.** Aceptar el formato natural: permitir comas y el signo de dólar, mostrar el símbolo `$` dentro del campo y dar formato a los miles automáticamente. El sistema limpia el valor internamente antes de enviarlo.

| Impacto | Esfuerzo |
|---|---|
| **Alto** | Bajo |

---

### 4. Los datos personales quedan visibles en el navegador

**Qué está pasando.** Quedaron activas unas instrucciones de depuración que se usaron durante el desarrollo. La más delicada imprime el registro completo del cliente —nombre, apellido, teléfono, correo, dirección y todas sus respuestas— en la consola del navegador, una herramienta que cualquier visitante puede abrir.

**Por qué importa.** Al pie de cada pantalla del formulario se lee "Tu información es segura y nunca se comparte con terceros". La incoherencia es difícil de defender si alguien la detecta, y en este giro de negocio la confianza es la mitad de la venta.

**Qué proponemos.** Retirarlas antes de publicar. No afectan ninguna funcionalidad.

| Impacto | Esfuerzo |
|---|---|
| **Medio** | Bajo |

---

## Mejoras recomendadas para después del lanzamiento

Ninguna de estas bloquea la publicación. Todas son de bajo costo y conviene medirlas contra los datos que empiece a generar el punto 2.

### 5. La opción "Otro" no pregunta nada más

Cuando el cliente marca *Otro* como motivo de venta, el equipo de ventas recibe literalmente la palabra "Otro". Proponemos que al seleccionarla se abra un campo de texto opcional de una línea. Es información valiosa a costo cero: quien no quiera escribir, simplemente avanza.

**Impacto: Medio · Esfuerzo: Bajo**

### 6. En la pantalla de dirección, el mapa aparece antes que la dirección

El mapa ocupa la primera pantalla completa en un teléfono, y el texto de la dirección —que es lo que realmente hay que verificar— queda debajo. El orden de lectura debería coincidir con el orden de la decisión: primero el dato, después la confirmación visual.

**Impacto: Medio · Esfuerzo: Bajo**

### 7. El cambio entre pasos es abrupto

Hoy el contenido se reemplaza de golpe mientras la página se desplaza hacia arriba. Se percibe como un salto, no como un avance. Una transición breve entre pasos hace que el recorrido se sienta continuo y refuerza la sensación de progreso.

**Impacto: Bajo-Medio · Esfuerzo: Bajo**

### 8. El encabezado se repite en los seis pasos

El título y el párrafo introductorio de la página se muestran idénticos en cada uno de los seis pasos. En un teléfono consumen buena parte de la primera pantalla **cada vez**, obligando al cliente a pasar por encima del mismo texto seis veces antes de llegar a la pregunta. Proponemos mostrar el párrafo únicamente en el primer paso.

**Impacto: Medio · Esfuerzo: Bajo**

### 9. La casilla obligatoria se ve menos importante que la opcional

En la pantalla final, la casilla **opcional** de mensajes SMS está dentro de un recuadro destacado, mientras que la casilla **obligatoria** de términos y privacidad —la que impide enviar el formulario si no se marca— es texto suelto sin ningún realce. El elemento que puede detener la conversión parece el menos importante de los dos.

*Nota:* no recomendamos ocultar ni acortar el texto legal de SMS. La normativa de comunicaciones suele exigir que esa redacción sea visible en el momento del consentimiento. Se trata de darle más presencia a la obligatoria, no menos a la otra.

**Impacto: Medio · Esfuerzo: Bajo**

### 10. Una dirección puede avanzar incompleta

En la página de inicio, el botón se habilita en cuanto el visitante escribe algo, sin necesidad de elegir una de las sugerencias de Google. Quien escriba "123 main" y presione el botón avanza sin ciudad, estado ni código postal.

A partir de ahí todo se degrada: los registros públicos no encuentran la propiedad, la pantalla de detalles aparece completamente vacía y el cálculo de la oferta trabaja con información parcial.

No recomendamos endurecer la página de inicio —ahí la facilidad de entrada es correcta y es parte de por qué funciona. La corrección va en la pantalla de confirmación de dirección: si faltan datos, que se abra directamente en modo edición con el autocompletado activo. Esa pantalla existe justamente para esto.

**Impacto: Medio-Alto · Esfuerzo: Bajo**

### 11. Hay una espera sin explicación antes de la pantalla final

Entre la confirmación de detalles y la pantalla de contacto, el sistema calcula la oferta consultando servicios externos. Es una pausa perceptible durante la cual el cliente solo ve un ícono girando, sin ninguna indicación de qué está ocurriendo.

Si se decide mostrar la oferta (punto 1), conviene aprovechar ese momento y etiquetarlo: *"Calculando tu oferta…"*. Si se decide no mostrarla, no hay razón para retener al cliente y el cálculo puede hacerse en segundo plano.

**Impacto: Medio · Esfuerzo: Bajo**

---

## Anotaciones menores

Se registran para dejar constancia. Su retorno es bajo y pueden esperar indefinidamente.

- **El color ámbar tiene demasiados significados.** Durante seis pasos el ámbar indica "esto está seleccionado" o "este dato lo trajimos nosotros"; en el séptimo se convierte en el botón de acción. Además, el punto activo de la barra de progreso y su etiqueta usan dos tonos de amarillo ligeramente distintos.
- **Los botones "Guardar" y "Cancelar"** del modo de edición de dirección no cambian de aspecto al pasar el cursor y no siguen el estilo del resto del formulario.
- **No hay señal de zona de cobertura.** Una propiedad fuera del área de servicio puede completar todo el recorrido y agendar una cita. Sugerimos un aviso suave —nunca un bloqueo— pero primero habría que confirmar cuál es la política real de cobertura geográfica.

---

## Decisiones que corresponden a Spencer

Dos puntos de este informe no son técnicos ni de diseño: son decisiones de negocio. Los dejamos planteados con sus implicaciones, sin recomendar unilateralmente.

### A. ¿Mostramos la oferta o ajustamos la promesa?

| Opción | Qué implica | A favor | En contra |
|---|---|---|---|
| **Mostrar la cifra** | Presentar el rango estimado en la página de agendamiento | Cumple la promesa. El cálculo ya está hecho y pagado. Es lo que el cliente vino a buscar | Da un número antes de la conversación, y el cliente puede anclarse a él |
| **Ajustar el texto** | Cambiar las tres promesas para ofrecer *"tu oferta en 24 horas"* | Coherente con lo que ya dice la página de agendamiento. Conserva la cifra como argumento para la llamada | La página de inicio pierde la promesa de inmediatez, que hoy es parte de su gancho |

Cualquiera de las dos resuelve el problema. La combinación actual —prometer inmediatez y entregar seguimiento— es la única alternativa que no funciona.

### B. ¿Vale la pena separar al cliente urgente del que solo está explorando?

La pregunta de plazo ofrece hoy tres opciones: *en una semana*, *en un mes*, *en más de un mes*. Fue una decisión explícita del negocio y **no proponemos cambiarla por nuestra cuenta**.

Lo dejamos planteado únicamente porque la tercera opción agrupa a dos personas muy distintas: alguien que vende en cinco semanas y alguien que apenas está averiguando. Para el cliente, distinguirlos cuesta lo mismo —un solo toque—; para el equipo de ventas, la diferencia es entre una cita bien invertida y una que no lo era.

**Impacto para ventas: Medio · Esfuerzo: Bajo**

---

## Qué haríamos antes de dar el formulario por terminado

Cuatro cosas, en este orden:

1. **Resolver la promesa de la oferta** — mostrarla o dejar de prometerla. *(Requiere decisión de Spencer)*
2. **Instalar la medición por paso** — sin esto no sabremos si el rediseño funcionó.
3. **Corregir el campo de precio.**
4. **Retirar las instrucciones de depuración.**

Los cuatro juntos representan aproximadamente **medio día de trabajo**. Las siete mejoras de la segunda ola pueden hacerse después de publicar y evaluarse con los datos reales que empiece a generar el punto 2.

---

## Sobre la calificación

**7.5 de 10.**

Lo que ya vale un 9 es el recorrido en sí: el orden de las preguntas, la carga que se le pide al cliente en cada pantalla, el uso automático de registros públicos, la honestidad del indicador de progreso y la consistencia visual del conjunto. Como estructura de formulario, esto está resuelto.

Lo que baja la nota, en orden de peso:

| Punto | Resta | Por qué |
|---|---|---|
| Promesa de oferta incumplida | −1.5 | Es lo único que afecta directamente la conversión y la confianza |
| Ausencia de medición | −0.5 | No daña la experiencia hoy, pero impide mejorarla mañana |
| Campo de precio y datos en consola | −0.5 | Defectos de acabado, baratos de corregir, sin justificación en producción |

Llegar a un 10 exigiría funciones cuyo retorno todavía es incierto —guardar el avance para retomarlo después, lógica condicional más profunda— y no recomendamos perseguirlas hasta tener datos reales de abandono por paso. Perfeccionar a ciegas cuesta más de lo que devuelve.
