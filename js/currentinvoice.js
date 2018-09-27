
function getCurrentinvoice(i, property) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            if (respHttp == "0") {
                window.location.replace("/Home/Connexion.html");
            }
            else {
                var StrContent = "<table><thead>\
                    <tr>\
                    <th>Ref</th>\
                    <th>Date</th>\
                    </tr>\
                    </thead>";
                var i;
                var arrayList = respHttp.split('|');
                var DataJson;
                for (i = 1; i < arrayList.length; i++) {
                    var DataStr = arrayList[i];
                    DataJson = JSON.parse(DataStr);

                    StrContent += " <tr><td>" + DataJson.Invoice.Id + "</td><td>"
                        + new Date(parseInt(DataJson.Date.substr(6))) + "</td></tr>"
                }
                
                StrContent += "</table>";
                document.getElementById("Invoice").innerHTML += StrContent
            }

        }
    };

    xhttp.open("GET", urlbase + "/api/Panel/GetInvoice/" + u + "|"+site, true);
    xhttp.send();
}
getCurrentinvoice();
