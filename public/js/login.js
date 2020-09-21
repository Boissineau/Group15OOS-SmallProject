var urlBase = 'http://www.quickercontact.com/public/api';
var extension = 'php';

var userId = 0;

function enterKey(e) {
   if (e.which == 13){doLogin()};
};

function doLogin()
{
	userId = 0;
	
	var login = document.getElementById("inputEmail").value;
	var password = document.getElementById("inputPassword").value;
	var hash = md5( password );
    
    if(checkEmail() == false){
        return;
    }


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

function checkEmail(){

    var testEmail = document.getElementById("inputEmail").value;

    var regex = /\S+@\S+\.\S+/;
    if(regex.test(testEmail) != true){
        document.getElementById("creationResult").innerHTML = "Email is not in the correct format";
        return false;
    }
    return true;

    
}