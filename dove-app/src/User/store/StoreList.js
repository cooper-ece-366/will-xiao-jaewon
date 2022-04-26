import React, {Component} from 'react';
import { getTime } from "../../util/APIUtils";
import LoadingIndicator from '../../common/LoadingIndicator';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './StoreList.css';
import storeService from "../../services/storeService";
import {
    faList,
    faEdit,
    faTrash,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes, faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
/*
import {
    Card,
    Table,
    Image,
    ButtonGroup,
    Button,
    InputGroup,
    FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
*/

// Reference1: exempli-gratia
// Reference2: https://github.com/mightyjava/book-rest-api-reactjs
// Edited by Xiao Lin

//TODO: Remove the hard-coded data after connected to database
const data = [
    { id: 1, storeName: "Uniqlo", address: "546 Broadway", density: 0.64, info:"Mask required"},
    { id: 2, storeName: "Meet Fresh", address: "37 Cooper Sq", density: 0.47, info:"Disinfect surfaces between visits"},
    { id: 3, storeName: "Blick Art Materials", address: "1-5 Bond St", density: 0.22, info:"Mask required"},
    { id: 4, storeName: "Wanpo Tea Shop", address: "37 E 8th St", density: 0.81, info:"Not specified"},
    { id: 5, storeName: "Sunrise Mart", address: "4 Stuyvesant St", density: 0.67, info:"Safety dividers at checkout"},
]

class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: null,
            readableNow: null,
            stores: [],
            currentPage:1,
            recordPerPage:5,
        }
        this.refreshTime = this.refreshTime.bind(this);
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

    componentDidMount() {
        this.refreshTime();
        storeService.getStore().then((Response)=>{
            this.setState({stores:Response.data.conversations})
        });
        console.log("componentDidMount: state = %o", this.state);
    }
/*
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
*/

    buttonClickedRefreshStoreInfo() {
        console.log('StoreList was refreshed!');
        this.refreshTime();
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
                <div className="list-container">
                    <table className="table table-bordered border-info">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Store</th>
                            <th>Address</th>
                            <th>Density</th>
                            <th>Rules</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map(
                                (val, key) =>
                                    <tr key = {key}>
                                        <td>{val.id}</td>
                                        <td>{val.storeName}</td>
                                        <td>{val.address}</td>
                                        <td>{val.density}</td>
                                        <td>{val.info}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <table className="table">
                        <div style={{float: 'left', fontFamily: 'monospace', color: '#0275d8', padding: '8px'}}>
                            Page 1 of 1
                        </div>
                        <div style={{float: 'right'}}>
                            <div className="clearfix"></div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="button"><a type="button" className="page-link"
                                                                 ><FontAwesomeIcon icon={faFastBackward} /> First</a></li>
                                    <li className="button"><a type="button" className="page-link"
                                                                 ><FontAwesomeIcon icon={faStepBackward} /> Previous</a></li>
                                    <li className="button"><a type="button" className="page-link"
                                                                 ><FontAwesomeIcon icon={faStepForward} /> Next</a></li>
                                    <li className="button"><a type="button" className="page-link"
                                                                 ><FontAwesomeIcon icon={faFastForward} /> Last</a></li>
                                </ul>
                            </nav>
                        </div>
                    </table>
                </div>
                <div className="time-container">
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


export default StoreList;