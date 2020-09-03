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
        $userID = $conn->real_escape_string($inData['userID']);
        $searchString = $conn->real_escape_string($inData['searchString']);

        $sql = "SELECT * FROM Contacts WHERE UserID=" . $userID .
               " AND (FirstName LIKE '%" . $searchString . "%'" .
               " OR LastName LIKE '%" . $searchString . "%'" .
               " OR Phone LIKE '%" . $searchString . "%'" .
               " OR HomeAddress LIKE '%" . $searchString . "%'" .
               " OR EmailAddress LIKE '%" . $searchString . "%')";
		$result = $conn->query($sql);
        $searchCount = 0;
        $searchResults = "[";
        while($row = $result->fetch_assoc())
        {
            if ($searchCount > 0)
            {
                $searchResults .= ",";
            }
            $searchCount++;
            $searchResults .= '{"FirstName":"' . $row['FirstName'] . '",'
                . '"LastName":"' . $row['LastName'] . '",'
                . '"Phone":"' . $row['Phone'] . '",'
                . '"HomeAddress":"' . $row['HomeAddress'] . '",'
                . '"EmailAddress":"' . $row['EmailAddress'] . '",'
                . '"UserID":' . $row['UserID'] . ','
                . '"ID":' . $row['ID'] . '}';
        }
        $searchResults .= ']';
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

    function returnSuccessful( $contactArray )
    {
        $retValue = '{"contacts":' . $contactArray . ',"error":""}';
        sendResultInfoAsJson($retValue);
    }

	function returnUnsuccessful( $errorString )
	{
		$retValue = '{"contacts":[],"error":"' . $errorString . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
