import React, { Component } from "react";
import { Provider } from "react-redux";
import createStore from "../redux/store";
import AppNavigation from "../navigation/AppNavigation"

export default class App extends Component {

  renderNavigationRoute() {
    return <AppNavigation />;
  }

  render() {
    return (
      <Provider store={createStore()}>
        {this.renderNavigationRoute()}
      </Provider>
    );
  }
}
