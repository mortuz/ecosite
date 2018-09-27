


//window.onload = function () {
//    if (u != null && u != 0 && u != 'null' && (typeof u !== 'undefined')) {
//        //  alert(u);
//      window.location.replace("/Home/Order.html?u=" + u);
//    }; 
//}
function getLogin() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            var DataJson = JSON.parse(respHttp);

            if (DataJson.Id != 0) {
                u = DataJson.Id;
                GetRedirectionConnexion(DataJson.Id);
            }
            else {
                document.getElementById("InfoMessage").innerHTML = "Login or password no exist";
            }
           
        }
    };

    var isValided = true;
    var login = document.getElementById("Ident").value.split('.').join('=');
    var pass = document.getElementById("Pass").value.split('.').join('=');
    xhttp.open("GET", urlbase + "/api/Connexion/GetLogin/e|" + login + "|" +pass+ "|"+site, true);
    xhttp.send();
}
function getDiconnect() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            document.getElementById("Total").innerHTML = "Total: <b>" + respHttp + " €</b>";
        }
    };
    xhttp.open("GET", urlbase + "/api/ListProduts/getDiconnect/"+site, true);
    xhttp.send();
}

function ValidateEmail()
{
    var email = document.getElementById("Ident").value;

    var reg =  /\S+@\S+\.\S+/;
    if (email.lenght < 3 || email.lenght > 100 || !reg.test(email)) {
        document.getElementById("Ident").style.borderColor = "red";
        document.getElementById("IdentInfo").style.color = "red";
        if (email.lenght < 3) {
            document.getElementById("IdentInfo").value = "The email is too short";

        }
        else if (!reg.test(email)) {
            document.getElementById("IdentInfo").value = "The format is not correct";
        }
        else {
            document.getElementById("IdentInfo").value = "The email is too long";
        }
    }
    else
    {
        document.getElementById("Ident").style.borderColor = "green";
        document.getElementById("IdentInfo").value = "";
    }
}
//document.write("<h2>Connexion</h2><div id='Login'>\
//   <table><tr><td>Email</td><td><input id='Ident' type='text' onblur='ValidateEmail' /></td><td id='IdentInfo'></td><td></tr>\
//    <tr> <td>Password</td> <td><input id='Pass' type='password' /></td></tr >\
//     <tr> <td></td> <td> <button type='button' onclick='getLogin()'>Submit</button></td></tr >\
//<tr> <td></td> <td><div id='InfoMessage'></div></td></tr ></table>\
// <br/> <a href='/Home/SignUp.html'>Sign Up</a><br/> <a href='/Home/RecoverPassword.html'>Forget Password?</a> </div >  ");