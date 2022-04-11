package edu.cooper.ece366.project.dove.server;

import java.util.Collections;
import java.util.List;
import java.sql.*;
import java.util.ArrayList;
import java.util.*;

public class ApiSearch {
    String searchContent;
    List<String> tempResult = List.of();
    List<String> finalInfo = new ArrayList<>(tempResult);

    public ApiSearch(){
        String url = "jdbc:mysql://localhost:3306/javabase";
        String user = "java";
        String password = "password";

        try{
            Connection myConn = DriverManager.getConnection(url,user,password);
            Statement myStmt = myConn.createStatement();
            String sql = "SELECT address FROM javabase.stores WHERE address LIKE " + searchContent;


        }catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }

    }

}
