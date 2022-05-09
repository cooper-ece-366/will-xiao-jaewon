import React, { Component } from 'react'
import axios from 'axios';
import {apiUrlPrefix, StoreApiUrl} from "../const";
import {format} from "react-string-format";

//Reference: https://codebun.com/search-record-from-a-table-in-react-js-spring-boot-and-mysql
// Edited by Xiao Lin
class storeService{
    getStore(){
        return axios.get(StoreApiUrl);
    }
    getStores =(currentPage, recordPerPage) =>{
        return axios.get(apiUrlPrefix.concat("/store?page="+currentPage+"&size="+recordPerPage))
    }
    storeSearch =(currentPage, recordPerPage, search) =>{
        return axios.get(apiUrlPrefix.concat("/store?search="+search+"?page="+currentPage+"&size="+recordPerPage))
    }
    create = data =>{
        return axios.post(StoreApiUrl,data)
    }
    getById = id =>{
        return axios.get(StoreApiUrl.concat(id))
    }
    delete = id =>{
        return axios.delete(StoreApiUrl.concat(id))
    }
    update = (id,data) =>{
        return axios.put(StoreApiUrl.concat(id),data)
    }
    nearby = (distance,from) => {
        return axios.get(format("{0}/store?distance={1}&from={2}", apiUrlPrefix, distance, from))
    }
}

export default new storeService();