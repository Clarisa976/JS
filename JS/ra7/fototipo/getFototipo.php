<?php
$puntuacion = isset($_GET['total'])? intval($_GET['total']) : null;

$resultado="";
if ($puntuacion >= 0 &&$puntuacion <= 7) {
    $resultado = "Tiene usted un FOTOTIPO de tipo 1<br>";
    $resultado.= "Puntuación Total: ". $puntuacion."<br>";
    $resultado .= "0-7 TIPO DE PIEL I Muy sensible a la luz solar";
} elseif ($puntuacion >= 8 && $puntuacion<= 21) {
    $resultado = "Tiene usted un FOTOTIPO de tipo 2<br>";
    $resultado.= "Puntuación Total: ". $puntuacion."<br>";
    $resultado .= "8-21 TIPO DE PIEL II Sensible a la luz solar";
} elseif ($puntuacion >= 22 && $puntuacion<= 42) {
    $resultado = "Tiene usted un FOTOTIPO de tipo 3<br>";
    $resultado.= "Puntuación Total: ". $puntuacion."<br>";
    $resultado .= "22-42 TIPO DE PIEL III Sensibilidad normal a la luz solar";
} elseif ($puntuacion >= 43 && $puntuacion<= 68) {
    $resultado = "Tiene usted un FOTOTIPO de tipo 4<br>";
    $resultado.= "Puntuación Total: ". $puntuacion."<br>";
    $resultado .= "43-68 TIPO DE PIEL IV La piel tiene tolerancia a la luz solar";
}elseif ($puntuacion >= 69 && $puntuacion<= 84) {
    $resultado = "Tiene usted un FOTOTIPO de tipo 5<br>";
    $resultado.= "Puntuación Total: ". $puntuacion."<br>";
    $resultado .= "69-84 TIPO DE PIEL V La piel es oscura. Alta tolerancia";
}else {
    $resultado = "Tiene usted un FOTOTIPO de tipo 6<br>";
    $resultado.= "Puntuación Total: ". $puntuacion."<br>";
    $resultado .= "+85 TIPO DE PIEL VI La piel es negra. Altísima tolerancia";
}
echo $resultado;
/*
PUNTUACIÓN TIPO DE PIEL DESCRIPCIÓN
0-7 TIPO DE PIEL I Muy sensible a la luz solar
8-21 TIPO DE PIEL II Sensible a la luz solar
22-42 TIPO DE PIEL III Sensibilidad normal a la luz solar
43-68 TIPO DE PIEL IV La piel tiene tolerancia a la luz solar
69-84 TIPO DE PIEL V La piel es oscura. Alta tolerancia
+85 TIPO DE PIEL VI La piel es negra. Altísima tolerancia
*/
?>