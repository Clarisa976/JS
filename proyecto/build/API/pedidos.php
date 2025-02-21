<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents('php://input'), true);
error_log("Datos recibidos: " . print_r($data, true));

if (!$data || !isset($data['action'])) {
    echo json_encode(["error" => "Action not specified"]);
    exit;
}

$action = $data['action'];
$file = 'lista_pedidos.json';

if ($action === "save") {
    if (!isset($data['order'])) {
        echo json_encode(["error" => "No order data provided"]);
        exit;
    }
    $newOrder = $data['order'];

    // Leer pedidos
    if (file_exists($file)) {
        $currentData = json_decode(file_get_contents($file), true);
        if (!is_array($currentData)) {
            $currentData = [];
        }
    } else {
        $currentData = [];
    }

    // Agregar pedido
    $currentData[] = $newOrder;
    $result = file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT));
    error_log("Resultado de file_put_contents: " . $result);
    if ($result !== false) {
        echo json_encode(["success" => true, "order" => $newOrder]);
    } else {
        echo json_encode(["error" => "Failed to save order"]);
    }
} elseif ($action === "get") {
    if (!isset($data['userId'])) {
        echo json_encode(["error" => "User ID missing"]);
        exit;
    }
    $userId = $data['userId'];
    if (file_exists($file)) {
        $ordersData = json_decode(file_get_contents($file), true);
        if (!is_array($ordersData)) {
            $ordersData = [];
        }
        $userOrders = array_filter($ordersData, function ($order) use ($userId) {
            return isset($order['userId']) && $order['userId'] == $userId;
        });
        echo json_encode(["pedidos" => array_values($userOrders)]);
    } else {
        echo json_encode(["pedidos" => []]);
    }
} else {
    echo json_encode(["error" => "Invalid action"]);
}
