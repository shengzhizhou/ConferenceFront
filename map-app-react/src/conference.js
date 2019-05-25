import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import {Tabs,Tab,InputGroup} from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'react-input-range/lib/css/index.css'
import InputRange from 'react-input-range';
import Alert from 'react-bootstrap/Alert'
import './App.css';
import './loginpage/Toggle.css'
import store from 'store'
import {Link, NavLink, Redirect,withRouter} from 'react-router-dom';
import hashmap from "hashmap";
import CompareInfo from "./components/CompareInfo";
import axios from "axios";

class conference extends React.Component {
    render() {
        return(
        <div>
            <Container>
                <p>HELLO</p>
            </Container>
        </div>
        )
    }
}
export default withRouter(conference);