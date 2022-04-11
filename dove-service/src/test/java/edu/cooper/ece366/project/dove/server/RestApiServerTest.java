package edu.cooper.ece366.project.dove.server;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RestApiServerTest {
    public static final int RestApiServer_Field_Test = 6;
    private RestApiServer app;

    @BeforeClass
    public void testSetUp() {
        System.out.println("Setting up RestApiServerTest");
        this.app = new RestApiServer(RestApiServer_Field_Test);
        System.out.println("RestApiServerTest setup complete");
    }

    @Test
    public void verifyAppConstructor() {
        System.out.println("Running RestApiServerTest.verifyAppConstructor()");
        Assert.assertEquals(app.getAppField(),RestApiServer_Field_Test);
        System.out.println("Finished running RestApiServerTest.verifyAppConstructor()");
    }

    @AfterClass
    public void tearDown() {
        System.out.println("Completing AppTest");
        this.app = (RestApiServer) null;
        System.out.println("Exiting RestApiServerTest");
    }

}