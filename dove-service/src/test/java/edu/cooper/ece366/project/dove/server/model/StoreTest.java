package edu.cooper.ece366.project.dove.server.model;

import edu.cooper.ece366.project.dove.server.model.Store;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

// created by Will
public class StoreTest {
    Store store;

    @BeforeEach
    void createStore(){
        store = new Store();
    }

    @Test
    void Name() {
        store.setName("testName");
        assertEquals("testName",store.getName());
    }

    @Test void Id() {
        store.setId(123);
        assertEquals(123,store.getId());
    }

    @Test void Density() {
        store.setDensity((float) 0.99);
        assertEquals((float) 0.99, store.getDensity());
    }

    @Test void Address() {
        store.setAddress("41 Cooper Square");
        assertEquals("41 Cooper Square", store.getAddress());
    }

    @Test void Info() {
        store.setInfo("Triple mask required");
        assertEquals("Triple mask required", store.getInfo());
    }

}
