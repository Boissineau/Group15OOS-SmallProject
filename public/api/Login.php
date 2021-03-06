<?php

	$inData = getRequestInfo();

	$id = 0;

  $conn = new mysqli('localhost', 'root', 'group15oos', 'contact_manager');
	if ($conn->connect_error)
	{
		error_log("Error connecting to database!");
		returnUnauthenticated();
	}
	else
	{
		$email = $conn->real_escape_string($inData["email"]);
		$password = $conn->real_escape_string($inData["password"]);

		$sql = "SELECT ID FROM Users where Email='" . $email . "' and Password='" . $password . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$id = $row["ID"];

			returnAuthenticated( $id );
		}
		else
		{
			returnUnauthenticated();
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

	function returnUnauthenticated()
	{
		$retValue = '{"ID":0,"authenticated":false}';
		sendResultInfoAsJson( $retValue );
	}

	function returnAuthenticated( $id )
	{
		$retValue = '{"ID":' . $id . ',"authenticated":true}';
		sendResultInfoAsJson( $retValue );
	}

?>
