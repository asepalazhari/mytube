import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './Redux'
import Layout from "./Components/Layout/NavDrawer";
import DetailVideo from "./Components/DetailVideo/DetailVideo";
import HomeVideo from "./Components/HomeVideo";
import TrendingVideo from "./Components/Trending";
import ResultSearch from "./Components/ResultSearch";
import WatchHistory from "./Components/WatchHistory";

class App extends Component {

  render() {
    return (
        <div className="App" >
            <Provider store={store}> 
                <BrowserRouter>
                    <Layout children={HomeVideo}>
                        <Switch>
                            <Route exact path="/" component={HomeVideo} />
                            <Route exact path="/watch" component={DetailVideo} />
                            <Route exact path="/trending" component={TrendingVideo} />
                            <Route exact path="/result" component={ResultSearch} />
                            <Route exact path="/history" component={WatchHistory} />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </Provider>
        </div>
    );
  }
}

export default App;
