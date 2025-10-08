#
# BUILD STAGE
#
FROM maven:3.8.1-openjdk-17-slim AS build
COPY src/main /usr/src/app/src/main
COPY pom.xml /usr/src/app
COPY settings.xml /usr/share/maven/conf
RUN mvn -f /usr/src/app/pom.xml clean package

#
# PACKAGE STAGE
#
FROM maven:3.8.1-openjdk-17-slim
COPY --from=build /usr/src/app/target/commercetools-user-api.jar /usr/app/api.jar  
EXPOSE 3000  
CMD ["java","-jar","/usr/app/api.jar"]  