import React, { useState } from 'react';
import useInterval from './useInterval';
import react_logo from './react-logo.svg';
import project_dove_logo from './project-dove-logo.jpg';
import './App.css';

function App(){
    const apiUrlPrefix = "http://localhost:8080";
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [currentReadableTime, setCurrentReadableTime] = useState('0');
    const [currentVersionString, setCurrentVersionString] = useState('<null>');
    const [storeName, setStoreName] = useState('Store xyz');
    const [storeInfo, setStoreInfo] = useState('24 people in store');

    const delay = 3000; // in milliseconds

    const storeApiUrl = apiUrlPrefix.concat("/api/store");
    App.refreshStore = () => {
        console.log("Refreshing store info ...");
        fetch(storeApiUrl)
            .then(response => response.json())
            .then(data => {
                setStoreName(data.storeName);
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
            <header className="App-header">
                <div className="App-header-left">
                    <img src={project_dove_logo} className="Project-logo" alt="project_dove_logo" width={70} length={70}/>
                    <h4>Project Dove</h4>
                </div>
                <div className="App-header-right">
                    <a
                        className="App-link"
                        href="https://github.com/cooper-ece-366/will-xiao-jaewon"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        About
                    </a>
                    <a
                        className="App-login"
                        href="https://github.com/cooper-ece-366/will-xiao-jaewon"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Login
                    </a>
                </div>
            </header>

            <body>
            <br></br>
            <div className="App-body-left">
                <button className="button" onClick={App.buttonClicked}>Click to Refresh</button>
                <p>Last refresh time is {currentReadableTime}</p>

            </div>
            <div className="App-body-right">
                <p>The current version:</p>
                <p>{currentVersionString}</p>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h3>Store information display</h3>
            <div style={{background: `CornflowerBlue`}}>
                <blockquote>
                    <p>Store: {storeName}</p>
                    <p>Population density: {storeInfo}</p>
                    <p>location: 40 Cooper Square</p>
                    <p>Rules: Masks required</p>
                </blockquote>
            </div>
            </body>
        </div>
    )
}

export default App;