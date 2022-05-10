package edu.cooper.ece366.project.dove.server;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.cooper.ece366.project.dove.server.model.Store;
import edu.cooper.ece366.project.dove.server.services.geoApi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping(value = "/api")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ControllerApi { // edited by Will

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

    @GetMapping("/store")
    public String getStore() throws JsonProcessingException {
        Store store = new Store();
        String storeString = objectMapper.writeValueAsString(store);
        return(storeString);
    }

    @GetMapping("/location/{keyword}")
    public String getLocation(@PathVariable String keyword) throws IOException, InterruptedException {
        geoApi geoApi = new geoApi(keyword);
        return objectMapper.writeValueAsString(geoApi);
    }
}
