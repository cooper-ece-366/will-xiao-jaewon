package edu.cooper.ece366.project.dove.server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.*;
import org.locationtech.jts.geom.Point;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"coords"})

// Reference: https://codebun.com/search-record-from-a-table-in-react-js-spring-boot-and-mysql/
@Setter
@Getter
//@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "stores")
public class Store { // edited by Will
    //Hard-coded store name and information
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NonNull
    private String name;

    @NonNull
    private String info;

    @NonNull
    private Float density;

    @NonNull
    private String address;

    @NonNull
    private String type;

    @NonNull
    private Point coords;
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