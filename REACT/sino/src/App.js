import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'reactstrap';
import Sino from './Components/SinoComponent';

class App extends Component {
  constructor(props){}
  render(){
  return (
    <>
      <div>
        <Sino titulo={"Holis"} imagenAlt={"Aplicacion SINO"} imagen={"/img/1.png"}/>

      </div>
    </>
  );
}
}

export default App;
