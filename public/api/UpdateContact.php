<?php

	$inData = getRequestInfo();

  $conn = new mysqli('localhost', 'root', 'group15oos', 'contact_manager');
	if ($conn->connect_error)
	{
		error_log("Error connecting to database!");
		returnUnsuccessful();
	}
	else
	{
    $firstName = $conn->real_escape_string($inData["firstName"]);
    $lastName = $conn->real_escape_string($inData["lastName"]);
    $phone = $conn->real_escape_string($inData["phone"]);
    $homeAddress = $conn->real_escape_string($inData["homeAddress"]);
    $emailAddress = $conn->real_escape_string($inData["emailAddress"]);

		$sql = "UPDATE Contacts SET " .
      "FirstName='" . $firstName . "'" .
      ",LastName='" . $lastName . "'" .
      ",Phone='" . $phone . "'" .
      ",HomeAddress='" . $homeAddress . "'" .
      ",EmailAddress='" . $emailAddress . "'" .
      "WHERE ID='" . $inData["ID"] . "'";

		if ($result = $conn->query($sql))
    {
      returnSuccessful();
    }
    else
    {
      error_log("Failed updating contact!");
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

	function returnUnsuccessful()
	{
		$retValue = '{"success":false}';
		sendResultInfoAsJson( $retValue );
	}

	function returnSuccessful()
	{
		$retValue = '{"success":true}';
		sendResultInfoAsJson( $retValue );
	}

?>
