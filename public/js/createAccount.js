var urlBase = 'http://3.236.38.146/public/api';
var extension = 'php';

var inputId = 0;
var inputEmail = "";
var inputPassword = "";

function createAccount(){
    inputId = 0;
    inputEmail = "";
    inputPassword = "";

    var available = "";
    var created = "";

    var createEmail = document.getElementById("inputEmail").value; 
    var createPassword = document.getElementById("inputPassword").value; 
    var hash = md5(createPassword);

    
    document.getElementById("creationResult").innerHTML = "";

    var jsonPayload = '{"email" : "' + createEmail + '", "password" : "' + hash + '"}';

    var url = urlBase + '/CreateUser.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try{
        xhr.send(jsonPayload);
        var jsonObject = JSON.parse(xhr.responseText);
        
        available = jsonObject.available;

        if(available === false){
            document.getElementById("creationResult").innerHTML = "Email is not available. Please try another email";
            return;
        }

        window.location.href = "login.html";




    } catch (err){
        document.getElementById("creationResult").innerHTML = err.message;
    }


}