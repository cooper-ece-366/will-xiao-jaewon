import React, { useState } from 'react';
import useInterval from '../common/useInterval';
import './App.css';
import {delay} from "../const/const";
import AppHeader from "../common/header";

// Edited by Xiao Lin
function App(){
    const apiUrlPrefix = "http://localhost:8080";
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [currentReadableTime, setCurrentReadableTime] = useState('0');
    const [currentVersionString, setCurrentVersionString] = useState('<null>');
    const [storeName, setStoreName] = useState('Store xyz');
    const [storeDensity, setStoreDensity] = useState('24 people in store');
    const [storeAddress, setStoreAddress] = useState('41 Cooper Square');
    const [storeInfo, setStoreInfo] = useState('Mask required');


    const storeApiUrl = apiUrlPrefix.concat("/api/store");
    App.refreshStore = () => {
        console.log("Refreshing store info ...");
        fetch(storeApiUrl)
            .then(response => response.json())
            .then(data => {
                setStoreName(data.storeName);
                setStoreDensity(data.storeDensity);
                setStoreAddress(data.storeAddress);
                setStoreInfo(data.storeInfo);
                console.log(data);
            })
            .catch(err => {
                console.log("Cannot connect to API endpoint: %s", storeApiUrl);
            });
        console.log("Refreshed store info.");
    }
    useInterval(() => {
        App.refreshStore();
    }, delay);

    const timeApiUrl = apiUrlPrefix.concat("/api/time");
    App.refreshTime = () => {
        console.log("Refreshing ... time ...");
        fetch(timeApiUrl)
            .then(response => response.json())
            .then(data => {
                setCurrentTime(data.datetime);
                //let ora = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTime * 1000);
                var ora = new Date(currentTime*1000)
                setCurrentReadableTime(ora.toLocaleString());
                console.log(currentReadableTime);
            })
            .catch(err => {
                console.log("Cannot connect to API endpoint: %s", timeApiUrl);
            });
        console.log("Refreshed time.");
    }
    useInterval(() => {
        App.refreshTime();
    }, delay);

    const appVersionApiUrl = apiUrlPrefix.concat("/api/version/");
    App.refreshVersionString = () => {
        console.log("Refreshing ... random string ...");
        fetch(appVersionApiUrl)
            .then(response => response.json())
            .then(data => {
                setCurrentVersionString(data.build_version + data.maven_version);
                console.log(data);
            })
            .catch(err => {
                console.log("Cannot connect to API endpoint: %s", appVersionApiUrl);
            });
        console.log("Refreshed random string.");
    }
    useInterval(() => {
        App.refreshVersionString();
    }, delay);

    App.buttonClicked = () => {
        console.log('Button was clicked!');
        App.refreshTime();
        App.refreshVersionString();
        App.refreshStore();
    }
    //TODO: Fix hard-coded store info
    return(
        <div className="App">
            <div className="app-top-box">
                <AppHeader/>
            </div>
            <body>
            <br/>
            <div className="App-body-left">
                <p>Last refresh time is</p>
                <p>{currentReadableTime}</p>
                <button className="button" onClick={App.buttonClicked}>Click to Refresh</button>
            </div>
            <div className="App-body-right">
                <p>Current version:</p>
                <p>{currentVersionString}</p>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h3>Store information display</h3>
            <div style={{background: `CornflowerBlue`}}>
                <blockquote>
                    <p>Store: {storeName}</p>
                    <p>Population density: {storeDensity}</p>
                    <p>Location: {storeAddress}</p>
                    <p>Rules: {storeInfo}</p>
                </blockquote>
            </div>
            </body>
        </div>
    )
}

export default App;