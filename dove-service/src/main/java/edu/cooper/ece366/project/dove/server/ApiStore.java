package edu.cooper.ece366.project.dove.server;

import java.util.Collections;
import java.util.List;

public class ApiStore {
    //TODO: Change the hard-coded store info to SQL
    //Hard-coded store name and information
    private final List<String> STORE_LIST = Collections.unmodifiableList(List.of(
            "Store xyz : 24 people in store",
            "Store abc : 43 people in store",
            "Store 123 : 12 people in store"
            )
    );

    String name;
    String info;

    public ApiStore(){
        int r = (int) (Math.random()*STORE_LIST.size());
        String q = STORE_LIST.get(r);
        String[] parts = q.split(" : ", 2);
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
