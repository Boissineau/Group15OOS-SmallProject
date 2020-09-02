<?php

	$inData = getRequestInfo();

  $conn = new mysqli('localhost', 'root', 'group15oos', 'contact_manager');
	if ($conn->connect_error)
	{
		error_log("Error connecting to database!");
		returnUnsuccessful( false );
	}
	else
	{
		$email = $conn->real_escape_string($inData["email"]);
		$password = $conn->real_escape_string($inData["password"]);

		$sql = "SELECT * FROM Users where Email='" . $email . "'";
		$result = $conn->query($sql);
		if ($result->num_rows == 0)
		{
			$sql = "INSERT into Users (Email, Password) VALUES ('" . $email . "', '" . $password . "')";
			if ($result = $conn->query($sql))
			{
				returnSuccessful();
			}
			else
			{
				error_log("Failed inserting into table!");
				returnUnsuccessful( true );
			}
		}
		else
		{
			returnUnsuccessful( false );
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

	function returnUnsuccessful( $available )
	{
		$retValue = '{"available":' . var_export($available, true) . ',"created":false}';
		sendResultInfoAsJson( $retValue );
	}

	function returnSuccessful()
	{
		$retValue = '{"available":true,"created":true}';
		sendResultInfoAsJson( $retValue );
	}

?>
