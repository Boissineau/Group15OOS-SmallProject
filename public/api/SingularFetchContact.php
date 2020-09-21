<?php

	$inData = getRequestInfo();

    $conn = new mysqli('localhost', 'root', 'group15oos', 'contact_manager');
	if ($conn->connect_error)
	{
		error_log("Error connecting to database!");
		returnUnsuccessful('Error connecting to database!');
	}
	else
	{
        $contactID = $conn->real_escape_string($inData['contactID']);

        $sql = "SELECT * FROM Contacts WHERE ID=" . $contactID;

		$result = $conn->query($sql);
				$searchResults = "";
        while($row = $result->fetch_assoc())
        {
            $searchResults .= '{"FirstName":"' . $row['FirstName'] . '",'
                . '"LastName":"' . $row['LastName'] . '",'
                . '"Phone":"' . $row['Phone'] . '",'
                . '"HomeAddress":"' . $row['HomeAddress'] . '",'
                . '"EmailAddress":"' . $row['EmailAddress'] . '"}';
        }
        returnSuccessful($searchResults);

		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

    function returnSuccessful( $contact )
    {
			if ($contact == "")
			{
				$retValue = '{"contact": "","error": ""}';
			}
     	else
		 	{
			 $retValue = '{"contact":' . $contact . ',"error":""}';
     	}
		 sendResultInfoAsJson($retValue);
    }

	function returnUnsuccessful( $errorString )
	{
		$retValue = '{"contact": "","error":"' . $errorString . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
