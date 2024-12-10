import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import Flashcard from './componentes/FlashcardComponent';
import { GODOS } from './shared/datos';
import { Button } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      godos:GODOS,
    }
  }
  render() {
    const lista = GODOS.map(
      (rey)=> <Flashcard 
                key={rey.id}
                imagen={rey.imagen} 
                titulo={rey.nombre}
                texto={rey.texto}
              />
    );
    return (
      <div className="App">
        <Button>this.state.godos[0].nombre</Button>
        {lista}
      </div>
    );
  }
}

function DisplayGodos(props){
  
}
export default App;