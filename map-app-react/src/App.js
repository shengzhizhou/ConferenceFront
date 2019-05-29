import React, {Component} from 'react';
import {HashRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Map from './components/Map';
import SignUp from './loginpage/SignUp';
import SignIn from './loginpage/SignIn';
import Toggle from './loginpage/Toggle';
import Conference from './Conference';
import Schedule from './components/Schedule';
import About from './components/About';
import speaker from './components/Speaker';
import io from "socket.io-client";
import support from './components/Support';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Anony from './loginpage/Anony'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedState: 'Select State',
            compareList: [],
            email: '',
        }
    }


    // setSelectedState(s){
    //     this.setState({
    //         selectedState : s
    //     })
    // }
    //
    // updateCompare(l){
    //     this.setState({
    //         compareList : l
    //     })
    // }

    storeEmail(s) {
        this.setState({
            email: s
        })
    }


    render() {
        return (

            <Router basename="/">


                <div className="App">

                    <div className="App__home">
                        <Route exact path="/" component={Anony}>
                        </Route>

                        <Route exact path="/sign-up" component={SignUp}>
                        </Route>

                        <Route exact path="/map" component={Map}>
                        </Route>
                        <Route exact path="/schedule" component={Schedule}>
                        </Route>
                        <Route exact path="/about" component={About}>
                        </Route>
                        <Route exact path="/speaker" component={speaker}>
                        </Route>
                        <Route exact path="/support" component={support}>
                        </Route>
                    </div>
                    <div className="App__Form">
                        <Conference/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;