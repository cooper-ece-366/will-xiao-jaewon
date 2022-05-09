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
                        setStores(data.content);
                    });
            });
    }

    return (
        <div>
            <div>
                <SearchBar
                    onChange={(newAddr) => setAddr(newAddr)}
                    onRequestSearch={() => findStoresDist()}
                    style={{
                        margin: '0 auto',
                        maxWidth: 800
                    }}
                />  
            </div>
            <div class="h-25 p-20">
                <Slider
                    value={distance}
                    trackLength={250}
                    min={1}
                    max={100}
                    stepSize={1}
                    markers={0}
                    onChange={(value) => {setDistance(value); console.log(value)}}
                    showValue={true}
                    valueRenderer={(value) => `${value}0m`}
                    valueLabelPadding={10}
                    />
                {/* <LoadingButton onClick={findStoresDist}/> */}
            </div>
            <div className="list-container">
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
                                    <td>{store.address}</td>
                                    <td>{store.density>0.8 ?
                                        (<Button type="button" variant="danger"
                                        ><FontAwesomeIcon icon={faXmarkCircle} /> {stores.density}</Button>) :
                                            stores.density<0.5 ?
                                                (<Button type="button" variant="success"
                                        ><FontAwesomeIcon icon={faCheckCircle} /> {stores.density}</Button>) :
                                                (<Button type="button" variant="warning"
                                        ><FontAwesomeIcon icon={faWarning} /> {stores.density}</Button>)}</td>
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