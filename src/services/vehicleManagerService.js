// Copyright (c) Microsoft. All rights reserved.

import { Observable } from 'rxjs';

import Config from 'app.config';
import { stringify } from 'query-string';
import { HttpClient } from './httpClient';
import { toDevicesModel, toDeviceModel, toJobsModel, toJobStatusModel, toDevicePropertiesModel } from './models';

const ENDPOINT = "http://localhost:5000/";

/** Contains methods for calling the Device service */
export class VehicleManagerService {

  /** Returns a list of devices */
  static getVehicles(conditions = []) {
    const query = encodeURIComponent(JSON.stringify(conditions));
    return HttpClient.get(`${ENDPOINT}vehicles`)
      .map(toDevicesModel);
  }
}
