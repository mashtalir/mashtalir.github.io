var data;

function httpGet(callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", 'http://127.0.0.1:8000/profile/get_username_info/', true); // true for asynchronous
    xmlHttp.send(null);
}

function get_response(server_response) {
    data = JSON.parse(server_response);
    document.getElementById('username').value = data['username'];
}
httpGet(get_response);