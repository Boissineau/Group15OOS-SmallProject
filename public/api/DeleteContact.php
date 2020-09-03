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
		$sql = "DELETE FROM Contacts where ID='" . $inData["ID"] . "'";
		if ($result = $conn->query($sql))
    {
      returnSuccessful();
    }
    else
    {
      error_log("Failed deleting from table!");
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
