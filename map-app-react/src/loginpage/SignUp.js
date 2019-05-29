import React, {Component} from 'react';
import {HashRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Toggle from './Toggle';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import store from "store";

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            name: '',
            phonenum: '',
            hasAgreed: false,
            msg: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
        // const weatherData = this.state.hasAgreed;
        this.setState({
            hasAgreed: !this.state.hasAgreed
        });

    }

    handleSubmit(e) {
        e.preventDefault();

        console.log("submit " + this.state.hasAgreed);
        if (this.state.hasAgreed) {
            this.setState({
                msg: 'You must Agree.'
            })
        }
        else {
            let data = JSON.stringify({
                "email": e.target.elements.email.value,
                "password": e.target.elements.password.value,
                "name": e.target.elements.name.value,
                "phonenum": e.target.elements.phonenum.value,
                "role": 'user'
            })
            axios.post('http://localhost:8080/homepage/signup',
                data, {
                    headers: {'Content-Type': 'application/json;charset=UTF-8'}

                })
                .then(request => {
                    this.setState({
                        login: !this.state.login,
                        msg: ''
                    });
                    store.set('loggedIn', true);
                    store.set('AnonyLogin', false);
                    store.set('email', request.data.email)
                    store.set('name', request.data.name)
                    store.set('phonenum', request.data.phonenum)
                    this.props.history.push('/schedule');
                }).catch(error => {
                this.setState({
                    msg: 'User already exist.'
                })
            })
        }
        console.log('The form was submitted with the following data:');


    }

    render() {
        if (store.get("email") == null) {
            return (
                <div>
                    <div><AppBar style={{left: "400px"}}>
                        <Toolbar>
                            <Typography variant="h6">Sign Up</Typography>
                        </Toolbar>
                    </AppBar>
                    </div>
                    <br/><br/><br/>

                    <Typography style={{left: "0px"}} variant="h5" component="h2">Please Login first</Typography>
                </div>

            );
        }
        else
            return (
                <div>
                    <div><AppBar style={{left: "400px"}}>
                        <Toolbar>
                            <Typography variant="h6">Sign Up</Typography>
                        </Toolbar>
                    </AppBar>
                    </div>
                    <div className="FormCenter">
                        <Toggle/>
                        <div style={{color: 'red'}}>{this.state.msg}</div>
                        <form onSubmit={this.handleSubmit} className="FormFields">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="name">Full Name</label>
                                <input type="text" id="name" className="FormField__Input"
                                       placeholder="Enter your full name" name="name" value={this.state.name}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="password">Password</label>
                                <input type="password" id="password" className="FormField__Input"
                                       placeholder="Enter your password" name="password" value={this.state.password}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                                <input type="email" id="email" className="FormField__Input"
                                       placeholder="Enter your email" name="email" value={this.state.email}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="phonenum">Phone Number</label>
                                <input type="phonenum" id="phonenum" className="FormField__Input"
                                       placeholder="Enter your phone number" name="phonenum" value={this.state.phonenum}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="FormField">
                                <label className="FormField__CheckboxLabel">
                                    <input className="FormField__Checkbox" type="checkbox" name="hasAgreed"
                                           value={this.state.hasAgreed} onChange={this.handleChange}/> I agree all
                                    statements in terms of service
                                </label>
                            </div>

                            <div className="FormField">
                                <button className="FormField__Button mr-20">Sign Up</button>
                                <Link to="/" className="FormField__Link">I'm already member</Link>
                            </div>
                        </form>
                    </div>
                </div>
            );
    }
}

export default SignUpForm;
