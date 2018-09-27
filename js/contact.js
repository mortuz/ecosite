function SendMessage() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            if (respHttp != 0) {
                document.getElementById("InfoMessage").innerHTML = "Message sended";
            }
            else {
                document.getElementById("InfoMessage").innerHTML = "Error Message not sended";
            }
        }
    };
    var lastname = document.getElementById("lastname").value.split('.').join('=');
    var firstname = document.getElementById("firstname").value.split('.').join('=');
    var email = document.getElementById("email").value.split('.').join('=');
    var title = document.getElementById("title").value.split('.').join('=');
    var text = document.getElementById("text").value.split('.').join('=');

    var urlparam = "/api/Message/GetMessage/" + lastname + "|" + firstname
        + "|" + email + "|" + title + "|" + text ;

    xhttp.open("GET", urlbase + urlparam + "|" + site, true);
    xhttp.send();
}

//document.write("<h2>Message</h2><div id='MessageSend'>\
//    <table>\
//    <tr><td>Last name</td><td><input id='lastname' type='text' /></td></tr>\
//    <tr> <td>First name</td> <td><input id='firstname' type='text' /></td></tr>\
//    <tr><td>Email</td><td><input id='email' type='text' /></td></tr>\
//    <tr> <td>Title</td> <td><input id='title' type='text' /></td></tr>\
//    <tr><td>Text</td><td><textarea rows='4' cols='50' id ='text'></textarea></td></tr>\
//    <tr> <td></td> <td><button onclick='SendMessage()'>Send Message</button></td></tr>\
//        </table>\
//    </div > <div id='InfoMessage'>  </div>");