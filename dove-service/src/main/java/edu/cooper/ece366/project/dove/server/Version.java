package edu.cooper.ece366.project.dove.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Properties;

public final class Version {
    private static final Logger LOGGER = LoggerFactory.getLogger(Version.class);

    private static Version SINGLETON_INSTANCE; // one instance (per JVM)

    public static final String APP_VERSION;
    public static final String MAVEN_VERSION;

    static {
        Properties props = new Properties();
        try {
            ClassPathResource resource = new ClassPathResource("application.properties");
            LOGGER.info(resource.toString());
            InputStream is = resource.getInputStream();
//            InputStream is = ClassLoader.getSystemResourceAsStream("/application.properties");
            props.load(is);
        } catch (NullPointerException e0) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e0.printStackTrace(pw);
            LOGGER.error("Null pointer exception initializing loading of system properties: application.properties file",e0);
            LOGGER.error(pw.toString());
        } catch (ExceptionInInitializerError e1) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e1.printStackTrace(pw);
            LOGGER.error("Exception initializing loading of system properties: application.properties files",e1);
            LOGGER.error(pw.toString());
        } catch (IOException e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            LOGGER.error("Error loading version of totem-os from application.properties file",e);
                    LOGGER.error(pw.toString());
        }
        APP_VERSION = props.getProperty("app.version");
        LOGGER.debug(String.format("Application Version = %s", APP_VERSION));
        MAVEN_VERSION = props.getProperty("maven.version");
        LOGGER.debug(String.format("Maven Version = %s", MAVEN_VERSION));
    }

    private Version() {}

    public synchronized static Version getInstance() {
        if (SINGLETON_INSTANCE == null) {
            SINGLETON_INSTANCE = new Version();
        }
        return SINGLETON_INSTANCE;
    }

    public String getVersionJSON() {
        return(String.format("{ \"build_version\" : \"%s\", \"maven_version\" : \"%s\" }", APP_VERSION, MAVEN_VERSION));
    }
}
