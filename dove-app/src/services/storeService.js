import React, { Component } from 'react'
import axios from 'axios';
import {apiUrlPrefix, StoreApiUrl} from "../const";

//Reference: https://codebun.com/search-record-from-a-table-in-react-js-spring-boot-and-mysql
// Edited by Xiao Lin
class storeService{
    getStore(){
        return axios.get(StoreApiUrl);
    }
    getStores =(currentPage, recordPerPage) =>{
        return axios.get(apiUrlPrefix.concat("/store/?page="+currentPage+"&size="+recordPerPage))
    }
    storeSearch =(currentPage, recordPerPage, search) =>{
        return axios.get(apiUrlPrefix.concat("/store/"+search+"?page="+currentPage+"&size="+recordPerPage))
    }
    create = data =>{
        // return axios.post(StoreApiUrl,data)
        return axios.post(`http://localhost:8080/store/store`,data)
    }
    getById = id =>{
        // return axios.get(StoreApiUrl.concat(id))
        return axios.get(`http://localhost:8080/store/store/${id}`)
    }
    delete = id =>{
        // return axios.delete(StoreApiUrl.concat(id))
        return axios.delete(`http://localhost:8080/store/store/${id}`)
    }
    update = (id,data) =>{
        // return axios.put(StoreApiUrl.concat(id),data)
        return axios.put(`http://localhost:8080/store/store/${id}`,data)
    }
}

export default new storeService();