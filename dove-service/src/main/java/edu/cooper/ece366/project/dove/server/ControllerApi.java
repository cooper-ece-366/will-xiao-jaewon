package edu.cooper.ece366.project.dove.server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping(value = "/api")
public class ControllerApi {
    private static final Logger LOGGER = LoggerFactory.getLogger(ControllerApi.class);
    private ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping(path = "/version", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getVersion() {
        return(Version.getInstance().getVersionJSON());
    }

    @GetMapping(path = "/time", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getSystemTime() throws JsonProcessingException {
        ApiTime theTime = new ApiTime();
        String timeString = objectMapper.writeValueAsString(theTime);
        return(timeString);
    }
}
