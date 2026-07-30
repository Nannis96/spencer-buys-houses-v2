# Experiencia de Usuario del Formulario de Captación de Leads
### Documento ejecutivo para presentación de equipo

---

## 1. Objetivo del análisis

Evaluar, desde la perspectiva de experiencia de usuario (UX) y diseño de interfaz (UI), el recorrido completo que atraviesa un visitante al solicitar una oferta en efectivo por su propiedad: desde que ingresa su dirección hasta que agenda una cita con el equipo.

El propósito no es rediseñar la marca ni cambiar la propuesta de valor, sino identificar en qué momentos del recorrido el diseño actual genera fricción, confusión o desconfianza — y qué ajustes de experiencia permitirían capturar más contactos y de mejor calidad, sin perder la información sobre la propiedad que el negocio necesita para preparar una oferta.

Este documento se apoya en un análisis técnico previo del formulario, pero traduce sus hallazgos exclusivamente a implicaciones de experiencia de usuario, dejando fuera cualquier consideración de arquitectura, desarrollo o infraestructura.

---

## 2. Resumen ejecutivo

- El formulario **funciona y tiene buenas bases**, pero su diseño actual comete un error de secuencia crítico: pide el dato de contacto (nombre, teléfono, correo) **al final** de un recorrido largo, justo después de que el usuario ya invirtió su mayor esfuerzo.
- **No existe ninguna señal que transmita "tu progreso está a salvo".** Si el usuario no termina en una sola sesión, la experiencia no le comunica que algo quedó guardado — lo cual desincentiva volver a intentarlo.
- Varias preguntas usan **redacción ambigua** o piden al usuario escribir libremente información que podría resolverse con opciones claras, aumentando el esfuerzo mental y la inconsistencia de las respuestas.
- El sistema completa automáticamente varios datos de la propiedad, lo cual **reduce el esfuerzo real** del usuario, pero **no se lo comunica visualmente** — el usuario no sabe que ese trabajo ya fue hecho por él.
- El indicador de avance es honesto (refleja el progreso real, no es decorativo), pero **no dice cuánto falta en términos concretos** y pierde claridad en móvil, el dispositivo más probable para este tipo de formularios.
- La promesa inicial de completar el proceso en "aproximadamente 2 minutos" **no corresponde a la cantidad real de pantallas y preguntas**, lo que puede generar frustración o sensación de expectativa incumplida.
- La pantalla de confirmación final **no siempre garantiza al usuario que su información fue realmente recibida** — un riesgo directo para la confianza en la marca.
- Ya existen buenas prácticas que vale la pena preservar: autocompletado de dirección, teclados adecuados en móvil, ubicación correcta del consentimiento justo antes del envío, e indicador de progreso veraz.

---

## 3. Hallazgos principales de UX/UI

| Aspecto evaluado | Situación actual | Lectura desde UX |
|---|---|---|
| **Orden de las preguntas** | El dato de contacto se pide al final, después de ~20 preguntas sobre la propiedad | El esfuerzo alto está antes que el compromiso bajo — al revés de lo recomendable |
| **Percepción de progreso guardado** | No existe ninguna señal de que el avance quedó registrado si el usuario se va | El usuario no tiene ninguna razón para sentir que "vale la pena volver" |
| **Claridad del lenguaje** | Algunas preguntas mezclan conceptos (por ejemplo, una pregunta sobre mejoras hechas a la casa junto a opciones que suenan a reparaciones pendientes) | Ambigüedad que reduce la confianza en la propia respuesta del usuario |
| **Transparencia del sistema** | El formulario autocompleta datos de la propiedad sin indicarlo visualmente | El usuario no distingue lo que él escribió de lo que el sistema completó por él |
| **Indicador de progreso** | Refleja el avance real (positivo), pero no expresa "cuánto falta" en número de pasos o tiempo, y pierde sus etiquetas de texto en pantallas pequeñas | Buena base, pero incompleta como guía de expectativas |
| **Consistencia de idioma/tono** | Un mensaje de carga aparece en español dentro de una interfaz completamente en inglés | Rompe la sensación de pulido y puede sembrar duda sobre si la página "funciona bien" |
| **Densidad de una pantalla específica** | Una de las pantallas combina un mapa, un resumen editable de la dirección y nueve preguntas en un solo scroll largo | Riesgo de sobrecarga visual y fatiga, especialmente en móvil |
| **Feedback de confirmación** | El mensaje final de "listo, te contactaremos" se muestra siempre, sin distinguir si el envío fue realmente exitoso | El usuario puede confiar en una confirmación que no refleja la realidad |
| **Buenas prácticas ya presentes** | Autocompletado de dirección, teclados numéricos/telefónicos correctos en móvil, checkbox de consentimiento ubicado justo antes del envío | Base sólida sobre la cual construir, no hay que empezar de cero |

---

## 4. Problemas detectados y su impacto en la experiencia del usuario

| Problema | Impacto en el usuario | Principio de diseño en juego |
|---|---|---|
| El contacto (nombre, teléfono, correo) se solicita al final del recorrido | Quien abandona antes de terminar no deja ningún rastro utilizable; su esfuerzo previo se pierde por completo, tanto para él como para el negocio | Pedir el compromiso mayor (dejar datos personales) solo después de generar valor, no antes |
| No hay percepción de progreso guardado | El usuario siente que todo se reinicia si no termina de una sola vez, lo cual desalienta retomar el proceso más tarde | Control y continuidad de la tarea del usuario |
| Preguntas con redacción ambigua | El usuario duda al responder, o contesta algo que no refleja su intención real, afectando la calidad de la información recolectada | Claridad del lenguaje / coincidencia entre el sistema y el mundo real |
| Un campo pide "tiempo de posesión de la propiedad" en texto libre, sin formato sugerido | El usuario no sabe cómo responder (¿años, fecha, una historia?), lo que aumenta el esfuerzo mental y genera respuestas inconsistentes | Reconocer en vez de recordar; preferir opciones sobre texto libre |
| El sistema completa datos automáticamente sin avisar | El usuario no sabe si esos datos son correctos, puede desconfiar y volver a escribirlos, o pasar por alto un error que ya viene cargado | Visibilidad del estado del sistema |
| Un campo es obligatorio aunque el propio texto de ayuda dice que "una estimación aproximada es suficiente" | Contradicción que genera fricción innecesaria: el sistema le exige precisión a algo que el propio mensaje trata como flexible | Consistencia entre el contenido (copy) y el comportamiento del formulario |
| La confirmación final no garantiza que la información se haya recibido correctamente | El usuario puede creer que todo salió bien y nunca ser contactado, sin enterarse de que algo falló — un golpe silencioso a la confianza en la marca | Visibilidad honesta del estado del sistema |
| El indicador de progreso pierde sus etiquetas de texto en móvil y no indica cuánto falta en términos concretos | Mayor incertidumbre sobre el esfuerzo restante, justo en el dispositivo donde más importa reducir la ansiedad de "¿cuánto más falta?" | Reducción de la incertidumbre / visibilidad del progreso |
| Inconsistencia de idioma en un mensaje de carga | Pequeña duda sobre si la página está funcionando correctamente; rompe la sensación de coherencia de marca | Consistencia y estándares |
| Una pantalla concentra mapa, resumen editable y nueve preguntas en un solo scroll largo | Sensación de sobrecarga, mayor probabilidad de abandono por fatiga, especialmente notable en móvil | Carga cognitiva / divulgación progresiva |
| No hay preguntas que se adapten a respuestas anteriores | Usuarios en situaciones que ya descartan ciertas preguntas (por ejemplo, una propiedad ya en venta con un agente) igual deben pasar por las mismas pantallas que todos | Eficiencia de uso / relevancia contextual |

---

## 5. Oportunidades de mejora

1. **Reordenar el recorrido** para que el dato de contacto (al menos nombre y teléfono) se solicite en una etapa temprana, no al final — asegurando que el mayor esfuerzo del usuario no ocurra sin que el negocio tenga ya una forma de contactarlo.
2. **Hacer visible el trabajo que el sistema ya hizo por el usuario**: mostrar con claridad qué datos de la propiedad fueron completados automáticamente, invitando solo a confirmarlos o corregirlos en vez de presentarlos como campos vacíos por llenar.
3. **Simplificar preguntas ambiguas**, revisando específicamente la relacionada con mejoras/reparaciones de la propiedad, para que la intención de la pregunta y las opciones ofrecidas comuniquen exactamente lo mismo.
4. **Reemplazar campos de texto libre por opciones predefinidas** en los casos donde la respuesta tiene un rango limitado y conocido (como el tiempo de posesión de la propiedad).
5. **Quitar la obligatoriedad de preguntas que el propio contenido ya trata como flexibles**, alineando el comportamiento del formulario con lo que le dice al usuario.
6. **Reforzar el indicador de progreso**: mantener las etiquetas de texto visibles también en móvil y sumar una referencia concreta de cuánto falta (por ejemplo, "paso 3 de 6").
7. **Unificar el idioma y el tono en toda la interfaz**, para transmitir una experiencia pulida y consistente de principio a fin.
8. **Redistribuir el contenido de la pantalla más densa** en bloques más pequeños y digeribles, reduciendo la sensación de sobrecarga.
9. **Incorporar lógica condicional** que oculte u omita preguntas que ya no aplican según respuestas anteriores del usuario.
10. **Garantizar que el mensaje de confirmación final sea siempre honesto** respecto al resultado real del envío, y ofrecer al usuario una alternativa visible (por ejemplo, un número de contacto) en caso de que algo no se haya podido completar.
11. **Explorar una forma de que el usuario pueda retomar el formulario** si no logra completarlo en un solo intento, para no depender exclusivamente de que termine todo de una vez.

---

## 6. Recomendaciones priorizadas

### Prioridad Alta — mayor impacto en la experiencia y en la captura de contactos

| Recomendación | Impacto esperado |
|---|---|
| Adelantar la solicitud de nombre y teléfono a las primeras pantallas del recorrido | Asegura que el esfuerzo del usuario no se pierda por completo si abandona antes de terminar |
| Asegurar que la confirmación final refleje honestamente si el envío fue exitoso, y ofrecer una vía de contacto alternativa visible si algo falla | Protege la confianza del usuario y evita una falsa sensación de "todo listo" |
| Corregir la redacción ambigua de la pregunta sobre mejoras/reparaciones de la propiedad | Mejora la calidad de la información recolectada y reduce la duda del usuario al responder |
| Convertir el campo de texto libre sobre tiempo de posesión en opciones predefinidas | Reduce el esfuerzo cognitivo y estandariza las respuestas |

### Prioridad Media — mejoras de claridad y confianza

| Recomendación | Impacto esperado |
|---|---|
| Visibilizar qué datos fueron autocompletados por el sistema | Aumenta la confianza del usuario en la información que ve |
| Quitar la obligatoriedad de campos que el propio texto ya trata como flexibles (ej. precio esperado) | Elimina fricción injustificada y contradicciones percibidas |
| Mostrar etiquetas de progreso también en móvil y agregar una referencia de "cuánto falta" | Reduce la incertidumbre, especialmente en el dispositivo más usado |
| Redistribuir la pantalla con mayor densidad de contenido en secciones más livianas | Disminuye la sensación de sobrecarga y el riesgo de abandono por fatiga |

### Prioridad Baja — pulido y eficiencia adicional

| Recomendación | Impacto esperado |
|---|---|
| Unificar idioma y tono en toda la interfaz | Refuerza la percepción de una experiencia cuidada y profesional |
| Incorporar lógica condicional para omitir preguntas no aplicables | Acorta el recorrido percibido para usuarios en situaciones específicas |
| Ofrecer una forma de retomar el formulario si no se completa en un solo intento | Da una segunda oportunidad de conversión sin forzar a reiniciar desde cero |

---

## 7. Beneficios esperados para los usuarios y para el producto

**Para el usuario:**
- Menos esfuerzo percibido y menos incertidumbre sobre cuánto falta por completar.
- Preguntas más claras, con menos ambigüedad al momento de responder.
- Mayor confianza en que la información mostrada es correcta y en que su envío fue recibido.
- Una experiencia más consistente y pulida de principio a fin, incluida la versión móvil.

**Para el producto y el negocio:**
- Más contactos capturados, incluso de usuarios que no completan el recorrido completo.
- Mejor calidad del dato recolectado, al reducir preguntas ambiguas y respuestas inconsistentes.
- Mayor confianza en la marca, al eliminar el riesgo de mostrar una confirmación que no corresponde con la realidad.
- Un recorrido más eficiente para el equipo comercial, que puede empezar a dar seguimiento a un contacto antes en el proceso, en lugar de depender de que el usuario complete absolutamente todo.

---

## 8. Conclusiones

El formulario actual ya cuenta con bases sólidas: autocompletado de dirección, buen manejo de teclados en móvil, un indicador de progreso honesto y una ubicación correcta del consentimiento justo antes del envío. No se trata de un rediseño desde cero.

El problema central es de **secuencia y prioridad**: el diseño actual está optimizado para recolectar la mayor cantidad de información sobre la propiedad, y solo al final —casi como una formalidad— pide la forma de contactar a la persona. Esto expone al negocio exactamente al escenario que más se quiere evitar: invertir el esfuerzo del usuario en preguntas sobre la casa y terminar sin ninguna manera de contactarlo si no llega hasta el final.

Las recomendaciones de este documento no requieren cambiar la identidad visual ni la propuesta de valor de la marca. Son ajustes de **orden, claridad, transparencia y consistencia** que pueden implementarse de forma incremental, comenzando por aquellos que atacan directamente el mayor riesgo — perder el contacto por completo — antes de avanzar hacia refinamientos de detalle.
