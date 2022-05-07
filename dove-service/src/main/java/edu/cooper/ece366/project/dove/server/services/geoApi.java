package edu.cooper.ece366.project.dove.server.services;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.JsonNode;
import org.apache.commons.io.IOUtils;
import org.codehaus.jackson.map.ObjectMapper;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class geoApi { // edited by Will

    private static final String URL = "https://maps.googleapis.com/maps/api/geocode/json";

    private static final String API_KEY = "AIzaSyCyenIgeYgjtL6p8rjiYi7MBRGy3omuxwo";

    String lat;
    String lng;
    String error;

    public geoApi(String query) throws IOException, InterruptedException {

        HttpClient httpClient = HttpClient.newHttpClient();

        String encodedQuery = URLEncoder.encode(query,"UTF-8");
//        String requestUri = URL + "?apiKey=" + API_KEY + "&q=" + encodedQuery;

//        HttpRequest geocodingRequest = HttpRequest.newBuilder().GET().uri(URI.create(requestUri))
//                .timeout(Duration.ofMillis(1000)).build();
//
//        HttpResponse geocodingResponse = httpClient.send(geocodingRequest,
//                HttpResponse.BodyHandlers.ofString());

        GoogleResponse res = new AddressConverter().convertToLatLong(encodedQuery);
        if(res.getStatus().equals("OK"))
        {
            for(Result result : res.getResults())
            {
                this.lat = result.getGeometry().getLocation().getLat();
                this.lng = result.getGeometry().getLocation().getLng();
            }
        }
        else
        {
            for(Result result: res.getResults()){
                this.error = result.getError_message();
            }

        }
    }
}