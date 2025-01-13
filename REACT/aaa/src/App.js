import React, { Component } from 'react'
import { Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const MapaBotones = ({ handleClick, listaBotones }) => {
  // este componente pinta el tablero 9x9 con las props que le paso.
  const botonesLogico = JSON.parse(JSON.stringify(listaBotones))
  const tablero = []

  botonesLogico.map((fila, numFila) => {
    const filaAux = []
    fila.map((col, numCol) => {
      // Si es un azul le pongo solo el color para no habilitar el click
      if (col === 'azul') {
        filaAux.push(<Button color='primary'></Button>)
      } else {
        // Si es primera fila le pongo el handleClick y si no solo el color
        const boton = numFila === 0 ? <Button onClick={() => handleClick(numCol)} outline></Button> : <Button outline></Button>
        filaAux.push(boton)
      }
      return col
    })

    // Le añado un br al final de la fila para el salto de linea
    filaAux.push(<br></br>)
    // Añado la fila creada al tablero
    tablero.push(filaAux)
    return fila
  })

  return (
    <div className='tablero'>
      {tablero}
    </div>
  )
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listaBotones: this.componentWillMount(9)
      // no se puede modificar el state
    }
  }

  clica (x) {
    // x se supone que la columna, y la fila
    const botonesAux = JSON.parse(JSON.stringify(this.state.listaBotones))
    // Compruebo la columna que ha clickado y pongo el color en la fila que toque
    for (let i = botonesAux.length - 1; i >= 0; i--) {
      // Empiezo a recorrer la fila por abajo, y la primera que encuentre que no sea azul la pongo y me salgo del bucle
      if (botonesAux[i][x] !== 'azul') {
        botonesAux[i][x] = 'azul'
        break
      }
    }
    // Cambio el estado de la lista al nuevo después del click
    this.setState({ listaBotones: botonesAux })
  }

  componentWillMount (tam) {
    // aquí es donde creo las nueve columnas con los datos iniciales.
    const botonesAux = []
    for (let i = 0; i < tam; i++) {
      const fila = []
      for (let j = 0; j < tam; j++) {
        fila.push(null)
      }
      botonesAux.push(fila)
    }
    return botonesAux
  }

  render () {
    return (
      <div className="App">
        <h1> BUCHACA </h1>
        <MapaBotones listaBotones={this.state.listaBotones} handleClick={(x) => this.clica(x)} />
      </div>
    )
  }
}

export default App
