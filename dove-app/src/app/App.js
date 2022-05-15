import React, { Component } from 'react';
import './App.css';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import AppHeader from "../common/header";
import Home from '../home/Home';
import NotFound from '../common/NotFound';
import {Route, Switch} from "react-router-dom";
import AddStore from "../User/store/AddStore";
import StoreList from "../User/store/StoreList";
import LoadingIndicator from "../common/LoadingIndicator";
import UpdateStore from "../User/store/UpdateStore";
import Proximity from "../common/proxi";

// Edited by Xiao Lin
// Render the app, which has a header and a body
// Render the loading indicator if the app is in the loading stage
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                        <Route exact path="/add" component={AddStore}/>
                        <Route exact path="/store" component={StoreList}/>
                        <Route exact path="/update-stores/:id" component={UpdateStore}/>
                        <Route exact path="/proxi" component={Proximity}/>
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

export default App;