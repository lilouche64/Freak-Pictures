import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Nav from '../src/components/navigation/Nav';
import SearchPage from './components/SearchPage';
import CollectionPage from './components/CollectionPage';

class App extends React.Component{
  render(){
    return (
      <Router>
        <Nav/>
        <Route path='/' exact component={HomePage}/>
        <Route path='/search' exact component={SearchPage}/>
        <Route path='/collections' exact component={CollectionPage}/>
      </Router>
    );
  }
}

export default App;
