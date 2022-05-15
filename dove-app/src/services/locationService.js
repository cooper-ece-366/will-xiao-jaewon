import React, { Component } from 'react'
import axios from 'axios';
import {apiUrlPrefix, StoreApiUrl} from "../const";
import {format} from "react-string-format";

// Edited by Jaewon Cho

class locationService{
    getCoords = (address) => {
        return axios.get(format("{0}/api/location/{1}", apiUrlPrefix, address));
    }
}

export default new locationService();