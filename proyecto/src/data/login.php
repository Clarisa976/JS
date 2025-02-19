<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$usuarios = [
    [
        'id' => 1,
        'username' => 'victoria',
        'password' => md5('123456')
    ],
    [
        'id' => 2,
        'username' => 'koko',
        'password' => md5('123')
    ]
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';


    if ($username === '' || $password === '') {
        echo json_encode([
            'status' => 'error',
            'message' => 'Please fill out all fields.'
        ]);
        exit;
    }

    //contraseña en md5
    $passwordMd5 = md5($password);
    $usuarioEncontrado = null;

    foreach ($usuarios as $usuario) {
        if ($usuario['username'] === $username && $usuario['password'] === $passwordMd5) {
            $usuarioEncontrado = $usuario;
            break;
        }
    }

    if ($usuarioEncontrado) {
        echo json_encode([
            'status' => 'success',
            'message' => 'User authenticated.',
            'user' => $usuarioEncontrado
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'User not registered or incorrect password.'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
}
