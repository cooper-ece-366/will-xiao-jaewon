package edu.cooper.ece366.project.dove.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

// Reference: exempli-gratia
// Edited by Xiao Lin

public class Server {
    private static final Logger logger = LoggerFactory.getLogger(Server.class);

    public static void main(String[] args) {
        logger.info("Example log from {}", Server.class.getSimpleName());
        System.out.println("The Server says hi!");
    }
}
