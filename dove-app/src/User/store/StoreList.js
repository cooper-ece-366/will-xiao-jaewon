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

//Display a store list with dynamic pagination, with embedded edit and deletion functionalities
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

    //After loaded, get current time and store list information from the backend
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

    // Make the request to the endpoint to retrieve current time, convert it to readable time, and update the state
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

    // Make the request to the endpoint to retrieve store list, and set the state with the response data
    // The response data is in the pageable format
    getStoresByPagination(currentPage){
        currentPage=currentPage-1;
        storeService.getStores(currentPage, this.state.recordPerPage)
        //axios.get("http://localhost:8080/store/?page="+currentPage+"&size="+this.state.recordPerPage)
            .then(response => response.data).then((data) =>{
            this.setState({
                stores:data.content,
                totalPages:data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number+1
            });
        });
    }

    // Display next page
    showNextPage = () =>{
        if(this.state.currentPage < Math.ceil(this.state.totalElements/this.state.recordPerPage)){
            this.getStoresByPagination(this.state.currentPage + 1);
        }
    };

    // Display last page
    showLastPage = () =>{
        if(this.state.currentPage < Math.ceil(this.state.totalElements/this.state.recordPerPage)){
            this.getStoresByPagination(Math.ceil(this.state.totalElements/this.state.recordPerPage));
        }
    };

    // Display first page
    showFirstPage = ()=>{
        let firstPage = 1;
        if(this.state.currentPage > firstPage){
            this.getStoresByPagination(firstPage);
        }
    };

    // Display previous page
    showPrevPage = () =>{
        let prevPage = 1
        if(this.state.currentPage > prevPage){
            this.getStoresByPagination(this.state.currentPage - prevPage);
        }
    };

    // When the search button is clicked, assign value to event target
    searchInput = (event) => {
        this.setState({
            [event.target.name]:event.target.value,
        });
    };

    // Make the request to the endpoint to retrieve the updated store list using the search input
    // And set the state with the response data
    searchStore = (currentPage) => {
        currentPage=currentPage-1;
        storeService.storeSearch(currentPage, this.state.recordPerPage, this.state.search)
        //axios.get("http://localhost:8080/store/"+this.state.search+"?page="+currentPage+"&size="+this.state.recordPerPage)
            .then(response => response.data).then((data) =>{
            this.setState({
                stores:data.content,
                totalPages:data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number+1
            });
        });
    };

    // Reset the search input field and reload the original pagination
    resetSearch = (currentPage) => {
        this.setState({"search":''});
        this.getStoresByPagination(this.state.currentPage);
    };

    // Find the store by its id and delete it from the backend database
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

    // Refresh time and store list when button is clicked
    buttonClickedRefreshStoreInfo() {
        console.log('StoreList was refreshed!');
        this.refreshTime();
        this.getStoresByPagination(this.state.currentPage);
    }

    //Render the page when button is clicked
    buttonClickedReRender() {
        this.render();
    }

    // Added by Jaewon Cho
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
                {/* The search part contains one input field, and two buttons (search button and reset button) */}
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
                {/* The store list part shows the attributes of the stores and has the edit and delete buttons */}
                <div className="container">
                    <table className="table table-bordered border-info">
                        <thead>
                        <tr>
                            <th>id</th>
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
                                        <td>{stores.id}</td>
                                        <td>{stores.name}</td>
                                        <td>{stores.type}</td>
                                        {/* Redirect to the openstreetmap with the given address */}
                                        <td><a href="#" onClick={((e) => this.openMap(e, stores.address))}>{stores.address}</a></td>
                                        {/*If the density is higher than 0.8, the display will be red; if the density is less than 0.8 but higher than 0.5, the display will be yellow; otherwise, the display will be green */}
                                        <td>{stores.density>0.8 ?
                                            (<Button type="button" variant="danger"
                                            ><FontAwesomeIcon icon={faXmarkCircle} /> {stores.density}</Button>) :
                                             stores.density<0.5 ?
                                                 (<Button type="button" variant="success"
                                            ><FontAwesomeIcon icon={faCheckCircle} /> {stores.density}</Button>) :
                                                 (<Button type="button" variant="warning"
                                            ><FontAwesomeIcon icon={faWarning} /> {stores.density}</Button>)}</td>
                                        <td>{stores.info}</td>
                                        {/* Edit and delete buttons */}
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
                    {/* The pagination part contains a page number display and a button group to navigate to other pages */}
                    <table className="table">
                        <div className="page-number">
                            Page {currentPage} of {totalPages}
                        </div>
                        <div className="pagination-buttons">
                            <nav>
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
                {/* The time part contains a last refresh time display and buttons to refresh store list and re-render */}
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