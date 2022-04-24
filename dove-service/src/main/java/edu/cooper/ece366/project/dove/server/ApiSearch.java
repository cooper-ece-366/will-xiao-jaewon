package edu.cooper.ece366.project.dove.server;

import org.springframework.web.bind.annotation.GetMapping;

import java.util.Collections;
import java.util.List;
import java.sql.*;
import java.util.ArrayList;
import java.util.*;


public class ApiSearch {

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


    public ApiSearch(String stringToSearch){

        String url = "jdbc:mysql://localhost:3306/javabase";
        String user = "java";
        String password = "password";

        try{
            Connection myConn = DriverManager.getConnection(url, user, password);
            Statement myStmt = myConn.createStatement();
            String sql = "SELECT * FROM javabase.stores WHERE CONCAT('name','population','address','rules') LIKE '%" +stringToSearch+ " %'";
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
        for (int i = 0; i < finalInfo.size(); i++){
            String result = finalInfo.get(i);
            String[] parts = result.split(":",4);
            this.storeName = parts[0];
            this.storeDensity = parts[1];
            this.storeAddress = parts[2];
            this.storeInfo = parts[3];
        }
//        int r = (int) (Math.random()*finalInfo.size());
//        String q = finalInfo.get(r);
//        //String p = STORE_NAME_LIST.get(r);
//        String[] parts = q.split(":", 4);
//        this.storeName = parts[0];
//        this.storeDensity = parts[1];
//        this.storeAddress = parts[2];
//        this.storeInfo = parts[3];

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