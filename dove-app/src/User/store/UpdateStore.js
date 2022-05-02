import axios from 'axios';
import React, { Component } from 'react'
import storeService from "../../services/storeService";
import Alert from 'react-s-alert';
import {faPlusSquare, faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";

//Reference: https://codebun.com/crud-operation-with-react-js-spring-boot-restapi-and-mysql/
//Edited by Xiao Lin
class UpdateStore extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            name: '',
            address: '',
            density: '',
            info: ''
        };
    }
    componentDidMount(){
        //get store id
        const storeId = +this.props.match.params.id;
        if(storeId > 0){
            this.getStoreById(storeId);
        }

    }
    getStoreById = (storeId) =>{
        storeService.getById(storeId).then
        ((response) =>{
                console.log(response);
                Alert.success("Store info retrieved!");
                this.setState({
                    id:response.data.id,
                    name:response.data.name,
                    address:response.data.address,
                    density:response.data.density,
                    info:response.data.info,
                });
            },(error) =>{
                console.log(error);
                Alert.error("Operation failed!");
            }
        );
    }
    onInputChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    formHandle = event =>{
        event.preventDefault();
        const store = {
            id:this.state.id,
            name:this.state.name,
            address:this.state.address,
            density:this.state.density,
            info:this.state.info,
        } ;
        storeService.update(this.state.id,store).then(
            (response) =>{
                console.log(response);
                Alert.success("Store info updated!");
            } ,(error) =>{
                console.log(error);
                Alert.error("Operation failed!");
            }
        );

    }
    render() {
        const {name, address, density, info} = this.state
        return (
            <div>
                <div className="container">
                    <div class="card shadow bg-bg" style={{ margin: "5rem" }}>
                        <div class="card-header card-font">
                            Update Store info
                        </div>
                        <div class="card-body">
                            <form onSubmit={this.formHandle}>
                                <div className="form-group">
                                    <label htmlFor="storeNameInput" className="font-ch">Store Name</label>
                                    <input type="text" className="form-control" name="name"
                                           placeholder="Enter Here" value={name} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addressInput" className="font-ch">Address</label>
                                    <input type="text" className="form-control" name="address"
                                           placeholder="Enter Here" value={address} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="densityInput" className="font-ch">Population Density</label>
                                    <input type="text" className="form-control" name="density"
                                           placeholder="Enter Here" value={density} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="infoInput" className="font-ch">Rules</label>
                                    <input type="text" className="form-control" name="info"
                                           placeholder="Enter Here" value={info} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                </div>
                                <div class="d-grid gap-2 mt-2">
                                    <Button class="btn btn-info" type="submit"><FontAwesomeIcon icon={faPlusSquare} />Update</Button>
                                    <Button class="btn btn-danger" type="reset"><FontAwesomeIcon icon={faUndo} />Clear</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UpdateStore