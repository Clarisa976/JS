import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Alert } from 'reactstrap';
/*
las preguntas son un array
cada pregunta es un componente
la encuesta es un componente
usar handle para manejar los eventos
según la puntuación de la respuestas saldrá un alert de un color distinto
al contestar una pregunta desaparece
*/
//si lo que queremos es querer o almacenar información lo mejor es tener un class



//preguntas
const preguntas = [
  {
    pregunta: "Cuando mandas un mensaje por whatsapp esperas siempre al doble check. Si no aparece vuelves a abrir el terminal para revisarlo al rato.",
    respuestas: [
      {
        respuesta: "Sí",
        puntos: 1,
      },
      {
        respuesta: "No",
        puntos: 0,
      }
    ]
  },
  {
    pregunta: "Antes de acostarte siempre miras el móvil a ver si tienes mensajes o notificaciones.",
    respuestas: [
      {
        respuesta: "Sí",
        puntos: 1,
      },
      {
        respuesta: "No",
        puntos: 0,
      }
    ]
  },
  {
    pregunta: "Te despiertas antes de tiempo para jugar, mandar mensajes, actualizar perfiles,… con el teléfono móvil.",
    respuestas: [
      {
        respuesta: "Sí",
        puntos: 1,
      },
      {
        respuesta: "No",
        puntos: 0,
      }
    ]
  },
  {
    pregunta: "Si sales de casa sin el móvil volverías a cogerlo aunque llegues tarde a tu cita.",
    respuestas: [
      {
        respuesta: "Sí",
        puntos: 1,
      },
      {
        respuesta: "No",
        puntos: 0,
      }
    ]
  },
  {
    pregunta: "Tienes miedo a quedarte sin batería.",
    respuestas: [
      {
        respuesta: "Sí",
        puntos: 1,
      },
      {
        respuesta: "No",
        puntos: 0,
      }
    ]
  },
  {
    pregunta: "Cuando tienes la batería baja desactivas ciertas aplicaciones u opciones del teléfono como la WiFi, bluetooth para no quedarte sin batería.",
    respuestas: [
      {
        respuesta: "Sí",
        puntos: 1,
      },
      {
        respuesta: "No",
        puntos: 0,
      }
    ]
  },
  {
    pregunta: "Tienes ansiedad cuando tienes llamadas perdidas. Llamas a los números y te preocupas si no responden.",
    respuestas: [
      {
        respuesta: "Sí",
        puntos: 1,
      },
      {
        respuesta: "No",
        puntos: 0,
      }
    ]
  },
  {
    pregunta: "Miras la cobertura cuando estas en algún sitio con los amigos, esperando, etc.",
    respuestas: [
      {
        respuesta: "Sí",
        puntos: 1,
      },
      {
        respuesta: "No",
        puntos: 0,
      }
    ]
  },
  {
    pregunta: "Sueles hacer alguna otra cosa mientras que miras al móvil como comer, lavarte los dientes, etc.",
    respuestas: [
      {
        respuesta: "Sí",
        puntos: 1,
      },
      {
        respuesta: "No",
        puntos: 0,
      }
    ]
  },
  {
    pregunta: "Vas al baño siempre con el móvil.",
    respuestas: [
      {
        respuesta: "Sí",
        puntos: 1,
      },
      {
        respuesta: "No",
        puntos: 0,
      }
    ]
  }

]

function App() {
  const [puntuacion, setPuntuacion] = useState(0);
  //const [preguntaActual,setPreguntaActual]=useState(0);
  // const [fin,setFin]=useState(false);
  const [respondidas, setRespondidas] = useState([]);
  const [resultado, setResultado] = useState("");
  const [alertaColor, setAlertaColor] = useState("secondary");


 /* const handleRespuesta = (puntos) => {
    const nuevaPuntuacion = puntuacion + puntos;
    setPuntuacion(nuevaPuntuacion);

    if (preguntaActual + 1 < preguntas.length) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setFin(true);
      calcularPuntuacion(nuevaPuntuacion);
    }
  };*/
  const handleRespuesta = (puntos, index) => {
    const nuevaPuntuacion = puntuacion + puntos;
    setPuntuacion(nuevaPuntuacion);
    setRespondidas([...respondidas, index]);
  
    //si no quedan preguntas se calcula la puntuación
    if (respondidas.length + 1 === preguntas.length) {
      calcularPuntuacion(nuevaPuntuacion);
    }
  };
  

  const calcularPuntuacion = (puntuacionTotal) => {
    // const preguntasContestadas = preguntas.filter((pregunta) => pregunta.respuestas.length > 0);
    //puntuacion= preguntasContestadas.puntos;
    let resultado = "";
    let color = "";

    if (puntuacion <= 4) {
      resultado = "En principio no tienes nada de que preocuparte.";
      color = "success";
    } else if (puntuacion >= 5 && puntuacion <= 6) {
      resultado = "Empiezas a tener signos de dependencia del móvil. Puedes utilizar técnicas como apagar el móvil cuando no lo necesitas, cuando duermes, etc";
      color = "info";
    } else if (puntuacion >= 7 && puntuacion <= 8) {
      resultado = "Tienes una gran dependencia del móvil. Deberías seguir un plan de «desintoxicación» del móvil como por ejemplo dejar el móvil en casa cuando vas a comprar, apagarlo durante la noche, apagarlo durante horas de clase o trabajo, etc.";
      color = "warning";
    } else if (puntuacion >= 9) {
      resultado = "Tus síntomas de dependencia son muy preocupantes. Además de todas las técnicas de los apartados anteriores deberías plantearte un plan de desintoxicación del móvil que consista en estar una o dos semanas sin utilizarlo. Si ves que no puedes hacerlo por ti mismo, pide ayuda a un profesional.";
      color = "danger";
    }
    console.log(color);
    setAlertaColor(color);
    setResultado(resultado);

  }


  return (
    <div className="App">
      {!resultado ? (
        <Form>
           {preguntas.map((pregunta, index) => (
          !respondidas.includes(index) && (
            <FormGroup key={index}>
              <Label>
                <strong>Pregunta {index + 1}:</strong> {pregunta.pregunta}
              </Label>
              {pregunta.respuestas.map((respuesta, idx) => (
                <FormGroup check key={idx}>
                  <Label check>
                    <Input
                      type="radio"
                      name={`radio-${index}`}
                      onClick={() => handleRespuesta(respuesta.puntos, index)}
                    />
                    {respuesta.respuesta}
                  </Label>
                </FormGroup>
              ))}
            </FormGroup>
          )
        ))}
        </Form>
      ) : (
        <Alert color={alertaColor}>
          <h4 className="alert-heading">Fin de la encuesta</h4>
          <hr />
          <p>Tu puntuación total es: <strong>{puntuacion}</strong>.</p>
          <p>{resultado}</p>
        </Alert>
      )}
    </div>
  );
}

export default App;