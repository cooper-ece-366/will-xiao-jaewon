package edu.cooper.ece366.project.dove.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class Server {
    private static final Logger logger = LoggerFactory.getLogger(Server.class);

    public static void main(String[] args) {
        logger.info("Example log from {}", Server.class.getSimpleName());
        System.out.println("The Server says hi!");

        /* TODO:WIP
        try {

        }
        catch (IOException ex) {
            System.out.println("Unable to communicate to the server.");
        }  */
    }
}
