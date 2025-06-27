FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
ARG JAR_FILE=target/banking-backend-0.0.1.jar
COPY ${JAR_FILE} app_banking.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app_banking.jar"]