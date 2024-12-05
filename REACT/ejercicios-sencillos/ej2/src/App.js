import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalTitle: 'Buenos días',
      modalMessage: ' Canta, oh diosa, la cólera del Pelida Aquiles; cólera funesta que causó infinitos males a los aqueos y precipitó al Hades muchas almas valerosas de héroes, a quienes hizo presa de perros y pasto de aves -cumplíase la voluntad de Zeus- desde que se separaron disputando el Atrida, rey de hombres, y el divino Aquiles.',
    };
  }
  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };


  render() {
    return (
      <div className="App">
        <Button color="danger" onClick={this.toggleModal}>
          Click me
        </Button>


        {this.state.showModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{this.state.modalTitle}</h5>
                  <Button className="btn-close ms-auto" onClick={this.toggleModal}></Button>
                </div>
                <div className="modal-body">
                  <p>{this.state.modalMessage}</p>
                </div>
                <div className="modal-footer">
                  <Button color="primary" onClick={() => alert(':D')}>
                    Haz cosillas
                  </Button>
                  <Button color="secondary" onClick={this.toggleModal}>
                    Cerrar
                  </Button>

                </div>
              </div>
            </div>
          </div>
        )}



      </div>
    );
  }
}

export default App;
