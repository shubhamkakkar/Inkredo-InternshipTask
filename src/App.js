import React, { Component, Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routerConfig"


import { Provider } from 'react-redux'
import configureStore from "./store"

import Navbar from "./container/Navbar/Navbar"
import Companys from "./container/Companys/Companys"

const store = configureStore()
store.subscribe(() => {
  const subs = store.getState()
  console.log(subs)
})
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <div >
                    <Companys />
                  </div>
                );
              }}
            />
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
              />
            )
            )}
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App
