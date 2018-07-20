// Copyright (c) Microsoft. All rights reserved.

import { camelCaseReshape } from 'utilities';

export const permissions = {
  createDeviceGroups: 'CreateDeviceGroups',
  deleteDeviceGroups: 'DeleteDeviceGroups',
  updateDeviceGroups: 'UpdateDeviceGroups',

  createDevices: 'CreateDevices',
  deleteDevices: 'DeleteDevices',
  updateDevices: 'UpdateDevices',

  createRules: 'CreateRules',
  deleteRules: 'DeleteRules',
  updateRules: 'UpdateRules',

  deleteAlarms: 'DeleteAlarms',
  updateAlarms: 'UpdateAlarms',

  createJobs: 'CreateJobs',

  updateSIMManagement: 'UpdateSIMManagement'
};

export const toUserModel = (user = {}) => camelCaseReshape(user, {
  'id': 'id',
  'email': 'email',
  'name': 'name',
  'allowedActions': 'permissions'
});
