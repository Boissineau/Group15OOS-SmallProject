/**
 * Functions
 */
function cookieToObject() {
    let cookieObject = {};
    const cookieString = document.cookie;
    if (!cookieString) return null;
    const cookieArray = cookieString.split('; ');
    for (let i = 0; i < cookieArray.length; i++) {
        const cookiePropertyTuple = cookieArray[i].split('=');
        cookieObject[cookiePropertyTuple[0]] = cookiePropertyTuple[1];
    }
    return cookieObject;
}

export function getUserID() {
    const cookie = cookieToObject();
    return Number(cookie.userId);
}

export function fetchContactList(userID, searchString) {
    const url = 'http://www.quickercontact.com/public/api/FetchContacts.php';
    const jsonPayload = '{"userID" : "' + userID + '", "searchString" : "' + searchString + '"}';

    const xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse( xhr.responseText );
		return jsonObject;
	} catch(err) {
		return { 'contacts': [], 'error': err };
	}
}

export function deleteContact(contactObj) {
    const userID = getUserID();
    if (contactObj.UserID === userID) {
        const url = 'http://www.quickercontact.com/public/api/DeleteContact.php';
        const jsonPayload = '{"ID" : "' + contactObj.ID + '"}';

        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.send(jsonPayload);
            var jsonObject = JSON.parse(xhr.responseText);
            
            // If the deletion was successful, we must update the contact list element
            if (jsonObject.success) {
                const contactList = document.getElementById('contactList');
                const searchString = document.getElementById('contactSearchInput').textContent;
                const jsonResponse = fetchContactList(userID, searchString);
                contactList.updateContactList(jsonResponse.contacts, jsonResponse.error);
            }

            return jsonObject;
        } catch(err) {
            return { 'success': false };
        }
    } else {
        return { 'success': false };
    }
}

function onSearchInputChanged(event) {
    const searchString = event.target.value;
    const userID = getUserID();
    const jsonResponse = fetchContactList(userID, searchString);
    const contactList = document.getElementById('contactList');
    contactList.updateContactList(jsonResponse.contacts, jsonResponse.error);
}

function logout() {
    document.cookie = "userId=" + 0 + "; Max-Age=-99999999; SameSite=Lax";
    window.location.href = "/login.html";
}

function redirectToAddPage() {
    window.location.href = "/addContact.html";
}

/**
 * Run on import
 */

// If the userID is not found as a cookie,
const cookieObject = cookieToObject();
if (!cookieObject || !cookieObject.userId) {
    window.location.href = '/login.html';
}

// Attach an event listener to the search box that listens for any changes to it's value.
const searchInput = document.getElementById('contactSearchInput');
searchInput.addEventListener('input', onSearchInputChanged);

// Attach an event listener to the logout button that listens for it to be clicked.
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logout);

// Attach an event listener to the create button that listens for it to be clicked.
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', redirectToAddPage);