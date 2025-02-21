import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import Flashcard from './componentes/FlashcardComponent';
import { GODOS } from './shared/datos';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      godos: GODOS,
    }
  }
  render() {
    return (
      <div className="App">
        <DisplayGodos reyes={this.state.godos}/>
      </div>
    );
  }
}

function DisplayGodos(props) {
  const losreyes = props.reyes;
  const lista = losreyes.map((rey) => <Flashcard
    key={rey.id.toString()}
    imagen={rey.imagen}
    titulo={rey.nombre}
    texto={rey.texto}
  />);
  return (
    <ul>
      {lista}
    </ul>
  );
}
export default App;