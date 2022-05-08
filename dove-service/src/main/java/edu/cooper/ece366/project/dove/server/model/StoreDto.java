package edu.cooper.ece366.project.dove.server.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.cooper.ece366.project.dove.server.services.AddressConverter;
import edu.cooper.ece366.project.dove.server.services.GoogleResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.locationtech.jts.geom.*;
import org.locationtech.jts.geom.impl.CoordinateArraySequence;

import java.io.IOException;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StoreDto {
    private String name;
    private String info;
    private Float density;
    private String address;
    private String type;

    public Store toModel() throws IOException, NoSuchAddressException {
        Store s = new Store();
        s.setName(this.name);
        s.setInfo(this.info);
        s.setDensity(this.density);
        s.setAddress(this.address);
        s.setType(this.type);

        GoogleResponse res = new AddressConverter().convertToLatLong(address);

        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writeValueAsString(res));

        if(res.getStatus().equals("OK")) {
            String lat = res.getResults()[0].getGeometry().getLocation().getLat();
            String lng = res.getResults()[0].getGeometry().getLocation().getLng();
            CoordinateXY c = new CoordinateXY(Float.parseFloat(lng), Float.parseFloat(lat));
            Coordinate[] cs = {c};
            s.setCoords(new Point(new CoordinateArraySequence(cs), new GeometryFactory(new PrecisionModel())));
            return s;
        } else if(res.getStatus().equals("ZERO_RESULTS")) {
            throw new NoSuchAddressException();
        } else {
            return null;
        }
    }
}
