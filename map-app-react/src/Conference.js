import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRange from '@material-ui/icons/DateRange'
import Group from '@material-ui/icons/Group'
import Map from '@material-ui/icons/Map'
import Info from '@material-ui/icons/Info'
import Toolbar from '@material-ui/core/Toolbar';
import Account from '@material-ui/icons/AccountBox';
import Support from '@material-ui/icons/Help';
import Logout from '@material-ui/icons/PowerSettingsNew';
import Typography from '@material-ui/core/Typography';
import store from "store";
import {withRouter} from 'react-router-dom';

class conference extends React.Component {

    constructor(props) {
        super(props);
        this.ClickOnMap = this.ClickOnMap.bind(this);
        this.ClickOnAccount = this.ClickOnAccount.bind(this);
        this.ClickOnSchedule = this.ClickOnSchedule.bind(this);
        this.ClickOnSpeaker = this.ClickOnSpeaker.bind(this);
        this.ClickOnAbout = this.ClickOnAbout.bind(this);
        this.ClickOnSupport = this.ClickOnSupport.bind(this);
        this.logout = this.logout.bind(this);
    }

    ClickOnSchedule(e) {
        this.props.history.push("/schedule")
    }

    ClickOnMap(e) {
        this.props.history.push("/map")
        // ReactDOM.render(<conference/>,document.getElementById("map"))
    }

    ClickOnAccount(e) {

        this.props.history.push("/")

    }

    ClickOnSpeaker(e) {
        this.props.history.push("/speaker")
    }

    ClickOnAbout(e) {
        this.props.history.push("/about")
    }

    ClickOnSupport(e) {
        this.props.history.push("/support")
    }


    logout(e) {
        store.set('email', null)
        store.set('AnonyLogin', false)
        this.props.history.push("/")
    }

    render() {
        return (

            <div style={{color: "black"}}>
                <div><AppBar style={{width: "400px", left: "0px"}}>
                    <Toolbar>
                        <Typography variant="h6">Conference Application</Typography>
                    </Toolbar>
                </AppBar>
                </div>
                <List><ListItem/><ListItem/></List>
                <List subheader={<li style={{textAlign: "left"}}>Navigate</li>}>
                    <ListItem button onClick={this.ClickOnSchedule}>
                        <ListItemIcon><DateRange/></ListItemIcon>
                        <ListItemText primary={'Schedule'}/>
                    </ListItem>
                    <ListItem button onClick={this.ClickOnSpeaker}>
                        <ListItemIcon><Group/></ListItemIcon>
                        <ListItemText primary={'Speaker'}/>
                    </ListItem>
                    <ListItem button onClick={this.ClickOnMap}>
                        <ListItemIcon><Map/></ListItemIcon>
                        <ListItemText primary={'Map'}/>
                    </ListItem>
                    <ListItem button onClick={this.ClickOnAbout}>
                        <ListItemIcon><Info/></ListItemIcon>
                        <ListItemText primary={'About'}/>
                    </ListItem>
                </List>
                <List subheader={<li style={{textAlign: "left"}}>Account</li>}>
                    <ListItem button onClick={this.ClickOnAccount}>
                        <ListItemIcon><Account/></ListItemIcon>
                        <ListItemText primary={'Acount'}/>
                    </ListItem>
                    <ListItem button onClick={this.ClickOnSupport}>
                        <ListItemIcon><Support/></ListItemIcon>
                        <ListItemText primary={'Support'}/>
                    </ListItem>
                    <ListItem button onClick={this.logout}>
                        <ListItemIcon><Logout/></ListItemIcon>
                        <ListItemText primary={'Logout'}/>

                    </ListItem>

                </List>

            </div>
        );
    }
}

export default withRouter(conference);