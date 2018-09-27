function getPassword() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            document.getElementById("Info").innerHTML = "";

            if (respHttp != 0) {
                var DataJson = JSON.parse(respHttp);
                document.getElementById("Info").innerHTML += "<h4>Password update</h4><a href='/Panel/'>Back Home Panel</a>";
            }
            else
            {
                document.getElementById("Info").innerHTML += "<h4>Error: User no recognizise</h4>";
            }
        }
    };
    var Password = document.getElementById("Password").value;
    var Password2 = document.getElementById("Password2").value.replace(".", "=");

    var passt = 0;
    var passnl = 0;
    if (Password != Password2 && passt==0)
    {
        passt = 1;
        document.getElementById("Info").innerHTML = "<h4>Passwords no match</h4>";
    }
    else if (Password != Password2 && passnl==0) {
        passnl = 1;
        document.getElementById("Info").innerHTML += "<h4>Passwords no match</h4>";
    }
    else if (passt==0 && passnl==0)
    {
        xhttp.open("GET", urlbase + "/api/Connexion/GetRessetPassword/" + Password + "|" + u + "|"+site, true);
        xhttp.send();
    }
   
}


document.write("<h2>Resset Password</h2><div id='Resset'>\
   <table><tr><td>Password </td><td><input id='Password' type='password' /></td></tr>\
    <tr> <td>Confirm Password</td> <td><input id='Password2' type='password' /></td></tr >\
     <tr> <td></td> <td><button name='getPassword'  value='' onclick='getPassword()'>Change password</button></td></tr ></table>\
 </div> <div id='Info'></div>  ");