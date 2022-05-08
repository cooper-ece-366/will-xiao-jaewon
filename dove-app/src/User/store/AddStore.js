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

    onInputChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

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
                Alert.error("Operation failed!");
            }
        );
    }

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
                <div className="container">
                    <div class="card shadow bg-bg">
                        <div class="card-header card-font">
                            Add a New Store
                        </div>
                        <div class="card-body">
                            <form onSubmit={this.formHandle}>
                                <div class="form-group">
                                    <label htmlFor="storeNameInput" className="font-ch">Store Name</label>
                                    <input type="text" class="form-control" name="name"
                                           placeholder="Enter Here" value={name} autoComplete="off" onChange={this.onInputChange} />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="addressInput" className="font-ch">Address</label>
                                    <input type="text" class="form-control" name="address"
                                           placeholder="Enter Here" value={address} autoComplete="off" onChange={this.onInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="typeInput" className="font-ch">Store Type</label>
                                    <input type="text" className="form-control" name="type"
                                           placeholder="Enter Here" value={type} autoComplete="off"
                                           onChange={this.onInputChange}/>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="densityInput" className="font-ch">Population Density</label>
                                    <input type="text" class="form-control" name="density"
                                           placeholder="Enter Here" value={density} autoComplete="off" onChange={this.onInputChange}/>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="infoInput" className="font-ch">Rules</label>
                                    <input type="text" className="form-control" name="info"
                                           placeholder="Enter Here" value={info} autoComplete="off" onChange={this.onInputChange}/>
                                </div>
                                <div class="button-group">
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