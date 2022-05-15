package edu.cooper.ece366.project.dove.server.model;
import javax.persistence.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.cooper.ece366.project.dove.server.services.AddressConverter;
import edu.cooper.ece366.project.dove.server.services.GoogleResponse;
import lombok.*;
import org.locationtech.jts.geom.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.locationtech.jts.geom.impl.CoordinateArraySequence;

import java.io.IOException;

@JsonIgnoreProperties({"coords"})

// Reference: https://codebun.com/search-record-from-a-table-in-react-js-spring-boot-and-mysql/
@Setter
@Getter
//@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "stores")
public class Store { // edited by Will, Jaewon
    //Hard-coded store name and information
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "info")
    private String info;

    @Column(name = "density")
    private Float density;

    @Column(name = "address")
    private String address;

    @Column(name = "type")
    private String type;

    @Column(name = "coords")
    private Point coords;

    public Store newWithCoords() throws IOException, NoSuchAddressException {
        GoogleResponse res = new AddressConverter().convertToLatLong(this.address);

        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writeValueAsString(res));

        if(res.getStatus().equals("OK")) {
            String lat = res.getResults()[0].getGeometry().getLocation().getLat();
            String lng = res.getResults()[0].getGeometry().getLocation().getLng();
            CoordinateXY c = new CoordinateXY(Float.parseFloat(lng), Float.parseFloat(lat));
            Coordinate[] cs = {c};
            this.coords = (new Point(new CoordinateArraySequence(cs), new GeometryFactory(new PrecisionModel())));
            return this;
        } else if(res.getStatus().equals("ZERO_RESULTS")) {
            throw new NoSuchAddressException();
        } else {
            return null;
        }
    }
}