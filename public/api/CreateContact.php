<?php

	$inData = getRequestInfo();

    $conn = new mysqli('localhost', 'root', 'group15oos', 'contact_manager');
	if ($conn->connect_error)
	{
		error_log("Error connecting to database!");
		returnUnsuccessful(false);
	}
	else
	{
        $firstName = $conn->real_escape_string($inData['firstName']);
        $lastName = $conn->real_escape_string($inData['lastName']);
        $phone = $conn->real_escape_string($inData['phone']);
        $homeAddress = $conn->real_escape_string($inData['homeAddress']);
        $email = $conn->real_escape_string($inData['email']);
        $userID = $conn->real_escape_string($inData['userID']);

        $sql = "INSERT into Contacts (FirstName, LastName, Phone, HomeAddress, " .
               "EmailAddress, UserID) VALUES ('" . $firstName . "', '" . $lastName .
               "', '" . $phone . "', '" . $homeAddress . "', '" . $email .
               "', '" . $userID . "')";
        if ($result = $conn->query($sql))
        {
            returnSuccessful();
        }
        else
        {
            error_log("Failed inserting into table!");
            returnUnsuccessful();
        }
        
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

	function returnSuccessful()
	{
		$retValue = '{"created":true}';
		sendResultInfoAsJson( $retValue );
	}

	function returnUnsuccessful()
	{
		$retValue = '{"created":false}';
		sendResultInfoAsJson( $retValue );
	}

?>
