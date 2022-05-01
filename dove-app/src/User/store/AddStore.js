import React, {Component} from "react";
import Alert from 'react-s-alert';
import 'react-bootstrap';
import './AddStore.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlusSquare,
    faUndo
} from "@fortawesome/free-solid-svg-icons";
import storeService from "../../services/storeService";

// Reference1: https://github.com/mightyjava/book-rest-api-reactjs
// Reference2: https://codebun.com/crud-operation-with-react-js-spring-boot-restapi-and-mysql/

// Edited by Xiao Lin
class AddStore extends Component {
    constructor(props){
        super(props);
        this.state = {
            storeName: '',
            address: '',
            density: '',
            info: ''
        };
    }

    onInputChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    formHandle = event =>{
        event.preventDefault();
        const store = {
            storeName:this.state.storeName,
            address:this.state.address,
            density:this.state.density,
            info:this.state.info
        } ;
        storeService.create(store).then(
            (response) =>{
                console.log(response);
                Alert.success("New store info added!");
            } ,(error) =>{
                console.log(error);
                Alert.error("Operation failed");
            }
        );
    }

    render() {
        const {storeName, address, density, info} = this.state

        return (
            <div>
                <div className="box-container">
                    <div class="box">
                        <div class="card-header card-font">
                            Add a New Store
                        </div>
                        <div class="card-body">
                            <form onSubmit={this.formHandle}>
                                <div class="form-group">
                                    <label for="storeNameInput" className="font-ch">Store Name</label>
                                    <input type="text" class="form-control" name="storeName"
                                           placeholder="Enter Here" value={storeName} autoComplete="off" onChange={this.onInputChange} />
                                </div>
                                <div class="form-group">
                                    <label for="addressInput" className="font-ch">Address</label>
                                    <input type="text" class="form-control" name="address"
                                           placeholder="Enter Here" value={address} autoComplete="off" onChange={this.onInputChange}/>
                                </div>
                                <div class="form-group">
                                    <label for="densityInput" className="font-ch">Population Density</label>
                                    <input type="text" class="form-control" name="density"
                                           placeholder="Enter Here" value={density} autoComplete="off" onChange={this.onInputChange}/>
                                </div>
                                <div class="form-group">
                                    <label for="infoInput" className="font-ch">Rules</label>
                                    <input type="text" className="form-control" name="info"
                                           placeholder="Enter Here" value={info} autoComplete="off" onChange={this.onInputChange}/>
                                </div>
                                <div class="button-group">
                                    <button class="button" type="submit"><FontAwesomeIcon icon={faPlusSquare} />Add</button>
                                    <button class="button" type="reset"><FontAwesomeIcon icon={faUndo} />Clear</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddStore