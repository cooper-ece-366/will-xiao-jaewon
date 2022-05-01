import React, { Component } from 'react'
import axios from 'axios';
import {StoreApiUrl} from "../const";

//Reference: https://codebun.com/search-record-from-a-table-in-react-js-spring-boot-and-mysql
// Edited by Xiao Lin
class storeService{
    getStore(){
        return axios.get(StoreApiUrl);
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
}

export default new storeService();