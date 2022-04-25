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

    @GetMapping("/store")
    public String getStore() throws JsonProcessingException {
        ApiStore store = new ApiStore();
        String storeString = objectMapper.writeValueAsString(store);
        LOGGER.info(String.format("storeString = %s",storeString));
        return(storeString);
    }

    @GetMapping(value = "/search/{stringToSearch}")
    @ResponseBody
    public String getSearch(@PathVariable String stringToSearch) throws JsonProcessingException {
        LOGGER.info(String.format("stringToSearch = %s",stringToSearch));
        ApiSearch search = new ApiSearch(stringToSearch);
        String searchString = objectMapper.writeValueAsString(search);
        LOGGER.info(String.format("searchString = %s",searchString));
        return(searchString);
    }
}
