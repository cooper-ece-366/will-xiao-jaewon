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

    const storeDelay = 3000; // in milliseconds
    const delay = 5000; // in milliseconds

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
    }, storeDelay);

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

    return(
        <div className="App">
            <header className="App-header">
                <img src={react_logo} className="App-logo" alt="react-logo" />
                <img src={project_dove_logo} className="Project-logo" alt="project_dove_logo" width="100" height="100" />
                <a
                    className="App-link"
                    href="https://github.com/cooper-ece-366/will-xiao-jaewon"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit our github for more information
                </a>
                <br></br>
                <button className="button" onClick={App.buttonClicked}>Click to Refresh</button>
                <p>The current time is</p>
                <div style={{background: `CornflowerBlue`}}>
                    {currentReadableTime}
                </div>
                <p>The current running version string is</p>
                <div style={{background: `CornflowerBlue`}}>
                    {currentVersionString}
                </div>
                <p>Store information display</p>
                <div style={{background: `CornflowerBlue`}}>
                    <blockquote>
                        <p>{storeName}</p>
                        <p>{storeInfo}</p>
                    </blockquote>
                </div>
                <p></p>
            </header>
        </div>
    )
}

export default App;