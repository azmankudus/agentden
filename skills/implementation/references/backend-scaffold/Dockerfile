FROM bellsoft/liberica-runtime-container:jdk-21-crac-cds-slim-musl AS build
WORKDIR /app
COPY gradle/ gradle/
COPY gradlew build.gradle.kts settings.gradle.kts gradle.properties ./
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon || true
COPY . .
RUN ./gradlew shadowJar --no-daemon

FROM bellsoft/liberica-runtime-container:jdk-21-crac-cds-slim-musl AS runtime
WORKDIR /app
COPY --from=build /app/build/libs/*-all.jar app.jar
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:8080/api/v1/health || exit 1
ENTRYPOINT ["java", \
  "--enable-preview", \
  "-XX:+UseCompactObjectHeaders", \
  "-jar", "app.jar"]
