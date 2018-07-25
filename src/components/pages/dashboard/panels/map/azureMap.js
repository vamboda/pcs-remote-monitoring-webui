// Copyright (c) Microsoft. All rights reserved.

import React, {
  Component
} from 'react';

import Config from 'app.config';
import {
  isFunc
} from 'utilities';

import $ from 'jquery';
window.jQuery = $;
require('signalr');

const insideCameraBounds = require('point-in-polygon');
const AzureMaps = window.atlas;

export class AzureMap extends Component {

  constructor(props) {
    super(props);

    const signalRConnection = $.hubConnection('http://localhost:5000');
    const updateMap = this.updateMap.bind(this);
    // start the connection
    signalRConnection.start()
      .done(function () {
        console.log('Now connected, connection ID=' + signalRConnection.id);
      })
      .fail(function () {
        console.log('Could not connect');
      });
    // getting the hub proxy
    var notificationHubProxy = signalRConnection.createHubProxy('signalRNotificationHub');

    // attaching events listeners to the proxy
    notificationHubProxy.on('locationModified', function (vehicleId, location) {
      updateMap(vehicleId, location);
    });

    this.state = {
      vehicleLocation: {},
      signalRConnection: signalRConnection
    }
  }

  componentDidMount() {
    if (!this.map && this.props.azureMapsKey) {
      this.initializeMap(this.props.azureMapsKey);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.map && nextProps.azureMapsKey) {
      this.initializeMap(nextProps.azureMapsKey);
    }
  }

  componentWillUnmount() {
    // Clean up the azure map resources on unmount
    if (this.map) this.map.remove();
  }

  shouldComponentUpdate(nextProps) {
    // Component props never result in a dom updates from React
    return false;
  }

  initializeMap(azureMapsKey) {
    this.map = new AzureMaps.Map('map', {
      'subscription-key': azureMapsKey,
      center: Config.mapCenterPosition,
      zoom: 11
    });

    this.map.addEventListener('load', () => {
      if (isFunc(this.props.onMapReady)) {
        this.props.onMapReady(this.map);
      }
    });
  }

  updateMap(vehicleId, location) {
    if (this.map) {
      // drop the pin at the current vehicle's location
      var point = new AzureMaps.data.Point([
        location.longitude,
        location.latitude
      ]);
      var pin = new AzureMaps.data.Feature(point);

      // set cameras option and bring it to center
      // var c = this.map.getCamera()
      // c.center = [
      //   location.longitude,
      //   location.latitude
      // ]
      var cameraBounds = this.map.getCamera().bounds;
      const point1 = [cameraBounds[1], cameraBounds[0]];
      var point2 = [cameraBounds[1], cameraBounds[2]];
      var point3 = [cameraBounds[3], cameraBounds[0]];
      var point4 = [cameraBounds[3], cameraBounds[2]];

      const cameraBoundsPolygon = [point1, point2, point3, point4];
      const isVehicleInside = insideCameraBounds([location.latitude, location.longitude], cameraBoundsPolygon);
      if(!isVehicleInside){
        let c = this.map.getCamera();
        c.center = [
             location.longitude,
             location.latitude
          ];
          this.map.setCamera(c);
      }

      this.map.addPins([pin], {
        title: vehicleId,
        icon: "pin-blue",
        textFont: "SegoeUi-Bold",
        textOffset: [0, -20],
        fontColor: "#000",
        fontSize: 14,
        iconSize: 1,
        name: "default-pin-layer",
        overwrite: true
      });
    }
  }

  render() {
    return <div id = "map"> </div>;
  }
}
