import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import md5 from 'md5';
//import { USUARIOS } from "../data/users.js"; 

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
   // const URL_API = 'http://localhost/Proyectos/JS/REACT/prueba-docker/build/API/login.php';//casa
    const URL_API = 'http://localhost/Proyectos/DWECL/DWECL/proyecto/build/API/login.php';

    const handleChange = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setError("Please fill out all fields.");
            return;
        }

        try {
            // Preparamos los datos en formato JSON y encriptamos el password con MD5
            const response = await axios.post(URL_API, JSON.stringify({
                usuario: username,
                password: md5(password)
            }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = response.data;
            // Verificamos el mensaje que nos devuelve el PHP
            if (data.mensaje === "Acceso correcto") {
                //alert(`Holis, ${data.usuario.usuario}!`);
                props.onLogin(data.usuario);//para devolver los datos del usuario
                setError('');
                props.toggle();
                setUsername('');
                setPassword('');
            } else {
                setError(data.mensaje);
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <Modal isOpen={props.show} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Login</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username:</Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password:</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Login</Button>{' '}
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};
export default Login; 