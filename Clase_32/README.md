# Proyecto BACKEND para CoderHouse

## Entrega 32

Para realizar los tests de rendimiento, en el controller api/controllers/info.ts se comenta o no la linea 19

### Parte 2.1 - Ver resultados en carpeta "1_Profiling"

Script Artillery: artillery quick --count 20 -n 50 http://localhost:8080/info > archivo.txt

Archivos,
    'ResultWithConsoleLog_v8.txt' decodificacion resultado de --> node --prof-process WithCLog_v8.log > ResultWithConsoleLog_v8.txt (Generado por node --prof ./dist/server.js).

    'ResultWithOutConsoleLog_v8.txt' decodificacion resultado de --> node --prof-process WithOutCLog_v8.log > ResultWithOutConsoleLog_v8.txt (Generado por node --prof ./dist/server.js).

### Parte 2.2 - Ver resultados en carpeta "2_Inspect"

Script utilizado: node --inspect ./dist/server.js

*En Chrome --> chrome://inspect/#devices, start/stop.

### Parte 2.3 - Ver resultados en carpeta "3_Autocannon"

Configuracion package.json:

  "scripts": {
    "build": "webpack",
    "start": "0x .",
    "test": "node benchmark.js"

Script utilizado: npm start

En otra consola: npm test

## Conclusión
Al utilizar la función console.log (función síncrona) todo el procesamiento del programa resulta mayor, ya que es es un proceso bloqueante del resto de peticiones hasta que esta funcion termine. Lo que repercute en la calidad del mismo, resultando menos óptimo y eficiente.

Se puede observar como el tiempo medio de resolucion de peticiones aumenta cuando tiene el console.log.

Tras el desafio se prueba de que evitar el uso de funciones síncronas (en caso de que sea posible) como por ejemplo el console.log() tiene como resultado un programa de rendimiento más óptimo.