package edu.cooper.ece366.project.dove.server.services;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class GoogleResponse { // created by Will


    private Result[] results;
    private String status;

    private String error_message;

    public String getError_message() {
        return error_message;
    }

    public Result[] getResults() {
        return results;
    }
    public void setResults(Result[] results) {
        this.results = results;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

//    public void getError_Message(){
//        return
//    }
}