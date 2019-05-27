import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import DateRange from '@material-ui/icons/DateRange'
import Group from '@material-ui/icons/Group'
import Map from '@material-ui/icons/Map'
import Info from '@material-ui/icons/Info'
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Account from '@material-ui/icons/AccountBox';
import Support from '@material-ui/icons/Help';
import Logout from '@material-ui/icons/PowerSettingsNew';
import Schedule from './components/schedule';

import { makeStyles, useTheme } from '@material-ui/core/styles';


const ScheduleLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
));
const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },

    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ResponsiveDrawer(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    function ClickOnSchedule() {
        // container.history.push('./components/schedule.js');
        ReactDOM.render(drawer,document.getElementById("Schedule"))
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button component={ScheduleLink} to="./Schedule">
                    <ListItemIcon><DateRange/></ListItemIcon>
                    <ListItemText primary={'Schedule'} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Group/></ListItemIcon>
                    <ListItemText primary={'Speaker'} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Map/></ListItemIcon>
                    <ListItemText primary={'Map'} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Info/></ListItemIcon>
                    <ListItemText primary={'About'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon><Account/></ListItemIcon>
                    <ListItemText primary={'Acount'} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Support/></ListItemIcon>
                    <ListItemText primary={'Support'} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Logout/></ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItem>

            </List>
        </div>
    );

    return (
        <div className={classes.root} id={"schedule"}>


            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

        </div>
    );
}

ResponsiveDrawer.propTypes = {
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
};

export default ResponsiveDrawer;
