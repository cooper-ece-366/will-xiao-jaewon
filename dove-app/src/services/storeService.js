import React from 'react'
import axios from 'axios';
import {apiUrlPrefix, StoreApiUrl} from "../const";

// Reference: https://codebun.com/search-record-from-a-table-in-react-js-spring-boot-and-mysql
// Edited by Xiao Lin

class storeService{

    // Pageable endpoints
    getStores =(currentPage, recordPerPage) =>{
        return axios.get(`${apiUrlPrefix}/store?page=${currentPage}&size=${recordPerPage}`)
    }
    storeSearch =(currentPage, recordPerPage, search) =>{
        return axios.get(`${apiUrlPrefix}/store?search=${search}&page=${currentPage}&size=${recordPerPage}`)
    }
    // Added by Jaewon Cho
    nearby = (distance,from) => {
        return axios.get(`${apiUrlPrefix}/store?distance=${distance}&from=${from}`)
    }

    // CRUD endpoints
    create = data =>{
        return axios.post(`${StoreApiUrl}`, data)
    }
    getById = id =>{
        return axios.get(`${StoreApiUrl}${id}`)
    }
    delete = id =>{
        return axios.delete(`${StoreApiUrl}${id}`)
    }
    update = (id,data) =>{
        return axios.put(`${StoreApiUrl}${id}`, data)
    }
}

export default new storeService();