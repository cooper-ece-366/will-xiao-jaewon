import React, { Component } from 'react';
import './App.css';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import AppHeader from "../common/header";
import Home from '../home/Home';
import NotFound from '../common/NotFound';
import {Route, Switch} from "react-router-dom";
import Store from "../User/store/store";
import LoadingIndicator from "../common/LoadingIndicator";

// Edited by Xiao Lin
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: false
        }
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>
        }


        return (
            <div className="App">
                <div className="app-top-box">
                    <AppHeader/>
                </div>
                <div className="app-body">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/store" component={Store}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                <Alert stack={{limit: 3}}
                       timeout={3000}
                       position='top-right' effect='slide' offset={65}/>
            </div>
        );
    }
}
/*
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
    return(
        <div className="App">
            <div className="app-top-box">
                <AppHeader/>
            </div>
            <div className="app-body">
                <Routes>
                    <Route exact path="/" caseSensitive={false} element={<Home />}/>
                    <Route exact path="/store" caseSensitive={false} element={<Store />}/>
                    <Route caseSensitive={false} element={<notFound />}/>
                </Routes>
            </div>
            <Alert stack={{limit: 3}}
                   timeout = {3000}
                   position='top-right' effect='slide' offset={65} />
        </div>
    )
}
*/
export default App;