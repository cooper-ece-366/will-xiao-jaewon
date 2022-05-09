import React, {useEffect, useState} from 'react';
import SearchBar from "material-ui-search-bar";
import Slider from 'react-custom-slider';
import { Button, Table } from 'react-bootstrap';
import storeService from "../services/storeService";
import locationService from "../services/locationService";
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
import {format} from "react-string-format";
import Alert from "react-s-alert";

// const LoadingButton = ({onClick}) => {
//     const [isLoading, setLoading] = useState(false);
  
//     useEffect(() => {
//         if (isLoading) {
//             onClick().then(() => {
//                 setLoading(false);
//             });
//         }
//     }, [isLoading]);
  
//     const handleClick = () => setLoading(true);
  
//     return (
//         <Button
//             variant="primary"
//             disabled={isLoading}
//             onClick={!isLoading ? handleClick : null}
//         >
//             {isLoading ? 'Loading…' : 'Search'}
//         </Button>
//     );
// }

const openMap = (e, addr) => {
    locationService.getCoords(addr)
        .then(response => response.data)
        .then((data) =>{
            console.log(data.lat);
            console.log(data.lng);
            window.open(`https://www.openstreetmap.org/?mlat=${data.lat}&mlon=${data.lng}#map=15/${data.lat.slice(0, 7)}/${data.lng.slice(0, 8)}`);
        });
}

const Proximity = () => {
    
    const [ distance, setDistance ] = useState(1);
    const [ addr, setAddr] = useState("");
    const [ stores, setStores ] = useState([]);

    const findStoresDist = () => {
        locationService.getCoords(addr)
            .then(response => response.data)
            .then((coords) => {
                console.log("Coordinate lookup: " + coords);
                storeService.nearby(distance * 10, format("{0},{1}", coords.lat, coords.lng))
                    .then(response => response.data)
                    .then((data) => {
                        // console.log(data);
                        Alert.success("Nearby store updated!");
                        setStores(data.content);
                    }, (error) => {
                        console.log(error);
                        Alert.error("Operation failed!");
                    });
            });
    }

    return (
        <div className="container">
            <div>
                <h1>Search Nearby Stores</h1>
                <SearchBar
                    placeholder="Enter an address ..."
                    onChange={(newAddr) => setAddr(newAddr)}
                    onRequestSearch={() => findStoresDist()}
                    style={{
                        margin: '0 auto',
                        maxWidth: 800
                    }}
                />  
            </div>
            <div class="container">
                <div style={{ float: "left" }}>
                    <p> Detection Range-----</p>
                    <p> </p>
                </div>
                <Slider
                    value={distance}
                    trackLength={250}
                    trackColor="grey"
                    min={1}
                    max={100}
                    stepSize={1}
                    markers={0}
                    onChange={(value) => {setDistance(value); console.log(value)}}
                    showValue={true}
                    valueRenderer={(value) => `${value}0m`}
                    valueLabelPadding={19}
                    />
                {/* <LoadingButton onClick={findStoresDist}/> */}
            </div>
            <div className="container">
                <table className="table table-bordered border-info">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Store</th>
                        <th>Address</th>
                        <th>Density</th>
                        <th>Rules</th>
                        {/* <th>Actions</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {stores.length===0?
                        <tr align="center"><td colSpan="5">No Record Found in Database</td></tr>:
                        stores.map(
                            (store,index) =>(
                                <tr key = {store.id}>
                                    <td>{index}</td>
                                    <td>{store.name}</td>
                                    <td><a href="#" onClick={((e) => openMap(e, store.address))}>{store.address}</a></td>
                                    <td>{store.density>0.8 ?
                                        (<Button type="button" variant="danger"
                                        ><FontAwesomeIcon icon={faXmarkCircle} /> {store.density}</Button>) :
                                            store.density<0.5 ?
                                                (<Button type="button" variant="success"
                                        ><FontAwesomeIcon icon={faCheckCircle} /> {store.density}</Button>) :
                                                (<Button type="button" variant="warning"
                                        ><FontAwesomeIcon icon={faWarning} /> {store.density}</Button>)}</td>
                                    <td>{store.info}</td>
                                    {/* <td><Link to={`/update-stores/${stores.id}`} className="btn btn-outline-primary"><FontAwesomeIcon icon={faEdit} /> Edit</Link> <button className="btn btn-outline-danger" onClick={() => { this.deleteStore(stores.id) }}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete</button>
                                    </td> */}
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Proximity;