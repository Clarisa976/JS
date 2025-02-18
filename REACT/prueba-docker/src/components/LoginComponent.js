import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { USUARIOS } from "../data/users.js"; 

const Login = (props) => {
    console.log('Users:', USUARIOS);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setError("Please fill out all fields.");
            return;
        }

        const userFound = USUARIOS.find(
            (user) => user.username === username && user.password === password
        );

        if (!userFound) {
            setError("User not registered or incorrect password.");
            return;
        }

        setError('');
        console.log("Authenticated user:", userFound);
        props.toggle();
        setUsername('');
        setPassword('');
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