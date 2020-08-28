<?php

    $inData = getRequestInfo();

    $searchResult = "";

    $conn = new mysqli('localhost', 'root', 'group15oos', 'fruit');
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $sql = 'select color from fruitColors where name = "%' . $inData['fruit'] . '%"';
        $result = $conn->query($sql);
        if ($result->num_rows > 0)
        {
            $row = $result->fetch_assoc();
            $searchResult = $row['color']
        }
        else
        {
            returnWithError('No Records Found');
        }
        $conn->close();
    }

    returnWithInfo($searchResult);

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $retValue = '{"color":"", "error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($searchResult)
    {
        $retValue = '{"result":"' . $searchResult . '", "error":""}';
        sendResultInfoAsJson($retValue);
    }

?>