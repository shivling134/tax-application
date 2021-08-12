import React from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import { Container, Row, Form, FormGroup, FormControl, FormLabel, Button, Alert, Table } from "react-bootstrap";

class NewEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            location: "",
            records: [],
            showAlert: false,
            alertMsg: "",
            alertType: "success",
            id: "",
            update: false,
        };
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    };

    componentDidMount() {
        this.fetchAllRecords();
    }

    // add a record
    addRecord = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var body = JSON.stringify({ id: this.state.id, name: this.state.name, location: this.state.location });
        fetch("http://localhost:8000/api/create", {
            method: "POST",
            headers: myHeaders,
            body: body,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    id:"",
                    name: "",
                    location: "",
                    showAlert: true,
                    alertMsg: result.response,
                    alertType: "success",
                });
            });
    };

    
    // fetch All Records
    fetchAllRecords = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("http://localhost:8000/api/view", {
            method: "GET",
            headers: headers,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("result", result);
                this.setState({
                    records: result.response,
                });
            })
            .catch((error) => console.log("error", error));
    };

    // view single data to edit
    editRecord = (id) => {
        fetch("http://localhost:8000/api/view/" + id, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    id: result.response[0].id,
                    update: true,
                    name: result.response[0].name,
                    location: result.response[0].location,
                });
            })
            .catch((error) => console.log("error", error));
    };

    // update record
    updateRecord = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var body = JSON.stringify({ id: this.state.id, name: this.state.name, location: this.state.location });
        fetch("http://localhost:8000/api/update", {
            method: "PUT",
            headers: myHeaders,
            body: body,
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    showAlert: true,
                    alertMsg: result.response,
                    alertType: "success",
                    update: false,
                    id: "",
                    name: "",
                    location: "",
                });
                this.fetchAllRecords();
            })
            .catch((error) => console.log("error", error));
    };

    // delete a record
    deleteRecord = (id) => {
        fetch("http://localhost:8000/api/delete/" + id, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    showAlert: true,
                    alertMsg: result.response,
                    alertType: "danger",
                });
                this.fetchAllRecords();
            })
            .catch((error) => console.log("error", error));
    };

    
    render() {
        return (
            <div>
                <Container>
                    {this.state.showAlert === true ? (
                        <Alert
                            variant={this.state.alertType}
                            onClose={() => {
                                this.setState({
                                    showAlert: false,
                                });
                            }}
                            dismissible
                        >
                            <Alert.Heading>{this.state.alertMsg}</Alert.Heading>
                        </Alert>
                    ) : null}

                    {/* All Records */}
                    <Row>
                        {/* <Table className='text-center' striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>LastName</th>
                                    <th>Grade</th>
                                    <th>DOB</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Address</th>
                                    <th>Image</th>
                                    <th colSpan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.records.map((record, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index = index +1}</td>
                                            <td>{record.id}</td>
                                            
                                            <td>{record.name}</td>
                                            <td>{record.location}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            
                                            
                                            <td>
                                                <><Button  variant="info" onClick={() => this.editRecord(record.id)}>
                                                    Edit
                                                </Button></>
                                                
                                                
                                                
                                                
                                                
                                                &nbsp;&nbsp;&nbsp;
                                                <Link to='/editUser'  onClick={() => this.editRecord(record.id)} ><button>Edit_User</button></Link>
                                                &nbsp;&nbsp;&nbsp;

                                                <Button variant="danger" onClick={() => this.deleteRecord(record.id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table> */}
                    </Row>

                    {/* Insert Form */}
                    <Row>
                        <Form>
                            <FormGroup>
                                
                                <FormLabel>EnterId</FormLabel>
                                <FormControl type="number" name="id" placeholder="Enter the name" onChange={this.handleChange} value={this.state.id}></FormControl>
                            </FormGroup>
                            <FormGroup>
                            <FormLabel>Enter Name</FormLabel>
                                <FormControl type="date" name="name" placeholder="Enter the name" onChange={this.handleChange} value={this.state.name}></FormControl>
                            </FormGroup>
                            
                            <FormGroup>
                                <FormLabel>Enter the Location</FormLabel>
                                <FormControl type="text" name="location" value={this.state.location} onChange={this.handleChange} placeholder="Enter the Location"></FormControl>
                            </FormGroup>

                            {this.state.update === true ? <Button  className='btn btn-primary' onClick={this.updateRecord}>update</Button> : 
                            <Button  clasName= 'btn btn-danger'> <a style={{color:'white'}} href='/' onClick={this.addRecord}>Save</a></Button>}
                        </Form>
                    </Row>
                    <Link to='/addUser' >  <button className='btn btn-success'>Add User</button></Link>
                  
                </Container>
            </div>
        );
    }
}

export default NewEdit;
