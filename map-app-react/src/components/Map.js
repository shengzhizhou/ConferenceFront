import React from 'react';
import ReactDOM from "react-dom";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import "leaflet-realtime";
import "leaflet-ajax";
import io from 'socket.io-client';
import {Radar,Bar,Pie,Doughnut} from "react-chartjs-2";
import hashmap from 'hashmap';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container, Row, Col }  from "react-bootstrap";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import store from "store";

// const Wrapper = styled.div`
// width: ${props => props.width};
// height: ${props => props.height};
// `;
export default class Map extends React.Component{
    constructor (props) {
        super()

    }

  componentDidMount(){
      this.mymap = L.map(this.refs.mymap, {
          fullscreenControl: true,
          fullscreenControlOptions: {
              position: 'topleft'
          },
        zoomControl: false,
          center:[40.902117,-73.134400]
        //... other options
    }).setView([40.902117,-73.134400], 18);
      // this.popup = L.popup();

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 25,
          minZoom:2,
      }).addTo(this.mymap);

      L.marker([40.902117,-73.134400]).addTo(this.mymap)
          .bindPopup('Conference Place')
          .openPopup();

      L.control.zoom({
          position:'bottomleft'
      }).addTo(this.mymap);



  }

  render() {
    return(
    <div>
        <div><AppBar style={{left:"400px"}}>
            <Toolbar>
                <Typography variant="h6">Map</Typography>
            </Toolbar>
        </AppBar>
        </div>
      <div ref = 'mymap' style={{height:"100%",left:"0px", width:"calc(100%)",position:"absolute", 'zIndex': 0}}>

      </div>
</div>
    );
  };
}
