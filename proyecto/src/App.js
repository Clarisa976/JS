import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';

function App() {
  return (
    <>
    <div className="App">
      <HeaderComponent />
      <Button>
        Dale
      </Button>
      
      </div>
      <FooterComponent />
    </>
  );
}




export default App;