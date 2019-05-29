import React from "react";
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import './Toggle.css';
import { render } from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import axios from "axios/index";
import store from "store";
import TextField from '@material-ui/core/TextField';

const dateformat = require('dateformat');
const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {}
});

export default class schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null,
            title:'',
            hostname:'',
            starttime:'',
            endtime:'',
            room:'',
            track:'',
            endtimes:'',
            starttimes:'',
            newEvent:null

        };
        this.deleteEvent =this.deleteEvent.bind(this);
        this.addEvent=this.addEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }
    deleteEvent(event) {
        const { events } = this.state;
        events.splice(event, events.valueOf(event));

        var data=JSON.stringify(event)
        axios.post('http://localhost:8080/homepage/deleteEvent',
            data,{
                headers:{ 'Content-Type': 'application/json;charset=UTF-8'}
            })
            .then(request =>{
                this.getAllEvent()
                console.log("deleted")

            }).catch((error)=>{
            this.setState({
                msg: 'Invalid User or Password'
            })
        })
        this.setState({ events });
    }

    addEvent(i){
        // const { newEvent } = this.state;
        // let newEvent=this.state.new
        var data=JSON.stringify({
            "title":this.state.title,
            "hostname":this.state.hostname,
            "starttimes":this.state.starttimes,
            "endtimes":this.state.endtimes,
            "room":this.state.room,
            "track":this.state.track,
            'starttime':'',
            'endtime':''
        })

        axios.post('http://localhost:8080/homepage/addEvent',
            data,{
                headers:{ 'Content-Type': 'application/json;charset=UTF-8'}
            })
            .then(request =>{
                this.getAllEvent()
                console.log("register")
            }).catch((error)=>{
            this.setState({
                msg: 'Invalid User or Password'
            })
        })
        this.setState({ newEvent:data});
    }


    getAllEvent(){

        let eventList = [];
        axios.post('http://localhost:8080/homepage/loadAllEvent')
            .then(request =>{

                eventList = request.data.map((event) => {
                    // console.log(user.email)
                    let starttime=event.starttime
                    let st=dateformat(starttime, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
                    let et=dateformat(event.endtime, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
                    return <TableRow>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.hostname}</TableCell>
                        <TableCell>{st}</TableCell>
                        <TableCell>{et}</TableCell>
                        <TableCell>{event.room}</TableCell>
                        <TableCell>{event.track}</TableCell>
                        <TableCell><Button
                            onClick={
                            ()=> this.deleteEvent(event)}
                            color="secondary">
                            Delete
                        </Button>
                            <Button color="primary">
                                Edit
                            </Button>
                        </TableCell>
                    </TableRow>
                })
                // eventList.concat(this.state.newEvent)
                this.setState({
                    events : eventList
                });
            }).catch((error)=>{
            this.setState({
                msg: 'Invalid User or Password'
            })
        })
    }
    componentDidMount(){
        this.getAllEvent()

    }

    render() {
        const { classes } = this.props;

        if(store.get("email")==null){
            return (
                <div>
                    <div><AppBar style={{left:"400px"}}>
                        <Toolbar>
                            <Typography variant="h6">Schedule</Typography>
                        </Toolbar>
                    </AppBar>
                    </div><br/><br/><br/>

                    <Typography style={{left:"0px"}} variant="h5" component="h2">Please Login first</Typography>
                </div>

            );
        }
        return (
            <div>
            <Paper >
                <div><AppBar style={{left:"400px"}}>
                    <Toolbar>
                        <Typography variant="h6">Schedule</Typography>
                    </Toolbar>
                </AppBar>
                </div><br/><br/><br/>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Hostname</TableCell>
                            <TableCell>Starttime</TableCell>
                            <TableCell>Endtime</TableCell>
                            <TableCell>Room</TableCell>
                            <TableCell>Track</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.events}
                    </TableBody>
                </Table>
                <br/>


            </Paper>
            <form onSubmit={this.addEvent} className="FormFields">

            <div>
            <TextField
        id="title"
        label="title"
        style={{marginLeft: "8px",
            marginRight: "8px",
            marginTop: "19",}}
        margin="dense"
        name="title"
        onChange={this.handleChange}
        />
        <TextField
            id="hostname"
            label="hostname"
            style={{marginLeft: "8px",
                marginRight: "8px",
                marginTop: "19",}}
            margin="dense"
            name="hostname"
            onChange={this.handleChange}
        />
        <TextField
        id="starttimes"
        label="starttime"
        style={{marginLeft: "8px",
            marginRight: "8px",
            marginTop: "19",}}
        margin="dense"
        name="starttimes"
        placeholder="2019-05-29 15:00:00"
        onChange={this.handleChange}
        />
    </div><div>
            <TextField
                id="endtimes"
                label="endtime"
                placeholder="2019-05-29 16:00:00"
                style={{marginLeft: "8px",
                    marginRight: "8px",
                    marginTop: "19",}}
                margin="dense"
                name="endtimes"
                onChange={this.handleChange}
            />
            <TextField
            id="room"
            label="Room"
            style={{marginLeft: "8px",
            marginRight: "8px",
            marginTop: "19",}}
            margin="dense"
            name="room"
            onChange={this.handleChange}
            />
            <TextField
                id="track"
                label="Track"
                style={{marginLeft: "8px",
                    marginRight: "8px",
                    marginTop: "19",}}
                margin="dense"
                name="track"
                onChange={this.handleChange}
            />
            </div><br/>
            <button className="FormField__Button mr-20" onClick={this.addEvent}>Add New Event</button>

        </form></div>
        );
    }
}