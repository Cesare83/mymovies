//-------------------------------IMPORT MODULES---------------------------------
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view'; //no need for {} as default component
import './App.css';

//-------------------------------COMPONENTS-------------------------------------
const store = createStore(moviesApp);

class App extends Component {

  render() {
    return (
      //wrap Mainview inside a provider from React Redux to traverse the app structure
      <Provider store={store}>
        <MainView/>
      </Provider>
    );
  }
}

export default App;
