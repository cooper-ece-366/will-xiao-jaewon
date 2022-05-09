import React, { Component } from 'react'
import axios from 'axios';
import {apiUrlPrefix, StoreApiUrl} from "../const";

//Reference: https://codebun.com/search-record-from-a-table-in-react-js-spring-boot-and-mysql
// Edited by Xiao Lin
class storeService{
    getStore(){
        return axios.get(StoreApiUrl);
    }

    // Pageable endpoints
    getStores =(currentPage, recordPerPage) =>{
        return axios.get(`${apiUrlPrefix}/store?page=${currentPage}&size=${recordPerPage}`)
    }
    storeSearch =(currentPage, recordPerPage, search) =>{
        return axios.get(`${apiUrlPrefix}/store?search=${search}&page=${currentPage}&size=${recordPerPage}`)
    }
    nearby = (distance,from) => {
        return axios.get(`${apiUrlPrefix}/store?distance=${distance}&from=${from}`)
    }

    // CRUD endpoints
    create = data =>{
        return axios.post(`${apiUrlPrefix}/store/store`, data)
    }
    getById = id =>{
        return axios.get(`${apiUrlPrefix}/store/store/${id}`)
    }
    delete = id =>{
        return axios.delete(`${apiUrlPrefix}/store/store/${id}`)
    }
    update = (id,data) =>{
        return axios.put(`${apiUrlPrefix}/store/store/${id}`, data)
    }
}

export default new storeService();