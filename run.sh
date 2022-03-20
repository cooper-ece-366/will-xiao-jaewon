#!/bin/bash

# ./build.sh && java -jar borsa-service/target/server-0.0.1.jar

APP_NAME=server
APP_MAVEN_VERSION=$(mvn help:evaluate -Dexpression=project.version | grep -e '^[^\[]')
#JAR=${APP_NAME}-${APP_MAVEN_VERSION}-jar-with-dependencies.jar
JAR=${APP_NAME}-${APP_MAVEN_VERSION}.jar
java -jar ./borsa-service/target/${JAR}
