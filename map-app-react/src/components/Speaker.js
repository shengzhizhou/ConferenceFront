import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
            newEvent:null
        };

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
                        <TableCell>{event.hostname}</TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.room}</TableCell>
                        <TableCell>{event.track}</TableCell>

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
                            <Typography variant="h6">Speaker</Typography>
                        </Toolbar>
                    </AppBar>
                    </div><br/><br/><br/>

                    <Typography style={{left:"0px"}} variant="h5" component="h2">Please Login first</Typography>
                </div>

            );
        }
        return (

            <Paper>
                <div><AppBar style={{left:"400px"}}>
                    <Toolbar>
                        <Typography variant="h6">Speaker</Typography>
                    </Toolbar>
                </AppBar>
                </div><br/><br/><br/>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Speaker</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Room</TableCell>
                            <TableCell>Track</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.events}
                    </TableBody>
                </Table>

            </Paper>
        );
    }
}