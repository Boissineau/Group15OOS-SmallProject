// We'll need to change this once we purchase a domain name
var urlBase = 'http://52.44.251.230/public/api';
var extension = 'php';

// Example api function call that grabs a fruit from the database
// DELETE THIS LATER
function getFruit()
{
    var fruit = document.getElementById('fruitText').value;
    document.getElementById('fruitColorResult').innerHTML = '';

    var jsonPayload = '{"fruit" : "' + fruit + '"}';
    var url = urlBase + '/SearchFruit.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    try
    {
        console.log(jsonPayload);
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                document.getElementById('fruitColorResult').innerHTML = 'Fruit has been retrieved!';
                var jsonObject = JSON.parse(xhr.responseText);
                document.getElementById('fruitColorResult').innerHTML = jsonObject.color;
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err)
    {
        document.getElementById('fruitColorResult').innerHTML = err.message;
    }
}