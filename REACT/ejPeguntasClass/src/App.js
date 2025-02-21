import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Alert, Button } from 'reactstrap';

const preguntas = [
  {
    pregunta: "1. Cuando mandas un mensaje por whatsapp esperas siempre al doble check. Si no aparece vuelves a abrir el terminal para revisarlo al rato.",
    respuestas: [
      { respuesta: "Sí", puntos: 1 },
      { respuesta: "No", puntos: 0 }
    ]
  },
  {
    pregunta: "2. Antes de acostarte siempre miras el móvil a ver si tienes mensajes o notificaciones.",
    respuestas: [
      { respuesta: "Sí", puntos: 1 },
      { respuesta: "No", puntos: 0 }
    ]
  },
  {
    pregunta: "3. Te despiertas antes de tiempo para jugar, mandar mensajes, actualizar perfiles,… con el teléfono móvil.",
    respuestas: [
      { respuesta: "Sí", puntos: 1 },
      { respuesta: "No", puntos: 0 }
    ]
  },
  {
    pregunta: "4. Si sales de casa sin el móvil volverías a cogerlo aunque llegues tarde a tu cita.",
    respuestas: [
      { respuesta: "Sí", puntos: 1 },
      { respuesta: "No", puntos: 0 }
    ]
  },
  {
    pregunta: "5. Tienes miedo a quedarte sin batería.",
    respuestas: [
      { respuesta: "Sí", puntos: 1 },
      { respuesta: "No", puntos: 0 }
    ]
  },
  {
    pregunta: "6. Cuando tienes la batería baja desactivas ciertas aplicaciones u opciones del teléfono como la WiFi, bluetooth para no quedarte sin batería.",
    respuestas: [
      { respuesta: "Sí", puntos: 1 },
      { respuesta: "No", puntos: 0 }
    ]
  },
  {
    pregunta: "7. Tienes ansiedad cuando tienes llamadas perdidas. Llamas a los números y te preocupas si no responden.",
    respuestas: [
      { respuesta: "Sí", puntos: 1 },
      { respuesta: "No", puntos: 0 }
    ]
  },
  {
    pregunta: "8. Miras la cobertura cuando estas en algún sitio con los amigos, esperando, etc.",
    respuestas: [
      { respuesta: "Sí", puntos: 1 },
      { respuesta: "No", puntos: 0 }
    ]
  },
  {
    pregunta: "9. Sueles hacer alguna otra cosa mientras que miras al móvil como comer, lavarte los dientes, etc.",
    respuestas: [
      { respuesta: "Sí", puntos: 1 },
      { respuesta: "No", puntos: 0 }
    ]
  },
  {
    pregunta: "10. Vas al baño siempre con el móvil.",
    respuestas: [
      { respuesta: "Sí", puntos: 1 },
      { respuesta: "No", puntos: 0 }
    ]
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puntuacion: 0,
      respondidas: [],
      resultado: "",
      alertaColor: "secondary",
      respuestasUsuario: {}
    };

  }


  handleRespuesta = (puntos, index) => {
    const { puntuacion, respondidas, respuestasUsuario } = this.state;
    const nuevaPuntuacion = puntuacion + puntos;

    this.setState({
      puntuacion: nuevaPuntuacion,
      respondidas: [...respondidas, index],
      respuestasUsuario: {
        ...respuestasUsuario,
        [index]: puntos
      }
    });
  };


  calcularPuntuacion = (puntuacionTotal) => {
    let mensaje = "";
    let color = "";

    if (puntuacionTotal <= 4) {
      mensaje = "En principio no tienes nada de que preocuparte.";
      color = "success";
    } else if (puntuacionTotal >= 5 && puntuacionTotal <= 6) {
      mensaje = "Empiezas a tener signos de dependencia del móvil. Puedes utilizar técnicas como apagar el móvil cuando no lo necesitas, cuando duermes, etc.";
      color = "info";
    } else if (puntuacionTotal >= 7 && puntuacionTotal <= 8) {
      mensaje = "Tienes una gran dependencia del móvil. Deberías seguir un plan de «desintoxicación» del móvil como por ejemplo dejar el móvil en casa cuando vas a comprar, apagarlo durante la noche, apagarlo durante horas de clase o trabajo, etc.";
      color = "warning";
    } else if (puntuacionTotal >= 9) {
      mensaje = "Tus síntomas de dependencia son muy preocupantes. Además de todas las técnicas de los apartados anteriores deberías plantearte un plan de desintoxicación del móvil que consista en estar una o dos semanas sin utilizarlo. Si ves que no puedes hacerlo por ti mismo, pide ayuda a un profesional.";
      color = "danger";
    }

    this.setState({
      alertaColor: color,
      resultado: mensaje
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { respondidas, puntuacion } = this.state;
    if (respondidas.length !== prevState.respondidas.length) {
      //todas las preguntas han sido respondidas
      if (respondidas.length === preguntas.length) {
        this.calcularPuntuacion(puntuacion);
      }
    }
  }

  render() {
    const { puntuacion, respondidas, resultado, alertaColor } = this.state;

    return (
      <div>
        {!resultado ? (
          <Form>
            {preguntas.map((pregunta, index) => (
              !respondidas.includes(index) && (
                <FormGroup key={index} className='p-3 mb-3 border rounded bg-light'>
                  <Label>
                    {pregunta.pregunta}
                  </Label>
                  {pregunta.respuestas.map((respuesta, idx) => (
                    <FormGroup check key={idx}>
                      <Label check>
                        <Input
                          type="radio"
                          name={`radio-${index}`}
                          onClick={() => this.handleRespuesta(respuesta.puntos, index)}
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
}

export default App;
