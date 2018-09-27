function getClient() {
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

                document.getElementById("FirstName").value = DataJson.FirstName;
                document.getElementById("LastName").value = DataJson.LastName;
            }

        }
    };

    let param = paramlist.get("u");
    xhttp.open("GET", urlbase + "/api/Panel/GetClient/" + param + "|"+site, true);
    xhttp.send();
}

function getEditProperty(i, property) {
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

                document.getElementById(property).innerHTML = DataJson.FirstName;
                getHiddenSave(property, false);
            }

        }
    };
    var value = document.getElementById(property).value;
    xhttp.open("GET", urlbase + "/api/Panel/GetChangeClient/" + u + "|" + i + "|" + value + "|"+site, true);
    xhttp.send();
}

function getHiddenSave(elemenet,isvisible) {

    if (isvisible) {
        document.getElementById(elemenet).disabled = false;
        document.getElementById("a" + elemenet).style.display = "block";
    }
    else
    {
        document.getElementById(elemenet).disabled = true;
        document.getElementById("a" + elemenet).style.display = "none";
    }
    
            
}

getClient();

