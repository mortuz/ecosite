function getRecover() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            document.getElementById("Info").innerHTML = "";

            if (respHttp != 0) {
                document.getElementById("Info").innerHTML += "<h4>Error: A mail was sending to your adress email</h4>";
            }
            else {
                document.getElementById("Info").innerHTML += "<h4>Error: User no recognizise</h4>";
            }
        }
    };

    var UserEmail = document.getElementById("UserEmail").value.replace(".", "=");

   
       
    xhttp.open("GET", urlbase + "/api/Connexion/RecoverPassword/" + UserEmail + "|"+site, true);
        xhttp.send();
    }

}
getPassword();

document.write("<h2>Recognisie Password</h2><div id='Recover'>\
   <table><tr><td>Email or Login </td><td><input id='UserEmail' type='text' /></td></tr>\ 
    < tr > <td></td> <td><input name='btRecover' value='Send Email' onclick='getRecover()' type='submit' /></td></tr ></table>\
 </div> <div id='Info'></div> ");