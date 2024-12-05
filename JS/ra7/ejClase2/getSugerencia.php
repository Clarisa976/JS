<?php
$usuario = "admin";
$clave = "1234";

$user = $_GET['usuario'];//request si no sabemos si es get o post
$password = $_GET['clave'];

$resultado="";
//verificar si el usuario y contraseña son válidos
    if ($usuario==$user && $clave == $password) {
        $resultado = "Usuario válido";
    } else {
        $resultado = "Usuario o contraseña no válidos";
    }


// Devolver el resultado
echo $resultado;