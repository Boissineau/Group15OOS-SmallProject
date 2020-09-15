var urlBase = 'http://3.236.38.146/public/api';
var extension = 'php';

var userId = 0;

function doLogin()
{
	userId = 0;
	
	var login = document.getElementById("inputEmail").value;
	var password = document.getElementById("inputPassword").value;
	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

    var jsonPayload = '{"email" : "' + login + '", "password" : "' + hash + '"}';
    
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.ID;
		
		if( userId === 0 )
		{
			document.getElementById("loginResult").innerHTML = "Email/Password Incorrect";
			return false;
		}
		
		saveCookie();
	
		window.location.href = "contact-list.html";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "userId=" + userId + ";expires=" + date.toGMTString() + ";SameSite=Lax";
}