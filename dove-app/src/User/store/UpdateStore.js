import axios from 'axios';
import React, { Component } from 'react'
import storeService from "../../services/storeService";
import Alert from 'react-s-alert';
import {faXmark, faUpload, faRotateBack} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import './UpdateStore.css';
import CloseIcon from "@material-ui/icons/Close";

//Reference: https://codebun.com/crud-operation-with-react-js-spring-boot-restapi-and-mysql/
//Edited by Xiao Lin
class UpdateStore extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            name: '',
            address: '',
            type:'',
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
                    type:response.data.type,
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
            type:this.state.type,
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

    resetName = () => {
        this.setState({"name":''})
    }

    resetAddress = () => {
        this.setState({"address":''})
    }

    resetType = () => {
        this.setState({"type":''})
    }

    resetDensity = () => {
        this.setState({"density":''})
    }

    resetInfo = () => {
        this.setState({"info":''})
    }

    render() {
        const {name, address, type, density, info} = this.state
        return (
            <div>
                <div className="container">
                    <div class="card shadow bg-bg">
                        <div class="card-header card-font">
                            Update Store Information
                        </div>
                        <div class="card-body">
                            <form onSubmit={this.formHandle}>
                                <div className="form-group">
                                    <label htmlFor="storeNameInput" className="font-ch">Store Name</label>
                                    <input type="text" className="form-control" name="name"
                                           placeholder="Enter Here" value={name} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                    <FontAwesomeIcon icon={faXmark} id="clearBtn" onClick={this.resetName}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addressInput" className="font-ch">Address</label>
                                    <input type="text" className="form-control" name="address"
                                           placeholder="Enter Here" value={address} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                    <FontAwesomeIcon icon={faXmark} id="clearBtn" onClick={this.resetAddress}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addressInput" className="font-ch">Store Type</label>
                                    <input type="text" className="form-control" name="type"
                                           placeholder="Enter Here" value={type} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                    <FontAwesomeIcon icon={faXmark} id="clearBtn" onClick={this.resetType}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="densityInput" className="font-ch">Population Density</label>
                                    <input type="text" className="form-control" name="density"
                                           placeholder="Enter Here" value={density} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                    <FontAwesomeIcon icon={faXmark} id="clearBtn" onClick={this.resetDensity}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="infoInput" className="font-ch">Rules</label>
                                    <input type="text" className="form-control" name="info"
                                           placeholder="Enter Here" value={info} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                    <FontAwesomeIcon icon={faXmark} id="clearBtn" onClick={this.resetInfo}/>
                                </div>
                                <div class="button-group">
                                    <Button class="btn btn-info" type="submit" variant="outline-primary"><FontAwesomeIcon icon={faUpload} /> Update</Button>
                                    <Button class="btn btn-info" type="button" variant="outline-success" href="http://localhost:3000/store"><FontAwesomeIcon icon={faRotateBack} /> Back</Button>
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