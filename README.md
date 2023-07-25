# Instrucciones

## Proyectos

- mock-services: Contiene el API mock (ejercicio 1), se expone en el puerto 3001
- admin-api: Contiene el API para el resto de ejercicios, se expone en el puerto 3000

## Detalles

- Solo se definieron los tests para el ejercicio 3 (3 unitarios `npm run test` y uno de integración `npm run test:e2e`) en el proyecto `admin-api`
- Los tests (de integración) se encuentran usando la misma DB de `dev` por el momento. Queda pendiente setear su propia DB para los tests. Se seteó una data de prueba por el momento para poder correr los tests sobre ellos, pero en el escenario real la data de creará/destruirá en los tests durante el Before/After Each/All.
- Queda pendiente incluir el ConfigModule para no usar el endpoint de mock-services hardcodeado en el consumo del API.
- Se puede usar el archivo `requests.http` para testear manualmente los endpoints.
- Ejecutar ambos proyectos independientemente para que no exista errores en los servicios que dependen del API mock.

## Instalación

Para ambos proyectos realizar:

```
npm i
npm start
```