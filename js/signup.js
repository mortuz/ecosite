function SignUp() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            var DataJson = JSON.parse(respHttp);

            if (DataJson.Id != 0) {
                GetRedirectionConnexion(DataJson.User.Id);
            }
            else {
                document.getElementById("InfoMessage").innerHTML = "Error";
            }


        }
    };
    var login = document.getElementById("ident").value.split('.').join('=');
    var pass = document.getElementById("pass").value.split('.').join('=');
    var lastname = document.getElementById("lastname").value.split('.').join('=');
    var firstname = document.getElementById("firstname").value.split('.').join('=');
    var adress1 = document.getElementById("adress1").value.split('.').join('=');
    var adress2 = document.getElementById("adress2").value.split('.').join('=');
    var zip = document.getElementById("zip").value.split('.').join('=');
    var town = document.getElementById("town").value.split('.').join('=');
    var country = document.getElementById("country").value.split('.').join('=');

    var urlparam = "/api/Connexion/GetAddClient/e|" + login + "|" + pass
        + "|" + lastname + "|" + firstname + "|" + adress1 + "|" + adress2 + "|" + zip
        + "|" + town + "|" + country;

        xhttp.open("GET", urlbase + urlparam+ "|"+site, true);
    xhttp.send();
}


//document.write("<h2>Sign Up</h2><div id='SignUp'>\
//    <table>\
//    <tr><td>Email</td><td><input id='ident' type='text' /></td></tr>\
//    <tr> <td>Password</td> <td><input id='pass' type='password' /></td></tr>\
//    <tr><td>Last name</td><td><input id='lastname' type='text' /></td></tr>\
//    <tr> <td>First name</td> <td><input id='firstname' type='text' /></td></tr>\
//    <tr><td>Adress 1</td><td><input id='adress1' type='text' /></td></tr>\
//    <tr> <td>Adress 2</td> <td><input id='adress2' type='text' /></td></tr>\
//    <tr><td>Zip</td><td><input id='zip' type='text' /></td></tr>\
//    <tr> <td>Town</td> <td><input id='town' type='text' /></td></tr>\
//    <tr><td>Country</td><td><input id='country' type='text' /></td></tr>\
//    <tr> <td></td> <td><input name='btSignUp' value='Sign Up' onclick='SignUp()' type='submit' /></td></tr>\
//        </table>\
//        </table>\
//    <br /> <a href='/Home/Connexion.html'>Already an account?</a>\
//    </div > <div id='InfoMessage'>  </div>");