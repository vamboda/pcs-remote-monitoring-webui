// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { SettingsContainer, ManageDeviceGroupsContainer } from './flyouts';

// App Components
import Header from './header/header';
import NavigationContainer from './navigation/navigationContainer';
import Main from './main/main';

// Page Components
import  {
  DashboardContainer as DashboardPage,
  PageNotFoundContainer as PageNotFound
} from 'components/pages';

import { svgs } from 'utilities';

import './app.css';

/** The navigation tab configurations */
const dashboardTab   = { to: '/dashboard',   svg: svgs.tabs.dashboard,   labelId: 'tabs.dashboard' };
const tabConfigs = [ dashboardTab];

/** The base component for the app */
class App extends Component {

  constructor(props) {
    super(props);

    this.state = { openFlyout: '' };
  }

  componentDidMount() {
    const { history, registerRouteEvent } = this.props;
    // Initialize listener to inject the route change event into the epic action stream
    history.listen(({ pathname }) => registerRouteEvent(pathname));
  }

  closeFlyout = () => this.setState({ openFlyout: '' });

  openSettings = () => this.setState({ openFlyout: 'settings' });

  render() {
    return (
      <div className={`app-container theme-${this.props.theme}`}>
        <div className="app">
          <NavigationContainer tabs={tabConfigs} t={this.props.t} />
          <Main>
            <Header openSettings={this.openSettings} logout={this.props.logout} t={this.props.t} />
            <Switch>
              <Redirect exact from="/" to={dashboardTab.to} />
              <Route exact path={dashboardTab.to} component={DashboardPage} />
              <Route component={PageNotFound} />
            </Switch>
            { this.props.deviceGroupFlyoutIsOpen && <ManageDeviceGroupsContainer /> }
            { this.state.openFlyout === 'settings' && <SettingsContainer onClose={this.closeFlyout} /> }
          </Main>
        </div>
      </div>
    );
  }

}

export default App;
