var urlBase = "http://www.quickercontact.com/public/api";
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
        document.getElementById("addResult").innerHTML =
            "Not in the correct format";
    }
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var phoneNumber = document.getElementById("phone").value;
    var jsonPayload =
        '{"firstName" : "' +
        firstName +
        '", "lastName" : "' +
        lastName +
        '", "phone" : "' +
        phoneNumber +
        '", "homeAddress" : "' +
        address +
        '", "email" : "' +
        email +
        '", "userID" : "' +
        userId +
        '"}';
    var url = urlBase + "/CreateContact." + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.send(jsonPayload);
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.created === false) {
            // Error adding contact
            document.getElementById("addResult").innerHTML =
                "Email/Password Incorrect";
            return false;
        }
    } catch (err) {
        // other type of error (network, etc...)
        document.getElementById("addResult").innerHTML = err.message;
    }
    window.location.href = "contact-list.html";
}

function editContact() {
    var cookie = readCookie();
    let params = new URLSearchParams(document.location.search.substring(1));
    let id = params.get("contactID");

    if (id < 1) {
        document.getElementById("editResult").innerHTML =
            "Unknown ID of Contact to Edit";
        return;
    }

    if (checkEmail === false) {
        // document.getElementById("").innerHTML = "Not in the correct format";
    }
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        address === "" ||
        phoneNumber === ""
    ) {
        document.getElementById("editResult").innerHTML =
            "Cannot have blank entries";
        return false;
    }
    var jsonPayload =
        '{"firstName" : "' +
        firstName +
        '", "lastName" : "' +
        lastName +
        '", "phone" : "' +
        phoneNumber +
        '", "homeAddress" : "' +
        address +
        '", "emailAddress" : "' +
        email +
        '", "ID" : "' +
        id +
        '"}';
    var url = urlBase + "/UpdateContact." + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.send(jsonPayload);
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.created === false) {
            document.getElementById("editResult").innerHTML =
                "Incorrect entries";
            return false;
        }

        window.location.href = "contact-list.html";
    } catch (err) {
        document.getElementById("editResult").innerHTML = err.message;
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

function grabContactData() {
    var cookie = readCookie();
    let params = new URLSearchParams(document.location.search.substring(1));
    let id = params.get("contactID");

    var jsonPayload = '{"contactID" : "' + id + '"}';
    var url = urlBase + "/SingularFetchContact." + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.send(jsonPayload);
        var jsonObject = JSON.parse(xhr.responseText);
        document.getElementById("email").value =
            jsonObject.contact.EmailAddress;
        document.getElementById("firstName").value =
            jsonObject.contact.FirstName;
        document.getElementById("address").value =
            jsonObject.contact.HomeAddress;
        document.getElementById("lastName").value = jsonObject.contact.LastName;
        document.getElementById("phoneNumber").value = jsonObject.contact.Phone;
    } catch (err) {
        document.getElementById("editResult").innerHTML = err.message;
    }
}
