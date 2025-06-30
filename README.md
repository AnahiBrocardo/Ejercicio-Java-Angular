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

## Iniciar el Backend con Docker

1. Cloná este repositorio:

En git bash
git clone https://github.com/AnahiBrocardo/Ejercicio-Java-Angular.git
cd Ejercicio-Java-Angular

2. Ir a la carpeta raíz y ejecutar
docker-compose up -d

## Iniciar el frontend

1. Dirigirse a la carpeta del frontend:
cd frontend/banking/frontend

2. Instalar dependencias 
npm install

3. Ejecutar la aplicacion en angular
ng serve

Luego dirigirse a http://localhost:4200