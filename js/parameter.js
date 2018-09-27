

function getUser() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            if (respHttp == "0") {
                window.location.replace("/Home/Connexion.html");
            }
            else {
                var DataJson = JSON.parse(respHttp);

                document.getElementById("Name").value = DataJson.Name;
                document.getElementById("Email").value = DataJson.Email;
                document.getElementById("Password").value = DataJson.Password;
            }
        }
    };

    xhttp.open("GET", urlbase + "/api/Panel/GetUser/" + u + "|"+site, true);
    xhttp.send();
}

function getParameter() {
    document.getElementById("Parameter").innerHTML += "<h3><a href='/Home/RessetPassword.html?u="+ u + "' id='Name' >Reset Paasword</a></h3>";
}

getUser();

getParameter();

