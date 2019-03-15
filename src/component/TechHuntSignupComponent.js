import React, {Component} from "react"
import axios from "axios"
import {hashHistory} from "react-router"
import { Modal, Button } from 'react-bootstrap';

import '../css/app.css'
import '../css/util.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import TokenValidationComponent from "./TokenValidationComponent"

class TechHuntSignupComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userId: "",
      userPwd: "",
      token: "",
      show: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleValidate = this.handleValidate.bind(this)
    this.handleShow = this.handleShow.bind(this)
  }

  handleValidate () {
    console.log(this.state)
    const url = `http://tech-hunt-api:8080/techhunt/user/validateToken/${this.state.token}/${this.state.userId}`;
    axios.get(
     url, {
       "crossOrigin": true
     }
    ).then(response => {
      if (response.data.status === "success") {
        this.setState(prevState => {
          prevState['show'] = false
        });
        const url = `http://tech-hunt-api:8080/techhunt/user/createUser`;
         axios.post(
           url, this.state , {
             "crossOrigin": true
           }
         ).then(response => {
           if (response.data.status === "success") {
             window.alert("User had been created!")
             hashHistory.push('/');
          } else {
             alert(response.data.message)
          }
         })
      } else {
         alert(response.data.message)
      }
    })
  }

  handleShow () {
    this.setState(prevState => {
      prevState['token'] = "";
      return prevState;
    });
  }

  handleClose () {
    this.setState(prevState => {
      prevState['show'] = false;
      return prevState;
    });
  }

  handleSubmit (event) {
    event.preventDefault()
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userId: this.state.userId,
      userPwd: this.state.userPwd
    }
     const url = `http://tech-hunt-api:8080/techhunt/user/stageUser`;
     axios.post(
       url, data, {
         "crossOrigin": true
       }
     ).then(response => {
       if (response.data.status === "success") {
         this.setState(prevState => {
           prevState['show'] = true
           return prevState
         });
         console.log(this.state)
       }
         //hashHistory.push({pathname: '/validateemail', state: this.state});
     })
    }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    });
  }

  render () {
    return (
        <div className="limiter">
  		    <div className="container-login100">
  			     <div className="wrap-login100 signup">
  				       <form
                   className="login100-form validate-form p-l-55 p-r-55 p-t-110"
                   onSubmit={this.handleSubmit}>
  			          <span className="login100-form-title">
  				              Sign Up
  			          </span>
      					<div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate="Please enter first name">
      						<input
                    className="input100"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange}>
                  </input>
      						<span className="focus-input100">
                  </span>
      					</div>
      					<div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate = "Please enter last name">
      						<input
                    className="input100"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange}>
                  </input>
      						<span
                    className="focus-input100"
                    >
                  </span>
      					</div>
                <div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate = "Please enter valid email">
      						<input
                    className="input100"
                    type="text"
                    name="userId"
                    placeholder="Email Address"
                    value={this.state.userId}
                    onChange={this.handleChange}>
                  </input>
      						<span className="focus-input100">
                  </span>
      					</div>
                <div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate = "Please enter password">
      						<input
                    className="input100"
                    type="password"
                    name="userPwd"
                    placeholder="Password"
                    value={this.state.userPwd}
                    onChange={this.handleChange}>
                  </input>
      						<span className="focus-input100">
                  </span>
      					</div>
      					<div
                  className="container-login100-form-btn m-b-30 m-t-30">
      						<button className="login100-form-btn">
      							Register
      						</button>
      					</div>
                <Modal show={this.state.show} onHide={this.handleClose} onShow={this.handleShow}>
                <Modal.Header closeButton>
                  <Modal.Title>User Validation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input
                    className="input100"
                    type="text"
                    name="token"
                    placeholder="Token Number"
                    value={this.state.token}
                    onChange={this.handleChange}>
                  </input>
                  <label><i class="fa fa-exclamation-triangle"></i>Token will expire in 60 seconds</label>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={this.handleValidate}>
                    Validate User
                  </Button>
                </Modal.Footer>
              </Modal>
  				   </form>
  			</div>
  		</div>
  	</div>
    )
  }
}

export default TechHuntSignupComponent
