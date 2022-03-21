package edu.cooper.ece366.project.dove.server;

import java.util.Collections;
import java.util.List;
import java.sql.*;
import java.util.ArrayList;
import java.util.*;

public class ApiStore {
    //TODO: Change the hard-coded store info to SQL
    //Hard-coded store name and information



    List<String> STORE_INFO_LIST = List.of(
            "INFOTEST1:INFOTEST2"
            );
    List<String> STORE_NAME_LIST = List.of(
            "NAMETEST1"
            );

    List<String> finalInfo = new ArrayList<>(STORE_INFO_LIST);

    String name;
    String info;
    String newName;
    String newInfo;

    public ApiStore(){

        String url = "jdbc:mysql://localhost:3306/javabase";
        String user = "java";
        String password = "password";

        try{
            Connection myConn = DriverManager.getConnection(url, user, password);
            Statement myStmt = myConn.createStatement();
            String sql = "SELECT * FROM javabase.stores";
            ResultSet rs = myStmt.executeQuery(sql);

            while (rs.next())
                newInfo = rs.getString("name") + ":" + rs.getString("rules");
                //newInfo = rs.getString("rules");
                //STORE_NAME_LIST.add(newName);
                finalInfo.add(newInfo);

        }catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }

        int r = (int) (Math.random()*finalInfo.size());
        String q = finalInfo.get(r);
        //String p = STORE_NAME_LIST.get(r);
        String[] parts = q.split(":", 2);
        this.name = parts[0];
        this.info = parts[1];
    }
    public String getStoreName() {
        return(this.name);
    }

    public String getStoreInfo() {
        return(this.info);
    }
}
