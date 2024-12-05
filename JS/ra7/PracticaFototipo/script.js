document.addEventListener('DOMContentLoaded', function () {
    // Llamadas
    let data = preguntas.preguntas; // Aquí los datos del json
    let datos = JSON.parse(JSON.stringify(data)); // Trabajamos con la copia
    let sumatorio = 0;

    listarPreguntas(datos); // Llamamos a la función para mostrar las preguntas

    // Función para listar las preguntas
    function listarPreguntas(datos) {
        let divContenedor = document.getElementById("contenedor"); // El div donde se agregarán las preguntas
        divContenedor.innerHTML = ""; // Limpiar el contenedor antes de renderizar
        crearPreguntas(datos, divContenedor); // Llamas a la función para crear las preguntas
    }

    // Función recursiva para formar las preguntas dentro del div
    function crearPreguntas(arr, divPrincipal) {
        arr.forEach((u, indice) => {
            // Por cada pregunta creamos un div contenedor para la pregunta y las opciones
            let divPregunta = document.createElement("div");
            divPregunta.classList.add("contenido-pregunta");

            // Añadimos el titulo de la pregunta a ese div
            let p = document.createElement("p");
            p.classList.add("pregunta");
            p.innerHTML = u.pregunta;
            divPregunta.appendChild(p);

            // Si la pregunta tiene opciones
            if (u.opciones && Array.isArray(u.opciones)) {
                // Creamos otro div donde almacenaremos todas las opciones como divs
                let divOpciones = document.createElement("div");
                divOpciones.classList.add("contenido-opciones");

                u.opciones.forEach((opcion, i) => {
                    let divOpcion = document.createElement("div");
                    divOpcion.classList.add("opcion");
                    divOpcion.innerHTML = opcion.descripcion; // Contendrá las respuestas
                    divOpcion.setAttribute("value", opcion.valor);

                    // Evento para controlar que cuando se clickee en una recoja valor y actualice de nuevo la página
                    divOpcion.addEventListener("click", () => recogerValorActualizar(opcion, arr, indice));

                    divOpciones.appendChild(divOpcion); // Añadir opción al contenedor de opciones
                });

                divPregunta.appendChild(divOpciones); // Añadir las opciones al contenedor de la pregunta
            }

            // Añadir el contenedor de la pregunta al contenedor principal
            divPrincipal.appendChild(divPregunta);
        });
    }

    // Función externa para manejar el click
    function recogerValorActualizar(opcion, arr, indice) {
        sumatorio += opcion.valor; // Sumar valor
        let nuevosDatos = [...arr];  // Crear una copia que vamos a listar despues
        nuevosDatos.splice(indice, 1); // Eliminamos la actual
        listarPreguntas(nuevosDatos); // Actualizamos las preguntas 
        if (nuevosDatos.length === 0) {
            mostrarResultado(); // Llamamos cuando el array esta vacío
        }
    }

    // Función para mostrar el resultado 
    function mostrarResultado() {
        let respuesta = document.getElementById("resultado");
        
        if (sumatorio <= 7) {
            respuesta.innerHTML = "TIPO DE PIEL I: Muy Sensible a la luz solar.";
        } else if (sumatorio > 7 && sumatorio <= 21) {
            respuesta.innerHTML = "TIPO DE PIEL II: Moderadamente sensible a la luz solar.";
        } else if (sumatorio > 21 && sumatorio <= 42) {
            respuesta.innerHTML = "TIPO DE PIEL III: Sensibilidad normal a la luz del sol.";
        } else if (sumatorio > 42 && sumatorio <= 68) {
            respuesta.innerHTML = "TIPO DE PIEL IV: La piel tiene tolerancia a la luz.";
        } else if (sumatorio > 68 && sumatorio <= 84) {
            respuesta.innerHTML = "TIPO DE PIEL V: La piel es oscura, alta tolerancia.";
        } else if (sumatorio > 84) {
            respuesta.innerHTML = "TIPO DE PIEL VI: La piel es negra, altísima tolerancia";
        }
    }
});