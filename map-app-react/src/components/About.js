import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import store from "store";

export default class about extends React.Component {
    render() {
        if (store.get("email") == null) {
            return (
                <div>
                    <div><AppBar style={{left: "400px"}}>
                        <Toolbar>
                            <Typography variant="h6">About</Typography>
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
                <div style={{width: "calc(100%)", position: "absolute", 'zIndex': 0, color: "black"}}>
                    <AppBar style={{left: "400px"}}>
                        <Toolbar>
                            <Typography variant="h6">About</Typography>
                        </Toolbar>
                    </AppBar>
                    <br/><br/><br/>

                    <Typography variant="h4" gutterBottom style={{top: "65px"}}>
                        CEWIT Conference
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{top: "65px"}}>
                        The Center of Excellence in Wireless and Information Technology - Advancing the technology
                        underlying the next epoch of the information revolution.
                    </Typography>

                </div>
            );
    }
}