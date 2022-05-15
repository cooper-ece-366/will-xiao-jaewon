import React, { Component } from 'react'
import storeService from "../../services/storeService";
import Alert from 'react-s-alert';
import {faXmark, faUpload, faRotateBack} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import './UpdateStore.css';

//Reference: https://codebun.com/crud-operation-with-react-js-spring-boot-restapi-and-mysql/
//Edited by Xiao Lin

// This component is used to update the attribute of existing stores
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

    // Get the id of the store
    componentDidMount(){
        const storeId = +this.props.match.params.id;
        if(storeId > 0){
            this.getStoreById(storeId);
        }

    }

    // Retrieve the current store attributes using its id, and set it to state
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

    // When form field input changes, assign value to event target
    onInputChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    // After submitting the form, set the current state as the attribute of the object and post it to the backend
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
                Alert.error("Invalid input!");
            }
        );
    }

    // The reset functions below are used to clear the corresponding input field
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
                    <div class="card shadow bg-transparent">
                        <div class="card-header card-font">
                            Update Store Information
                        </div>
                        {/* Show a form that allows the user to modify the attributes of the given store */}
                        <div class="card-body">
                            <form onSubmit={this.formHandle}>
                                <div className="form-group">
                                    <label htmlFor="storeNameInput" className="font-ch">Store Name</label>
                                    <input type="text" className="form-control" name="name"
                                           placeholder="Enter Name" value={name} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                    <FontAwesomeIcon icon={faXmark} id="clearBtn" onClick={this.resetName}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addressInput" className="font-ch">Address</label>
                                    <input type="text" className="form-control" name="address"
                                           placeholder="Enter Address" value={address} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                    <FontAwesomeIcon icon={faXmark} id="clearBtn" onClick={this.resetAddress}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addressInput" className="font-ch">Store Type</label>
                                    <input type="text" className="form-control" name="type"
                                           placeholder="Enter Store Type" value={type} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                    <FontAwesomeIcon icon={faXmark} id="clearBtn" onClick={this.resetType}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="densityInput" className="font-ch">Population Density</label>
                                    <input type="text" className="form-control" name="density"
                                           placeholder="Enter Density (range: 0-1)" value={density} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                    <FontAwesomeIcon icon={faXmark} id="clearBtn" onClick={this.resetDensity}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="infoInput" className="font-ch">Rules</label>
                                    <input type="text" className="form-control" name="info"
                                           placeholder="Enter Rules" value={info} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                    <FontAwesomeIcon icon={faXmark} id="clearBtn" onClick={this.resetInfo}/>
                                </div>
                                {/* Display two buttons, one is the submission button, one is the return to store list button */}
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