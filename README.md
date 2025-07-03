# Ejercicio Java-Angular 

Aplicacion desarrollada en **Angular** y **Spring Boot**, que permite gestionar cuentas bancarias, consultar detalles, realizar transferencias, visualizar movimientos y editar saldos.


## Tecnologías

- **Frontend**: Angular 9 + Angular Material  
- **Backend**: Spring Boot + Maven  
- **Base de datos**: MongoDB 
- **Cache**: Redis
- **Contenedores**: Docker + Docker Compose

---

## Requisitos previos

- Docker
- Docker Compose

## Iniciar la applicacion  con Docker

1. Cloná este repositorio:

En git bash
git clone https://github.com/AnahiBrocardo/Ejercicio-Java-Angular.git
cd Ejercicio-Java-Angular

2. Ir a la carpeta raíz y ejecutar
docker-compose up --build -d

Luego dirigirse a http://localhost:4200

## Test backend 

cd backend/banking-backend
mvn test

El reporte de cobertura se genera en:
target/site/jacoco/index.html

## Test Frontend 

cd frontend/banking-frontend
ng test  --code-coverage

El reporte de cobertura se genera en:
coverage/
Abrír index.html

## Documentacion Swagger  
Una vez iniciada la aplicacion, acceder a:
http://localhost:8080/swagger-ui.html

## Visualizar Logs del backend
Los logs generados se encuentran en el archivo logs/app.log dentro del proyecto.

Seguirlos en tiempo real con:

tail -f logs/app.log

## Cache Redis
docker exec -it ejercicio-java-angular-redis-1 redis-cli
Ejecutar comandos:
keys *
- Obtener el valor cacheado de un saldo por ID (reemplazá el ID con el que corresponda):

GET saldoCuenta::<id>
Ejemplo GET saldoCuenta::6862c9a97d296f5e9a3247b4


