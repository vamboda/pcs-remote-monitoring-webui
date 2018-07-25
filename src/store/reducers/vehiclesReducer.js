// Copyright (c) Microsoft. All rights reserved.

// ========================= Selectors - START
export const getVehiclesReducer = state => {
  return state.vehicles;
}
export const getVehicles = state => {return getVehiclesReducer(state) || {}};
// ========================= Selectors - END
