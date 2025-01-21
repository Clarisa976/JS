import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Button } from 'reactstrap';
import { useState, useEffect } from 'react';
/*
las preguntas son un array
cada pregunta es un componente
la encuesta es un componente
usar handle para manejar los eventos
según la puntuación de la respuestas saldrá un alert de un color distinto
al contestar una pregunta desaparece
*/
//si lo que queremos es querer o almacenar información lo mejor es tener un class
function App() {
  const [contador,setContador] = useState(0);
  useEffect(()=>{
    console.log("Se ha ejecutado el useEffect"+contador);
    document.title="El contador es:"+contador;
  })

    return (
      <div className="App">
        <Button onClick={()=>setContador(contador+1)}>
          Dale
        </Button>
      </div>
    );
  }

export default App;