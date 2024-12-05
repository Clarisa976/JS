import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props)
   
  }



  render() {
    return (
      <div className="App">
        <Button color="secondary" data-container="body" data-toggle="popover" data-placement="left" title="Popover title" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
          Términos y condiciones
        </Button>



      </div>
    );
  }
}

export default App;
