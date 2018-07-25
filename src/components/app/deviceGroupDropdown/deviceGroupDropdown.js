// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';

import { Select } from 'components/shared';

import './deviceGroupDropdown.css';

export class DeviceGroupDropdown extends Component {

  onChange = (deviceGroupIds) => ({ target: { value: { value } = {} } = {} }) => {
    // Don't try to update the device group if the device id doesn't exist
    if (deviceGroupIds.indexOf(value) > -1) {
      this.props.changeDeviceGroup(value);
    }
  }

  vehiclesToOptions = vehicles => vehicles
    .map(({ VehicleId }) => ({ label: VehicleId, value: VehicleId }));

  render() {
    const {vehicles} = this.props;
    const vehicleIds = vehicles.map(({ VehicleId }) => VehicleId);
    return (
      <Select
        className="device-group-dropdown"
        options={this.vehiclesToOptions(vehicles)}
        value={vehicleIds[0]}
        clearable={false}
        onChange={this.onChange(vehicleIds)} />
    );
  }
}
