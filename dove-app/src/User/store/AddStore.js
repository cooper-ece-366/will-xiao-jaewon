import React, {Component} from "react";
import Alert from 'react-s-alert';
import 'react-bootstrap';
import './AddStore.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import {
    faPlusSquare,
    faUndo
} from "@fortawesome/free-solid-svg-icons";
import storeService from "../../services/storeService";

// Reference1: https://github.com/mightyjava/book-rest-api-reactjs
// Reference2: https://codebun.com/crud-operation-with-react-js-spring-boot-restapi-and-mysql/
// Edited by Xiao Lin

// Create a component that provide the functionality to add a new store to the backend database
class AddStore extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address: '',
            type:'',
            density: '',
            info: ''
        };
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
            name:this.state.name,
            address:this.state.address,
            type:this.state.type,
            density:this.state.density,
            info:this.state.info
        } ;
        storeService.create(store).then(
            (response) =>{
                console.log(response);
                Alert.success("New store info added!");
            } ,(error) =>{
                console.log(error);
                Alert.error("Invalid input!");
            }
        );
    }

    // reset the inputs in all form fields
    resetInput = () => {
        this.setState({"name":''})
        this.setState({"address":''})
        this.setState({"type":''})
        this.setState({"density":''})
        this.setState({"info":''})
    }

    render() {
        const {name, address, type, density, info} = this.state

        return (
            <div>
                <div class="container">
                    <div class="card shadow bg-transparent">
                        <div class="card-header card-font">
                            Add a New Store
                        </div>
                        {/* Show a form that allows the user to input the attributes of the store */}
                        <div class="card-body">
                            <form onSubmit={this.formHandle}>
                                <div class="form-group">
                                    <label htmlFor="storeNameInput" className="font-ch">Store Name</label>
                                    <input type="text" class="form-control" name="name"
                                           placeholder="Name" value={name} autoComplete="off" onChange={this.onInputChange} />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="addressInput" className="font-ch">Address</label>
                                    <input type="text" class="form-control" name="address"
                                           placeholder="Address" value={address} autoComplete="off" onChange={this.onInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="typeInput" className="font-ch">Store Type</label>
                                    <input type="text" className="form-control" name="type"
                                           placeholder="Store Type" value={type} autoComplete="off" onChange={this.onInputChange}/>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="densityInput" className="font-ch">Population Density</label>
                                    <input type="text" class="form-control" name="density"
                                           placeholder="Density (range: 0-1)" value={density} autoComplete="off" onChange={this.onInputChange}/>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="infoInput" className="font-ch">Rules</label>
                                    <input type="text" className="form-control" name="info"
                                           placeholder="Rules" value={info} autoComplete="off" onChange={this.onInputChange}/>
                                </div>
                                {/* Display two buttons, one is the submission button, one is the clear all button */}
                                <div class="button-group" >
                                    <Button class="button" type="submit" variant="outline-primary"><FontAwesomeIcon icon={faPlusSquare} /> Add</Button>
                                    <Button class="button" type="reset" variant="outline-danger" onClick={this.resetInput}><FontAwesomeIcon icon={faUndo} /> Clear</Button>
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