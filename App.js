import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from "redux-thunk";
import { Provider } from 'react-redux';

import reducer from './src/store/reducer';

import Navigator from './src/Navigator';

// import FirebaseService from './src/services/firebaseService';

export default class App extends React.Component {

  // componentDidMount() {
  //    FirebaseService.getDataList('posts', dataIn => this.setState({ dataList: dataIn }));
  // };

  store = createStore(reducer, applyMiddleware(reduxThunk));

  render() {
    return (
      <Provider store={this.store}>
        <Navigator />
      </Provider>
    );
  }
}