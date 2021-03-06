package edu.cooper.ece366.project.dove.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Reference: exempli-gratia
// Edited by Xiao Lin

@SpringBootApplication
public class RestApiServer {
    private static final Logger LOGGER = LoggerFactory.getLogger(RestApiServer.class);

    public static void main(String[] args) {
        LOGGER.info(String.format("Application Version = %s", Version.APP_VERSION));
        SpringApplication.run(RestApiServer.class, args);
        LOGGER.info("Running RestApiServer.");
    }
}
