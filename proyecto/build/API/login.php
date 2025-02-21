<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Leer la entrada JSON enviada por Axios
$_POST = json_decode(file_get_contents("php://input"), true);

// Validar que se hayan enviado los campos necesarios
if (!isset($_POST['usuario']) || !isset($_POST['password'])) {
    echo json_encode([
        'status'  => 'error',
        'mensaje' => 'Por favor, completa todos los campos.'
    ]);
    exit;
}

$usuarioInput = trim($_POST['usuario']);
$passwordInput = trim($_POST['password']);

// En este ejemplo se usa MD5 para comparar las contraseñas (aunque no es lo más seguro)
//$passwordMd5 = md5($passwordInput);

// Array de usuarios a pelo
$usuarios = [
    [
        'id'       => 1,
        'usuario'  => 'victoria',
        'password' => md5('123456')
    ],
    [
        'id'       => 2,
        'usuario'  => 'koko',
        'password' => md5('123')
    ]
];

$usuarioEncontrado = null;
foreach ($usuarios as $usuario) {
    if ($usuario['usuario'] === $usuarioInput && $usuario['password'] === $passwordInput) {
        $usuarioEncontrado = $usuario;
        break;
    }
}

if ($usuarioEncontrado) {
    echo json_encode([
        'status'  => 'success',
        'mensaje' => 'Acceso correcto',
        'usuario' => $usuarioEncontrado
    ]);
} else {
    echo json_encode([
        'status'  => 'error',
        'mensaje' => 'Usuario o contraseña incorrectos.'
    ]);
}
