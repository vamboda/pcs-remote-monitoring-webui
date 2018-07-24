// Copyright (c) Microsoft. All rights reserved.

import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import {createLogger} from 'redux-logger';

var logger = createLogger({
  collapsed: true
});

export default function configureStore() {
  // Initialize the redux-observable epics
  const epicMiddleware = createEpicMiddleware(rootEpic);
  // Initialize the redux store with middleware
  return createStore(
    rootReducer,
    applyMiddleware(epicMiddleware, logger)
  );
}
