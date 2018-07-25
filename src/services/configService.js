// Copyright (c) Microsoft. All rights reserved.

import Config from 'app.config';
import { HttpClient } from './httpClient';
import {
  prepareLogoResponse,
  toDeviceGroupModel,
  toDeviceGroupsModel,
  toSolutionSettingThemeModel
} from './models';
import { Observable } from 'rxjs';

const ENDPOINT = "http://localhost:5000/";

/** Contains methods for calling the config service */
export class ConfigService {

  /** Returns a the account's device groups */
  static getDeviceGroups() {
    return HttpClient.get(`${ENDPOINT}devicegroups`)
      .map(toDeviceGroupsModel);
  }

    /** Returns list of vehicles**/
    static getVehicles() {
      return HttpClient.get(`${ENDPOINT}vehicles`);
    }

  /** Creates a new device group */
  static createDeviceGroup(payload) {
    return HttpClient.post(`${ENDPOINT}devicegroups`, payload)
      .map(toDeviceGroupModel);
  }

  static updateDeviceGroup(id, payload) {
    return HttpClient.put(`${ENDPOINT}devicegroups/${id}`, payload)
      .map(toDeviceGroupModel);
  }

  /** Delete a device group */
  static deleteDeviceGroup(id) {
    return HttpClient.delete(`${ENDPOINT}devicegroups/${id}`)
      .map(_ => id);
  }

  /** Returns the azure map key for the account */
  static getAzureMapKey() {
    return Observable.of("hbBBC5OVFUQz0-p71o4emRAHcSCNgy1BLDBYUB4Q69A");
  }

  static getLogo() {
    var options = {};
    options.responseType = 'blob';
    options.headers = {
      'Accept': undefined,
      'Content-Type': undefined
    }
    return HttpClient.get(`${ENDPOINT}solution-settings/logo`, options)
      .map(prepareLogoResponse);
  }

  static setLogo(logo, header) {
    const options = {
      headers: header,
      responseType: 'blob'
    };

    if (!logo) {
      logo = '';
    }

    options.headers['Accept'] = undefined;
    return HttpClient.put(`${ENDPOINT}solution-settings/logo`, logo, options)
      .map(prepareLogoResponse);
  }
}
