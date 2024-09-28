# Step 1: Use an official OpenJDK runtime as a base image

FROM maven:3.8.4-openjdk-17 AS build
# Step 2: Set the working directory in the container
WORKDIR /app
# Step 3: Copy the JAR file into the container
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
# Step 4: Expose the port Spring Boot runs on

WORKDIR /app

COPY --from=build /app/target/userspringboot-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

# Step 5: Define the command to run the application
ENTRYPOINT ["java", "-jar", "/app/userspringboot-0.0.1-SNAPSHOT.jar"]
