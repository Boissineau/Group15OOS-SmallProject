var urlBase = "http://3.236.38.146/public/api";
var extension = "php";

window.onload = readCookie();

function readCookie() {
    userId = -1;
    var data = document.cookie;
    var splits = data.split(",");
    // if other data is wanted from the cookie, will be split in the tokens array. Here for future usage if required
    for (var i = 0; i < splits.length; i++) {
        var thisOne = splits[i].trim();
        var tokens = thisOne.split("=");
        if (tokens[0] == "userId") {
            userId = parseInt(tokens[1].trim());
        }
        if (userId > 0) {
            return userId;
        } else {
            window.location.href = "login.html";
        }
    }
}

function addContact() {
    var cookie = readCookie();

    if (checkEmail === false) {
        // document.getElementById("").innerHTML = "Not in the correct format";
    }
    var firstName = document.getElementById("inputFirstName").value;
    var lastName = document.getElementById("inputLastName").value;
    var email = document.getElementById("inputEmail").value;
    var address = document.getElementById("inputAddress").value;
    var phoneNumber = document.getElementById("inputPhone").value;
    var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "phone" : "' + phoneNumber + '", "homeAddress" : "' + address + '", "email" : "' + email + '", "userID" : "' + userId + '"}';
    var url = urlBase + "/CreateContact." + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.send(jsonPayload);
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.created === false) {
            // Error adding contact
            // document.getElementById("").innerHTML = "Email/Password Incorrect";
            return false;
        }
    } catch (err) {
        // other type of error (network, etc...)
        // document.getElementById("").innerHTML = err.message;
    }
}

function checkEmail() {
    var testEmail = document.getElementById("inputEmail").value;

    var regex = /\S+@\S+\.\S+/;
    if (regex.test(testEmail) != true) {
        document.getElementById("creationResult").innerHTML =
            "Email is not in the correct format";
        return false;
    }
    return true;
}
