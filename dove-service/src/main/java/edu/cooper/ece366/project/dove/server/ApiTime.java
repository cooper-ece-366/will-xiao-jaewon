package edu.cooper.ece366.project.dove.server;

//import lombok.*;

import java.time.Instant;

//@EqualsAndHashCode
//@ToString
//@AllArgsConstructor
public class ApiTime {

    Long datetime;

    public ApiTime() {
        this.datetime = this.getDatetime();
    }

    public Long getDatetime()
    {
        this.datetime = Instant.now().getEpochSecond();
        return(this.datetime);
    }

    @Override
    public String toString() {
        return "ApiTime{" +
                "datetime=" + datetime +
                '}';
    }
}
