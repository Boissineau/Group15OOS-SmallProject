var urlBase = 'http://3.236.38.146/public/api';
var extension = 'php';

function createAccount(){

    var available = "";
    var created = "";

    var createEmail = document.getElementById("inputEmail").value; 
    var createPassword = document.getElementById("inputPassword").value; 
    var hash = md5(createPassword);

    if(checkEmail() == false || checkPassword() == false){
        return;
    }
    
    
    
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

function checkPassword(){

    var passwordToBeChecked = document.getElementById("inputPassword").value;
    var passwordToBeCheckedAgainst = document.getElementById("passwordCheck").value;

    if(passwordToBeChecked != passwordToBeCheckedAgainst){
        document.getElementById("passwordCheck").value = "";
        document.getElementById("creationResult").innerHTML = "Passwords do not match";
        return false;

    }
    return true;

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