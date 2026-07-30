# Experiencia de Usuario del Formulario de Captación de Leads

## 1. Objetivo del análisis

Evaluar, desde la perspectiva de experiencia de usuario (UX) y diseño de interfaz (UI), el recorrido completo que atraviesa un visitante al solicitar una oferta en efectivo por su propiedad: desde que ingresa su dirección hasta que agenda una cita con el equipo.

---

## 2. Diagnóstico

El formulario está diseñado para **recolectar información sobre la casa**, no para **conseguir un contacto**. Le pide al usuario su mayor esfuerzo al principio (unas 20 preguntas sobre la propiedad) y sus datos de contacto al final, casi como una formalidad de cierre.

La consecuencia es que el escenario más costoso —un usuario genuinamente interesado que se cansa a mitad del recorrido— no deja absolutamente nada aprovechable: ni recibe su oferta, ni el negocio obtiene una forma de contactarlo.

Las correcciones que siguen no requieren cambiar la identidad visual ni la propuesta de valor. Son ajustes de **orden, claridad y transparencia**, aplicables de forma incremental.

---

## 3. Lo que funciona bien

Conviene decirlo antes de entrar en las correcciones: la base es sólida y no hay que empezar de cero.

- **El arranque es genuinamente fácil.** El autocompletado de dirección permite empezar escribiendo unas pocas letras; es la primera impresión correcta.
- **Buen comportamiento en móvil en lo esencial:** cada campo abre el teclado adecuado (numérico para cifras, telefónico para el teléfono).
- **El consentimiento está bien ubicado**, justo antes del envío, junto a la acción que autoriza.
- **El indicador de progreso es honesto:** refleja el avance real del usuario, no es un adorno decorativo.
- **El sistema hace trabajo por el usuario:** busca por su cuenta datos públicos de la propiedad y los completa (aunque no se lo comunique — ver hallazgo 4).

---

## 4. Lo que hay que corregir

Cada hallazgo aparece una sola vez, con su impacto y su acción recomendada. El orden es la prioridad.

### Prioridad alta

| Hallazgo | Impacto en el usuario | Acción recomendada |
|---|---|---|
| **1. El contacto se pide al final** del recorrido, después de todas las preguntas sobre la propiedad | Quien abandona antes del último paso pierde todo su esfuerzo: no recibe oferta y el negocio queda sin forma de contactarlo. El compromiso mayor se exige en el peor momento *(secuencia esfuerzo–recompensa)* | Adelantar nombre y teléfono a las primeras pantallas, inmediatamente después de la dirección |
| **2. La pregunta sobre mejoras/reparaciones mezcla dos conceptos**: pregunta por lo mejorado, pero ofrece opciones que suenan a pendientes | El usuario duda entre "lo que arreglé" y "lo que falta por arreglar", y termina respondiendo algo que no refleja su situación *(claridad del lenguaje)* | Reescribir pregunta y opciones para que comuniquen una sola idea |
| **3. "Tiempo de posesión" es un campo de texto libre** sin formato sugerido | El usuario no sabe si escribir años, una fecha o una explicación; es una de las preguntas más lentas de responder *(reconocer en vez de recordar)* | Reemplazar por opciones predefinidas: menos de 1 año / 1–5 años / más de 5 / heredada |

### Prioridad media

| Hallazgo | Impacto en el usuario | Acción recomendada |
|---|---|---|
| **4. Los datos autocompletados no se identifican como tales** | El usuario no distingue lo que él escribió de lo que ya venía cargado: puede desconfiar y reescribirlo, o dejar pasar un dato incorrecto sin revisarlo *(transparencia del sistema)* | Marcar visualmente esos campos e invitar a **confirmarlos**, no a llenarlos desde cero |
| **5. Un campo obligatorio contradice su propio texto de ayuda**, que dice que "una estimación aproximada es suficiente" | Fricción injustificada: el formulario exige precisión en algo que él mismo presenta como flexible *(consistencia entre mensaje y comportamiento)* | Volverlo opcional o proponer un valor sugerido y editable |
| **6. El indicador de progreso no dice cuánto falta** y pierde sus etiquetas de texto en pantallas pequeñas | En el dispositivo más usado, el usuario avanza sin saber cuánto le queda por delante *(reducción de la incertidumbre)* | Mantener las etiquetas visibles en móvil y añadir una referencia concreta: "paso 3 de 6" |
| **7. Una pantalla concentra mapa, resumen de dirección y nueve preguntas** en un solo scroll largo | Sobrecarga visual y fatiga; es el punto del recorrido con mayor riesgo de abandono por cansancio *(carga cognitiva / divulgación progresiva)* | Dividir en bloques más livianos y presentar los datos ya conocidos como un resumen compacto |
| **8. La promesa inicial de "aproximadamente 2 minutos"** no corresponde con el recorrido real | La expectativa se rompe a mitad de camino, cuando el usuario ya invirtió esfuerzo: el momento más caro para perder su confianza *(expectativas honestas)* | Ajustar el mensaje al tiempo real, o acortar el recorrido hasta que la promesa sea cierta |

### Prioridad baja

| Hallazgo | Impacto en el usuario | Acción recomendada |
|---|---|---|
| **9. Si el usuario se interrumpe, no puede retomar** ni recibe señal de que su avance quedó guardado | Debe empezar de cero, y en la práctica no vuelve *(control y continuidad de la tarea)* | Permitir retomar el recorrido donde se quedó, y comunicarlo |
| **10. Las preguntas no se adaptan a las respuestas anteriores** | Todos recorren las mismas pantallas aunque su situación ya descarte ciertas preguntas *(eficiencia de uso)* | Ocultar las preguntas que dejaron de aplicar |

---

## 5. Qué se gana

- **Más contactos**, incluidos los de usuarios que no llegan hasta el final del recorrido.
- **Mejor calidad de la información**, al eliminar preguntas ambiguas y respuestas en formato libre.
- **Mayor confianza**: el usuario entiende dónde está, cuánto falta y qué datos ya están cargados.
- **Seguimiento comercial más temprano**, sin depender de que el usuario complete absolutamente todo.

---

## 6. Conclusión

El cambio de mayor impacto es también el más simple de explicar: **pedir primero lo que permite continuar la conversación (nombre y teléfono) y después lo que permite afinar la oferta.**

Los hallazgos 2 y 3 mejoran la calidad del dato con un esfuerzo bajo. Los de prioridad media y baja son refinamientos que hacen el recorrido más claro y más corto, pero ninguno resuelve por sí solo el riesgo principal: perder por completo al usuario que no llega al final.
