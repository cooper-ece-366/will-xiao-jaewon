import React, {Component} from 'react';
import { getTime } from "../../util/APIUtils";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../../common/LoadingIndicator';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './StoreList.css';
import storeService from "../../services/storeService";
import locationService from "../../services/locationService";
import {
    faEdit,
    faTrash,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes,
    faWarning,
    faXmarkCircle,
    faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Reference1: exempli-gratia
// Reference2: https://github.com/mightyjava/book-rest-api-reactjs
// Reference3: https://codebun.com/how-to-create-a-pagination-in-react-js-and-spring-boot/
// Edited by Xiao Lin

class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: null,
            readableNow: null,
            stores: [],
            currentPage:1,
            recordPerPage:6,
            search: '',
            id: ''
        }
        this.refreshTime = this.refreshTime.bind(this);
        this.buttonClickedRefreshStoreInfo = this.buttonClickedRefreshStoreInfo.bind(this);
        this.buttonClickedReRender = this.buttonClickedReRender.bind(this);
    }

    componentDidMount() {
        this.refreshTime();
        this.getStoresByPagination(this.state.currentPage);
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

    getStoresByPagination(currentPage){
        currentPage=currentPage-1;
        storeService.getStores(currentPage, this.state.recordPerPage)
        //axios.get("http://localhost:8080/store/?page="+currentPage+"&size="+this.state.recordPerPage)
            .then(response => response.data).then((data) =>{
            this.setState({stores:data.content,
                totalPages:data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number+1
            });
        });
    }

    showNextPage = () =>{
        if(this.state.currentPage < Math.ceil(this.state.totalElements/this.state.recordPerPage)){
            this.getStoresByPagination(this.state.currentPage + 1);
        }
    };

    showLastPage = () =>{
        if(this.state.currentPage < Math.ceil(this.state.totalElements/this.state.recordPerPage)){
            this.getStoresByPagination(Math.ceil(this.state.totalElements/this.state.recordPerPage));
        }
    };

    showFirstPage = ()=>{
        let firstPage = 1;
        if(this.state.currentPage > firstPage){
            this.getStoresByPagination(firstPage);
        }
    };

    showPrevPage = () =>{
        let prevPage = 1
        if(this.state.currentPage > prevPage){
            this.getStoresByPagination(this.state.currentPage - prevPage);
        }
    };

    searchInput = (event) => {
        this.setState({
            //assigning value to event target
            [event.target.name]:event.target.value,
        });
    };

    searchStore = (currentPage) => {
        currentPage=currentPage-1;
        storeService.storeSearch(currentPage, this.state.recordPerPage, this.state.search)
        //axios.get("http://localhost:8080/store/"+this.state.search+"?page="+currentPage+"&size="+this.state.recordPerPage)
            .then(response => response.data).then((data) =>{
            this.setState({stores:data.content,
                totalPages:data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number+1
            });
        });
    };

    resetSearch = (currentPage) => {
        this.setState({"search":''});
        this.getStoresByPagination(this.state.currentPage);
    };

    deleteStore = (id) => {
        storeService.delete(id).then(
            (response) => {
                console.log(response);
                Alert.success("Store successfully deleted!");
                this.setState({
                    stores: this.state.stores.filter(store => store.id !== id)
                });
            }, (error) => {
                console.log(error);
                Alert.error("Operation failed!");
            }
        );
    };

    buttonClickedRefreshStoreInfo() {
        console.log('StoreList was refreshed!');
        this.refreshTime();
        this.getStoresByPagination(this.state.currentPage);
    }

    buttonClickedReRender() {
        this.render();
    }

    openMap(e, addr) {
        locationService.getCoords(addr)
            .then(response => response.data)
            .then((data) =>{
                console.log(data.lat);
                console.log(data.lng);
                window.open(`https://www.openstreetmap.org/?mlat=${data.lat}&mlon=${data.lng}#map=15/${data.lat.slice(0, 7)}/${data.lng.slice(0, 8)}`);
            });
    }

    render() {
        if(this.state.loading) {
            return <LoadingIndicator />
        }
        console.log("Render() -> state = %o",this.state);

        const {stores, currentPage, totalPages, recordPerPage, search} = this.state;
        return (
            <div className="store-container">
                <h1>Store List</h1>
                <div className="container">
                    <div className="form-group mb-2">
                        <input type="text" className="form-control" name="search" size="50"
                               placeholder="Search stores ..." autoComplete="off" value={search} onChange={this.searchInput}/>
                        <button type="button" name="search" className="btn btn-info my-2 text-center mr-2"
                                onClick={this.searchStore}><FontAwesomeIcon icon={faSearch} /> Search
                        </button>
                        <button type="reset" className="btn btn-secondary text-center ml-5"
                                style={{marginLeft: '10px'}} onClick={this.resetSearch}> <FontAwesomeIcon icon={faTimes} /> Clear
                        </button>
                    </div>
                </div>
                <div className="container">
                    <table className="table table-bordered border-info">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Store</th>
                            <th>Type</th>
                            <th>Address</th>
                            <th>Density</th>
                            <th>Rules</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stores.length===0?
                            <tr align="center"><td colSpan="5">No Record Found in Database</td></tr>:
                            stores.map(
                                (stores,index) =>(
                                    <tr key = {stores.id}>
                                        <td>{(recordPerPage*(currentPage-1))+index+1}</td>
                                        <td>{stores.name}</td>
                                        <td>{stores.type}</td>
                                        <td><a href="#" onClick={((e) => this.openMap(e, stores.address))}>{stores.address}</a></td>
                                        <td>{stores.density>0.8 ?
                                            (<Button type="button" variant="danger"
                                            ><FontAwesomeIcon icon={faXmarkCircle} /> {stores.density}</Button>) :
                                             stores.density<0.5 ?
                                                 (<Button type="button" variant="success"
                                            ><FontAwesomeIcon icon={faCheckCircle} /> {stores.density}</Button>) :
                                                 (<Button type="button" variant="warning"
                                            ><FontAwesomeIcon icon={faWarning} /> {stores.density}</Button>)}</td>
                                        <td>{stores.info}</td>
                                        <td><Link to={`/update-stores/${stores.id}`} className="btn btn-outline-primary"><FontAwesomeIcon icon={faEdit} /> Edit</Link>
                                            <button className="btn btn-outline-danger" onClick={() => { this.deleteStore(stores.id) }}>
                                            <FontAwesomeIcon icon={faTrash} /> Delete</button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                    </table>
                    <table className="table">
                        <div style={{float: 'left', fontFamily: 'monospace', color: '#0275d8', padding: '8px'}}>
                            Page {currentPage} of {totalPages}
                        </div>
                        <div style={{float: 'right'}}>
                            <div className="clearfix"></div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="button"><Button type="button" className="page-link" variant="outline-info" disabled={currentPage === 1} onClick={this.showFirstPage}
                                                                 ><FontAwesomeIcon icon={faFastBackward} /> First</Button></li>
                                    <li className="button"><Button type="button" className="page-link" variant="outline-info" disabled={currentPage === 1 } onClick={this.showPrevPage}
                                                                 ><FontAwesomeIcon icon={faStepBackward} /> Previous</Button></li>
                                    <li className="button"><Button type="button" className="page-link" variant="outline-info" disabled={currentPage === totalPages } onClick={this.showNextPage}
                                                                 ><FontAwesomeIcon icon={faStepForward} /> Next</Button></li>
                                    <li className="button"><Button type="button" className="page-link" variant="outline-info" disabled={currentPage === totalPages} onClick={this.showLastPage}
                                                                 ><FontAwesomeIcon icon={faFastForward} /> Last</Button></li>
                                </ul>
                            </nav>
                        </div>
                    </table>
                </div>
                <div className="time-container">
                    <div className="store-info">
                        <div className="time">
                            <p>Last refresh time is {this.state.readableNow}</p>
                        </div>
                        <button className="button" onClick={this.buttonClickedReRender}>Click to Re-Render</button>
                        <button className="button" onClick={this.buttonClickedRefreshStoreInfo}>Click to Refresh Store List</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default StoreList;