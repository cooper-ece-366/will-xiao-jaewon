package edu.cooper.ece366.project.dove.server;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.gson.*;
import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapListHandler;

public class ApiAll {
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
    public String result;

//    public String resultSetToJson(Connection connection, String query) {
//        List<Map<String, Object>> listOfMaps = null;
//        try {
//            QueryRunner queryRunner = new QueryRunner();
//            listOfMaps = queryRunner.query(connection, query, new MapListHandler());
//        } catch (SQLException se) {
//            throw new RuntimeException("Couldn't query the database.", se);
//        } finally {
//            DbUtils.closeQuietly(connection);
//        }
//        return new Gson().toJson(listOfMaps);
//    }

    public ApiAll(){

        String url = "jdbc:mysql://localhost:3306/javabase";
        String user = "java";
        String password = "password";
        Connection myConn;
        Statement myStmt;

        try{
            myConn = DriverManager.getConnection(url, user, password);
            myStmt = myConn.createStatement();
        } catch (SQLException se) {
            throw new RuntimeException("Couldn't query the database.", se);
        }

        String sql = "SELECT * FROM javabase.stores";
        List<Map<String, Object>> listOfMaps = null;

        try {
            QueryRunner queryRunner = new QueryRunner();
            listOfMaps = queryRunner.query(myConn, sql, new MapListHandler());
        } catch (SQLException se) {
            throw new RuntimeException("Couldn't query the database.", se);
        } finally {
            DbUtils.closeQuietly(myConn);
        }
        this.result = new Gson().toJson(listOfMaps);

//        try{
//            Connection myConn = DriverManager.getConnection(url, user, password);
//            Statement myStmt = myConn.createStatement();
//            String sql = "SELECT * FROM javabase.stores";
////            ResultSet rs = myStmt.executeQuery(sql);
//            String result = resultSetToJson(myConn, sql);
//            return result;
//
////            while (rs.next()) {
////                newInfo = rs.getString("name") + ":" + rs.getString("population") + ":" + rs.getString("address") + ":" + rs.getString("rules");
////                //newInfo = rs.getString("rules");
////                //STORE_NAME_LIST.add(newName);
////                finalInfo.add(newInfo);
////            }
//        }catch (SQLException ex) {
//            System.out.println(ex.getMessage());
//        }
//
////        int r = (int) (Math.random()*finalInfo.size());
////        String q = finalInfo.get(r);
//        //String p = STORE_NAME_LIST.get(r);
//
//        for (int i = 0; i < finalInfo.size(); i++) {
//            String q = finalInfo.get(i);
//            String[] parts = q.split(":", 4);
//            this.storeName = parts[0];
//            this.storeDensity = parts[1];
//            this.storeAddress = parts[2];
//            this.storeInfo = parts[3];

    }
}