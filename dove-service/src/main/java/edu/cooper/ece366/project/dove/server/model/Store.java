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

/*
    List<String> STORE_INFO_LIST = List.of(
            "NAMETEST1:POPTEST2:ADDTEST3:RULETEST4"
            );
    List<String> STORE_NAME_LIST = List.of(
            "NAMETEST1"
            );

    List<String> finalInfo = new ArrayList<>(STORE_INFO_LIST);

    String name;
    String info;
    String newName;
    String newInfo;

    String storeName;
    String storeInfo;
    String storeAddress;
    String storeDensity;

    public ApiStore(){

        String url = "jdbc:mysql://localhost:3306/javabase";
        String user = "java";
        String password = "password";

        try{
            Connection myConn = DriverManager.getConnection(url, user, password);
            Statement myStmt = myConn.createStatement();
            String sql = "SELECT * FROM javabase.stores";
            ResultSet rs = myStmt.executeQuery(sql);

            while (rs.next()) {
                newInfo = rs.getString("name") + ":" + rs.getString("population") + ":" + rs.getString("address") + ":" + rs.getString("rules");
                //newInfo = rs.getString("rules");
                //STORE_NAME_LIST.add(newName);
                finalInfo.add(newInfo);
            }
        }catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }

        int r = (int) (Math.random()*finalInfo.size());
        String q = finalInfo.get(r);
        //String p = STORE_NAME_LIST.get(r);
        String[] parts = q.split(":", 4);
        this.storeName = parts[0];
        this.storeDensity = parts[1];
        this.storeAddress = parts[2];
        this.storeInfo = parts[3];
    }

    public String getStoreName() {
        return(this.storeName);
    }
    public String getStoreDensity() {
        return(this.storeDensity);
    }
    public String getStoreAddress() {
        return(this.storeAddress);
    }
    public String getStoreInfo() {
        return(this.storeInfo);
    }
}
*/