import React, {Component} from 'react';
import { getTime, getStoreInfo, getAllInfo } from "../../util/APIUtils";
import LoadingIndicator from '../../common/LoadingIndicator';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './store.css';
import Search from "../../common/Search";
// import StoreData from "../../data.json";
import SearchIcon from "@material-ui/icons/Search";

// Reference: exempli-gratia
// Edited by Xiao Lin
class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: null,
            readableNow: null,
            storeName: null,
            storeDensity: null,
            storeAddress: null,
            storeInfo: null,
            result: null
        };
        this.refreshTime = this.refreshTime.bind(this);
        this.refreshStoreInfo = this.refreshStoreInfo.bind(this);
        this.buttonClickedRefreshStoreInfo = this.buttonClickedRefreshStoreInfo.bind(this);
        this.buttonClickedReRender = this.buttonClickedReRender.bind(this);
    }

    refreshTime() {
        getTime()
        .then(response => {
            this.setState({
                now: response.datetime
            }, () => {console.log(this.state);});
            var ora = new Date(this.state.now*1000);
            this.setState({
                readableNow: ora.toLocaleString()
            }, () => {console.log(this.state);});
            }).catch(error =>
            {this.setState({
                loading: false
            }, () => {console.log(this.state);});
            return;
        });
    }

    refreshStoreInfo() {
        getStoreInfo().then(response => {
            this.setState({
                storeName: response.storeName,
                storeDensity: response.storeDensity,
                storeAddress: response.storeAddress,
                storeInfo: response.storeInfo
            }, () => {console.log(this.state);});
            Alert.success("Store info refreshed!");
        }).catch(error => {
                this.setState({
                    loading: false
                }, () => {console.log(this.state);});
                Alert.error("Store info NOT retrieved!");
        });
    }

    getInfo() {
        getAllInfo().then(response => {
            this.setState({
                result: response.result
            }, () => {console.log(this.state);});
            Alert.success("All info refreshed!");
        }).catch(error => {
            this.setState({
                loading: false
            }, () => {console.log(this.state);});
            Alert.error("Info NOT retrieved!");
        });
    }

    componentDidMount() {
        this.refreshTime();
        this.refreshStoreInfo();
        this.getInfo();
        console.log("componentDidMount: state = %o", this.state);
    }

    componentWillUnmount() {
        console.log("componentWillUnmount: state = %o", this.state);
    }

    componentDidUpdate() {
        console.log("componentDidUpdate: state = %o", this.state);
    }

    componentWillUpdate() {
        console.log("componentWillUpdate: state = %o", this.state);
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate: state = %o", this.state);
        return(true);
    }

    buttonClickedRefreshStoreInfo() {
        console.log('Store was refreshed!');
        this.refreshTime();
        this.refreshStoreInfo();
        console.log(this.state.storeName);
    }

    buttonClickedReRender() {
        this.render();
    }

    render() {
        if(this.state.loading) {
            return <LoadingIndicator />
        }
        console.log("Render() -> state = %o",this.state);
        return (
            <div className="store-container">
                <div className="search-container">;
                    <Search placeholder="Search store ..." data={this.state.result}/>
                </d<div className="container">
                    <div className="store-info">
                        <div className="time">
                            <p>Last refresh time is</p>
                            <p>{this.state.readableNow}</p>
                        </div>
                        <button className="button" onClick={this.buttonClickedReRender}>Click to Re-Render</button>
                        <button className="button" onClick={this.buttonClickedRefreshStoreInfo}>Click to Refresh Store</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default Store;